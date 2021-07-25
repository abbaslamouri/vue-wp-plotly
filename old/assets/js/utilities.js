const fontFamily = () => {

  return {

    // "" : "Select Font Family",
    Arial : "Arial",
    Valto: "Balto",
    "Times New Roman": "Times New Roman",
    "Courier New": "Courier New",
    "Droid Sans": "Droid Sans",
    "Droid Serif": "Droid Serif",
    "Droid Sans Mono": "Droid Sans Mono",
    "Gravitas One": "Gravitas One",
    "Old Standard TT": " Old Standard TT",
    "Open Sans": "Open Sans",
    Overpass: "Overpass",
    "PT Sans Narrow": "PT Sans Narrow",
    Raleway: "Raleway"
    
  }

}

const colors = () => {

  return [

    "#3366cc", "#dc3912", "#ff9900", "#109618", "0099c6", "dd4477", "66aa00", "b82e2e", "316395", "#b71c1c", "#0d47a1", "#7B1FA2", "#e65100", "#581845", "#795548", "#0097A7", "#558B2F", "#1976D2", "#212121", "#00796B", "#455A64", "#263238", "#303F9F", "#33691E", "#EF6C00", "#FFA000", "#004d40"

  ]
}


const chartTypes = () => {

  return {
    "": "Select Chart Type",
    LineChart: "Line Chart",
    ScatterChart: "Scatter Chart",
    BarChart: "Bar Chart",
    ColumnChart: "Column Chart",
    PieChart: "Pie Chart",
  }

}


const displayAdminMessage = ( message, status, prefix ) => {
  const messageDiv = document.querySelector(`#${prefix}__admin .admin-message`)
  if ( messageDiv && message ) {
    messageDiv.classList.add ( status )
    messageDiv.classList.remove ( 'hidden' )
    messageDiv.innerHTML  = `<p>${message}</p>`
  }
}



const hideAdminMessage = ( prefix ) => {
  const messageDiv = document.querySelector(`#${prefix}__admin .admin-message`)
  if ( messageDiv ) {
    messageDiv.classList.remove ( ...messageDiv.classList )
    messageDiv.classList.add ( 'hidden' )
    messageDiv.innerHTML  = ''
  }
}


// Show Element
const showElementById =  (elementId) => {
  const element = document.getElementById(elementId)
  if (element) element.classList.remove("hidden")
}

// Hide Element
const hideElementById = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) element.classList.add("hidden")
}


// Toggle spinner
const toggleElementById = (elementId) => {
  const element = document.getElementById(elementId)
  if (element && element.classList.contains("hidden")) {
    showElementById(elementId)
  } else {
    hideElementById(elementId)
  }
}


// Show Element
const showElementByClass = (elementClass) => {
  const element = document.querySelector(elementClass)
  if (element) element.classList.remove("hidden")
}

// Hide Element
const hideElementByClass = (elementClass) => {
  const element = document.querySelector(elementClass)
  if (element) element.classList.add("hidden")
}


// Toggle spinner
const toggleElementByClass = function (elementClass) {
  const element = document.querySelector(elementClass)
  if (element && element.classList.contains("hidden")) {
    showElementByClass(elementClass)
  } else {
    hideElementByClass(elementClass)
  }
}



// Show input fields
const showInputField = function ( fieldId ) {

  const element = document.getElementById( fieldId )
  element.classList.remove( "hidden" );
  element.closest(".form-group").classList.remove( "hidden" )

}


// Hide input fields
const hideInputField = function ( fieldId ) {

  const element = document.getElementById( fieldId )
  element.classList.add( "hidden" );
  element.closest( ".form-group" ).classList.add( "hidden" )

}



// Show input fields
const toggleInputField = function ( fieldId ) {

  const element = document.getElementById(fieldId)
  if (element.classList.contains( "hidden" ) ) {
    showInputField( fieldId )
  } else {
    hideInputField( fieldId )
  }

}





const fetchTableChartData = ( chart, spreadsheet ) => {

  // Set table header values
  const headerValues = []
  for ( let  i = 0; i < spreadsheet[chart.params.sheetId].labels.length; i++ ) {
    headerValues.push([`<b>${spreadsheet[chart.params.sheetId].labels[i]}</b>`]);
  }
  chart.tableChart.options.header.values = headerValues

    // Set table header alignment
  // chart.tableChart.options.header.align = [chart.tableChart.options.firstColAlign, chart.tableChart.options.header.align]


  // Round cells values if rounding is not 0
  // if ( chart.tableChart.options.rounding) {
  //   const cellValues = []
  //   for ( let  i = 0; i < spreadsheet[chart.params.sheetId].data.length; i++ ) {
  //     cellValues[i] =[]
  //     for ( let  j = 0; j < spreadsheet[chart.params.sheetId].data[i].length; j++ ) {
  //       cellValues[i][j] = ( spreadsheet[chart.params.sheetId].data[i][j].toFixed( chart.tableChart.options.rounding ) ) 
  //     }  
  //   }
  //   chart.tableChart.options.cells.values = cellValues  
  // } else {
    chart.tableChart.options.cells.values = spreadsheet[chart.params.sheetId].data
  // }

    // Set table cells alignment
    // chart.tableChart.options.cells.align = [chart.tableChart.options.firstColAlign, chart.tableChart.options.cells.align]
    // chart.tableChart.options.header.align = [chart.tableChart.options.firstColAlign, chart.tableChart.options.header.align]

  // Set table even and odd row colors
  // const rowFillColors = []
  // for ( let  j = 0; j < spreadsheet[chart.params.sheetId].data[0].length; j++ ) {
    // rowFillColors[j] = (j % 2 === 0) ? chart.tableChart.options.oddRowColor : chart.tableChart.options.evenRowColor
  // }
  // chart.tableChart.options.cells.fill.color = [rowFillColors]

  return chart.tableChart.options

}






