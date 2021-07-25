import { fontFamily } from "./utilities"

class Legend {

  constructor( ) { }

  static defaultOptions() {

    return {

      showlegend: true,
      legend: {
        bgcolor: "#FFFFFF",
        bordercolor: "#444444",
        borderwidth: 0,
        font: {
          family: Object.keys(fontFamily())[12],
          size: 14,
          color:"000a12",
        },
        title: {
          text: "",
          font: {
            family:Object.keys(fontFamily())[12],
            size:14,
            color: "#000a12",
          },
          side: "top",
        },
        orientation: "h",
        itemsizing: "trace",
        itemwidth: 30,
        itemclick: "toggle",
        itemdoubleclick : "toggleothers",
        x: 0,
        y: -1.1,
        valign: "middle",
      },
    
    }
     
  }


  static sections( layout ) {

    return {
    
      legend : {
        intro : "Here you can modify the plot legend",
        title : "",
        fieldGroups : [
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id: "layout[showlegend]",
                title:"Show Legend",
                type: "checkbox",
                value: layout.showlegend !== undefined ? layout.showlegend : false,
                hint: "Determines whether or not a legend is drawn. Default is `true` if there is a trace to show and any of these: a) Two or more traces would by default be shown in the legend. b) One pie trace is shown in the legend. c) One trace is explicitly given with `showlegend: true`"
              },
              {
                id: "layout[legend][valign]",
                title : "Text symbol Alignment",	
                type : "select",
                options : {
                  top: "Top",
                  middle: "Middle",
                  bottom: "Bottom"
                },
                value : layout.legend !== undefined && layout.legend.valign !== undefined ? layout.legend.valign : this.defaultOptions().legend.valign,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the vertical alignment of the symbols with respect to their associated text."
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : "layout[legend][borderwidth]",
                title : "Border Width",	
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value : layout.legend !== undefined && layout.legend.borderwidth !== undefined ? layout.legend.borderwidth : this.defaultOptions().legend.borderwidth,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the width (in px) of the border enclosing the legend."
              },
              {
                id : "layout[legend][bordercolor]",
                title : "Border Color",
                type : "color", 
                value : layout.legend !== undefined && layout.legend.bordercolor !== undefined ? layout.legend.bordercolor : this.defaultOptions().legend.bordercolor,
                disabled: ! layout.showlegend  || parseFloat( layout.legend.borderwidth ) === 0 ? true : false,
                hint: "Sets the color of the border enclosing the legend."
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : "layout[legend][font][family]",
                title : "Font Family",	
                type : "select",
                options : fontFamily(),
                value : layout.legend !== undefined && layout.legend.font !== undefined && layout.legend.font.family !== undefined ? layout.legend.font.family : this.defaultOptions().legend.font.family,
                // disabled: ! layout.showlegend ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : "layout[legend][font][size]", 
                title : "Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout.legend !== undefined && layout.legend.font !== undefined && layout.legend.font.size !== undefined ? layout.legend.font.size : this.defaultOptions().legend.font.size,
                // disabled: ! layout.showlegend ? true : false,
                hint : "number greater than or equal to 1"
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : "layout[legend][font][color]",
                title : "Font Color",
                type : "color", 
                value : layout.legend !== undefined && layout.legend.font !== undefined && layout.legend.font.color !== undefined ? layout.legend.font.color : this.defaultOptions().legend.font.color,
                disabled: ! layout.showlegend || parseFloat( layout.legend.font.size ) === 0 ? true : false,
              },
              {
                id : "layout[legend][orientation]",
                title : "Orientation",	
                type : "select",
                options : {
                  h: "Horizontal",
                  v: "Vertical"
                },
                value : layout.legend !== undefined && layout.legend.orientation !== undefined ? layout.legend.orientation : this.defaultOptions().legend.orientation,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the orientation of the legend."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[legend][itemsizing]",
                title : "Item Sizing",	
                type : "select",
                options : {
                  trace: "trace",
                  constant: "Constant"
                },
                value : layout.legend !== undefined && layout.legend.itemsizing !== undefined ? layout.legend.itemsizing : this.defaultOptions().legend.itemsizing,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Determines if the legend items symbols scale with their corresponding 'trace' attributes or remain 'constant' independent of the symbol size on the graph."
              },
              {
                id : "layout[legend][itemwidth]",
                title : "Item Width",	
                type : "number",
                min : 30,
                max : 1000,
                step : 1,
                value : layout.legend !== undefined && layout.legend.itemwidth !== undefined ? layout.legend.itemwidth : this.defaultOptions().legend.itemwidth,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the width (in px) of the legend item symbols (the part other than the title.text). Number greater than or equal to 30.  Default: 30."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[legend][itemclick]",
                title : "Item Click Behaviour",	
                type : "select",
                options : {
                  toggle: "Toggle",
                  toggleothers: "Toggle Other",
                  false: "Disabled"
                },
                value : layout.legend !== undefined && layout.legend.itemclick !== undefined ? layout.legend.itemclick : this.defaultOptions().legend.itemclick,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Determines the behavior on legend item click. 'toggle' toggles the visibility of the item clicked on the graph. 'toggleothers' makes the clicked item the sole visible item on the graph. 'false' disable legend item click interactions."
              },
              {
                id : "layout[legend][itemdoubleclick]",
                title : "Item Double Click Behaviour",	
                type : "select",
                options : {
                  toggle: "Toggle",
                  toggleothers: "Toggle Other",
                  false: "Disabled"
                },
                value : layout.legend !== undefined && layout.legend.itemdoubleclick !== undefined ? layout.legend.itemdoubleclick : this.defaultOptions().legend.itemdoubleclick,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Determines the behavior on legend item doubleclick. 'toggle' toggles the visibility of the item clicked on the graph. 'toggleothers' makes the clicked item the sole visible item on the graph. 'false' disable legend item click interactions."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[legend][x]",
                title : "Horizontal Position",	
                type : "number",
                min : -2,
                max : 3,
                step : 0.01,
                value : layout.legend !== undefined && layout.legend.x !== undefined ? layout.legend.x : this.defaultOptions().legend.x,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the x position (in normalized coordinates) of the legend. Defaults to '1.02' for vertical legends and defaults to '0' for horizontal legends."
              },
              {
                id : "layout[legend][y]",
                title : "Vertical Position",	
                type : "number",
                min : -2,
                max : 3,
                step : 0.01,
                value : layout.legend !== undefined && layout.legend.y !== undefined ? layout.legend.y : this.defaultOptions().legend.y,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the y position (in normalized coordinates) of the legend. Defaults to '1' for vertical legends, defaults to '-0.1' for horizontal legends on graphs w/o range sliders and defaults to '1.1' for horizontal legends on graph with one or multiple range sliders."
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : "layout[legend][bgcolor]",
                title : "Background Color",
                type : "color", 
                value : layout.legend !== undefined && layout.legend.bgcolor !== undefined ? layout.legend.bgcolor : this.defaultOptions().legend.bgcolor,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the legend background color. Defaults to `layout.paper_bgcolor`."
              },
              {
                id : "layout[legend][title][text]",
                title : "Legend Title",
                type : "text", 
                value : layout.legend !== undefined && layout.legend.title !== undefined && layout.legend.title.text !== undefined? layout.legend.title.text : this.defaultOptions().legend.title.text,
                // disabled: ! layout.showlegend ? true : false,
                hint: "Sets the title of the legend."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[legend][title][font][family]",
                title : "Legend Title Font",	
                type : "select",
                options : fontFamily(),
                value : layout.legend !== undefined && layout.legend.title !== undefined && layout.legend.title.font !== undefined && layout.legend.title.font.family !== undefined ? layout.legend.title.font.family : this.defaultOptions().legend.title.font.family,
              // disabled: ( ! layout.showlegend || ! layout.legend.title.text ) ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : "layout[legend][title][font][size]", 
                title : "Legend Title Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout.legend !== undefined && layout.legend.title !== undefined && layout.legend.title.font !== undefined && layout.legend.title.font.size !== undefined ? layout.legend.title.font.size : this.defaultOptions().legend.title.font.size,
                // disabled: ( ! layout.showlegend || ! layout.legend.title.text ) ? true : false,
                hint : "number greater than or equal to 1"
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : "layout[legend][title][font][color]",
                title : "Legend Title Font Color",
                type : "color", 
                value : layout.legend !== undefined && layout.legend.title !== undefined && layout.legend.title.font !== undefined && layout.legend.title.font.color !== undefined ? layout.legend.title.font.color : this.defaultOptions().legend.title.font.color,
              // disabled: ( ! layout.showlegend || ! layout.legend.title.text ) ? true : false,
              },
              {
                id : "layout[legend][title][side]",
                title : "Legend Title Side ",
                type : "select",
                options : {
                  top: "Top",
                  left: "Left",
                  "top left": "Top Left"
                }, 
                value : layout.legend !== undefined && layout.legend.title !== undefined && layout.legend.title.side !== undefined ? layout.legend.title.side  : this.defaultOptions().legend.title.side ,
                // disabled: ( ! layout.showlegend || ! layout.legend.title.text ) ? true : false,
                hint: "Determines the location of legend's title with respect to the legend items. Defaulted to 'top' with `orientation` is 'h'. Defaulted to 'left' with `orientation` is 'v'. The 'top left' options could be used to expand legend area in both x and y sides."
              }
            ],
          },
        ]  
      },
     
    }
    
  }

}

export default Legend


