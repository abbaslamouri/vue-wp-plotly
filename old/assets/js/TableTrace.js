import { fontFamily, colors } from './utilities'

class Trace {

  constructor( ) { }

  static defaultOptions( index, name = null, x = null, y = null ) {

    return {
      rounding: 1,
      firstColAlign: 'center',
      evenRowColor: '#b0bec5',
      oddRowColor: '#e2f1f8',
      columnwidth:[],
      type: 'table',
      name: name,
      visible: true,
      hoverinfo: 'all',
      domain: {
        x: [.65,1],
        y: [0,1],
        row: null,
        column: null
      },
      cells:{
        values: y,
        prefix: null,
        suffix: null,
        height: 20,
        align : 'center',
        line: {
          width: 1,
          color: '#263238',
        },
        fill: {
          color: '#e2f1f8',
        },
        font : {
          family :Object.keys(fontFamily())[12],
          size : 12,
          color : '#000a12',
        },
      },
      header:{
        values: x,
        prefix: null,
        suffix: null,
        height: 28,
        align : 'center',
        line: {
          width: 1,
          color: '#263238',
        },
        fill: {
          color: '#000a12',
        },
        font : {
          family :Object.keys(fontFamily())[12],
          size : 14,
          color : '#eeeeee',
        }
      },
      hoverlabel: {
        bgcolor: colors()[index],
        bordercolor : '#000000',
        font: {
          family: 'Raleway',
          color: '#FFFFFF',
          size: 12,
        },
        align: 'auto',
        namelength: 15,
      },
      

    }

  }

