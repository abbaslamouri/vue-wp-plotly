import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import Annotation from "./Annotation"
import annotationsPanels from "./annotations-panels"
import {  minMaxRangesliderHandler } from "./utilities"


const annotationsHandler =  async( prefix ) => {

  let chart = await localForage.getItem( 'chart')
  if ( ! Object.keys(chart).length  ) throw new Error( `Chart missing` )

  let spreadsheet = await localForage.getItem( 'spreadsheet') 
  if ( ! Object.keys(spreadsheet).length ) throw new Error( `Spreadsheet missing` )
 
 
  const index = chart.layout.annotations === undefined ? 0 : chart.layout.annotations.length
  chart.layout.annotations[index] = Annotation.defaultOptions()
  chart.layout.annotations[index].x = chart.layout.xaxis.range[0] +  (chart.layout.annotations.length )*(( chart.layout.xaxis.range[1] - chart.layout.xaxis.range[0])/10)
  chart.layout.annotations[index].y = ( chart.layout.yaxis.range[1] + chart.layout.yaxis.range[0])/2
  await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )       
  annotationsPanels( chart, prefix )

  await localForage.setItem( 'chart', chart )

  // Add range slider event handler
  eval(`${prefix}__plotlyChart`).on('plotly_relayout',function(eventData){

    if (chart.params.enableMinMaxAvgTable) minMaxRangesliderHandler( chart, eventData, spreadsheet, Plotly, arrayMin, arrayMax, arrayMean, floatRound, `${prefix}__plotlyChart`, prefix  )

  })




  return chart

}

export default annotationsHandler