const fetchMinMaxAvgTableData = (chart, spreadsheet, xAxisMin = null, xAxisMax = null) => {

  //  // Set table header
  //  const headerValues = [["Trace"], ["Min"], ["Average"], ["Max"]]
  //  chart.minMaxAvgTable.header.values = headerValues

  //  chart.minMaxAvgTable.cells.values = getMinMaxAvgData(chart, spreadsheet, xAxisMin, xAxisMax)

   // Set table cells alignment
  //  chart.minMaxAvgTable.cells.align = [chart.minMaxAvgTable.firstColAlign , chart.minMaxAvgTable.cells.align]
  //  chart.minMaxAvgTable.header.align = [chart.minMaxAvgTable.firstColAlign , chart.minMaxAvgTable.header.align]

   // Set table even and odd row colors
  //  const rowFillColors = []
  //  for ( let  j = 0; j < spreadsheet[chart.params.sheetId].data[0].length; j++ ) {
  //    rowFillColors[j] = (j % 2 === 0) ? chart.minMaxAvgTable.evenRowColor : chart.minMaxAvgTable.oddRowColor
  //  }
  //  chart.minMaxAvgTable.cells.fill.color = [rowFillColors]

   

}






const getMinMaxAvgData = function (chart, spreadsheet, xAxisMin = null, xAxisMax = null ) {

  console.log("CCHH", chart)


  const min = ( xAxisMin ) ? xAxisMin : chart.layout.xaxis.range[0]
  const max = ( xAxisMax ) ? xAxisMax : chart.layout.xaxis.range[1]

  // Remove first row from data (xaxis data)
  const data = [...spreadsheet[chart.params.sheetId].data]
  
  const indeces = []
  let i=0
  data[0].forEach(element => {
    if (element > min && element < max ) {
      indeces.push(i) 
    }
    i++
  })

  const newData = []
  data.forEach(element => {
    newData.push(element.slice(indeces[0],[...indeces].pop()+1 ))
  })  
  

  newData.shift()

  // Set cell values
  const minMaxAvgTableData = [[],[],[],[]];

  // Fetch header row and format as fist column for min-max-avg first column
  for ( const property in Object.values(spreadsheet[chart.params.sheetId].labels)) {
    minMaxAvgTableData[0].push(Object.values(spreadsheet[chart.params.sheetId].labels)[property])
  }

  // Remove first column header
  minMaxAvgTableData[0].shift()


  // Loop through plot data and remove all non-numeric rows (min, max and average require numbic data) and calculate min, max and avg
  newData.forEach(element => {
    const newElement = []
    let k = 0
    for ( let j = 0; j <= element.length; j++) {
      if ( typeof element[j] === "number" ) {
        newElement[k] = element[j]
        k++
      }
    }

    if ( newElement.length ) {

    
      const average = newElement.reduce((a, c) => a + c,) / newElement.length

      // Round if rounding is set
      if ( chart.minMaxAvgTable.rounding) {
        minMaxAvgTableData[1].push( parseFloat( Math.min( ...newElement ).toFixed( chart.minMaxAvgTable.rounding ) ) )
        minMaxAvgTableData[2].push( parseFloat( average.toFixed( chart.minMaxAvgTable.rounding ) ) )
        minMaxAvgTableData[3].push( parseFloat( Math.max( ...newElement ).toFixed( chart.minMaxAvgTable.rounding ) ) )
      } else {
        minMaxAvgTableData[1].push( Math.min(...newElement ) )
        minMaxAvgTableData[2].push( average )
        minMaxAvgTableData[3].push( Math.max( ...newElement ) )
      }

    } else {
      minMaxAvgTableData[1].push( null )
      minMaxAvgTableData[2].push( null )
      minMaxAvgTableData[3].push( null )
    }

  });
  
  return minMaxAvgTableData

}











// const removePanel =  ( panelId ) => {

//   if (panelId)  {
//     panelId.previousSibling.remove()
//     panelId.remove()
//   }

// }









// const showchartParamsInputFields = ( iwpgvObj ) => {

//   showInputField( `${iwpgvObj.prefix}__chartParams[fileUpload]` )
//   // showInputField( `${iwpgvObj.prefix}__chartParams[chartId]` )
//   showInputField( `${iwpgvObj.prefix}__chartParams[sheetId]` )
//   showInputField( `${iwpgvObj.prefix}__chartParams[chartType]` )
//   // showInputField( `${iwpgvObj.prefix}__chartParams[enableRangeSlider]` )
//   // showInputField( `${iwpgvObj.prefix}__chartParams[enableTableChart]` )
//   showInputField( `${iwpgvObj.prefix}__chartParams[enableMinMaxTableChart]` )

// }


const showPanels = ( ) => {

  document.querySelector( `.accordion__toggle.chartLayout` ).classList.remove("hidden")
  document.querySelector( `.accordion__content.chartLayout` ).classList.remove("hidden")
  document.querySelector( `.accordion__toggle.chartTraces` ).classList.remove("hidden")
  document.querySelector( `.accordion__content.chartTraces` ).classList.remove("hidden")
  // document.querySelector( `.accordion__toggle.tableChart` ).classList.remove("hidden")
  // document.querySelector( `.accordion__content.tableChart` ).classList.remove("hidden")
  document.querySelector( `.accordion__toggle.minMaxAvgTableChart` ).classList.remove("hidden")
  document.querySelector( `.accordion__content.minMaxAvgTableChart` ).classList.remove("hidden")

}



