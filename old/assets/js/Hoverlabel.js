import { fontFamily } from "./utilities"

class Hoverlabel {

  constructor() { }

  static defaultOptions() {

    return {

      hovermode: true,
      hoverlabel: {
        bgcolor: "#FFFFFF",
        bordercolor: "#000a12",
        // align: "right",
        // namelength: -1,
        font: {
          family: Object.keys(fontFamily())[12],
          size: 14,
          color: "#000a12",
        }
      },
    
    }
     
  }


  static sections( layout ) {

    return {
    
      hoverLabel : {
        intro : "Here you can modify the plot title basic options",
        title : "",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[hovermode]",
                title : "Hover Mode",	
                type : "select",
                options : {
                  x: "X",
                  y: "Y",
                  closest: "Closest",
                  false: "Disabled",
                  "x unified": "X Unified",
                  "y unified": "Y Unified"
                },
                value : layout.hovermode,
                hint: "Determines the mode of hover interactions. If 'closest', a single hoverlabel will appear for the 'closest' point within the `hoverdistance`. If 'x' (or 'y'), multiple hoverlabels will appear for multiple points at the 'closest' x- (or y-) coordinate within the `hoverdistance`, with the caveat that no more than one hoverlabel will appear per trace. If 'x unified' (or 'y unified'), a single hoverlabel will appear multiple points at the closest x- (or y-) coordinate within the `hoverdistance` with the caveat that no more than one hoverlabel will appear per trace. In this mode, spikelines are enabled by default perpendicular to the specified axis. If false, hover interactions are disabled. If `clickmode` includes the 'select' flag, `hovermode` defaults to 'closest'. If `clickmode` lacks the 'select' flag, it defaults to 'x' or 'y' (depending on the trace's `orientation` value) for plots based on cartesian coordinates. For anything else the default value is 'closest'."
              },
              {
                id : "layout[hoverlabel][bgcolor]",
                title : "Background Color",
                type : "color", 
                value : layout.hoverlabel !== undefined && layout.hoverlabel.bgcolor !== undefined ? layout.hoverlabel.bgcolor : this.defaultOptions().hoverlabel.bgcolor,
                disabled: false === layout.hovermode ? true : false,
                hint: "Sets the background color of all hover labels on graph"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[hoverlabel][font][family]",
                title : "Font",	
                type : "select",
                options : fontFamily(),
                value : layout.hoverlabel !== undefined && layout.hoverlabel.font !== undefined && layout.hoverlabel.font.family !== undefined ? layout.hoverlabel.font.family : this.defaultOptions().hoverlabel.font.family,
                disabled: false === layout.hovermode ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : "layout[hoverlabel][font][color]",
                title : "Font Color",
                type : "color", 
                value : layout.hoverlabel !== undefined && layout.hoverlabel.font !== undefined && layout.hoverlabel.font.color !== undefined ? layout.hoverlabel.font.color : this.defaultOptions().hoverlabel.font.color,
                disabled: false === layout.hovermode ? true : false,
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[hoverlabel][font][size]", 
                title : "Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout.hoverlabel !== undefined && layout.hoverlabel.font !== undefined && layout.hoverlabel.font.size !== undefined ? layout.hoverlabel.font.size : this.defaultOptions().hoverlabel.font.size,
                disabled: false === layout.hovermode ? true : false,
                hint : "Number greater than or equal to 1"
              },
              {
                id : "layout[hoverlabel][bordercolor]",
                title : "Border Color",
                type : "color", 
                value : layout.hoverlabel !== undefined && layout.hoverlabel.bordercolor !== undefined ? layout.hoverlabel.bordercolor : this.defaultOptions().hoverlabel.bordercolor,
                disabled: false === layout.hovermode ? true : false,
                hint: "Sets the border color of all hover labels on graph."
              },
            ],
          },
        ]  
      },
    }
  }

}

export default Hoverlabel


