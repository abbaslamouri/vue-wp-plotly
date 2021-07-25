import { fontFamily } from "./utilities"

class Grid {

  constructor() { }

  static defaultOptions() {

    return {

      

      grid : {
        rows: 1,
        columns: 1,
        pattern: 'independent'
      //   text: "",
      //   x: 0.1,
      //   y: 0.9,
      //   font: {
      //     family: Object.keys(fontFamily())[12],
      //     size: 14,
      //     color: "#000a12",
      //   },
      //   // pad: {
      //   //   l: 0,
      //   //   r: 0,
      //   //   t: 0,
      //   //   b: 0,
      //   // },
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
                id : "layout[grid][rows]",
                title : "Rows",
                type : "number", 
                value : layout.grid !== undefined && layout.grid.rows !== undefined ? layout.grid.rows : this.defaultOptions().grid.rows,
                hint: "Integer greater than or equal to 1.  The number of rows in the grid. If you provide a 2D `subplots` array or a `yaxes` array, its length is used as the default. But it's also possible to have a different length, if you want to leave a row at the end for non-cartesian subplots."
              },
              {
                id : "layout[grid][columns]",
                title : "Columns",
                type : "number", 
                value : layout.grid !== undefined && layout.grid.columns !== undefined ? layout.grid.columns : this.defaultOptions().grid.columns,
                // disabled: ! layout.title.text  ? true : false,
                hint: "Integer greater than or equal to 1.  The number of columns in the grid. If you provide a 2D `subplots` array, the length of its longest row is used as the default. If you give an `xaxes` array, its length is used as the default. But it's also possible to have a different length, if you want to leave a row at the end for non-cartesian subplots."
              },
            ],
          },
        ]  
      },
     
    }
    
  }

}

export default Grid


