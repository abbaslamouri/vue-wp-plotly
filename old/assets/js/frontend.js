import Plotly from 'plotly.js-dist'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import "../sass/frontend.scss"
import { addRangeMinMaxInputs, minMaxRangesliderHandler } from "./utilities"

if (  yrl_wp_plotly_charts__plotlyChart ) {

  console.log(yrl_wp_plotly_charts__plotlyChart)

  const yrlPlotlyChartsObj = yrl_wp_plotly_charts__plotlyChart
  const chart = yrlPlotlyChartsObj.chart
  const spreadsheet = yrlPlotlyChartsObj.spreadsheet
  const prefix = yrlPlotlyChartsObj.prefix

  // drawChart ( chart, spreadsheet, prefix )
  if ( document.getElementById( `${prefix}__plotlyChart__${chart.params.chartId}` ) ) {

    Plotly.newPlot( `${prefix}__plotlyChart__${chart.params.chartId}`, chart.traces, chart.layout, chart.config ) .then( ( ) => {

      if (chart.params.enableMinMaxAvgTable) addRangeMinMaxInputs( chart, Plotly, floatRound, `${prefix}__plotlyChart__${chart.params.chartId}`, prefix )

      // Add range slider event handler
      eval(`${prefix}__plotlyChart__${chart.params.chartId}`).on('plotly_relayout', async (eventData) => {

         // Bail if ecentData does not include xaxis
        if ( ! chart.params.enableMinMaxAvgTable || Object.keys(eventData)[0] !== 'xaxis.range' ) return
        
        const cellValues = minMaxRangesliderHandler( chart, chart.layout.xaxis.range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

        await Plotly.restyle(`${prefix}__plotlyChart__${chart.params.chartId}`, {'cells.values' : [cellValues]}, chart.traces.length-1)
      
        document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
        document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )


        // await localForage.setItem( "chart", chart )

        // if (chart.params.enableMinMaxAvgTable) minMaxRangesliderHandler( chart, eventData, spreadsheet, Plotly, arrayMin, arrayMax, arrayMean, floatRound, `${prefix}__plotlyChart__${chart.params.chartId}`, prefix  )

      } )
    } )
  }

  
  
}


