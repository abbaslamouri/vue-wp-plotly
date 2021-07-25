import Accordion from 'accordion-js'
import 'accordion-js/dist/accordion.min.css'
import capitalize from 'lodash.capitalize'
import ScatterTrace from './ScatterTrace'
import TableTrace from './TableTrace'
import PieTrace from './PieTrace'
import { createPanel, createPanelSections, setSelectFieldOptions, fetchAxisOptions } from "./utilities"


const tracesPanel = function ( chart, spreadsheet, prefix ) {

  document.querySelector(`#${prefix}__admin .tracesAc .accordion`).innerHTML = ""

  const tracesAccordionDiv = document.querySelector( `#${prefix}__admin .traces__Accordion`)
  tracesAccordionDiv.innerHTML = ""

  for (const prop in chart.traces) {

    // Create a trace panel and add it to traces accordion
    tracesAccordionDiv.appendChild( createPanel(  `traces${prop}Ac`, chart.traces[prop].name, "" ) )

    // Create level3 accordion inside new trace panel
    const level3AccordionDiv = document.createElement("div")
    level3AccordionDiv.classList.add("accordion", "accordion__level-3", `traces${prop}__Accordion`)
    document.querySelector( `#${prefix}__admin .traces${prop}Ac .ac-panel `).appendChild( level3AccordionDiv )

    // Create a section container
    const sectionsContainer = document.querySelector( `#${prefix}__admin .traces${prop}__Accordion`)

    // Create panel sections
    switch ( chart.traces[prop].type ) {
      
      case "scatter":
        createPanelSections( ScatterTrace.sections( chart.traces[prop], prop, Object.values( spreadsheet[chart.params.sheetId]["labels"] )[prop] ), sectionsContainer, `traces${prop}`, prefix )
        setSelectFieldOptions ( document.getElementById ( `${prefix}__traces[${prop}][xaxis]` ), fetchAxisOptions ( chart.layout, "xaxis", capitalize ), 'Select X-Axis' )
        setSelectFieldOptions ( document.getElementById ( `${prefix}__traces[${prop}][yaxis]` ), fetchAxisOptions (chart.layout, "yaxis", capitalize), 'Select Y-Axis' )
        
        break

      case "pie":
        createPanelSections( PieTrace.sections( chart.traces[prop], i, Object.values( spreadsheet[chart.params.sheetId]["labels"] )[prop] ), sectionsContainer, `traces${prop}`, prefix )
        break

      case "table":
        createPanelSections( TableTrace.sections( chart.traces[prop], prop, Object.values( spreadsheet[chart.params.sheetId]["labels"] )[prop] ), sectionsContainer, `traces${prop}`, prefix )
        break

    }

    // Create section accordion
    new Accordion( `#${prefix}__admin .traces${prop}__Accordion`, { duration: 400 })
    
  }

  // Create traces accordion
  document.querySelector(`#${prefix}__admin .tracesAc`).classList.remove( "hidden" )

  console.log('CT', chart.traces)


  // Set traces xaxis and yaxis values
  for (const prop in chart.traces) { 
    if ( chart.traces[prop].xaxis ) document.getElementById ( `${prefix}__traces[${prop}][xaxis]` ).value = chart.traces[prop].xaxis
    if ( chart.traces[prop].yaxis )  document.getElementById ( `${prefix}__traces[${prop}][yaxis]` ).value = chart.traces[prop].yaxis
  }
  
  new Accordion( tracesAccordionDiv, { duration: 400 } )


}

export default tracesPanel