const hidePanels = ( ) => {

  document.querySelector( `.accordion__toggle.chartLayout` ).classList.add("hidden")
  document.querySelector( `.accordion__content.chartLayout` ).classList.add("hidden")
  document.querySelector( `.accordion__toggle.chartTraces` ).classList.add("hidden")
  document.querySelector( `.accordion__content.chartTraces` ).classList.add("hidden")
  // document.querySelector( `.accordion__toggle.tableChart` ).classList.add("hidden")
  // document.querySelector( `.accordion__content.tableChart` ).classList.add("hidden")
  document.querySelector( `.accordion__toggle.minMaxAvgTableChart` ).classList.add("hidden")
  document.querySelector( `.accordion__content.minMaxAvgTableChart` ).classList.add("hidden")

}
































// const getTableHeader = function (sheet) {
//   const tableHeader  = []
//   for ( const property in Object.values(sheet.labels)) {
//     tableHeader.push([`<b>${Object.values(sheet.labels)[property]}</b>`])
//   }
//   return tableHeader
// }


// const getMinMaxAvgTableHeader = function () {
 
//   return  [["<b>Trace</b>"], ["<b>Min</b>"], ["<b>Average</b>"], ["<b>Max</b>"]]

// }












// const getPlotData = function (sheet) {

//   // Format data for plotly plot
//   const plotData = []
//   for (var j = 0; j < Object.keys(sheet.labels).length; j++) {
//     plotData[j] = []
//     for (var i=0; i < sheet.data.length; i++) {
//       var row = sheet.data[i];
//       plotData[j].push(Object.values(row)[j]) 
//     }
//   }

//   // rest data to 3 decimal places if numeric
//   newPlotData = []
//   plotData.forEach(element => {
//     const newElement = []
//     let k = 0
//     for ( let j = 0; j < element.length; j++) {
//       if ( typeof element[j] === "number") {
//         newElement[k] = parseFloat(element[j].toFixed(3))
//       } else {
//         newElement[k] = element[j]
//       }
//       k++
//     }
   
//     newPlotData.push(newElement)
//   })

//   return newPlotData
// }



// const getXAxisMinMax = function(data) {
 
//   return {"xAxisMin": Math.min(data), "xAxisMax": Math.max(data)}

// }


// const getLayout = function (chart, xAxisMin = null, xAxisMax = null) {
  
//   return {
//     paper_bgcolor:chart.chartLayout.paper_bgcolor,
//     plot_bgcolor:chart.chartLayout.plot_bgcolor,
//     height:chart.chartLayout.height,
//     title: {
//       text: chart.chartLayout.title.text,
//       x: chart.chartLayout.title.x,
//       y: chart.chartLayout.title.y,
//       font: {
//         family: chart.chartLayout.title.font.family,
//         size: chart.chartLayout.title.font.size,
//         color: chart.chartLayout.title.font.color,
//       },
//       xaxis: {
//         automargin: true,
//         rangeslider: {
//           visible:(chart.chartParams.enableChartRangeSlider)? true : false,
//           bgcolor:"teal",
//           thickness: 0.2,
//           // range: [xAxisMin, xAxisMax]
//         },
        
//         // autorange: 'reversed'
//         // rangeselector: selectorOptions,
//       },
//       yaxis: {
//         fixedrange: true,
//         // autorange: 'reversed'
//       },
//       autosize: true, // set autosize to rescale,
//       // xref: "paper",
     
//       // xanchor:"auto",

//       // yref: "paper",
     
//       // yanchor:"auto"
//     },
   
//     //  width:800,
    
//   }

// }



// const getConfig = function () {
//   const config = {
//     responsive: true,
//     displayModeBar: false
//   }
//   return config
// }


// const getTraces = function(jsonRes, plotData) {

//   const  chartType = jsonRes.chart.chartParams.chartType
  
//   let traces = []

//   switch(chartType) {

//     case 'LineChart': 
//     case 'ScatterChart':
//       for (var j=1; j < Object.keys(jsonRes.sheet.labels).length; j++) {
//         traces.push({ 
//           x : plotData[0],
//           y : plotData[j],
//           type: "scatter",
//           mode: 'lines+markers',
//           line: {
//             color:jsonRes.colors[j],
//             width: jsonRes.lineWidth
//           },
//           marker: {
//             color: jsonRes.colors[j],
//             size: jsonRes.markerSize
//           },
//           name: Object.values(jsonRes.sheet.labels)[j],
//           connectgaps: jsonRes.chart.chartLayout.connectgaps
//         })
//       }

//       break
  
//     case 'PieChart':  // if (x === 'value2')
//         traces.push({ 
//           labels : plotData[0],
//           values : plotData[1],
//           type: "pie"
//         })
      
    
//       break
  
//     default:
//       traces = `${chartType} is not a valid chart type`
      
//       break
//   }

//   return traces
// }


// const getTable = function (tableHeader, plotData) {

//   return [{
//     type: 'table',
//     header: {
//       values: tableHeader,
//       align: "center",
//       line: {width: 1, color: 'black'},
//       fill: {color: "grey"},
//       font: {family: "Arial", size: 12, color: "white"}
//     },
//     cells: {
//       values: plotData,
//       align: "center",
//       line: {color: "black", width: 1},
//       font: {family: "Arial", size: 11, color: ["black"]}
//     }
//   }]

// }


const createPanel = ( acCssClass, targetTitle, intro ) => {

   // Create accordion panel
   const ac = document.createElement( "div" )
   ac.classList.add( "ac", acCssClass )

   // Create ac header
   const acHeader = document.createElement( "h2" )
   acHeader.classList.add( "ac-header" )

   // Create trigger button
   const acTrigger = document.createElement( "div" )
   acTrigger.classList.add( "ac-trigger" )

   // Create heading title and add to trigger button
   const headingTitle = document.createTextNode( targetTitle )
   acTrigger.appendChild( headingTitle )

   // Add trigger button to header
   acHeader.appendChild( acTrigger )

   // Add header to ac
   ac.appendChild( acHeader )

   // Create accordion content
   const acPanel = document.createElement( "div" )
   acPanel.classList.add( "ac-panel" )

   if (intro) {
    // Create intro p
    const introDiv = document.createElement( "div" )
    introDiv.classList.add( "ac-text", "intro" )

    // Create intro text and add to intro div
    const introText = document.createTextNode(intro)
    introDiv.appendChild(introText)

    // Add p tag to content
    acPanel.appendChild(introDiv)
    
   }

   // Add content to ac
   ac.appendChild(acPanel)

   return ac

}




