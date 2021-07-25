import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import drawChart from './draw-chart'
import ScatterTrace from './ScatterTrace'
import TableTrace from './TableTrace'
import { displayAdminMessage, setChartTraces } from './utilities'

const sheetHandler = async ( sheetId, mainAccordion, prefix ) => {

  try {

    let chart = await localForage.getItem( 'chart')
    const spreadsheet = await localForage.getItem( 'spreadsheet')

    // set params sheet id
    chart.params.sheetId = sheetId

    // get min/max/avg/ checkbox
    chart.params.enableMinMaxAvgTable = document.getElementById(`${prefix}__params[enableMinMaxAvgTable]`).checked

    chart = setChartTraces(chart, ScatterTrace, TableTrace, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound)

    // // Unhide file name, file id and chart id input fields
    // document.getElementById( `${prefix}__params[fileName]` ).closest('.field-group' ).classList.remove ( 'hidden' )
    // document.getElementById( `${prefix}__params[sheetId]` ).closest('.field-group' ).classList.remove ( 'hidden' )
    // document.getElementById( `${prefix}__params[chartId]` ).closest('.field-group' ).classList.remove ( 'hidden' )
    // document.getElementById( `${prefix}__params[enableMinMaxAvgTable]` ).closest('.field-group' ).classList.remove ( 'hidden' )

    document.querySelector( `#${prefix}__admin .edit-chart__chart-view .warning` ).classList.add( `hidden` )
    document.querySelector( `#${prefix}__admin .edit-chart__chart-view .plotly` ).classList.remove( 'hidden' )

    // draw chart
    await drawChart ( chart, spreadsheet, prefix )




    // Close main accordion
    mainAccordion.closeAll()

  } catch (error) {
    displayAdminMessage(error.message, 'error',  prefix)
    console.log('CAUGHT ERROR', error)
  }

}

export default sheetHandler
