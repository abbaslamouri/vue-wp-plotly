import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import ScatterTrace from './ScatterTrace'
import PieTrace from './PieTrace'
import tracesPanel from "./traces-panel"
import { displayAdminMessage, commaSeparatedToNumberArr, commaSeparatedToStringArr } from './utilities'

const traceHandler = async ( keyParts, value, prefix  ) => {

  try {

    let plotlyPlot = {}

    let chart = await localForage.getItem( 'chart')
    let spreadsheet = await localForage.getItem( 'spreadsheet')
    if ( ! Object.keys(chart).length || ! Object.keys(spreadsheet).length ) throw new Error( `Either chart or spreadsheet missing` )

    const traceNumber = keyParts.shift()
    const optionKey = keyParts.join('.')

    if (optionKey === 'type') {
      if ( ! ['scatter', 'pie', 'bar', 'table'].includes( value ) )  return

      const sheet = spreadsheet[chart.params.sheetId]

      switch ( value ) {
        case 'scatter':
          chart.traces[traceNumber] = ScatterTrace.defaultOptions( traceNumber, Object.values(sheet["labels"])[traceNumber], sheet.data[0], sheet.data[traceNumber+1] )
          break

        case 'pie':
          chart.traces[traceNumber] = PieTrace.defaultOptions( traceNumber, Object.values(sheet["labels"])[traceNumber], sheet.data[0], sheet.data[traceNumber+1])
          break
      }

      plotlyPlot = await Plotly.react(`${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config)
      tracesPanel( chart, spreadsheet, prefix )

       // Add range slider event handler
      eval(`${prefix}__plotlyChart`).on('plotly_relayout', async(eventData) => {

        // Bail if ecentData does not include xaxis
        if ( ! chart.params.enableMinMaxAvgTable || Object.keys(eventData)[0] !== 'xaxis.range' ) return
        
        const cellValues = minMaxRangesliderHandler( chart, chart.layout.xaxis.range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

        await Plotly.restyle(`${prefix}__plotlyChart`, {'cells.values' : [cellValues]}, chart.traces.length-1)
      
        document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
        document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )

        await localForage.setItem( "chart", chart )

      })
        
    } else {

      switch (optionKey) {

        // case 'type':
        // if ( ! ['scatter', 'pie', 'bar', 'table'].includes( value ) ) break
        // console.log("Y")
        // tracesPanel( chart, spreadsheet, prefix )

          // break

        // case 'legendrank':
        //   value = parseInt( value )
        //   break

        case 'domain.x':
        case 'domain.y':
          value = value ? commaSeparatedToNumberArr( value ) : null
          break

        case 'visible':
          value = 'true' === value ? true : 'false' === value ? false : value
          break

        case 'text':
        case 'hovertext':
          value = value.includes(',') ? commaSeparatedToStringArr( value ) : value
          break

        case 'error_y.array':
        case 'error_y.arrayminus':
          // value = value.includes(',') ? value.toString().split(',').map( item => parseFloat( item ) )]
          value = value ? commaSeparatedToNumberArr( value ) : null
          break

        case 'columnwidth':
          value = value ? commaSeparatedToNumberArr( value ) : null
          break

        default:

          break

      }

      plotlyPlot = await Plotly.restyle(`${prefix}__plotlyChart`, { [`${optionKey}`]: [value]}, traceNumber)
      console.log(value)
      // chart.traces[traceNumber][optionKey] = value

    }

    chart.traces = plotlyPlot.data
    chart.layout = plotlyPlot.layout









    const trace =chart.traces[traceNumber]

    // document.getElementById(`${prefix}__traces[${traceNumber}][showlegend]`).disabled = false === trace.visible ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][name]`).disabled =  false === trace.visible || ! trace.showlegend  ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][opacity]`).disabled =  false === trace.visible ? true : false

    // document.getElementById(`${prefix}__traces[${traceNumber}][text]`).disabled = true !== trace.visible ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][textposition]`).disabled = true !== trace.visible || ! trace.text ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][textfont][family]`).disabled = true !== trace.visible|| ! trace.text ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][textfont][color]`).disabled = true !== trace.visible|| ! trace.text ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][textfont][size]`).disabled = true !== trace.visible|| ! trace.text ? true : false

    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverinfo]`).disabled = true !== trace.visible ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][bgcolor]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][bordercolor]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][align]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][namelength]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][font][family]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][font][size]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false
    // document.getElementById(`${prefix}__traces[${traceNumber}][hoverlabel][font][color]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false

    switch (chart.params.chartType) {

      case 'scatter':
        // document.getElementById(`${prefix}__traces[${traceNumber}][mode]`).disabled =  false === trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][xaxis]`).disabled =  false === trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][yaxis]`).disabled =  false === trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][connectgaps]`).disabled =  false === trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][symbol]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][size]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][opacity]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][color]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][gradient][type]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][gradient][color]`).disabled = false === chart.traces.visible || ! trace.mode.includes( 'markers' ) || trace.marker.gradient.type === 'none' ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][line][width]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][line][color]`).disabled = false === trace.visible || ! trace.mode.includes( 'markers' ) ||  parseInt(trace.marker.line.width) === 0 ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][maxdisplayed]`).disabled = true !== trace.visible || ! trace.mode.includes( 'markers' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][shape]`).disabled = true !== trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][width]`).disabled = false === trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][color]`).disabled = false === trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][dash]`).disabled = false === trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][smoothing]`).disabled = true !== trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][line][simplify]`).disabled = true !== trace.visible || ! trace.mode.includes( 'lines' ) ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][visible]`).disabled = true !== trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][type]`).disabled = true !== trace.visible  || ! trace.error_y.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][symmetric]`).disabled = true !== trace.visible  || ! trace.error_y.visible  ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][value]`).disabled = true !== trace.visible  || ! trace.error_y.visible || trace.error_y.type === 'data' ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][valueminus]`).disabled = true !== trace.visible  || ! trace.error_y.visible || trace.error_y.type === 'data' || trace.error_y.symmetric ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][array]`).disabled = true !== trace.visible  || ! trace.error_y.visible || trace.error_y.type !== 'data' ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][arrayminus]`).disabled = true !== trace.visible  || ! trace.error_y.visible || trace.error_y.type !== 'data'  || trace.error_y.symmetric ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][color]`).disabled = true !== trace.visible  || ! trace.error_y.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][thickness]`).disabled = true !== trace.visible  || ! trace.error_y.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][error_y][width]`).disabled = true !== trace.visible  || ! trace.error_y.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][hovertext]`).disabled = true !== trace.visible || 'skip' === trace.hoverinfo || 'none' === trace.hoverinfo ? true : false

        break

      case 'pie':
        // document.getElementById(`${prefix}__traces[${traceNumber}][title][text]`).disabled = true !== trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][title][font][family]`).disabled = true !== trace.visible || ! trace.title.text ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][title][font][color]`).disabled = true !== trace.visible || ! trace.title.text ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][title][font][size]`).disabled = true !== trace.visible || ! trace.title.text ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][title][position]`).disabled = true !== trace.visible || ! trace.title.text ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][line][width]`).disabled = false === trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][marker][line][color]`).disabled = false === trace.visible ||  parseInt(trace.marker.line.width) === 0 ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][pull]`).disabled = true !== trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][hole]`).disabled = true !== trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][sort]`).disabled = true !== trace.visible ? true : false
        // document.getElementById(`${prefix}__traces[${traceNumber}][automargin]`).disabled = true !== trace.visible ? true : false

        break




    }

    await localForage.setItem( "chart", chart )
    console.log('chart', chart)



  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }



}



export default traceHandler