const fetchformGroup = (field, prefix) => {

  // const field = row.inputFields[el]
  // console.log("FIELD", field)


  // Create form group
  const formGroup = document.createElement( "div" )
  formGroup.classList.add("form-group");

  // Create input/select field and add css class
  let inputField = field.type === "select" ? document.createElement("select"): document.createElement("input")
  inputField.classList.add("form-group__input")

  // Add field type or options depending on whether input field is select or otherwise
  if (field.type === "select") {

    inputField.classList.add("form-group__input-select")
    // Remove all options
    inputField.options.length = 0

    // Add options
    for (const prop in field.options) {
      inputField.options[inputField.options.length] = new Option(
        field.options[prop],
        prop,
        false,
        false
      );
    }
  } else {
    inputField.type = field.type
    if (field.type === "checkbox") inputField.classList.add("form-group__input-checkbox")
    if (field.type === "color") inputField.classList.add("form-group__input-color")
  }

  // Set field id, name, classlist and value attributes
  inputField.id = `${prefix}__${field.id}`
  inputField.name = `${prefix}__${field.id}`
  if (field.type === "checkbox") {
    if (field.value) inputField.checked = true
  } else {
    inputField.value = field.value
  }
  if (field.cssClasses) {
    for (const cssClass in field.cssClasses) {
      inputField.classList.add(field.cssClasses[cssClass])
    }
  }

  // add min, number input max, max, step AND PLAVE HOLDERif any
  if ( field.min || field.min === 0 ) inputField.min = field.min
  if ( field.max || field.max === 0  ) inputField.max = field.max
  if ( field.step ) inputField.step = field.step
  if (field.title ) inputField.placeholder = field.title
  if ( field.readOnly ) inputField.readOnly = true
  if ( field.disabled ) inputField.disabled = true
  if ( field.required ) inputField.required = true

  // Add form group box to form group
  formGroup.appendChild(inputField)

  // Create label
  if (field.type !== "hidden") {
    const labelElem = document.createElement( "label" )
    labelElem.classList.add("form-group__label");
    labelElem.htmlFor = `${prefix}__${field.id}`
    const labelText = field.title
      ? document.createTextNode( field.title )
      : document.createTextNode( "\u00A0" );
    labelElem.appendChild( labelText );
    formGroup.appendChild( labelElem );
  }

  // Add hint to form group
  if (field.hint) {

    // Create tooltip div
    const tooltip = document.createElement("div")
    tooltip.classList.add("form-group__tooltip")

    if (field.type === "checkbox") tooltip.classList.add("form-group__tooltip-ttCheckbox")
    if (field.type === "color") tooltip.classList.add("form-group__tooltip-ttColor")


    // Create tooltip question mark span and add to tooltip div
    const tooltipQuestionMarkDiv = document.createElement("div")
    tooltipQuestionMarkDiv.classList.add("form-group__tooltip-question-mark")
    const tooltipQuestionMark = document.createTextNode("?")
    tooltipQuestionMarkDiv.appendChild(tooltipQuestionMark)
    tooltip.appendChild(tooltipQuestionMarkDiv)

    // Create tooltip hint and ad to tooltip
    const tooltipHintDiv = document.createElement("div")
    tooltipHintDiv.classList.add("form-group__tooltip-hint")
    const hintText = document.createTextNode(field.hint)
    tooltipHintDiv.appendChild(hintText)
    tooltip.appendChild(tooltipHintDiv)

    // Add tooltip to form group
    formGroup.appendChild(tooltip)

  } 

  // hide for group if input field has a hidden class
  if (field.cssClasses && field.cssClasses.includes("hidden")) {
    formGroup.classList.add("hidden")
  }

  return formGroup
  
}


// const createPanelSectionsOld = ( sections, prefix, level2AccordionDivCssClass, level2AcDivCssClass, level3AccordionDiv, level3AcDivCssClass ) => {

//   for ( const section in sections ) {

//     // const level3AcDivCssClass = `traces${index-1}${section}Ac`

//     // Add trace panel to accordion
//     level3AccordionDiv.appendChild( createPanel(  `${level3AcDivCssClass}`, sections[section].title, sections[section].intro ) )

//     const acPanel = document.querySelector( `${level2AccordionDivCssClass} .${level2AcDivCssClass} .ac-panel .${level3AcDivCssClass} .ac-panel`)


//     for (const fieldRow in sections[section].fieldGroups) {
        
//       const row = sections[section].fieldGroups[fieldRow];

//       //Create field group and add apprpriate css classes
//       const fieldGroup = document.createElement( "div" )
//       if (row.cssClasses) {
//         for (const cssClass in row.cssClasses) {
//           fieldGroup.classList.add(row.cssClasses[cssClass])
//         }
//       }
      
//       // Loop through fields
//       for (const el in row.inputFields) {

//         const formGroup = fetchformGroup( row.inputFields[el], prefix )
        
//         fieldGroup.appendChild( formGroup )
//         // console.log(fieldGroup)

//         // Add field group to content
//         // if (Object.keys(panelSections).length > 1) {
//           acPanel.appendChild( fieldGroup )
//         // } else {
//           // panelContent.appendChild( fieldGroup )
//         // }

//       }

//     }

//     // return acPanel

//   }

// }




