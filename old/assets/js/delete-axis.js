import Plotly from 'plotly.js-dist'
// import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { displayAdminMessage, chartOptionKey } from "./utilities"

const deleteAxis = async function (chart, targetId, prefix) {

  try {

    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to recover this axis!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD2C00',
      cancelButtonColor: '#4f5b62',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
         // Bail if there are no chart tr
         if ( ! chart || ! targetId ) throw new Error(  `A chart and an ID are required` )

         const key = chartOptionKey(targetId).key
 
         // Bail if key is null
         if ( ! key  ) throw new Error(  `Invalid key` )
 
         Plotly.purge(`${prefix}__plotlyChart`)
         delete chart.layout[key]
         Plotly.plot( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config ).then( ( ) => {
           
           document.getElementById( targetId ).closest(".ac").remove()
           
           displayAdminMessage("Annotation deleted successfully", "success",  prefix) 
        })    
      }
    })

    // swal({
    //   title: "Are you sure?",
    //   text: "You will not be able to recover this ",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then(async (willDelete) => {
    //   if (willDelete) {

    //     // Bail if there are no chart tr
    //     if ( ! chart || ! targetId ) throw new Error(  `A chart and an ID are required` )

    //     const key = chartOptionKey(targetId).key

    //     // Bail if key is null
    //     if ( ! key  ) throw new Error(  `Invalid key` )

    //     Plotly.purge(`${prefix}__plotlyChart`)
    //     delete chart.layout[key]
    //     Plotly.plot( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config ).then( ( ) => {
          
    //       document.getElementById( targetId ).closest(".ac").remove()
          
    //       displayAdminMessage("Annotation deleted successfully", "success",  prefix) 
    //    })    

    //   } 
      
    // })

    

  } catch (error) {

    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)

  } 

}

export default deleteAxis;
