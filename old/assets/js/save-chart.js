import localForage from 'localforage'
import fetchData from "./fetch-data"
import listCharts from "./list-charts"
import { displayAdminMessage } from "./utilities"

const saveChart = async function ( pluginUrl, shortcodeText, wpRestUrl, wpRestNonce, mainAccordion, prefix ) {
  

  try {

    let chart = await localForage.getItem( 'chart')
    let charts = await localForage.getItem( 'charts')
    let sheets = await localForage.getItem( 'sheets')
    let spreadsheet = await localForage.getItem( 'spreadsheet') 
  
    if ( ! Object.keys(chart).length || ! Object.keys(spreadsheet).length ) throw new Error( `Either chart or spreadsheet missing` )
    if ( ! Object.values(chart.traces).length || ! chart.params.fileId || ! chart.params.sheetId ) throw new Error(  `Chart traces as well as a file name and a sheet ID are required to save a chart` )

    document.querySelector(`#${prefix}__admin .edit-chart`).classList.add("hidden")

    // get chart id
    if ( chart.params.chartId === null ) { // There is a chart Id (edit)
      chart.params.chartId = ! charts.length ? 16327 : charts[charts.length-1].params.chartId + 1
    } else {
      charts = charts.filter( element => element.params.chartId !== chart.params.chartId )
      sheets = sheets.filter( elementy => elementy.chartId !== chart.params.chartId )
    }
    charts.push( chart )
    sheets.push( {chartId: chart.params.chartId, sheet: spreadsheet[chart.params.sheetId]} )
    
    // Save charts
    const jsonRes = await fetchData( wpRestUrl, "POST", wpRestNonce, JSON.stringify(charts), prefix )

    if ( ! Object.keys( jsonRes ).length  ) throw new Error(  `Something went terribly wrong. Chart may not have been saved` )

    // Remove the no-chart div it it exists
    if ( document.querySelector(`#${prefix}__admin .no-charts`) ) document.querySelector(`#${prefix}__admin .no-charts`).remove()

    // List all charts
    await listCharts( charts, sheets, pluginUrl, shortcodeText, wpRestUrl, wpRestNonce, mainAccordion, prefix)

    await localForage.setItem( 'charts', charts )
    await localForage.setItem( 'sheets', sheets )
    await localForage.removeItem( 'chart' )
    await localForage.removeItem( 'spreadsheet' )
    await localForage.removeItem( 'chartUpdated' )

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default saveChart;
