// import { fontFamily } from "./utilities"

class BasicOPtions {

  constructor(  ) {}

  static defaultOptions() {

    return {
      
      responsive: true,
      staticPlot:false,
      width: null,
      height: 450,
      margin: {
        l: 120,
        r: 80,
        t: 100,
        b: 120,
        pad: 0,
        autoexpand: true,
      },
      paper_bgcolor: "#FFFFFF",
      plot_bgcolor: "#FFFFFF",
      autosize: true,
    }

  }


  static sections(layout, config) {

    return {
      
      basicOptions: {
        intro : "Here you can modify the bottom x-axis general",
        title : "Basic Options",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[width]", 
                title : "Plot Width", 
                type : "number",
                min : 10,
                max : 2000,
                step : 10,
                value : layout.width,
                hint : "Sets the plot's width (in px).  Number greater than or equal to 10.  Default: 700."
              },
              {
                id : "layout[height]", 
                title : "Plot Height", 
                type : "number",
                min : 10,
                max : 2000,
                step : 10,
                value : layout.height,
                hint : "Sets the plot's height (in px). Number greater than or equal to 10.  Default: 450."
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "config[responsive]",
                title : "Responsive",
                type : "checkbox", 
                value : config.responsive === undefined ? false : config.responsive,
                hint: ""
              },
              {
                id : "config[staticPlot]",
                title : "Static",
                type : "checkbox", 
                value : config.staticPlot === undefined ? false : config.staticPlot,
                hint: ""
              },
             
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[paper_bgcolor]",
                title : "Paper Background Color",
                type : "color", 
                value : layout.paper_bgcolor,
                hint : "Sets the background color of the paper where the graph is drawn.  Default: #FFFFFF"
              },
              {
                id : "layout[plot_bgcolor]",
                title : "Plot Background Color",
                type : "color", 
                value : layout.plot_bgcolor,
                hint : "Sets the background color of the plotting area in-between x and y axes.  Default: #FFFFFF"
              },
            ]
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : "layout[margin][pad]", 
                title : "Chart Padding", 
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout.margin.pad,
                hint : "Sets the amount of padding (in px) between the plotting area and the axis lines.  Number greater than or equal to 0.  Default: 0"
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[margin][l]", 
                title : "Left Margin", 
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout.margin.l,
                hint : "Sets the left margin (in px). Number greater than or equal to 0.  Default: 80"
              },
              {
                id : "layout[margin][r]", 
                title : "Right Margin", 
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout.margin.r,
                hint : "Sets the right margin (in px). Number greater than or equal to 0.  Default: 80"
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[margin][t]", 
                title : "Top Margin", 
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout.margin.t,
                hint : "Sets the top margin (in px).Number greater than or equal to 0.  Default: 100"
              },
              {
                id : "layout[margin][b]", 
                title : "Bottom Margin", 
                type : "number",
                min : 0,
                max : 2000,
                step : 10,
                value : layout.margin.b,
                hint : "Sets the bottom margin (in px). Number greater than or equal to 0.  Default: 80"
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[margin][autoexpand]", 
                title : "Margin Auto Expand", 
                type : "checkbox",
                value : layout.margin === undefined && layout.margin.autoexpand === undefined ? false : layout.margin.autoexpand,
                hint : "Turns on/off margin expansion computations. Legends, colorbars, updatemenus, sliders, axis rangeselector and rangeslider are allowed to push the margins by defaults.  Default: true"
              },
              {
                id : "layout[autosize]", 
                title : "Auto Size on Relayout", 
                type : "checkbox",
                value : layout.autosize === undefined ? false : layout.autosize,
                hint : "Determines whether or not a layout width or height that has been left undefined by the user is initialized on each relayout. Note that, regardless of this attribute, an undefined layout width or height is always initialized on the first call to plot.  Default: true"
              },
            ]
          }
        ]
      },
     
    }

  }

}

export default BasicOPtions;