  static sections( trace, index ) {

    return {
      basicOptions: {
        intro : `Here you can modify the basic options of trace '${trace.name}'`,
        title : 'Basic Options',
        fieldGroups : [
          {
            cssClasses : ['field-group', 'sixty-forty'],     
            inputFields : [
              {
                id : `traces[${index}][type]`,  
                title : 'Trace Type',  
                type : 'text',
                value : trace.type === undefined ? this.defaultOptions(index).type : trace.type,
                readonly : true
              },
              {
                id : `traces[${index}][columnwidth]`,  
                title : 'Column Width',  
                type : 'text',
                value : trace.columnwidth === undefined ? this.defaultOptions(index).columnwidth : trace.columnwidth,
                readonly : true
              },
            
            ]
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],     
            inputFields : [
              {
                id : `traces[${index}][firstColAlign]`,  
                title: 'First Column Alignment',
                type: 'select',
                options: {
                  left: 'Left',
                  center: 'Center',
                  right: 'Right'
                },
                value : trace.firstColAlign === undefined ? this.defaultOptions(index).firstColAlign : trace.firstColAlign,
                hint : 'Determines whether or not this trace is visible. If \'legendonly\', the trace is not drawn, but can appear as a legend item (provided that the legend itself is visible).'
              },
              {
                id : `traces[${index}][rounding]`, 
                title : 'Number Rounding', 
                  type : 'number',
                  min : 0,
                  max : 6,
                  step : 1,
                value : trace.rounding === undefined ? this.defaultOptions(index).rounding : trace.rounding,
                // disabled: false === trace.visible  ? true : false,
                hint : 'Determines whether or not an item corresponding to this trace is shown in the legend.'
              },
            ]
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],     
            inputFields : [
              {
                id : `traces[${index}][domain][row]`, 
                title : 'Domain Row', 	
                type : 'number',
                min: 0,
                max: 100,
                step: 1,
                value : trace.domain === undefined && trace.domain.row === undefined ? this.defaultOptions( index ).domain.row : trace.domain.row,
                disabled: true !== trace.visible  ? true : false,
                hint : 'If there is a layout grid, use the domain for this row in the grid for this table trace .'
              },
              {
                id : `traces[${index}][domain][column]`, 
                title : 'Domain Column', 	
                type : 'number',
                min: 0,
                max: 100,
                step: 1,
                value : trace.domain === undefined && trace.domain.column === undefined ? this.defaultOptions( index ).domain.row : trace.domain.column,
                disabled: true !== trace.visible  ? true : false,
                hint : 'If there is a layout grid, use the domain for this column in the grid for this table trace .'
              },
            ]
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],     
            inputFields : [
              {
                id : `traces[${index}][domain][x]`, 
                title : 'Domain X', 	
                type : 'text',
                value : trace.domain === undefined && trace.domain.x === undefined ? this.defaultOptions( index ).domain.x.join() : trace.domain.x.join(),
                disabled: true !== trace.visible  ? true : false,
                hint : 'Sets the horizontal domain of this table trace (in plot fraction).'
              },
              {
                id : `traces[${index}][domain][y]`, 
                title : 'Domain Y', 	
                type : 'text',
                value : trace.domain === undefined && trace.domain.y === undefined ? this.defaultOptions( index ).domain.y.join() : trace.domain.y.join(),
                disabled: true !== trace.visible  ? true : false,
                hint : 'Sets the vertical domain of this table trace (in plot fraction).'
              },
            ]
          },
        ],
      },
      header: {
        intro : `Here you can modify the markers of trace '${trace.name}`,
        title : 'Header',
        fieldGroups : [
          {
            cssClasses : ['field-group', 'fifty-fifty'],
            inputFields: [
              {
                id : `traces[${index}][header][line][width]`, 
                title : 'Border Line Width', 
                type : 'number',
                min : 0,
                max : 2000,
                step : 1,
                value : trace.header.line.width === undefined ? this.defaultOptions(index).header.line.width : trace.header.line.width,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
              {
                id : `traces[${index}][header][line][color]`, 
                title: 'Border Line Color',
                type: 'color',
                value : trace.header.line.color === undefined ? this.defaultOptions(index).header.line.color : trace.header.line.color,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
            ]
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],
            inputFields: [
              {
                id : `traces[${index}][header][fill][color]`, 
                title: 'Fill Color',
                type: 'color',
                value : trace.header.fill.color === undefined ? this.defaultOptions(index).header.fill.color : trace.header.fill.color,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
              {
                id : `traces[${index}][header][font][family]`, 
                title : 'Font Family',	
                type : 'select',
                options : fontFamily(),
                value : trace.header.font.family === undefined ? this.defaultOptions(index).header.font.family : trace.header.font.family,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
            ],
          },
          {
            cssClasses : ['field-group'],
            inputFields: [
              {
                id : `traces[${index}][header][height]`,  
                title : 'Row Height', 
                type : 'number',
                min : 0,
                max : 2000,
                step : 1,
                value : trace.header.height === undefined ? this.defaultOptions(index).header.height : trace.header.height,
                // disabled: false === trace.visible  ? true : false,
                hint : 'Sets the trace name. The trace name appear as the legend item and on hove'
              },
              {
                id : `traces[${index}][header][align]`,  
                title: 'Alignment',
                  type: 'select',
                  options: {
                    left: 'Left',
                    center: 'Center',
                    right: 'Right'
                  },
                value : trace.header.align === undefined ? this.defaultOptions(index).header.align : trace.header.align,
                // disabled: false === trace.visible  ? true : false,
                hint : 'Sets the trace name. The trace name appear as the legend item and on hove'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],
            inputFields: [
              {
                id : `traces[${index}][header][font][size]`, 
                title : 'Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.header.font.size === undefined ? this.defaultOptions(index).header.font.size : trace.header.font.size,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
              {
                id : `traces[${index}][header][font][color]`, 
                title : 'Font Color',
                type : 'color', 
                value : trace.header.font.color === undefined ? this.defaultOptions(index).header.font.color : trace.header.font.color,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
            ],
          },
        ]
      },
      cells: {
        intro : `Here you can modify the lines of trace '${trace.name}`,
        title : 'Cells',
        fieldGroups : [
          {
            cssClasses : ['field-group', 'fifty-fifty'],
            inputFields: [
              {
                id : `traces[${index}][cells][height]`,  
                title : 'Row Height', 
                type : 'number',
                min : 0,
                max : 2000,
                step : 1,
                value : trace.cells.height === undefined ? this.defaultOptions(index).cells.height : trace.cells.height,
                // disabled: false === trace.visible  ? true : false,
                hint : 'Sets the trace name. The trace name appear as the legend item and on hove'
              },
              {
                id : `traces[${index}][cells][align]`,  
                title: 'Alignment',
                  type: 'select',
                  options: {
                    left: 'Left',
                    center: 'Center',
                    right: 'Right'
                  },
                value : trace.cells.align === undefined ? this.defaultOptions(index).cells.align : trace.cells.align,
                // disabled: false === trace.visible  ? true : false,
                hint : 'Sets the trace name. The trace name appear as the legend item and on hove'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][cells][line][width]`, 
                title : 'Border Line Width', 
                type : 'number',
                min : 0,
                max : 2000,
                step : 1,
                value : trace.cells.line.width === undefined ? this.defaultOptions(index).cells.line.width : trace.cells.line.width,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
              {
                id : `traces[${index}][cells][line][color]`, 
                title: 'Border Line Color',
                type: 'color',
                value : trace.cells.line.color === undefined ? this.defaultOptions(index).cells.line.color : trace.cells.line.color,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
            ],
          },
          {
            cssClasses : ['field-group'],     
            inputFields : [
              {
                id : `traces[${index}][evenRowColor]`, 
                title: 'Even Row Color',
                type: 'color',
                value : trace.evenRowColor === undefined ? this.defaultOptions(index).evenRowColor : trace.evenRowColor,
                // disabled: true !== trace.visible  ? true : false,
                hint : 'Determines the drawing mode for this scatter trace. If the provided `mode` includes \'text\' then the `text` elements appear at the coordinates. Otherwise, the `text` elements appear on hover. If there are less than 20 points and the trace is not stacked then the default is \'lines+markers\'. Otherwise, \'lines\'.'
              },
              {
                id : `traces[${index}][oddRowColor]`, 
                title: 'Even Row Color',
                type: 'color',
                value : trace.oddRowColor === undefined ? this.defaultOptions(index).oddRowColor : trace.oddRowColor,
                // disabled: true !== trace.visible  ? true : false,
                hint : 'Determines the drawing mode for this scatter trace. If the provided `mode` includes \'text\' then the `text` elements appear at the coordinates. Otherwise, the `text` elements appear on hover. If there are less than 20 points and the trace is not stacked then the default is \'lines+markers\'. Otherwise, \'lines\'.'
              },
            ]
          },
          {
            cssClasses : ['field-group'],
            inputFields: [
              // {
              //   id : `traces[${index}][cells][fill][color]`, 
              //   title: 'Fill Color',
              //   type: 'color',
              //   value : trace.cells.fill.color === undefined ? this.defaultOptions(index).cells.fill.color : trace.cells.fill.color,
              //   // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
              //   hint : 'Sets a reference between this trace's x coordinates and a 2D cartesian x axis. If 'x' (the default value), the x coordinates refer to `layout.xaxis`. If 'x2', the x coordinates refer to `layout.xaxis2`, and so on.'
              // },
              {
                id : `traces[${index}][cells][font][family]`, 
                title : 'Font Family',	
                type : 'select',
                options : fontFamily(),
                value : trace.cells.font.family === undefined ? this.defaultOptions(index).cells.font.family : trace.cells.font.family,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              }
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][cells][font][size]`, 
                title : 'Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.cells.font.size === undefined ? this.defaultOptions(index).cells.font.size : trace.cells.font.size,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              },
              {
                id : `traces[${index}][cells][font][color]`, 
                title : 'Font Color',
                type : 'color', 
                value : trace.cells.font.color === undefined ? this.defaultOptions(index).cells.font.color : trace.cells.font.color,
                // disabled: true !== trace.visible || ! trace.showlegend  ? true : false,
                hint : 'Sets a reference between this trace\'s x coordinates and a 2D cartesian x axis. If \'x\' (the default value), the x coordinates refer to `layout.xaxis`. If \'x2\', the x coordinates refer to `layout.xaxis2`, and so on.'
              }
            ]
          }
        ]
      }
    }
     
  }

}

export default Trace;