const createPanelSections = ( sections, sectionsContainer, optionId, prefix ) => {

  // Loop through all sections
  for ( const section in sections ) {

    if (Object.values(sections).length > 1 ) {
      sectionsContainer.appendChild( createPanel(  `${optionId}${section}Ac`, sections[section].title, sections[section].intro ) )
      fieldGroupsContainer = sectionsContainer.querySelector( `.${optionId}${section}Ac .ac-panel`)
    } else {
      fieldGroupsContainer = sectionsContainer
      
      //Create intro paragraph and add it to sestion container
      const introP = document.createElement("p")
      introP.classList.add("ac-text", "intro")
      introText = document.createTextNode( sections[section].intro )
      introP.appendChild(introText)
      fieldGroupsContainer.appendChild(introP)
    }


    // Loop rhtough sections 
    for (const fieldRow in sections[section].fieldGroups) {
        
      const row = sections[section].fieldGroups[fieldRow];

      //Create field group and add apprpriate css classes
      const fieldGroup = document.createElement( "div" )
      if (row.cssClasses) {
        for (const cssClass in row.cssClasses) {
          fieldGroup.classList.add(row.cssClasses[cssClass])
        }
      }
      
      // Loop through fields
      for (const el in row.inputFields) {
        const formGroup = fetchformGroup( row.inputFields[el], prefix )
        fieldGroup.appendChild( formGroup )
        fieldGroupsContainer.appendChild( fieldGroup )
      }

    }

  }

}





// // Show sheet select field
// const setSheetIdOptions = (spreadsheet, sheetIdInput) => {

//   // Remove all options
//   sheetIdInput.options.length = 0

//   // Add default option
//   sheetIdInput.options[sheetIdInput.options.length] = new Option( "Select Sheet", "", false, false )

//   // Loop through all sheets in the spreadsheet and set options
//   for (const prop in spreadsheet) {
//     sheetIdInput.options[sheetIdInput.options.length] = new Option( spreadsheet[prop]["sheetName"], prop, false, false ) 
//   }

// }



const setSelectFieldOptions = (node, optionsArr, nullOptionTitle) => { 

  node.options.length = 0
  node.options.add( new Option( nullOptionTitle, "", false, true) );
  for (const prop in optionsArr ) {
    node.options.add( new Option( optionsArr[prop], prop, false, false) );
  }

}




// const createDeleteBtn = (title, cssClass, btnId) => { 

//   const deleteBtn = document.createElement("div")
//   deleteBtn.classList.add( `${cssClass}`, "button", "btn", "btn-danger" )
//   deleteBtn.id = btnId
//   const buttonText = document.createTextNode( title )
//   deleteBtn.appendChild(buttonText)

//   return deleteBtn

// }



const fetchAxisOptions = (layout, axisType, capitalize) => { 

  const axes = Object.keys(layout).filter( ( prop ) => prop.includes(axisType))
  const axisOptions = []
  let index =null
  for (const prop in axes) {
    if (axisType === "xaxis" ) index = axes[prop] === "xaxis" ? "x" : `x${parseInt(axes[prop].split("xaxis")[1])}`
    if (axisType === "yaxis" ) index = axes[prop] === "yaxis" ? "y" : `y${parseInt(axes[prop].split("yaxis")[1])}`
    axisOptions[index] = capitalize( axes[prop] )
  }

  return axisOptions

}





const createDeleteBtn = (title, id, cssClass) => {

  const deleteBtn = document.createElement("div")
  deleteBtn.classList.add( `${cssClass}`, "button", "btn", "btn-danger" )
  deleteBtn.id =id
  const buttonText = document.createTextNode( title )
  deleteBtn.appendChild(buttonText)

  return deleteBtn

}




// const appendFormSaveBtn = function (form, iwpgvObj) {

//   const saveChartBtn = document.createElement("button")
//   saveChartBtn.classList.add("button")
//   saveChartBtn.classList.add("button-primary")
//   saveChartBtn.id = `${iwpgvObj.prefix}__saveChart`
//   saveChartBtn.name = `${iwpgvObj.prefix}__saveChart`
//   saveChartBtn.disabled = true;
//   const saveChartBtnText = document.createTextNode("Save Chart")
//   saveChartBtn.appendChild(saveChartBtnText)
//   form.appendChild(saveChartBtn)

// }


const hideOptions = (prefix) => {

  // Hide file uploag fields

  document.getElementById( `${prefix}__params[fileName]` ).closest( ".field-group" ).classList.add( "hidden" )
  document.getElementById( `${prefix}__params[sheetId]` ).closest( ".field-group" ).classList.add( "hidden" )
  document.getElementById( `${prefix}__params[chartType]` ).closest( ".field-group" ).classList.add( "hidden" )

  // Hide all panels
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .tracesAc`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .basicOptionsAc`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .titleAc`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .legendAc`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .hoverlabelAc`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .modebarAc`).classList.add( "hidden" )
  // document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .xaxisAc`).classList.add( "hidden" )
  // document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .xaxis2Ac`).classList.add( "hidden" )
  // document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .yaxisAc`).classList.add( "hidden" )
  // document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .yaxis2Ac`).classList.add( "hidden" )
  document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion .annotationsAc`).classList.add( "hidden" )

  // Reset panels inner html
  document.querySelector(`#${prefix}__admin .basicOptionsAc .ac-panel`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .titleAc .ac-panel`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .legendAc .ac-panel`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .hoverlabelAc .ac-panel`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .modebarAc .ac-panel `).innerHTML = ""
  // document.querySelector(`#${prefix}__admin .xaxisAc .ac-panel .accordion`).innerHTML = ""
  // document.querySelector(`#${prefix}__admin .xaxis2Ac .ac-panel .accordion`).innerHTML = ""
  // document.querySelector(`#${prefix}__admin .yaxisAc .ac-panel .accordion`).innerHTML = ""
  // document.querySelector(`#${prefix}__admin .yaxis2Ac .ac-panel .accordion`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .annotationsAc .ac-panel .accordion`).innerHTML = ""
  document.querySelector(`#${prefix}__admin .minMaxAvgTableAc .ac-panel`).innerHTML = ""

  // Disable save buttons
  document.getElementById(`${prefix}__saveChart`).disabled = true
  document.getElementById( `${prefix}__saveChart` ).classList.add("hidden")
    
}



