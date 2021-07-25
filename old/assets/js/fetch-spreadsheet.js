import fetchData from "./fetch-data"
import { displayAdminMessage, trimArray } from "./utilities"

const fetchSpreadsheet = async function ( chart, wpRestUrl, wpRestNonce, prefix ) {

  try {

     // Fetch spreadsheet
     const spreadsheet = await fetchData(`${wpRestUrl}/${chart.params.fileId}`, "GET", wpRestNonce, null, prefix )

      // trim leading and trailing empty elements from spreadsheet
      for ( const prop in spreadsheet ) {
       for (const index in spreadsheet[prop].data) {
         const traceData = trimArray(spreadsheet[prop].data[index])
         if ( traceData.length === 0 ) {
           delete spreadsheet[prop].data.splice(index,1)
           delete spreadsheet[prop].labels.splice(index,1)
         } else {
          spreadsheet[prop].data[index] = trimArray(spreadsheet[prop].data[index])
         }
       }
     }


    return spreadsheet

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default fetchSpreadsheet
