import { fontFamily } from "./utilities"

class Title {

  constructor() { }

  static defaultOptions() {

    return {

      title : {
        text: "Ge 8.0 - 12.0 &#181;m",
        x: 0.1,
        y: 0.9,
        font: {
          family: Object.keys(fontFamily())[12],
          size: 18,
          color: "#000a12",
        },
      }
    
    }
     
  }


  static sections( layout ) {

    return {
    
      chartTitle : {
        intro : "Here you can modify the plot title basic options",
        title : "",
        fieldGroups : [
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : "layout[title][text]",
                cssClasses: ["no-hint"],
                title : "Chart Title",
                type : "text", 
                value : layout.title !== undefined && layout.title.text !== undefined ? layout.title.text: this.defaultOptions().title.title.text,
              },
              {
                id : "layout[title][font][color]",
                title : "Font Color",
                type : "color", 
                value : layout.title !== undefined && layout.title.font !== undefined && layout.title.font.color !== undefined ? layout.title.font.color : this.defaultOptions().title.font.color,
                disabled: ! layout.title.text  ? true : false,
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : "layout[title][font][family]",
                title : "Font Family",	
                type : "select",
                options : fontFamily(),
                value : layout.title !== undefined && layout.title.font !== undefined && layout.title.font.family !== undefined ? layout.title.font.family : this.defaultOptions().title.font.family,
                disabled: ! layout.title.text  ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : "layout[title][font][size]", 
                title : "Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout.title !== undefined && layout.title.font !== undefined && layout.title.font.size !== undefined ? layout.title.font.size : this.defaultOptions().title.font.size,
                disabled: ! layout.title.text  ? true : false,
                hint : "number greater than or equal to 1"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : "layout[title][x]",
                title : "Horizontal Position",	
                type : "number",
                min : 0,
                max : 1,
                step : 0.01,
                value : layout.title !== undefined && layout.title.x ? layout.title.x : this.defaultOptions().title.x,
                disabled: ! layout.title.text  ? true : false,
                hint: "Sets the x position from '0' (left) to '1' (right)."
              },
              {
                id : "layout[title][y]",
                title : "Vertical Position",	
                type : "number",
                min : 0,
                max : 1,
                step : 0.01,
                value : layout.title !== undefined && layout.title.y ? layout.title.y : this.defaultOptions().title.y,
                disabled: ! layout.title.text  ? true : false,
                hint: "Sets the y position from '0' (bottom) to '1' (top)."
              },
            ],
          },
        ]  
      },
     
    }
    
  }

}

export default Title