const createChartCard = (chart, pluginUrl, shortcodeText, parentContainer, prefix) => {

  // Create card
  const card = document.createElement( "div" )
  card.classList.add( "card")
  card.id = `${prefix}__chart__${chart.params.chartId}__card`
  document.querySelector(parentContainer).prepend(card)

  // Create heading
  const heading = document.createElement( "h2" )
  heading.classList.add( "card__heading")
  const headingText = document.createTextNode( chart.params.fileName )
  heading.appendChild( headingText )
  card.appendChild( heading )

  // create card content
  const cardContent = document.createElement( "div" )
  cardContent.classList.add( "card__content")
  card.appendChild( cardContent )

  // create chart container
  const chartContainer = document.createElement( "div" )
  chartContainer.classList.add( "chart-container")
  cardContent.appendChild( chartContainer )

  // create plotly chart div
  const plotlyChart = document.createElement( "div" )
  plotlyChart.classList.add( "chart" )
  plotlyChart.id = `${prefix}__chart__${chart.params.chartId}`
  chartContainer.appendChild( plotlyChart )

  // // create loading spinner
  // const loadingSpinner = document.createElement( "img" )
  // loadingSpinner.classList.add( `loading-spinner` )
  // loadingSpinner.src = `${pluginUrl}assets/img/loading-spinner.svg`
  // chartContainer.appendChild( loadingSpinner )

  // create card content
  const cardFooter = document.createElement( "div" )
  cardFooter.classList.add( "card__footer")
  card.appendChild( cardFooter )

  // create card content
  const shortcode = document.createElement( "div" )
  shortcode.classList.add( "shortcode")
  const shortcodeTextNode = document.createTextNode( `[${shortcodeText} id=${chart.params.chartId}]` )
  shortcode.appendChild( shortcodeTextNode )
  cardFooter.appendChild( shortcode )

  // create actions div
  const actions = document.createElement( "div" )
  actions.classList.add( "actions")
  cardFooter.appendChild( actions )

  // create clone chart ancher tag
  const cloneAnchor = document.createElement( "a" )
  cloneAnchor.classList.add( "card__clone-chart" )
  cloneAnchor.href = "#"
  cloneAnchor.dataset.chartId = chart.params.chartId
  actions.appendChild( cloneAnchor )

  // create edit chart ancher tag
  const editAnchor = document.createElement( "a" )
  editAnchor.classList.add( "card__edit-chart" )
  editAnchor.href = "#"
  editAnchor.dataset.chartId = chart.params.chartId
  actions.appendChild( editAnchor )

  // create delete chart ancher tag
  const deleteAnchor = document.createElement( "a" )
  deleteAnchor.classList.add( "card__delete-chart")
  deleteAnchor.href = "#"
  deleteAnchor.dataset.chartId = chart.params.chartId
  actions.appendChild( deleteAnchor )

  // Create clone svg icon and add it to clone anchor tag
  let svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${pluginUrl}assets/img/icons.svg#icon-file_copy`)
  svgElem.classList.add( "clone-chart-svg")
  svgElem.appendChild(useElem)
  cloneAnchor.appendChild(svgElem)

  // Create pencil svg icon and add it to edit anchor tag
  svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${pluginUrl}assets/img/icons.svg#icon-pencil`)
  svgElem.classList.add( "edit-chart-svg")
  svgElem.appendChild(useElem)
  editAnchor.appendChild(svgElem)

  // Create bin svg icon and add it to delet anchor tag
  svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${pluginUrl}assets/img/icons.svg#icon-bin`)
  svgElem.classList.add( "delete-chart-svg")
  svgElem.appendChild(useElem)
  deleteAnchor.appendChild(svgElem)

  // chart.layout.showlegend = false
  // chart.layout.hovermode = false
  // chart.layout.height = 300
  // chart.config.displayModeBar = false 

}



// Remove empty spaces ("") from begining and end of array
const trimArray = (arr) => {  
  // return
  let index = null
  for ( const i in arr) {
    if (arr[i] == "") {
      continue
    } else {
      index = i
      break
    }
  }
  if ( index === null) return []
  arr.splice(0, index )

  for ( const i in arr.reverse()) {
    if (arr[i] == "") {
      continue
    } else {
      index = i
      break
    }
  }
  arr.splice(0, index )

  return arr

}




const resetChart = (Plotly, prefix) => {

  Plotly.purge(`${prefix}__plotlyChart`)

  // Reset and hide all panels
  for ( const element of document.querySelector(`#${prefix}__admin #${prefix}__chartOptionsForm .main__Accordion`).children ) {
    if ( element.classList.contains('fileUploadAc') ) continue

    if ( element.querySelector(".accordion" ) ) {
      element.querySelector(".accordion" ).innerHTML = ""
    } else {
      element.querySelector(".ac-panel" ).innerHTML = ""
    }

    element.classList.add ( 'hidden' )

     // Disable and hide save buttons
    document.getElementById(`${prefix}__saveChart`).disabled = true
    document.getElementById( `${prefix}__saveChart` ).classList.add("hidden")

    // Hide file name, file id and chart id input fields
    document.getElementById( `${prefix}__params[fileName]` ).closest('.field-group' ).classList.add ( 'hidden' )
    document.getElementById( `${prefix}__params[sheetId]` ).closest('.field-group' ).classList.add ( 'hidden' )
    document.getElementById( `${prefix}__params[chartId]` ).closest('.field-group' ).classList.add ( 'hidden' )

    // Hide min/max/avg form
    document.getElementById( `${prefix}__min-max-avg-form` ).classList.add( 'hidden')


  }

}


