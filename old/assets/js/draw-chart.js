import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import panels from './panels'
import { addRangeMinMaxInputs, minMaxRangesliderHandler } from './utilities'

const drawChart = async( chart, spreadsheet, prefix ) => {
  
  // Draw charts
  const plotlyPlot = await Plotly.newPlot( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )//.then( ( ) => {
  chart.traces = plotlyPlot.data
  chart.layout = plotlyPlot.layout
  
  // build chart options field panels
  panels( chart, spreadsheet, prefix )

  // Enable save button  // Add click event listener to the chart params panel inoput fields
  document.getElementById( `${prefix}__saveChart` ).disabled = false
  document.getElementById( `${prefix}__saveChart` ).classList.remove('hidden')
  document.querySelector( `#${prefix}__admin .edit-chart__chart-view .loading-spinner` ).classList.add(`hidden`)

  if (chart.params.enableMinMaxAvgTable) addRangeMinMaxInputs( chart, Plotly, floatRound, `${prefix}__plotlyChart`, prefix )

  await localForage.setItem( "chart", chart )
  await localForage.setItem("chartUpdated", true)

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

}


export default drawChart


 