import { fontFamily, colors } from './utilities'

class Trace {

  constructor( ) { }

  static defaultOptions(  index, name = null, x = null, y = null ) {

    return {

      type: 'pie',
      name: name,
      title: {
        text: '',
        font: {
          family: Object.keys(fontFamily())[12],
          size: 16,
          color: '#263238',
        },
        position: 'top center',
      },
      visible: true,
      showlegend: true,
      opacity: 1,
      values: y,
      labels: x,
      pull: 0,
      text: [],
      textposition: 'auto',
      hovertext: '',
      hoverinfo: 'all',
      domain: {
        x: [0,1],
        y: [0,1],
        row: 0,
        column: 0
      },
      automargin: true,
      marker: {
        colors: [],
        line: {
          color: '#444444',
          width: 0
        },
      },
      textfont: {
        family: 'Raleway',
        color: colors()[index],
        size: 12,
      },
      textinfo: null,
      direction: 'counterclockwise',
      hole: 0,
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
      insidetextfont: {
        font: {
          family: Object.keys(fontFamily())[12],
          size: 16,
          color: '#263238',
        },
      },
      insidetextorientation: 'auto',
      outsidetextfont: {
        font: {
          family: Object.keys(fontFamily())[12],
          size: 16,
          color: '#263238',
        },
      },
      rotation: 0,
      sort:true,
    }

  }

