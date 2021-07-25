import Plotly from 'plotly.js-dist'
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import capitalize from 'lodash.capitalize'
import ChartAxis from "./ChartAxis"
import layoutHandler from "./layout-handler"
import { chartOptionKey, createPanel, createPanelSections, createDeleteBtn } from "./utilities"


const axesPanel =  async( chart, axisType, prefix ) => {

  // let deleteBtn = null
  // let axisId = null

  const axesClass =  axisType === "xaxis" ? "xaxes" : axisType === "yaxis" ? "yaxes" : null

  // Reset xaxes panel accordion
  document.querySelector( `#${prefix}__admin .${axesClass}__Accordion`).innerHTML = ""

  // Fetch an array of all xaxes
  const axes = Object.keys(chart.layout).filter( ( prop ) => prop.includes(axisType))

  // const axisType = "xaxis"

  for (let i = 0;  i < axes.length; i++) {

    const axisId = axisType === "xaxis" ?  ! i ? "xaxis" : axes[i]  : axisType === "yaxis" ? ! i ? "yaxis" : axes[i] : null

    // Create axis panel and add it to xaxes accordion
    document.querySelector( `#${prefix}__admin .${axesClass}__Accordion`).appendChild( createPanel(  `${axisId}Ac`, capitalize(axisId), `Here you can modify the options for a new ${axisId}` ) )

     // Create Delete axis button
    if (axisId !== "xaxis" && axisId !== "yaxis")  document.querySelector( `#${prefix}__admin .${axisId}Ac .ac-panel `).appendChild( createDeleteBtn ( "Delete Axis", `.${prefix}__deleteAxis[${axisId}]`, "deleteAxis" ) )

    // Create level3 accordion inside new annotation panel
    const level3AccordionDiv = document.createElement("div")
    level3AccordionDiv.classList.add("accordion", "accordion__level-3", `${axisId}__Accordion`)
    document.querySelector( `#${prefix}__admin .${axisId}Ac .ac-panel `).appendChild( level3AccordionDiv )

    const sectionsContainer = document.querySelector( `#${prefix}__admin .${axisId}__Accordion`)
  
    createPanelSections( ChartAxis.sections( chart.layout, axisId, chart.layout[axisId].side, chart.layout[axisId].overlaying, chart.layout[axisId].title.text, chart.layout[axisId].matches  ), sectionsContainer, axisId, prefix )
  
    new Accordion( `#${prefix}__admin .${axisId}__Accordion`, { duration: 400 })

  }

  // Create traces accordion
  document.querySelector(`#${prefix}__admin .main__Accordion .${axesClass}Ac`).classList.remove( "hidden" )

  new Accordion( `#${prefix}__admin .${axesClass}__Accordion`, { duration: 400 } )
  
}

export default axesPanel
