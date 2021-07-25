import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import capitalize from 'lodash.capitalize'
import ChartAxis from "./ChartAxis"
import axesPanel from "./axes-panels"
import { displayAdminMessage, setSelectFieldOptions, fetchAxisOptions, minMaxRangesliderHandler } from "./utilities"


const axisHandler =  async( axisType, prefix ) => {
 
  try {

    let chart = await localForage.getItem( 'chart')
    if ( ! Object.keys(chart).length  ) throw new Error( `Chart missing` )

    let spreadsheet = await localForage.getItem( 'spreadsheet') 
    if ( ! Object.keys(spreadsheet).length ) throw new Error( `Spreadsheet missing` )
   

    const axes = Object.keys(chart.layout).filter( ( prop ) => prop.includes(axisType))
    let lastIndex =  0
          
    for ( const prop in axes.length ) {
      lastIndex = parseInt(axes[prop].split(axisType)[1]) > lastIndex ? parseInt(axes[prop].split(axisType)[1]) : lastIndex
    }

    const index = lastIndex === 0 ? 2 : lastIndex+1
    const axisId = `${axisType}${index}`
    const axisSide = axisType === "xaxis" ? "top" : axisType === "yaxis" ? "right" : null
    const axisOverlaying = axisType === "xaxis" ? null : axisType === "yaxis" ? "y" : null


    if ( ! axisSide ) throw new Error( " Invalid axis Side" )

    chart.layout[axisId] = ChartAxis.defaultOptions( axisId, axisSide, axisOverlaying, "Wavelength-1 ( &#181;m )", null )

    // Set traces xaxis and yaxis options
    for (const prop in chart.traces) {
      if ( chart.traces[prop].xaxis ) setSelectFieldOptions ( document.getElementById ( `${prefix}__traces[${prop}][xaxis]` ), fetchAxisOptions( chart.layout, "xaxis", capitalize ), 'Select X-Axis' )
      if ( chart.traces[prop].yaxis ) setSelectFieldOptions ( document.getElementById ( `${prefix}__traces[${prop}][yaxis]` ), fetchAxisOptions( chart.layout, "yaxis", capitalize ), 'Select Y-Axis' )
    }
    
    const plotlyPlot = await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )//.then( ( ) => {
    chart.traces = plotlyPlot.data
    chart.layout = plotlyPlot.layout
    

    axesPanel ( chart, axisType, prefix )

    // Set traces xaxis and yaxis values
    for (const prop in chart.traces) { 
      if ( chart.traces[prop].xaxis ) document.getElementById ( `${prefix}__traces[${prop}][xaxis]` ).value = chart.traces[prop].xaxis
      if ( chart.traces[prop].yaxis )  document.getElementById ( `${prefix}__traces[${prop}][yaxis]` ).value = chart.traces[prop].yaxis
    }

    await localForage.setItem( 'chart', chart )

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

  } catch (error) {

    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)

  } 

}

export default axisHandler