const showToolTip = ( target, Swal, prefix) => {

  const hint = target.nextElementSibling.innerHTML
  const test = target.closest(".form-group").firstElementChild.id === `${prefix}__params[mediaUploadBtn]`
  console.log(test)
  Swal.fire({
    html: `<div class='hint-popup'>${hint}</div>`,
    padding: "2rem",
    showConfirmButton: false,
    width: '50%',
    showCloseButton: true,
    imageUrl: test ? "http://wp-sandbox:8888/wp-content/uploads/2021/07/Screen-Shot-2021-07-11-at-6.05.46-AM.png" : null,
    imageWidth: test ? 600 : null,
    imageHeight: test ? 400 : null,
    imageAlt: test ? 'Hint Image' : null
  })

}




// const cancelChart = ( Swal, prefix) => {

//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You will not be able to recover this chart!",
//     // icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#FF6D00',
//     cancelButtonColor: '#4f5b62',
//     confirmButtonText: 'Discard Changes'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       document.querySelector(`#${prefix}__admin .edit-chart`).classList.add("hidden")
//       chart = {}  
//     }
//   })
  
// }




const commaSeparatedToNumberArr = ( value) => {

  const array = value.split(",").map( item  => parseFloat( item ) )

  var index = -1,
  length = array == null ? 0 : array.length,
  resIndex = 0,
  result = []

  while (++index < length) {
    var value = array[index];
    result[resIndex++] = isNaN(value) ? null : value
    
  }
return result

}




const commaSeparatedToStringArr = ( value) => {

  return value.toString().split(",").map( item  => item )
  
}



const indexOfAll = (arr, min, max) => {
  return [...arr].reduce((acc, el, i) => (el >= min && el <= max ? [...acc, i] : acc), [])
}





const convertXAxisData = (originalData) => {
  // const originalData = spreadsheet[chart.params.sheetId].data

  let xaxisData = []
  if ( typeof originalData[0][0] === 'string' || originalData[0][0] instanceof String ) {
    xaxisData = [0]
    let i = 1
    while (i < originalData[0].length ) {
      xaxisData.push( i)
      i++
    }
  } else {
    xaxisData = originalData[0]
  }

  return xaxisData

}




const fetchMinMaxAvgCellValues = ( dataArr, labels, arrayMin, arrayMax, arrayMean, floatRound, rounding = 1 ) => {

  const cellValues = []
  const names = []
  const min = []
  const mean = []
  const max = []
  for (const prop in dataArr) {
    if (prop == 0 ) continue
    names.push( labels[prop] )

    if ( ! isNaN( arrayMin( dataArr[prop] ) ) ) {
      min.push( floatRound( arrayMin( dataArr[prop] ), rounding  ) )
    } else {
      min.push(null)
    }

    if ( ! isNaN( arrayMax(dataArr[prop] ) ) ) {
      max.push( floatRound( arrayMax( dataArr[prop] ), rounding ) )
    } else {
      max.push(null)
    }
    
    if ( ! isNaN( arrayMean(dataArr[prop] ) ) ) {
      mean.push( floatRound( arrayMean( dataArr[prop] ), rounding ) )
    } else {
      mean.push(null)
    }

  }
  cellValues.push( names, min, mean, max )

  return cellValues

}



const fetchTableCellsColors = (trace) => {

  
  const cellsColors = []

   for ( let i = 0; i <trace.cells.values[0].length; i++ ) {
     cellsColors.push( i % 2 == 0 ?trace.evenRowColor :trace.oddRowColor )
   }

 return cellsColors


}



const addMinMaxAvgTable = ( chart, TableTrace, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound ) => {

  chart.layout.xaxis.domain = [0,.5]
  const originalData =  spreadsheet[chart.params.sheetId].data
  const headerValues = [['Trace'], ['Min'], ['Average'], ['Max']]
  const cellValues = fetchMinMaxAvgCellValues( originalData, spreadsheet[chart.params.sheetId].labels, arrayMin, arrayMax, arrayMean, floatRound )
  chart.traces[chart.traces.length]= TableTrace.defaultOptions( chart.traces.length, 'Min/Max/Average', headerValues, cellValues  )
  chart.traces[chart.traces.length-1].cells.fill.color = [fetchTableCellsColors( chart.traces[chart.traces.length-1] )]

  return chart

}




const addRangeMinMaxInputs = ( chart, Plotly, floatRound, plotlyChartDiv, prefix ) => {

  document.getElementById( `${prefix}__min-max-avg-form` ).classList.remove( 'hidden')
  document.getElementById( `${prefix}__rangeMinInput` ).value = floatRound( chart.layout.xaxis.range[0], chart.traces[chart.traces.length-1].rounding )
  document.getElementById( `${prefix}__rangeMaxInput` ).value = floatRound( chart.layout.xaxis.range[1], chart.traces[chart.traces.length-1].rounding )

  // Add change event listener to range min and range max input fields
  document.querySelector( `.${prefix}` ).addEventListener( "change", ( event ) => {
    event.preventDefault( )

    // Bail if not rangeMin or rangeMax inputs
    if ( event.target.id !== `${prefix}__rangeMinInput` && event.target.id !== `${prefix}__rangeMaxInput`) return
    const update = {'xaxis.range': [document.getElementById( `${prefix}__rangeMinInput` ).value, document.getElementById( `${prefix}__rangeMaxInput` ).value]}
    Plotly.relayout( plotlyChartDiv, update)
  
  } )

}


