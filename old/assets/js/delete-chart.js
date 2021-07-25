import Swal from 'sweetalert2'
import localForage from 'localforage'
import fetchData from "./fetch-data"
import { displayAdminMessage } from "./utilities"

const deleteChart = async function ( chartId, wpRestUrl, wpRestNonce, prefix ) {

  Swal.fire({
    title: 'Are you sure?',
    text: "You will not be able to recover this axis!",
    // icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD2C00',
    cancelButtonColor: '#4f5b62',
    confirmButtonText: 'Delete'
  }).then( async ( result ) => {
    if (result.isConfirmed) {

      try {

        // Get chart Id
        // const chartId = event.target.closest(".card__delete-chart").dataset.chartId
        if ( ! chartId ) throw new Error(  `Chart ID is required` )

        let charts = await localForage.getItem( 'charts')
        let sheets = await localForage.getItem( 'sheets')

      
        charts = charts.filter( element => element.params.chartId != chartId)
        sheets = sheets.filter( element => element.chartId != chartId)

        // Update database
        await fetchData( wpRestUrl, "POST", wpRestNonce, JSON.stringify(charts) )

        await localForage.setItem( "charts", charts )
        await localForage.setItem( "sheets", sheets )


        console.log(charts)
        
        // Remove chart card
        const card = document.getElementById(`${prefix}__chart__${chartId}__card`)
        document.querySelector(`#${prefix}__admin .chart-library__content`).removeChild( card ) 
      
      } catch (error) {

        displayAdminMessage(error.message, "error",  prefix)
        console.log("CAUGHT ERROR", error)
    
      } 
    }
  })

}

export default deleteChart;