  static sections( trace, index ) {

    return {
      
      basicOptions: {
        intro : `Here you can modify the basic options of trace '${trace.name}'`,
        title : 'Basic Options',
        fieldGroups : [
          {
            cssClasses : ['field-group'],
            inputFields: [
              {
                id : `traces[${index}][type]`,  
                title : 'Type',  
                type : 'text',
                value : trace.type === undefined ? this.defaultOptions( index ).type :trace.type,
                disabled: false === trace.visible  ? true : false,
                hint : 'The trace name appear as the legend item and on hover.'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],     
            inputFields : [
              {
                id : `traces[${index}][visible]`,  
                title : 'Trace Visibility',  
                type : 'select',
                options : {
                  true : 'Visible',
                  false : 'Hidden',
                  legendonly : 'Legend Only',
                },
                value : trace.visible === undefined ? this.defaultOptions( index ).visible : true === trace.visible ? 'true' : false === trace.visible ? 'false' : trace.visible,
                hint : 'Determines whether or not this trace is visible. If \'legendonly\', the trace is not drawn, but can appear as a legend item (provided that the legend itself is visible). Default: visible'
              },
              {
                id : `traces[${index}][showlegend]`, 
                title : 'Show In Legend', 	
                type : 'checkbox',
                value : trace.showlegend === undefined ? false : trace.showlegend,
                disabled: false === trace.visible  ? true : false,
                hint : 'Determines whether or not an item corresponding to this trace is shown in the legend.'
              },
            ]
          },
          {
            cssClasses : ['field-group'],
            inputFields: [
              {
                id : `traces[${index}][name]`,  
                title : 'Name',  
                type : 'text',
                value : trace.name === undefined ? this.defaultOptions( index ).name :trace.name,
                disabled: false === trace.visible  ? true : false,
                hint : 'The trace name appear as the legend item and on hover.'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][pull]`, 
                title : 'Slice Pull', 
                type : 'number',
                min : 0,
                max : 1,
                step : 0.01,
                value : trace.pull === undefined ? this.defaultOptions( index ).pull : trace.pull,
                disabled: true !== trace.visible ? true : false,
                hint : 'Sets the fraction of larger radius to pull the sectors out from the center. This can be a constant to pull all slices apart from each other equally or an array to highlight one or more slices.'
              },
              
            ],
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],     
            inputFields : [
              {
                id : `traces[${index}][opacity]`, 
                title : 'Trace Opacity', 	
                type : 'number',
                min : 0,
                max : 1,
                step : 0.02,
                value : trace.opacity === undefined ? this.defaultOptions( index ).opacity : trace.opacity,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Sets the opacity of the trace.'
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
                value : trace.domain === undefined && trace.domain.row !== undefined ? this.defaultOptions( index ).domain.row : trace.domain.row,
                disabled: true !== trace.visible  ? true : false,
                hint : 'If there is a layout grid, use the domain for this row in the grid for this pie trace .'
              },
              {
                id : `traces[${index}][domain][column]`, 
                title : 'Domain Column', 	
                type : 'number',
                min: 0,
                max: 100,
                step: 1,
                value : trace.domain === undefined && trace.domain.column !== undefined ? this.defaultOptions( index ).domain.column: trace.domain.column,
                disabled: true !== trace.visible  ? true : false,
                hint : 'The number of columns in the grid. If you provide a 2D `subplots` array, the length of its longest row is used as the default. If you give an `xaxes` array, its length is used as the default. But it\'s also possible to have a different length, if you want to leave a row at the end for non-cartesian subplots.'
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
                value : trace.domain === undefined && trace.domain.x !== undefined ? this.defaultOptions( index ).domain.x : trace.domain.x,
                disabled: true !== trace.visible  ? true : false,
                hint : 'If there is a layout grid, use the domain for this row in the grid for this pie trace .'
              },
              {
                id : `traces[${index}][domain][y]`, 
                title : 'Domain Y', 	
                type : 'text',
                value : trace.domain === undefined && trace.domain.y !== undefined ? this.defaultOptions( index ).domain.y: trace.domain.y,
                disabled: true !== trace.visible  ? true : false,
                hint : 'The number of columns in the grid. If you provide a 2D `subplots` array, the length of its longest row is used as the default. If you give an `xaxes` array, its length is used as the default. But it\'s also possible to have a different length, if you want to leave a row at the end for non-cartesian subplots.'
              },
            ]
          },
          {
            cssClasses : ['field-group', 'fifty-fifty'],     
            inputFields : [
              {
                id : `traces[${index}][automargin]`, 
                title : 'Auto Margin', 	
                type : 'checkbox',
                value : trace.automargin === undefined ? this.defaultOptions( index ).automargin : trace.automargin,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Determines whether outside text labels can push the margins'
              },
              {
                id : `traces[${index}][hole]`, 
                title : 'Hole', 	
                type : 'number',
                min : 0,
                max : 1,
                step : 0.01,
                value : trace.hole === undefined ? this.defaultOptions( index ).hole : trace.hole,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Sets the fraction of the radius to cut out of the pie. Use this to make a donut chart.'
              },
            ]
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][sort]`, 
                title : 'Sort', 
                type : 'checkbox',
                value : trace.sort === undefined ? this.defaultOptions( index ).sort : trace.sort,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
            ],
          },
        ],
      },

      marker: {
        intro : `Here you can modify the markers of trace '${trace.name}`,
        title : 'Marker',
        fieldGroups : [
          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][marker][colors]`,  
                title : 'Colors',  
                type : 'text',
                value : trace.marker === undefined || trace.marker.colors === undefined ? this.defaultOptions( index ).marker.colors.join() : trace.marker.colors.join(),
                disabled: false === trace.visible || ( trace.mode !== undefined && ! trace.mode.includes( 'marker' ) ) ? true : false,
                hint : ''
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][marker][line][color]`, 
                title : 'Line Color', 	
                type : 'color',
                value : trace.marker === undefined || trace.marker.line === undefined || trace.marker.line.color === undefined ?  this.defaultOptions( index ).marker.line.color : trace.marker.line.color,
                disabled: false === trace.visible || ( trace.mode !== undefined && ! trace.mode.includes( 'marker' ) ) || ( trace.marker !== undefined && trace.marker.line !== undefined && trace.marker.width !== undefined && parseInt(trace.marker.line.width) === 0 ) ? true : false,
                hint : 'Sets themarker.linecolor. It accepts either a specific color or an array of numbers that are mapped to the colorscale relative to the max and min values of the array or relative to `marker.line.cmin` and `marker.line.cmax` if set.'
              },
              {
                id : `traces[${index}][marker][line][width]`, 
                title : 'Line Width', 	
                type : 'number',
                min : 0,
                max : 100,
                step : 1,
                value : trace.marker === undefined || trace.marker.line === undefined || trace.marker.line.width === undefined ? this.defaultOptions( index ).marker.line.width : trace.marker.line.width,
                disabled: false === trace.visible ||( trace.mode !== undefined && ! trace.mode.includes( 'marker' ) ) ? true : false,
                hint : 'Sets the width (in px) of the lines bounding the marker points.   Number or array of numbers greater than or equal to 0'
              },
            ],
          },
        ]
      },

      text: {
        intro : `Here you can modify the other of trace '${trace.name}`,
        title : 'Text',
        fieldGroups : [
          {        
            cssClasses : ['field-group'],
            inputFields: [
              {
                id : `traces[${index}][text]`, 
                title : 'Text', 	
                type : 'text',
                value : trace.text === undefined ? this.defaultOptions( index ).text.join() : trace.text.join(),
                disabled: true !== trace.visible ? true : false,
                hint : 'Sets text elements associated with each (x,y) pair. If a single string, the same string appears over all the data points. If an array of string, the items are mapped in order to the this trace\'s (x,y) coordinates. If trace `hoverinfo` contains a \'text\' flag and \'hovertext\' is not set, these elements will be seen in the hover labels.'
              },
              
            ],
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][textfont][family]`,
                title : 'Text Font',	
                type : 'select',
                options : fontFamily(),
                value : trace.textfont === undefined || trace.textfont.family === undefined ? this.defaultOptions( index ).textfont.family : trace.textfont.family,
                disabled: true !== trace.visible || ! trace.text ? true : false,
                hint: 'HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include \'Arial\', \'Balto\', \'Courier New\', \'Droid Sans\',, \'Droid Serif\', \'Droid Sans Mono\', \'Gravitas One\', \'Old Standard TT\', \'Open Sans\', \'Overpass\', \'PT Sans Narrow\', \'Raleway\', \'Times New Roman\'.'
              },
              {
                id : `traces[${index}][textfont][size]`, 
                title : 'Text Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.textfont === undefined || trace.textfont.size === undefined ? this.defaultOptions( index ).textfont.size : trace.textfont.size,
                disabled: true !== trace.visible || ! trace.text ? true : false,
                hint : 'number greater than or equal to 1'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][textfont][color]`,
                title : 'Text Font Color',
                type : 'color', 
                value : trace.textfont === undefined || trace.textfont.color === undefined ? this.defaultOptions( index ).textfont.color : trace.textfont.color,
                disabled: true !== trace.visible || ! trace.text ? true : false,
              }, 
              {
                id : `traces[${index}][textposition]`, 
                title : 'Text Position', 	
                type : 'select',
                options: {
                  inside: 'Inside',
                  outside: 'Outside',
                  auto: 'Auto',
                  nobe: 'None'
                },
                value : trace.textposition === undefined ? this.defaultOptions( index ).textposition : trace.textposition,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Specifies the location of the `textinfo`'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][textinfo]`, 
                title : 'Text Position', 	
                type : 'select',
                options: {
                  label: 'Label',
                  text: 'Text',
                  value: 'Value',
                  percent: 'Percent',
                  'label+text': 'Label & Text',
                  'label+value': 'Label & Value',
                  'label+percent': 'Label & Percent',
                  'text+value': 'Text & Value',
                  'text+percent': 'Text & Percent',
                  'value+percent': 'Value & Percent',
                  'label+text+value': 'Label & Text & Value',
                  'label+text+percent': 'Label & Text & Percent',
                  'text+value+percent': 'Text & Value & Percent',
                  none: 'None'
                },
                value : trace.textinfo === undefined ? this.defaultOptions( index ).textinfo : trace.textinfo,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Specifies the location of the `textinfo`'
              },
              {
                id : `traces[${index}][direction]`, 
                title : 'Text Position', 	
                type : 'select',
                options: {
                  clockwise: 'Clockwise',
                  counterclockwise: 'Counterclockwise',
                },
                value : trace.direction === undefined ? this.defaultOptions( index ).direction : trace.direction,
                disabled: true !== trace.visible  ? true : false,
                hint : 'Specifies the direction at which succeeding sectors follow one another.'
              },
            ],
          },
        ]
      },

      hoverlabel: {
        intro : `Here you can modify the other of trace '${trace.name}`,
        title : 'Hover Text & Label',
        fieldGroups : [
          // {
          //   cssClasses : ['field-group'],
          //   inputFields: [
          //     {
          //       id : `traces[${index}][hovertext]`, 
          //       title : 'Hover Text', 	
          //       type : 'text',
          //       value : trace.hovertext === undefined ?  Array.isArray( this.defaultOptions( index ).hovertext ) ? this.defaultOptions( index ).hovertext.join() : this.defaultOptions( index ).hovertext : Array.isArray( trace.hovertext ) ? trace.hovertext.join() : trace.hovertext,
          //       disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
          //       hint : 'Sets hover text elements associated with each (x,y) pair. If a single string, the same string appears over all the data points. If an array of string, the items are mapped in order to the this trace's (x,y) coordinates. To be seen, trace `hoverinfo` must contain a 'text' flag.'
          //     },
          //   ],
          // },
          {
            cssClasses : ['field-group', 'fifty-fifty'],
            inputFields: [
              {
                id : `traces[${index}][hoverlabel][align]`, 
                title : 'Hover Label Alignment', 
                type : 'select',
                options : {
                  auto : 'Auto',
                  left : 'Left',
                  right : 'Right',
                },
                value : trace.hoverlabel === undefined || trace.hoverlabel.align === undefined ? this.defaultOptions( index ).hoverlabel.align : trace.hoverlabel.align,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'Type: enumerated or array of enumerateds , one of ( \'left\' | \'right\' | \'auto\' ).  Sets the horizontal alignment of the text content within hover label box. Has an effect only if the hover label text spans more two or more lines.  Default: \'auto\''
              },
              {
                id : `traces[${index}][hoverlabel][namelength]`, 
                title : 'Hover Label Name Length', 
                type : 'number',
                min : -1,
                max : 1000,
                step : 1,
                value : trace.hoverlabel === undefined || trace.hoverlabel.namelength === undefined ? this.defaultOptions( index ).hoverlabel.namelength : trace.hoverlabel.namelength,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'Sets the default length (in number of characters) of the trace name in the hover labels for all traces. -1 shows the whole name regardless of length. 0-3 shows the first 0-3 characters, and an integer >3 will show the whole name if it is less than that many characters, but if it is longer, will truncate to `namelength - 3` characters and add an ellipsis.'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][hoverlabel][font][family]`,
                title : 'Hover Label Font',	
                type : 'select',
                options : fontFamily(),
                value : trace.hoverlabel === undefined || trace.hoverlabel.font === undefined || trace.hoverlabel.font.family === undefined ? this.defaultOptions( index ).hoverlabel.font.family : trace.hoverlabel.font.family,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint: 'HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include \'Arial\', \'Balto\', \'Courier New\', \'Droid Sans\',, \'Droid Serif\', \'Droid Sans Mono\', \'Gravitas One\', \'Old Standard TT\', \'Open Sans\', \'Overpass\', \'PT Sans Narrow\', \'Raleway\', \'Times New Roman\'.'
              },
              {
                id : `traces[${index}][hoverlabel][font][color]`,
                title : 'Hover Label Font Color',
                type : 'color', 
                value : trace.hoverlabel === undefined || trace.hoverlabel.font === undefined || trace.hoverlabel.font.color === undefined ? this.defaultOptions( index ).hoverlabel.font.color : trace.hoverlabel.font.color,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][hoverlabel][bgcolor]`,
                title : 'Hover label Bg. Color',
                type : 'color', 
                value : trace.hoverlabel === undefined || trace.hoverlabel.bgcolor === undefined ? this.defaultOptions( index ).hoverlabel.bgcolor : trace.hoverlabel.bgcolor,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint: 'Sets the background color of the hover labels for this trace'
              },
              {
                id : `traces[${index}][hoverlabel][font][size]`, 
                title : 'Hover Label Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.hoverlabel === undefined || trace.hoverlabel.font === undefined || trace.hoverlabel.font.size === undefined ? this.defaultOptions( index ).hoverlabel.font.size : trace.hoverlabel.font.size,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
            ],
          },




          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][insidetextfont][font][family]`,
                title : 'Hover Label Font',	
                type : 'select',
                options : fontFamily(),
                value : trace.insidetextfont === undefined || trace.insidetextfont.font === undefined || trace.insidetextfont.font.family === undefined ? this.defaultOptions( index ).insidetextfont.font.family : trace.insidetextfont.font.family,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint: 'HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include \'Arial\', \'Balto\', \'Courier New\', \'Droid Sans\',, \'Droid Serif\', \'Droid Sans Mono\', \'Gravitas One\', \'Old Standard TT\', \'Open Sans\', \'Overpass\', \'PT Sans Narrow\', \'Raleway\', \'Times New Roman\'.'
              },
              {
                id : `traces[${index}][insidetextfont][font][color]`,
                title : 'Hover Label Font Color',
                type : 'color', 
                value : trace.insidetextfont === undefined || trace.insidetextfont.font === undefined || trace.insidetextfont.font.color === undefined ? this.defaultOptions( index ).insidetextfont.font.color : trace.insidetextfont.font.color,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][insidetextfont][font][size]`, 
                title : 'Hover Label Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.insidetextfont === undefined || trace.insidetextfont.font === undefined || trace.insidetextfont.font.size === undefined ? this.defaultOptions( index ).insidetextfont.font.size : trace.insidetextfont.font.size,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
              {
                id : `traces[${index}][insidetextorientation]`, 
                title : 'Hover Label Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.insidetextorientation === undefined ? this.defaultOptions( index ).insidetextorientation : trace.insidetextorientation,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
            ],
          },




          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][outsidetextfont][font][family]`,
                title : 'Hover Label Font',	
                type : 'select',
                options : fontFamily(),
                value : trace.outsidetextfont === undefined || trace.outsidetextfont.font === undefined || trace.outsidetextfont.font.family === undefined ? this.defaultOptions( index ).outsidetextfont.font.family : trace.outsidetextfont.font.family,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint: 'HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include \'Arial\', \'Balto\', \'Courier New\', \'Droid Sans\',, \'Droid Serif\', \'Droid Sans Mono\', \'Gravitas One\', \'Old Standard TT\', \'Open Sans\', \'Overpass\', \'PT Sans Narrow\', \'Raleway\', \'Times New Roman\'.'
              },
              {
                id : `traces[${index}][outsidetextfont][font][color]`,
                title : 'Hover Label Font Color',
                type : 'color', 
                value : trace.outsidetextfont === undefined || trace.outsidetextfont.font === undefined || trace.outsidetextfont.font.color === undefined ? this.defaultOptions( index ).outsidetextfont.font.color : trace.outsidetextfont.font.color,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][outsidetextfont][font][size]`, 
                title : 'Hover Label Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.outsidetextfont === undefined || trace.outsidetextfont.font === undefined || trace.outsidetextfont.font.size === undefined ? this.defaultOptions( index ).outsidetextfont.font.size : trace.outsidetextfont.font.size,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
              {
                id : `traces[${index}][rotation]`, 
                title : 'Hover Label Font Size', 
                type : 'number',
                min : -360,
                max : 360,
                step : 1,
                value : trace.rotation === undefined ? this.defaultOptions( index ).rotation : trace.rotation,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint : 'number greater than or equal to 1'
              },
            ],
          },

      

          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][hoverinfo]`, 
                title : 'Hover Info.', 	
                type : 'select',
                options : {
                  all: 'All',
                  x : 'X',
                  y : 'Y',
                  text : 'Text',
                  name : 'Name',
                  'name+text': 'Name & Text',
                  none : 'None',
                  skip: 'Skip',
                },
                value : trace.hoverinfo === undefined ? this.defaultOptions( index ).hoverinfo : trace.hoverinfo,
                disabled: true !== trace.visible ? true : false,
                hint : 'Any combination of \'x\', \'y\', \'z\', \'text\', \'name\' joined with a \'+\' OR \'all\' or \'none\' or \'skip\'. Examples: \'x\', \'y\', \'x+y\', \'x+y+z\', \'all\'.  Determines which trace information appear on hover. If `none` or `skip` are set, no information is displayed upon hovering. But, if `none` is set, click and hover events are still fired.  Default: \'all\''
              },
              {
                id : `traces[${index}][hoverlabel][bordercolor]`,
                title : 'Hover label Border Color',
                type : 'color', 
                value : trace.hoverlabel === undefined || trace.hoverlabel.font === undefined || trace.hoverlabel.font.bordercolor === undefined ? this.defaultOptions( index ).hoverlabel.font.bordercolor : trace.hoverlabel.font.bordercolor,
                disabled: true !== trace.visible || 'skip' === trace.hoverinfo ||  'none' === trace.hoverinfo ? true : false,
                hint: 'Sets the border color of the hover labels for this trace.'
              },
            ],
          },
        ]
      },

      title: {
        intro : `Here you can modify the other of trace '${trace.name}`,
        title : 'Title',
        fieldGroups : [
          {
            cssClasses : ['field-group'],
            inputFields: [
              {
                id : `traces[${index}][title][text]`, 
                title : 'TitleText', 	
                type : 'text',
                value : trace.title === undefined || trace.title.text === undefined ? this.defaultOptions( index ).title.text : trace.title.text,
                disabled: true !== trace.visible ? true : false,
                hint : 'Sets hover text elements associated with each (x,y) pair. If a single string, the same string appears over all the data points. If an array of string, the items are mapped in order to the this trace\'s (x,y) coordinates. To be seen, trace `hoverinfo` must contain a \'text\' flag.'
              },
            ],
          },
          {
            cssClasses : ['field-group', 'sixty-forty'],
            inputFields: [
              {
                id : `traces[${index}][title][font][family]`,
                title : 'Title Font',	
                type : 'select',
                options : fontFamily(),
                value : trace.title === undefined || trace.title.font === undefined || trace.title.font.family === undefined ? this.defaultOptions( index ).title.font.family : trace.title.font.family,
                disabled: true !== trace.visible || ! trace.title.text ? true : false,
                hint: 'HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include \'Arial\', \'Balto\', \'Courier New\', \'Droid Sans\',, \'Droid Serif\', \'Droid Sans Mono\', \'Gravitas One\', \'Old Standard TT\', \'Open Sans\', \'Overpass\', \'PT Sans Narrow\', \'Raleway\', \'Times New Roman\'.'
              },
              {
                id : `traces[${index}][title][font][color]`,
                title : 'Title Font Color',
                type : 'color', 
                value : trace.title === undefined || trace.title.font === undefined || trace.title.font.color === undefined ? this.defaultOptions( index ).title.font.color : trace.title.font.color,
                disabled: true !== trace.visible || ! trace.title.text ? true : false,
              },
            ],
          },
          {
            cssClasses : ['field-group', 'forty-sixty'],
            inputFields: [
              {
                id : `traces[${index}][title][font][size]`, 
                title : 'Title Font Size', 
                type : 'number',
                min : 1,
                max : 100,
                step : 0.5,
                value : trace.title === undefined || trace.title.font === undefined || trace.title.font.size === undefined ? this.defaultOptions( index ).title.font.size : trace.title.font.size,
                disabled: true !== trace.visible || ! trace.title.text ? true : false,
                hint : 'number greater than or equal to 1'
              },
              {
                id : `traces[${index}][title][position]`, 
                title : 'Title position', 
                type : 'select',
                options : {
                  'top left': 'Top Left',
                  'top center': 'Top Center',
                  'top right': 'Top Right',
                  'middle center': 'Middle Center',
                  'bottom left': 'Bottom Left',
                  'bottom center': 'Bottom Center',
                  'bottom right': 'Bottom Right'
                },
                value : trace.title === undefined || trace.title.position === undefined ? this.defaultOptions(index, chartposition).title.position : trace.title.position,
                disabled: true !== trace.visible || ! trace.title.text ? true : false,
                hint : 'Specifies the location of the `title`. Note that the title\'s position used to be set by the now deprecated `titleposition` attribute.'
              },
            ],
          },
        ]
      },

    }
  }

}

export default Trace;