const minMaxRangesliderHandler = ( chart, range, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound ) => {

  const originalData =  spreadsheet[chart.params.sheetId].data
  const xaxisData = convertXAxisData( originalData )

  // const range = chart.layout[keyParts[0]][keyParts[1]]
  const indeces = indexOfAll(xaxisData, range[0], range[1])
  let newData = []
  for (const prop in originalData) {
    newData[prop] = []
    for (const index in originalData[prop]) {
      if ( indeces.includes( parseInt(index) ) ) {
        newData[prop][index] = originalData[prop][index]
      } else {
        newData[prop][index] = null
      }
    }
    newData[prop] = newData[prop].filter(el => el !== null)
  }

  const cellValues = fetchMinMaxAvgCellValues( newData, spreadsheet[chart.params.sheetId].labels, arrayMin, arrayMax, arrayMean, floatRound, chart.traces[chart.traces.length-1].rounding )

  return cellValues

}






const fetchChartListDefaultOptions = ( chart, sheet ) => {

  for ( let i=0; i < chart.traces.length; i++) {

    switch (chart.traces.type ) {

      case 'scatter':
        chart.traces[i].x = sheet.sheet.data[0]
        chart.traces[i].y = sheet.sheet.data[i+1]
        break

      case 'table':
        chart.traces[i].header.values = sheet.sheet.data[0]
        chart.traces[i].cells.values = sheet.sheet.data[i+1]

    }
  }

  // chart.traces[chart.traces.legth-1].visible = false

      
  chart.layout.showlegend = false
  chart.layout.hovermode = false
  chart.layout.xaxis.rangeslider.visible = false
  chart.layout.xaxis.domain = [0,1]
  chart.layout.title.text = ''
  chart.layout.margin.t = 10
  chart.layout.margin.b = 10
  chart.layout.margin.l = 10
  chart.layout.margin.r = 10
  chart.layout.height = 300
  chart.traces[chart.traces.length-1].visible = false
  chart.config.displayModeBar = false

  return chart

}



// const plotCardChart = ( chart, sheet, Plotly ) => {

// for ( let i=0; i < chart.traces.length; i++) {
//   chart.traces[i].x = sheet.sheet.data[0]
//   chart.traces[i].y = sheet.sheet.data[i+1]
// }
// chart = fetchChartListDefaultOptions( chart )

// return chart

// }



const setChartTraces = (chart, ScatterTrace, TableTrace, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound) => {

  const sheet = spreadsheet[chart.params.sheetId]
  if ( ! chart.traces.length ) {
    for (const prop in  sheet.data ) {
      if ( prop == 0 ) continue
      chart.traces[prop-1] = ScatterTrace.defaultOptions( prop, Object.values(sheet["labels"])[prop], sheet.data[0], sheet.data[prop] )
    }
  } else {

    // Remove extra traces if new spreasheet contains less columns than old spreasheet
    if ( sheet.data.length < chart.traces.length +1 ) chart.traces.splice( sheet.data.length-1, chart.traces.length - sheet.data.length + 1 )

    for (const prop in  sheet.data ) {
      if ( prop == 0 ) continue
      chart.traces[prop-1].name = Object.values(sheet["labels"])[prop]
      chart.traces[prop-1].x = sheet.data[0]
      chart.traces[prop-1].y = sheet.data[prop]
    }
  }

  // Reset chart axis type to default
  chart.layout.xaxis.type = '-'

  // Add min/max/avg table cahrt
  if (chart.params.enableMinMaxAvgTable) addMinMaxAvgTable( chart, TableTrace, spreadsheet, arrayMin, arrayMax, arrayMean, floatRound )

  return chart

}









// Get chart option key from feld Id
const chartOptionKey = (fieldId) => {
  if (!fieldId) return;
  const parts = fieldId.split("[");
  if (parts.length == 0) return;

  const controlWrapper = parts[0].split("__")[1];

  let optionKey;

  switch (parts.length) {
    case 6:
      optionKey = `${parts[1].split("]")[0]}.${parts[2].split("]")[0]}.${
        parts[3].split("]")[0]
      }.${parts[4].split("]")[0]}.${parts[5].split("]")[0]}`;
      break;

    case 5:
      optionKey = `${parts[1].split("]")[0]}.${parts[2].split("]")[0]}.${
        parts[3].split("]")[0]
      }.${parts[4].split("]")[0]}`;
      break;

    case 4:
      optionKey = `${parts[1].split("]")[0]}.${parts[2].split("]")[0]}.${
        parts[3].split("]")[0]
      }`;
      break;

    case 3:
      optionKey = `${parts[1].split("]")[0]}.${parts[2].split("]")[0]}`;
      break;

    case 2:
      optionKey = parts[1].split("]")[0];
      break;

    default:
      optionKey = null;
      break;
  }

  return { control: controlWrapper, key: optionKey };
}




module.exports = {
  fontFamily,
  colors,
  chartTypes,
  displayAdminMessage,
  hideAdminMessage,
  showElementById,
  hideElementById,
  toggleElementById,
  showElementByClass,
  hideElementByClass,
  toggleElementByClass,
  showInputField,
  hideInputField,
  toggleInputField,
  createPanel,
  createPanelSections,
  // setSheetIdOptions,
  showPanels,
  hidePanels,
  fetchTableChartData,
  fetchMinMaxAvgTableData,
  getMinMaxAvgData,
  chartOptionKey,
  fetchformGroup,
  hideOptions,
  createChartCard,
  setSelectFieldOptions,
  fetchAxisOptions,
  createDeleteBtn,
  trimArray,
  resetChart,
  showToolTip,
  // cancelChart,
  commaSeparatedToNumberArr,
  commaSeparatedToStringArr,
  indexOfAll,
  convertXAxisData,
  fetchMinMaxAvgCellValues,
  fetchTableCellsColors,
  addMinMaxAvgTable,
  addRangeMinMaxInputs,
  minMaxRangesliderHandler,
  fetchChartListDefaultOptions,
  setChartTraces
  
}
