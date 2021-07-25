import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import TableTrace from "./TableTrace"
import tracesPanel from "./traces-panel"
import { displayAdminMessage, addMinMaxAvgTable, addRangeMinMaxInputs, minMaxRangesliderHandler } from "./utilities"

const minMaxAvgHandler = async ( value, prefix ) => {

  try {

    let chart = await localForage.getItem( 'chart')
    let spreadsheet = await localForage.getItem( 'spreadsheet')
  
    if ( ! Object.keys(chart).length || ! Object.keys(spreadsheet).length ) throw new Error( `Either chart or spreadsheet missing` )

    if ( value ) {

      chart.layout.xaxis.domain =  [0,.5]

      chart = addMinMaxAvgTable( chart, TableTrace, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )
      await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )//.then( ( ) => {
      tracesPanel( chart, spreadsheet, prefix )

      addRangeMinMaxInputs( chart, Plotly, floatRound, `${prefix}__plotlyChart`, prefix )

      // Add range slider event handler
      eval(`${prefix}__plotlyChart`).on('plotly_relayout', async (eventData) => {
        // Bail if ecentData does not include xaxis
        if ( ! chart.params.enableMinMaxAvgTable || Object.keys(eventData)[0] !== 'xaxis.range' ) return
            
        const cellValues = minMaxRangesliderHandler( chart, chart.layout.xaxis.range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

        await Plotly.restyle(`${prefix}__plotlyChart`, {'cells.values' : [cellValues]}, chart.traces.length-1)

        document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
        document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )

        await localForage.setItem( "chart", chart )
      })

    } else {

      await Plotly.relayout( `${prefix}__plotlyChart`, {'xaxis.domain': [0,1]})
      await Plotly.deleteTraces( `${prefix}__plotlyChart`, chart.traces.length-1 )
       chart.traces.splice( chart.traces.length-1, 1)
      // await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )//.then( ( ) => {
      tracesPanel( chart, spreadsheet, prefix )

      document.getElementById( `${prefix}__min-max-avg-form` ).classList.add( 'hidden')

    }

    localForage.setItem('chart', chart)

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default minMaxAvgHandler
