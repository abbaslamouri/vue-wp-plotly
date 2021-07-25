import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import BasicOptions from './BasicOptions'
import Title from "./Title"
import Legend from "./Legend"
import Hoverlabel from "./Hoverlabel"
import Modebar from "./Modebar"
import Grid from "./Grid"
import ChartAxis from "./ChartAxis"
import { displayAdminMessage, resetChart } from "./utilities"

const addNewChart = async ( mainAccordion, prefix ) => {

  try {

    resetChart ( Plotly, prefix )
  
    // Unhide chart  and open first accordion panel 
    document.querySelector(`#${prefix}__admin .edit-chart`).classList.remove("hidden")

    const chart = { params: {}, layout: {}, config: {}, traces: [] }

    chart.layout = { ...chart.layout, ...BasicOptions.defaultOptions( ) }
    chart.layout = { ...chart.layout, ...Title.defaultOptions( ) }
    chart.layout = { ...chart.layout, ...Legend.defaultOptions( ) }
    chart.layout = { ...chart.layout, ...Hoverlabel.defaultOptions( ) }
    chart.layout = { ...chart.layout, ...Grid.defaultOptions( ) }
    chart.layout = { ...chart.layout, ...Modebar.defaultOptions( ) }
    chart.layout.xaxis = ChartAxis.defaultOptions( "xaxis", "bottom", null, "Wavelength ( &#181;m )", null ) 
    chart.layout.yaxis = ChartAxis.defaultOptions( "yaxis", "left", null, "Transmittance ( % )", null )

    chart.config.responsive = true
    chart.config.staticPlot = false
    chart.config.displayModeBar = false
    chart.config.displaylogo = false

    mainAccordion.open(0)

    await localForage.setItem( "chart", chart )
    await localForage.setItem( "chartUpdated", false )
    await localForage.setItem( "spreadsheet", [] )

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default addNewChart
