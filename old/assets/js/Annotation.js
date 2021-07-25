import { fontFamily } from "./utilities"

class Annotation {

  constructor(  ) { }
        

  static defaultOptions() {

    return {

      visible: true,
      text: "Hello World",
      textangle: 0,
      font: {
        family: Object.keys(fontFamily())[12],
        size: 14,
        color: "#444444",
      },
      width: null,
      height: null,
      opacity: 1,
      align: "center",
      valign: "middle",
      bgcolor: "#ffffff",
      bordercolor:"#333333",
      borderpad: 10,
      borderwidth: 1,
      showarrow: true,
      arrowcolor: "#444444",
      arrowhead: 1,
      startarrowhead: 1,
      arrowsize: 1,
      startarrowsize: 1,
      arrowside: "end",
      arrowwidth: 1,
      standoff: 0,
      startstandoff: 0,
      axref: "page",
      ayref: "pixel",
      ax: -30,
      ay: -40,
      xref: "pixel",
      yref: "pixel",
      x: null,
      y: null,
      xshift: 0,
      yshift: 0,

    }

  }

  static sections( annotation, index, text ) {

    return {
      
      basicOptions: {
        intro : `Here you can modify the basic options of annotation "${text}`,
        title : "Basic Options",
        fieldGroups : [
          {
            cssClasses : ["field-group", "twentyFive-seventyFive"],     
            inputFields : [
              {
                id : `layout[annotations][${index}][visible]`,  
                title : "Visibility",  
                type : "checkbox",
                value : annotation.visible === undefined ? false : annotation.visible,
                hint : "Determines whether or not this annotation is visible."
              },
              {
                id : `layout[annotations][${index}][text]`,  
                title : "Text",  
                type : "text",
                value : annotation.text,
                disabled: false === annotation.visible? true : false,
                hint : "Sets the text associated with this annotation. Plotly uses a subset of HTML tags to do things like newline (<br>), bold (<b></b>), italics (<i></i>), hyperlinks (<a href='...'></a>). Tags <em>, <sup>, <sub> <span> are also supported."
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],     
            inputFields : [
              {
                id : `layout[annotations][${index}][width]`, 
                title : "Width", 	
                type : "number",
                min : 1,
                max : 3000,
                step : 1,
                value : annotation.width,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "number greater than or equal to 1.  Sets an explicit width for the text box. null (default) lets the text set the box width. Wider text will be clipped. There is no automatic wrapping; use <br> to start a new line."
              },
              {
                id : `layout[annotations][${index}][height]`, 
                title : "Height", 	
                type : "number",
                min : 1,
                max : 3000,
                step : 1,
                value : annotation.height,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "number greater than or equal to 1.  Sets an explicit height for the text box. null (default) lets the text set the box height. Taller text will be clipped."
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][align]`, 
                title : "Horizontal Alignment", 	
                type : "select", 
                options : {
                  left : "Left",
                  center : "Center",
                  right : "Right"
                },
                value : annotation.align,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets a reference between this trace's y coordinates and a 2D cartesian y axis. If 'y' (the default value), the y coordinates refer to `layout.yaxis`. If 'y2', the y coordinates refer to `layout.yaxis2`, and so on."
              },
              {
                id : `layout[annotations][${index}][valign]`, 
                title : "Vertical Alignment", 	
                type : "select", 
                options : {
                  top : "Top",
                  middle : "Middle",
                  bottom : "Bottom"
                },
                value : annotation.valign,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets a reference between this trace's y coordinates and a 2D cartesian y axis. If 'y' (the default value), the y coordinates refer to `layout.yaxis`. If 'y2', the y coordinates refer to `layout.yaxis2`, and so on."
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][opacity]`, 
                title : "Opacity", 	
                type : "number",
                min : 0,
                max : 1,
                step : .02,
                value : annotation.opacity,
                disabled: true !== annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets a reference between this trace's x coordinates and a 2D cartesian x axis. If 'x' (the default value), the x coordinates refer to `layout.xaxis`. If 'x2', the x coordinates refer to `layout.xaxis2`, and so on."
              },
              {
                id : `layout[annotations][${index}][textangle]`, 
                title : "Text Angle", 	
                type : "number",
                min : -180,
                max : 180,
                step : 1,
                value : annotation.textangle,
                disabled: false == annotation.visible || "" === annotation.text ? true : false,
                hint : "Determines whether or not an item corresponding to this trace is shown in the legend."
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][borderwidth]`, 
                title : "Border Width", 	
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value : annotation.borderwidth,
                disabled: false == annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets the marker's opacity."
              },
              {
                id : `layout[annotations][${index}][bordercolor]`, 
                title : "Border Color", 	
                type : "color",
                value :  annotation.bordercolor,
                disabled: false == annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets themarker.linecolor. It accepts either a specific color or an array of numbers that are mapped to the colorscale relative to the max and min values of the array or relative to `marker.line.cmin` and `marker.line.cmax` if set."
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][bgcolor]`, 
                title : "Background Color", 	
                type : "color",
                value :  annotation.bgcolor,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets themarker.linecolor. It accepts either a specific color or an array of numbers that are mapped to the colorscale relative to the max and min values of the array or relative to `marker.line.cmin` and `marker.line.cmax` if set."
              },
              {
                id : `layout[annotations][${index}][borderpad]`, 
                title : "Border Padding", 	
                type : "number",
                min : 1,
                max : 2000,
                step : 1,
                value : annotation.borderpad,
                disabled: false == annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets the marker size (in px)."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][x]`, 
                title : "X", 	
                type : "number",
                // min : 1,
                // mx : 2000,
                // step : 1,
                value :  annotation.x,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets the width of the trace line."
              },
              {
                id : `layout[annotations][${index}][y]`, 
                title : "Y", 	
                type : "number",
                // min : 1,
                // may : 2000,
                // step : 1,
                value :  annotation.y,
                disabled: false === annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets the width of the trace line."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][xshift]`, 
                title : "X Shift", 	
                type : "number",
                min : 1,
                max : 2000,
                step : 1,
                value :  annotation.xshift,
                disabled: true !== annotation.visible || "" === annotation.text ? true : false,
                hint : "Has an effect only if `shape` is set to 'spline' Sets the amount of smoothing. '0' corresponds to no smoothing (equivalent to a 'linear' shape)."
              }, 
              {
                id : `layout[annotations][${index}][yshift]`, 
                title : "Y Shift", 	
                type : "number",
                min : 1,
                max : 2000,
                step : 1,
                value :  annotation.yshift,
                disabled: true !== annotation.visible || "" === annotation.text ? true : false,
                hint : "Has an effect only if `shape` is set to 'spline' Sets the amount of smoothing. '0' corresponds to no smoothing (equivalent to a 'linear' shape)."
              }, 
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][xref]`,  
                title : "X Reference",  
                type : "text",
                value : annotation.xref,
                disabled: true !== annotation.visible || "" === annotation.text ? true : false,
                hint : "Determines the line shape. With 'spline' the lines are drawn using spline interpolation. The other available values correspond to step-wise line shapes."
              },
              {
                id : `layout[annotations][${index}][yref]`,  
                title : "Y Reference",  
                type : "text",
                value : annotation.yref,
                disabled: true !== annotation.visible || "" === annotation.text ? true : false,
                hint : "Determines the line shape. With 'spline' the lines are drawn using spline interpolation. The other available values correspond to step-wise line shapes."
              },
            ],
          },
        ],
      },

      arrows: {
        intro : `Here you can modify the markers of trace "${annotation.name}`,
        title : "Arrows",
        fieldGroups : [
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][showarrow]`, 
                title : "show Arrow", 	
                type : "checkbox",
                value : annotation.showarrow === undefined ? false : annotation.showarrow,
                disabled: false == annotation.visible || "" === annotation.text ? true : false,
                hint : "Sets the marker symbol type. Adding 100 is equivalent to appending '-open' to a symbol name. Adding 200 is equivalent to appending '-dot' to a symbol name. Adding 300 is equivalent to appending '-open-dot' or 'dot-open' to a symbol name."
              },
              {
                id : `layout[annotations][${index}][arrowside]`, 
                title : "Arrow Side", 	
                type : "select", 
                options : {
                  start : "Start",
                  end : "End",
                  "start+end" : "Start & End",
                  none: "None",
                },
                value : annotation.arrowside,
                disabled: false === annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the annotation arrow head position."
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][arrowwidth]`, 
                title : "Arrow Width", 	
                type : "number",
                min : 0,
                max : 100,
                step : .1,
                value : annotation.arrowwidth,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the type of gradient used to fill the markers"
              },
              {
                id : `layout[annotations][${index}][arrowcolor]`,  
                title : "Arrow Color",  
                type : "color",
                value : annotation.arrowcolor,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : ""
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][arrowhead]`, 
                title : "Arrow Head Style", 	
                type : "number",
                min : 0,
                max : 8,
                step : 1,
                value : annotation.arrowhead,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the marker's opacity. Integer between or equal to 0 and 8"
              },
              {
                id : `layout[annotations][${index}][startarrowhead]`, 
                title : "Start Arrow Head Style", 	
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value : annotation.startarrowhead,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Integer between or equal to 0 and 8.  Integer between or equal to 0 and 8"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][arrowsize]`, 
                title : "Arrow Size", 	
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value : annotation.arrowsize,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the marker's opacity."
              },
              {
                id : `layout[annotations][${index}][startarrowsize]`, 
                title : "Start Arrow Size", 	
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value : annotation.startarrowsize,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the marker's opacity."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][standoff]`, 
                title : "Standoff", 	
                type : "number",
                min : 0,
                max : 1000,
                step : 1,
                value : annotation.standoff,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the type of gradient used to fill the markers"
              },
              {
                id : `layout[annotations][${index}][startstandoff]`, 
                title : "Start Standoff", 	
                type : "number",
                min : 0,
                max : 1000,
                step : 1,
                value : annotation.startstandoff,
                disabled: false == annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the type of gradient used to fill the markers"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][ax]`, 
                title : "Arrow X Position", 	
                type : "number",
                // min : 1,
                // max : 2000,
                // step : 1,
                value :  annotation.ax,
                disabled: false === annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the width of the trace line."
              },
              {
                id : `layout[annotations][${index}][ay]`, 
                title : "Arrow Y Position", 	
                type : "number",
                // min : 1,
                // may : 2000,
                // step : 1,
                value :  annotation.ay,
                disabled: false === annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Sets the width of the trace line."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[annotations][${index}][axref]`,  
                title : "Arrow X Reference",  
                type : "text",
                value : annotation.axref,
                disabled: true !== annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Determines the line shape. With 'spline' the lines are drawn using spline interpolation. The other available values correspond to step-wise line shapes."
              },
              {
                id : `layout[annotations][${index}][ayref]`,  
                title : "Arrow Y Reference",  
                type : "text",
                value : annotation.ayref,
                disabled: true !== annotation.visible || "" === annotation.text || false === annotation.showarrow ? true : false,
                hint : "Determines the line shape. With 'spline' the lines are drawn using spline interpolation. The other available values correspond to step-wise line shapes."
              },
            ],
          },
        ]
      },

    }
  }

}

export default Annotation;