import Plotly from 'plotly.js-dist'
import localForage from 'localforage'
import arrayMin from 'lodash.min'
import arrayMax from 'lodash.max'
import arrayMean from 'lodash.mean'
import floatRound from 'lodash.round'
import { displayAdminMessage, minMaxRangesliderHandler, commaSeparatedToNumberArr, commaSeparatedToStringArr } from './utilities'

const layoutHandler = async ( key, keyParts, value, prefix  ) => {

  try {

    let chart = await localForage.getItem( 'chart')
    if ( ! Object.keys(chart).length ) throw new Error( `Chart missing` )

    let spreadsheet = await localForage.getItem( 'spreadsheet') 
    if ( ! Object.keys(spreadsheet).length ) throw new Error( `Spreadsheet missing` )

    let update = {}
    let plotlyPlot = {}

    if ( keyParts[0].includes( "axis") && keyParts[1] == "domain" )  {
      if (value) {
        value = value.split(",").map( ( item ) => { return parseFloat( item ) } )
        update = { [`${key}`]: value}
        plotlyPlot = await Plotly.relayout( `${prefix}__plotlyChart`, update)
      }
    } else if ( key === 'width' || key === 'height') {
      chart.layout[key] = value 
      plotlyPlot = await Plotly.react( `${prefix}__plotlyChart`, chart.traces, chart.layout, chart.config )//.then( ( ) => {

      // Add range slider event handler
      eval(`${prefix}__plotlyChart`).on('plotly_relayout', async (eventData) => {

        // Bail if ecentData does not include xaxis
        if ( ! chart.params.enableMinMaxAvgTable || Object.keys(eventData)[0] !== 'xaxis.range' ) return
            
        const cellValues = minMaxRangesliderHandler( chart, chart.layout.xaxis.range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

        await Plotly.restyle(`${prefix}__plotlyChart`, {'cells.values' : [cellValues]}, chart.traces.length-1)

        document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
        document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )

        await localForage.setItem( "chart", chart )

      })
    } else {

      switch(key) {

        // case "width":
        // case "height":
        //   value = value ? value : null
        //   update = { [key]: value }
        // break

        // case "hovermode":
        //   value = "false" === value ? false : "true" === value ? true : value
        //     update = { ["hovermode"]: value }
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        // break

        // case "xaxis.visible":
        //   if ( value ){
        //     update = {["xaxis.visible"]: true}
        //   } else {
        //     update = {["xaxis.visible"]: false}
        //   }
        //   Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   // document.getElementById(`${prefix}__layout[xaxis2][visible]`).checked = value
        // break

        // case "xaxis2.visible":
        //   if ( value ){
        //     update = {["xaxis2.visible"]: true}
        //   } else {
        //     update = {["xaxis2.visible"]: false}
        //   }
        //   Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   document.getElementById(`${prefix}__layout[xaxis][visible]`).checked = value
        // break

        // case "xaxis.autorange":
        //   value = "false" === value ? false : "true" === value ? true : value
        //   if ( false !== value ){
        //     update = { ["xaxis.autorange"]: value, ["xaxis.range"]: null }
        //     chart.layout.xaxis.range = []
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   } else {
        //     update = { ["xaxis.autorange"]: false }
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //     // document.getElementById(`${prefix}__layout[xaxis][range]`).value = null
        //   }
        //   document.getElementById(`${prefix}__layout[xaxis][range]`).value = chart.layout.xaxis.range.join()
        // break

        case "xaxis.range":
          value = value ? commaSeparatedToNumberArr( value ) : null 
          update = { [`${key}`]: value}          
        break

        // case "xaxis.tickvals":             
        //   value = value.split(",").map( ( item ) => { return parseFloat( item ) } )
        //   console.log(value)

        //   // if ( isNaN( value[value.length-1] ) ) value.pop()
        //   // if ( Array.isArray( value ) ) {
        //     update = { ["xaxis.tickvals"]: value}
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   // }
        //   // document.getElementById(`${prefix}__layout[xaxis][tickvals]`).value = value.join()
        // break

        // case "xaxis.ticktext":
        //   value = value.split(",").map( ( item ) => { return item === "" ? null : item  } )
        //   console.log(value)

        //   // if ( ! value[value.length-1]  ) value.pop()
        //   // if ( Array.isArray( value ) ) {
        //     // if ( value.length > chart.layout.xaxis.tickvals.length  ) value.pop()
        //     update = { ["xaxis.ticktext"]: value}
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   // }
        //   // document.getElementById(`${prefix}__layout[xaxis][ticktext]`).value = value.join()

        // break

        // case "xaxis.tickmode":             
        //   if ( value === "linear" ) {
        //     update = { ["xaxis.tickmode"]: value , ["xaxis.tick0"]: chart.layout.xaxis.range[0],["xaxis.dtick"]: (chart.layout.xaxis.range[1]-chart.layout.xaxis.range[0])/5 }
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //     document.getElementById(`${prefix}__layout[xaxis][tick0]`).value = chart.layout.xaxis.tick0
        //     document.getElementById(`${prefix}__layout[xaxis][dtick]`).value = chart.layout.xaxis.dtick
        //   } else {
        //     update = { ["xaxis.tickmode"]: value }
        //     Plotly.relayout( `${prefix}__plotlyChart`, update)
        //   }
        // break

        // case "xaxis.mirror":
        //   value = "false" === value ? false : "true" === value ? true : value
        //   update = { ["xaxis.mirror"]: value }
        //   Plotly.relayout( `${prefix}__plotlyChart`, update)
        // break

        default:
          update = { [key]: value }
          break

      }

      console.log(update)
      plotlyPlot = await Plotly.relayout( `${prefix}__plotlyChart`, update)
    }

    chart.traces = plotlyPlot.data
    chart.layout = plotlyPlot.layout
    console.log('chart', chart)



    

    // // Title
    // document.getElementById(`${prefix}__layout[title][font][family]`).disabled = ! chart.layout.title.text  ? true : false
    // document.getElementById(`${prefix}__layout[title][font][size]`).disabled = ! chart.layout.title.text  ? true : false
    // document.getElementById(`${prefix}__layout[title][font][color]`).disabled = ! chart.layout.title.text  ? true : false
    // document.getElementById(`${prefix}__layout[title][x]`).disabled = ! chart.layout.title.text  ? true : false
    // document.getElementById(`${prefix}__layout[title][y]`).disabled = ! chart.layout.title.text  ? true : false

    // // Legend
    // document.getElementById(`${prefix}__layout[legend][bgcolor]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][bordercolor]`).disabled = ! chart.layout.showlegend || parseFloat( chart.layout.legend.borderwidth ) === 0 ? true : false
    // document.getElementById(`${prefix}__layout[legend][borderwidth]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][font][family]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][font][size]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][font][color]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][title][text]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][title][font][family]`).disabled = ! chart.layout.showlegend || ! chart.layout.legend.title.text ? true : false
    // document.getElementById(`${prefix}__layout[legend][title][font][size]`).disabled = ! chart.layout.showlegend || ! chart.layout.legend.title.text ? true : false
    // document.getElementById(`${prefix}__layout[legend][title][font][color]`).disabled = ! chart.layout.showlegend || ! chart.layout.legend.title.text ? true : false
    // document.getElementById(`${prefix}__layout[legend][title][side]`).disabled = ! chart.layout.showlegend || ! chart.layout.legend.title.text ? true : false
    // document.getElementById(`${prefix}__layout[legend][orientation]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][itemsizing]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][itemwidth]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][itemclick]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][itemdoubleclick]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][x]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][y]`).disabled = ! chart.layout.showlegend ? true : false
    // document.getElementById(`${prefix}__layout[legend][valign]`).disabled = ! chart.layout.showlegend ? true : false

    // // Hoverlabel
    // document.getElementById(`${prefix}__layout[hoverlabel][bgcolor]`).disabled = ! chart.layout.hovermode ? true : false
    // document.getElementById(`${prefix}__layout[hoverlabel][bordercolor]`).disabled = ! chart.layout.hovermode ? true : false
    // // document.getElementById(`${prefix}__layout[hoverlabel][align]`).disabled = ! chart.layout.hovermode ? true : false
    // // document.getElementById(`${prefix}__layout[hoverlabel][namelength]`).disabled = ! chart.layout.hovermode ? true : false
    // document.getElementById(`${prefix}__layout[hoverlabel][font][family]`).disabled = ! chart.layout.hovermode ? true : false
    // document.getElementById(`${prefix}__layout[hoverlabel][font][size]`).disabled = ! chart.layout.hovermode ? true : false
    // document.getElementById(`${prefix}__layout[hoverlabel][font][color]`).disabled = ! chart.layout.hovermode ? true : false

    

    // // xaxis
    // document.getElementById(`${prefix}__layout[xaxis][type]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][side]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][autotypenumbers]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][autorange]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][fixedrange]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][rangemode]`).disabled = ! chart.layout.xaxis.visible || false === chart.layout.xaxis.autorange || chart.layout.xaxis.type !== "linear" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][anchor]`).disabled = ! chart.layout.xaxis.visible  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][position]`).disabled = ! chart.layout.xaxis.visible ? true : false

    // // document.getElementById(`${prefix}__layout[xaxis][range]`).disabled = ! chart.layout.xaxis.visible || true === chart.layout.xaxis.autorange ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][mirror]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][automargin]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][title][text]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][title][font][family]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.title.text ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][title][font][size]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.title.text  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][title][font][color]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.title.text ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][title][standoff]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.title.text ? true : false

    // document.getElementById(`${prefix}__layout[xaxis][ticks]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickmode]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][nticks]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" || chart.layout.xaxis.tickmode !== "auto" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tick0]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === ""|| chart.layout.xaxis.tickmode !== "linear" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][dtick]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === ""|| chart.layout.xaxis.tickmode !== "linear" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickvals]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" || chart.layout.xaxis.tickmode !== "array" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][ticktext]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" || chart.layout.xaxis.tickmode !== "array" || ! chart.layout.xaxis.tickvals.length ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][ticklen]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickwidth]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickcolor]`).disabled = ! chart.layout.xaxis.visible || chart.layout.xaxis.ticks === "" ? true : false

    // document.getElementById(`${prefix}__layout[xaxis][showticklabels]`).disabled = ! chart.layout.xaxis.visible  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][ticklabelposition]`).disabled = ! chart.layout.xaxis.visible|| ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickfont][family]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickfont][size]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickfont][color]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickangle]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][showtickprefix]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][tickprefix]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels || chart.layout.xaxis.showtickprefix === "none" ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][showticksuffix]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][ticksuffix]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showticklabels || chart.layout.xaxis.showticksuffix === "none" ? true : false

    // document.getElementById(`${prefix}__layout[xaxis][showline]`).disabled = ! chart.layout.xaxis.visible  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][linecolor]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showline ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][linewidth]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showline ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][showgrid]`).disabled = ! chart.layout.xaxis.visible  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][gridcolor]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showgrid ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][gridwidth]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.showgrid ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][zeroline]`).disabled = ! chart.layout.xaxis.visible  ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][zerolinecolor]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.zeroline ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][zerolinewidth]`).disabled = ! chart.layout.xaxis.visible || ! chart.layout.xaxis.zeroline ? true : false

    // document.getElementById(`${prefix}__layout[xaxis][showspikes]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][spikecolor]`).disabled = ! chart.layout.xaxis.showspikes || parseFloat( chart.layout.xaxis.spikethickness ) === 0 ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][spikethickness]`).disabled = ! chart.layout.xaxis.showspikes ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][spikedash]`).disabled = ! chart.layout.xaxis.showspikes ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][spikemode]`).disabled = ! chart.layout.xaxis.showspikes ? true : false

    // document.getElementById(`${prefix}__layout[xaxis][showexponent]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][exponentformat]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][minexponent]`).disabled = ! chart.layout.xaxis.visible ? true : false
    // document.getElementById(`${prefix}__layout[xaxis][separatethousands]`).disabled = ! chart.layout.xaxis.visible ? true : false

    await localForage.setItem( "chart", chart )
    console.log('chart', chart)


  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }
        




}

export default layoutHandler
