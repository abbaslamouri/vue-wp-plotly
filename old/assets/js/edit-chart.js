import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import drawChart from './draw-chart'
import fetchSpreadsheet from './fetch-spreadsheet'
import { displayAdminMessage, setSelectFieldOptions } from "./utilities"

const editChart = async function ( chartId, wpRestUrl, wpRestNonce, mainAccordion, prefix ) {

  try {

   // Bail if no chart id is provided
   if ( ! chartId ) throw new Error(  `A chart id is required` )

   const charts = await localForage.getItem( 'charts')

   // Retrieve chart
   const chart = charts.filter(element => element.params.chartId == chartId)[0]

   mainAccordion.close(0)
   Plotly.purge(`${prefix}__plotlyChart`)
 
   document.querySelector(`#${prefix}__admin .edit-chart`).classList.remove("hidden")
   document.querySelector( `#${prefix}__admin .warning` ).classList.add( `hidden` )
  //  document.querySelector( `#${prefix}__admin .loading` ).classList.remove( `hidden` )
   document.querySelector( `#${prefix}__admin .loading-spinner` ).classList.remove( `hidden` )
  
   // Fetch spreadsheet
   const spreadsheet = await fetchSpreadsheet ( chart, wpRestUrl, wpRestNonce )
   await localForage.setItem( "spreadsheet", spreadsheet )

   // Set sheet select field options array
   setSelectFieldOptions( document.getElementById( `${prefix}__params[sheetId]` ), spreadsheet.map( el  => el.sheetName ) )

   document.getElementById( `${prefix}__params[fileName]` ).value = chart.params.fileName
   document.getElementById( `${prefix}__params[fileId]` ).value = chart.params.fileId
   document.getElementById( `${prefix}__params[chartId]` ).value = chart.params.chartId
   document.getElementById( `${prefix}__params[sheetId]` ).value = chart.params.sheetId
   document.getElementById( `${prefix}__params[fileName]` ).closest( ".field-group" ).classList.remove( "hidden" )
   document.getElementById( `${prefix}__params[sheetId]` ).closest( ".field-group" ).classList.remove( "hidden" )
   document.getElementById( `${prefix}__params[chartId]` ).closest( ".field-group" ).classList.remove( "hidden" )
  //  document.querySelector( `#${prefix}__admin .loading` ).classList.add( `hidden` )
   document.querySelector( `#${prefix}__admin .loading-spinner` ).classList.add( `hidden` )
   console.log(document.querySelector( `#${prefix}__admin .edit-chart__chart-view .plotly` ).classList)
   document.querySelector( `#${prefix}__admin .edit-chart__chart-view .plotly` ).classList.remove( `hidden` )

   // Draw chart
   await drawChart ( chart, spreadsheet, prefix )

   await localForage.setItem( "chart", chart )
   await localForage.setItem( "chartUpdated", false )

   mainAccordion.closeAll()

 } catch (error) {

   displayAdminMessage(error.message, "error",  prefix)
   console.log("CAUGHT ERROR", error)

 } 

}

export default editChart
