import Plotly from 'plotly.js-dist'
import Swal from 'sweetalert2'
import localForage from 'localforage'
import cloneDeep from 'lodash.clonedeep'
import drawChart from './draw-chart'
import fetchData from "./fetch-data"
import fetchSpreadsheet from './fetch-spreadsheet'
import { setSelectFieldOptions, createChartCard, displayAdminMessage, fetchChartListDefaultOptions } from "./utilities"
import {  } from "./utilities"

const listCharts = async function ( charts, sheets, pluginUrl, shortcodeText, wpRestUrl, wpRestNonce, mainAccordion, prefix) {

  // Update database
  // const payload = await fetchData( wpRestUrl, "GET", wpRestNonce )

  // const charts = payload.charts
  // const sheets = payload.sheets

  await localForage.setItem('charts', charts)
  await localForage.setItem('sheets', sheets)

  if ( ! charts.length ) {
    document.querySelector( `#${prefix}__admin .chart-library__content` ).innerHTML = "<div class='no-charts'> There are no charts to display</div>"
    return
  }

  // Clone charts
  const newCharts = cloneDeep( charts )

  document.querySelector(`#${prefix}__admin .chart-library__content`).innerHTML = ""

  for ( const prop in newCharts ) {
    createChartCard(newCharts[prop], pluginUrl, shortcodeText, `#${prefix}__admin .chart-library__content`, prefix)
    newCharts[prop] = fetchChartListDefaultOptions( newCharts[prop], sheets[prop] )
    await Plotly.newPlot(`${prefix}__chart__${newCharts[prop].params.chartId}`, newCharts[prop].traces, newCharts[prop].layout, newCharts[prop].config)
  }



  // // Add edit chart event listener
  // document.querySelectorAll( `#${prefix}__admin .card__edit-chart`).forEach( ( element ) => {

  //   element.addEventListener("click", async function (event) {  
  //     event.preventDefault()
    
  //     try {
    
  //        // Get chart Id and edit chart
  //       const chartId = event.target.closest('.card__edit-chart').dataset.chartId

  //       // Bail if no chart id is provided
  //       if ( ! chartId ) throw new Error(  `A chart id is required` )

  //       // Retrieve chart
  //       const chart = charts.filter(element => element.params.chartId == chartId)[0]

  //       mainAccordion.close(0)
  //       Plotly.purge(`${prefix}__plotlyChart`)
      
  //       document.querySelector(`#${prefix}__admin .edit-chart`).classList.remove("hidden")
  //       document.querySelector( `#${prefix}__admin .warning` ).classList.add( `hidden` )
  //       document.querySelector( `#${prefix}__admin .loading` ).classList.remove( `hidden` )
       
  //       // Fetch spreadsheet
  //       const spreadsheet = await fetchSpreadsheet ( chart, wpRestUrl, wpRestNonce )
  //       localStorage.setItem("spreadsheet", JSON.stringify(spreadsheet))
    
  //       // Set sheet select field options array
  //       setSelectFieldOptions( document.getElementById( `${prefix}__params[sheetId]` ), spreadsheet.map( el  => el.sheetName ) )
    
  //       document.getElementById( `${prefix}__params[fileName]` ).value = chart.params.fileName
  //       document.getElementById( `${prefix}__params[fileId]` ).value = chart.params.fileId
  //       document.getElementById( `${prefix}__params[chartId]` ).value = chart.params.chartId
  //       document.getElementById( `${prefix}__params[sheetId]` ).value = chart.params.sheetId
  //       document.getElementById( `${prefix}__params[fileName]` ).closest( ".field-group" ).classList.remove( "hidden" )
  //       document.getElementById( `${prefix}__params[sheetId]` ).closest( ".field-group" ).classList.remove( "hidden" )
  //       document.getElementById( `${prefix}__params[chartId]` ).closest( ".field-group" ).classList.remove( "hidden" )
  //       document.querySelector( `#${prefix}__admin .loading` ).classList.add( `hidden` )
    
  //       // Draw chart
  //       await drawChart ( chart, spreadsheet, prefix )

  //       localStorage.setItem("chart", JSON.stringify(chart))
  //       localStorage.setItem("chartUpdated", false)
    
  //       console.log("CHART", chart)
    
  //     } catch (error) {
    
  //       displayAdminMessage(error.message, "error",  prefix)
  //       console.log("CAUGHT ERROR", error)
    
  //     } 

  //   })

  // })




  // document.querySelectorAll( `#${prefix}__admin .card__delete-chart`).forEach( ( element ) => {
  //   element.addEventListener("click", async function (event) {  
  //     event.preventDefault()

  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You will not be able to recover this axis!",
  //       // icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#DD2C00',
  //       cancelButtonColor: '#4f5b62',
  //       confirmButtonText: 'Delete'
  //     }).then( async ( result ) => {
  //       if (result.isConfirmed) {

  //         try {

  //           // Get chart Id
  //           const chartId = event.target.closest(".card__delete-chart").dataset.chartId
  //           if ( ! chartId ) throw new Error(  `Chart ID is required` )
          
  //           charts = charts.filter( element => element.params.chartId != chartId)
  //           sheets = sheets.filter( element => element.chartId != chartId)

  //           // Update database
  //           await fetchData( wpRestUrl, "POST", wpRestNonce, JSON.stringify(charts) )
            
  //           // Remove chart card
  //           const card = document.getElementById(`${prefix}__chart__${chartId}__card`)
  //           document.querySelector(`#${prefix}__admin .chart-library__content`).removeChild( card ) 
          
  //         } catch (error) {
    
  //           displayAdminMessage(error.message, "error",  prefix)
  //           console.log("CAUGHT ERROR", error)
        
  //         } 
  //       }
  //     })

  //   })

  // })

}

export default listCharts;
