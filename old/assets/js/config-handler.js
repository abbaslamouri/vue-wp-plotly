import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import { displayAdminMessage, minMaxRangesliderHandler } from "./utilities"


const configHandler = async ( key, value, prefix  ) => {

  
  try {

    let chart = await localForage.getItem( 'chart')
    if ( ! Object.keys(chart).length ) throw new Error( `Chart missing` )

    let spreadsheet = await localForage.getItem( 'spreadsheet') 
    if ( ! Object.keys(spreadsheet).length ) throw new Error( `Spreadsheet missing` )

    chart.config[key] = value    
    const plotlyPlot = await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )

    chart.traces = plotlyPlot.data
    chart.layout = plotlyPlot.layout

    await localForage.setItem( "chart", chart )
    console.log('chart', chart)
    
    // Add range slider event handler
    eval(`${prefix}__plotlyChart`).on('plotly_relayout', async(eventData) => {

      // Bail if ecentData does not include xaxis
      if ( ! chart.params.enableMinMaxAvgTable || Object.keys(eventData)[0] !== 'xaxis.range' ) return
      
      const cellValues = minMaxRangesliderHandler( chart, chart.layout.xaxis.range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

      await Plotly.restyle(`${prefix}__plotlyChart`, {'cells.values' : [cellValues]}, chart.traces.length-1)
    
      document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
      document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )

      await localForage.setItem( "chart", chart )

    })

    // Modebar
    // document.getElementById(`${prefix}__layout[modebar][orientation]`).disabled = ! chart.config.displayModeBar ? true : false
    // document.getElementById(`${prefix}__layout[modebar][bgcolor]`).disabled = ! chart.config.displayModeBar ? true : false
    // document.getElementById(`${prefix}__layout[modebar][color]`).disabled = ! chart.config.displayModeBar ? true : false
    // document.getElementById(`${prefix}__layout[modebar][activecolor]`).disabled = ! chart.config.displayModeBar ? true : false
    // document.getElementById(`${prefix}__config[displaylogo]`).disabled = ! chart.config.displayModeBar ? true : false

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default configHandler
