
class Modebar {

  constructor( ) { }

  static defaultOptions() {

    return {
 
      displayModeBar: false,
      displaylogo: false,
      modebar: {
        orientation: "h",
        bgcolor: "#EEEEEE",
        color: "#000a12",
        activecolor: "#b0bec5",
      },
    
    }
     
  }


  static sections( layout, config ) {

    return {
    
      hoverLabel : {
        intro : "Here you can modify the plot modbar options",
        title : "",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "config[displayModeBar]",
                title : "Display ModeBar",
                type : "checkbox", 
                value : config.displayModeBar !== undefined ? config.displayModeBar : false,
                hint: ""
              },
              {
                id : "config[displaylogo]",
                title : "Display Plotly Logo",
                type : "checkbox", 
                value : config.displaylogo === undefined ?  config.displaylogo : false,
                // disabled: ! config.displayModeBar ? true: false,
                hint: ""
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[modebar][bgcolor]",
                title : "Background Color",
                type : "color", 
                value : layout.modebar !== undefined && layout.modebar.bgcolor !== undefined ? layout.modebar.bgcolor : this.defaultOptions().modebar.bgcolor,
                // disabled: ! config.displayModeBar ? true: false,
                hint: "Sets the background color of the modebar."
              },
              {
                id: "layout[modebar][orientation]",
                title:"Orientation",
                type : "select",
                options : {
                  h: "Horizontal",
                  v: "Vertical"
                },
                value: layout.modebar !== undefined && layout.modebar.orientation !== undefined ? layout.modebar.orientation : this.defaultOptions().modebar.orientation,
                // disabled: ! config.displayModeBar ? true: false,
                hint: "Sets the orientation of the modebar"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[modebar][color]",
                title : "Icon Color",
                type : "color", 
                value : layout.modebar !== undefined && layout.modebar.color !== undefined ? layout.modebar.color : this.defaultOptions().modebar.color,
                // disabled: ! config.displayModeBar ? true: false,
                hint: "Sets the color of the icons in the modebar."
              },
              {
                id : "layout[modebar][activecolor]",
                title : "Active Icon Color",
                type : "color", 
                value : layout.modebar !== undefined && layout.modebar.activecolor !== undefined ? layout.modebar.activecolor : this.defaultOptions().modebar.activecolor,
                // disabled: ! config.displayModeBar ? true: false,
                hint: "Sets the color of the active or hovered on icons in the modebar."
              },
            ],
          }
        ]  
      }
    }
  }
}

export default Modebar


