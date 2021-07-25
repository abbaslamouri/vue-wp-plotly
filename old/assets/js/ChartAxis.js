
import floatRound from 'lodash.round'
import { fontFamily } from "./utilities"

class ChartAxis  {

  constructor( ) { }

  static defaultOptions( axisId, axisSide, axisOverlaying, axisTitleText, axisMatches ) {

    const rangesliderOptions =  {

      rangeslider: {
        visible: true,
        thickness: 0.12,
        bgcolor: "#FFFFFF",
        borderwidth: 1,
        bordercolor: "#444444"
      }

    }

    const axisOptions = {

      visible : true,
      type : "-",
      side: axisSide,
      domain: [0,1],
      autotypenumbers : "convert types",
      autorange : true,
      fixedrange : true,
      rangemode : "normal",
      range : [],
      mirror: true,
      anchor: null,
      position: null,
      matches: axisMatches,
      overlaying: axisOverlaying,
      automargin: true,
      title: {
        text: axisTitleText,
        font: {
          family: Object.keys(fontFamily())[12],
          size: 16,
          color: "#263238",
        },
        standoff: 20,
      },
      ticks: "outside",
      tickmode: "auto",
      nticks: null,
      tick0: null,
      dtick: null,
      tickvals: [],
      ticktext: [],
      ticklabelposition: "outside",
      ticklen: 10,
      tickwidth: 1,
      tickcolor: "#CCCCCC",
      showticklabels: true,
      ticklabelposition: "outside",
      tickfont: {
        family: Object.keys(fontFamily())[12],
        size: 14,
        color: "#444444",
      },
      tickangle: "auto",
      showtickprefix: "none",
      tickprefix: "",
      showticksuffix: "none",
      ticksuffix: "",
      showline: false,
      linecolor: "#444444",
      linewidth: 1,
      showgrid: true,
      gridcolor: "#EEEEEE",
      gridwidth: 1,
      zeroline: false,
      zerolinecolor:"#444444",
      zerolinewidth: 1,
      showspikes: true,
      spikemode: "toaxis",
      spikecolor: "#000a12",
      spikethickness: 2,
      spikedash: "dash",
      showexponent: "all",
      exponentformat:"B",
      minexponent: 3,
      separatethousands: true,

    }

    if ( axisId.includes( "xaxis" ) ) return { ...axisOptions, ...rangesliderOptions }
    return axisOptions
  
  }


  static sections( layout, axisId, axisSide, axisOverlaying, axisTitleText, axisMatches ) {

    layout[axisId].range = [floatRound( layout[axisId].range[0], 3), floatRound( layout[axisId].range[1], 3) ]

    const axisSideOptions = axisId.includes( "xaxis" ) ? { bottom: "Bottom", top: "Top" } : axisId.includes( "yaxis" ) ? { left: "Left", right: "Right" } : null

    const axisSections = {

      basicOptions: {
        intro : "Here you can modify the bottom x-axis general",
        title : "Basic Options",
        fieldGroups : [
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[${axisId}][visible]`,
                title : "Show",	
                type : "checkbox",
                value : layout[axisId].visible !== undefined ? layout[axisId].visible : false,
                hint: "A single toggle to hide the axis while preserving interaction like dragging. Default is true when a cheater plot is present on the axis, otherwise false"
              },
              {
                id : `layout[${axisId}][type]`,
                title : "Type",	
                type : "select",
                options : {
                  "-": "Default",
                  linear: "Linear",
                  log: "Log",
                  date: "Date",
                  category: "Category",
                  multicategory:"Multi category"
                },
                value : layout[axisId].type !== undefined ? layout[axisId].type : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).type,
                disabled: ! layout[axisId].visible  ? true : false,
                hint: "Sets the axis type. By default, plotly attempts to determined the axis type by looking into the data of the traces that referenced the axis in question.  Default: '-'"
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][side]`, 
                title : "Side", 
                type : "select",
                options : axisSideOptions,
                value : layout[axisId].side !== undefined ? layout[axisId].side : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).side,
                disabled: ! layout[axisId].visible  ? true : false,
                hint : "Determines whether a x (y) axis is positioned at the 'bottom' ('left') or 'top' ('right') of the plotting area."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][autotypenumbers]`,
                title : "Auto Type Numbers",	
                type : "select",
                options : {
                  "convert types": "Convert Types",
                  strict: "Strict",
                },
                value : layout[axisId].autotypenumbers !== undefined ? layout[axisId].autotypenumbers : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).autotypenumbers,
                disabled: ! layout[axisId].visible  ? true : false,
                hint: "Using 'strict' a numeric string in trace data is not converted to a number. Using 'convert types' a numeric string in trace data may be treated as a number during automatic axis `type` detection. Defaults to layout.autotypenumbers."
              },
              {
                id : `layout[${axisId}][autorange]`,
                title : "Auto Range",	
                type : "select",
                options : {
                  true: "Normal",
                  false: "Disabled",
                  reversed: "Reversed"
                },
                value : layout[axisId].autorange !== undefined ? layout[axisId].autorange : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).autorange,
                disabled: ! layout[axisId].visible || layout[axisId].type !== "linear" ? true : false,
                hint: "Determines whether or not the range of this axis is computed in relation to the input data. See `rangemode` for more info. If `range` is provided, then `autorange` is set to 'false'."
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[${axisId}][fixedrange]`,
                title : "Fixed Range",	
                type : "checkbox",
                value : layout[axisId].fixedrange !== undefined ? layout[axisId].fixedrange: false,
                disabled: ! layout[axisId].visible  ? true : false,
                hint: "Determines whether or not this axis is zoom-able. If true, then zoom is disabled."
              },
              {
                id : `layout[${axisId}][rangemode]`,
                title : "Range Mode",	
                type : "select",
                options : {
                  normal: "Normal",
                  tozero: "To Zero",
                  nonnegative: "Non Negative"
                },
                value : layout[axisId].rangemode !== undefined ? layout[axisId].rangemode : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangemode,
                disabled: ! layout[axisId].visible || ! layout[axisId].autorange ? true : false,
                hint: "If 'normal', the range is computed in relation to the extrema of the input data. If 'tozero'`, the range extends to 0, regardless of the input data If 'nonnegative', the range is non-negative, regardless of the input data. Applies only to linear axes."
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][range]`,
                title : "Range",	
                type : "text",
                value : layout[axisId].range === undefined ? this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangemode.join() : layout[axisId].range.join(),
                disabled: ! layout[axisId].visible ? true : false,
                // disabled: ( ! layout[axisId].visible  || layout[axisId].autorange ) ? true : false,
                hint: "Sets the range of this axis. If the axis `type` is 'log', then you must take the log of your desired range (e.g. to set the range from 1 to 100, set the range from 0 to 2). If the axis `type` is 'date', it should be date strings, like date data, though Date objects and unix milliseconds will be accepted and converted to strings. If the axis `type` is 'category', it should be numbers, using the scale where each category is assigned a serial number from zero in the order it appears."
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : `layout[${axisId}][mirror]`,
                title : "Mirror",	
                type : "select",
                options : {
                  true: "Enabled",
                  ticks: "Ticks",
                  false: "Disabled",
                  all: "All",
                  allticks: "All Ticks",
                },
                value : layout[axisId].mirror !== undefined ? layout[axisId].mirror : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).mirror,
                disabled: ! layout[axisId].visible ? true : false,
                hint: "Determines if the axis lines and/or ticks are mirrored to the opposite side of the plotting area. If 'true', the axis lines are mirrored. If 'ticks', the axis lines and ticks are mirrored. If 'false', mirroring is disable. If 'all', axis lines are mirrored on all shared-axes subplots. If 'allticks', axis lines and ticks are mirrored on all shared-axes subplots."
              },
              {
                id : `layout[${axisId}][automargin]`,
                title : "Auto Margin",	
                type : "checkbox",
                value : layout[axisId].automargin !== undefined ? layout[axisId].automargin : false,
                disabled: ! layout[axisId].visible ? true : false,
                hint: "Determines whether long tick labels automatically grow the figure margins."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][anchor]`, 
                title : "Axis Anchor", 
                type : "text",
                value : layout[axisId].anchor !== undefined ? layout[axisId].anchor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).anchor,
                hint : "If set to an opposite-letter axis id (e.g. `x2`, `y`), this axis is bound to the corresponding opposite-letter axis. If set to 'free', this axis' position is determined by `position`.  Set anchor and position to null to ignore both"
              },
              {
                id : `layout[${axisId}][position]`, 
                title : "Axis Position", 
                type : "number",
                min : 0,
                max : 1,
                step : 0.05,
                value : layout[axisId].position !== undefined ? layout[axisId].position : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).position,
                disabled: ! layout[axisId].visible ? true : false,
                hint : "Sets the position of this axis in the plotting space (in normalized coordinates). Only has an effect if `anchor` is set to 'free'. Set anchor and position to null to ignore both"
              },       
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][overlaying]`, 
                title : "Overlaying", 
                type : "text",
                value : layout[axisId].overlaying !== undefined ? layout[axisId].overlaying : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).overlaying,
                hint : "If set a same-letter axis id, this axis is overlaid on top of the corresponding same-letter axis, with traces and axes visible for both axes. If 'false', this axis does not overlay any same-letter axes. In this case, for axes with overlapping domains only the highest-numbered axis will be visible."
              },
              {
                id : `layout[${axisId}][matches]`, 
                title : "Matches", 
                type : "text",
                value : layout[axisId].matches !== undefined ? layout[axisId].matches : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).matches,
                hint : "If set a same-letter axis id, this axis is overlaid on top of the corresponding same-letter axis, with traces and axes visible for both axes. If 'false', this axis does not overlay any same-letter axes. In this case, for axes with overlapping domains only the highest-numbered axis will be visible."
              },
            ]
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][domain]`, 
                title : "domain", 
                type : "text",
                value : layout[axisId].domain !== undefined ? layout[axisId].domain : this.defaultOptions(axisId, axisSide, axisdomain, axisTitleText, axisMatches).domain,
                hint : "If set a same-letter axis id, this axis is overlaid on top of the corresponding same-letter axis, with traces and axes visible for both axes. If 'false', this axis does not overlay any same-letter axes. In this case, for axes with overlapping domains only the highest-numbered axis will be visible."
              },
            ]
          },
        ],
      },

      title: {
        intro : "Here you can modify the bottom x-axis title",
        title : "Title",
        fieldGroups : [
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][title][text]`,
                title : "Title",
                type : "text", 
                value : layout[axisId].title !== undefined && layout[axisId].title.text !== undefined ? layout[axisId].title.text : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).title.text,
                disabled: ! layout[axisId].visible  ? true : false,
                hint: "Sets the title of the y-axis."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][title][font][family]`,
                title : "Font",	
                type : "select",
                options : fontFamily(),
                value : layout[axisId].title !== undefined && layout[axisId].title.font !== undefined  && layout[axisId].title.font.family !== undefined ? layout[axisId].title.font.family : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).title.font.family,
                disabled: ! layout[axisId].visible || ! layout[axisId].title.text ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : `layout[${axisId}][title][font][size]`, 
                title : "Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout[axisId].title !== undefined && layout[axisId].title.font !== undefined && layout[axisId].title.font.size !== undefined ? layout[axisId].title.font.size : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).title.font.size,
                disabled: ! layout[axisId].visible || ! layout[axisId].title.text ? true : false,
                hint : "number greater than or equal to 1"
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[${axisId}][title][font][color]`,
                title : "Color",
                type : "color", 
                value : layout[axisId].title !== undefined && layout[axisId].title.font !== undefined && layout[axisId].title.font.color !== undefined ? layout[axisId].title.font.color  : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).title.font.color ,
                disabled: ! layout[axisId].visible || ! layout[axisId].title.text ? true : false,
              },
              {
                id : `layout[${axisId}][title][standoff]`,
                title : "Standoff ",
                type : "number",
                min : 0,
                max : 2000,
                step : 0.5,
                value : layout[axisId].title !== undefined && layout[axisId].title.standoff !== undefined ? layout[axisId].title.standoff : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).title.standoff,
                disabled: ! layout[axisId].visible || ! layout[axisId].title.text ? true : false,
                hint: "Sets the standoff distance (in px) between the axis labels and the title text The default value is a function of the axis tick labels, the title `font.size` and the axis `linewidth`. Note that the axis title position is always constrained within the margins, so the actual standoff distance is always less than the set or default value. By setting `standoff` and turning on `automargin`, plotly.js will push the margins to fit the axis title at given standoff distance."
              }
            ],
          }
        ]
      },

      ticks: {
        intro : "Here you can modify the bottom x-axis ticks",
        title : "Ticks",
        fieldGroups : [
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : `layout[${axisId}][ticks]`,
                title : "Show Ticks",	
                type : "select",
                options : {
                  "": "Hidden",
                  inside: "Inside",
                  outside: "Outside"
                },
                value : layout[axisId].ticks !== undefined ? layout[axisId].ticks : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).ticks,
                disabled: ! layout[axisId].visible  ? true : false,
                hint: "Determines whether ticks are drawn or not. If '', this axis' ticks are not drawn. If 'outside' ('inside'), this axis' are drawn outside (inside) the axis lines."
              },
              {
                id : `layout[${axisId}][ticklen]`,
                title : "Tick Length",	
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout[axisId].ticklen !== undefined ? layout[axisId].ticklen : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).ticklen,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" ? true : false,
                hint: "Sets the tick length (in px)."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][tickmode]`,
                title : "Tick Mode",	
                type : "select",
                options : {
                  auto: "Auto",
                  linear: "Linear",
                  array: "Array"
                },
                value : layout[axisId].tickmode !== undefined ? layout[axisId].tickmode : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickmode,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" ? true : false,
                hint: "Sets the tick mode for this axis. If 'auto', the number of ticks is set via `nticks`. If 'linear', the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick` ('linear' is the default value if `tick0` and `dtick` are provided). If 'array', the placement of the ticks is set via `tickvals` and the tick text is `ticktext`. ('array' is the default value if `tickvals` is provided)."
              },
              {
                id : `layout[${axisId}][nticks]`,
                title : "Number of Ticks",	
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout[axisId].nticks !== undefined ? layout[axisId].nticks : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).nticks,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" || layout[axisId].tickmode !== "auto" ? true : false,
                hint: "Specifies the maximum number of ticks for the particular axis. The actual number of ticks will be chosen automatically to be less than or equal to `nticks`. Has an effect only if `tickmode` is set to 'auto'."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][tick0]`,
                title : "First Tick Position",	
                type : "number",
                value : layout[axisId].tick0 !== undefined ? layout[axisId].tick0 : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tick0,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" || layout[axisId].tickmode !== "linear"  ? true : false,
                hint: "Sets the placement of the first tick on this axis. Use with `dtick`. If the axis `type` is 'log', then you must take the log of your starting tick (e.g. to set the starting tick to 100, set the `tick0` to 2) except when `dtick`='L<f>' (see `dtick` for more info). If the axis `type` is 'date', it should be a date string, like date data. If the axis `type` is 'category', it should be a number, using the scale where each category is assigned a serial number from zero in the order it appears."
              },
              {
                id : `layout[${axisId}][dtick]`,
                title : "Tick Spacing",	
                type : "number",
                value : layout[axisId].dtick !== undefined ? layout[axisId].dtick : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).dtick,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" || layout[axisId].tickmode !== "linear" ? true : false,
                hint: "Sets the step in-between ticks on this axis. Use with `tick0`. Must be a positive number, or special strings available to 'log' and 'date' axes. If the axis `type` is 'log', then ticks are set every 10^(n'dtick) where n is the tick number. For example, to set a tick mark at 1, 10, 100, 1000, ... set dtick to 1. To set tick marks at 1, 100, 10000, ... set dtick to 2. To set tick marks at 1, 5, 25, 125, 625, 3125, ... set dtick to log_10(5), or 0.69897000433. 'log' has several special values; 'L<f>', where `f` is a positive number, gives ticks linearly spaced in value (but not position). For example `tick0` = 0.1, `dtick` = 'L0.5' will put ticks at 0.1, 0.6, 1.1, 1.6 etc. To show powers of 10 plus small digits between, use 'D1' (all digits) or 'D2' (only 2 and 5). `tick0` is ignored for 'D1' and 'D2'. If the axis `type` is 'date', then you must convert the time to milliseconds. For example, to set the interval between ticks to one day, set `dtick` to 86400000.0. 'date' also has special values 'M<n>' gives ticks spaced by a number of months. `n` must be a positive integer. To set ticks on the 15th of every third month, set `tick0` to '2000-01-15' and `dtick` to 'M3'. To set ticks every 4 years, set `dtick` to 'M48'"
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][tickvals]`,
                title : "Tick Positions",	
                type : "text",
                value : layout[axisId].tickvals !== undefined ? layout[axisId].tickvals.join() : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickvals,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" || layout[axisId].tickmode !== "array" ? true : false,
                hint: "Sets the values at which ticks on this axis appear. Only has an effect if `tickmode` is set to 'array'. Used with `ticktext`."
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][ticktext]`,
                title : "Tick Label",	
                type : "text",
                value : layout[axisId].ticktext !== undefined ? layout[axisId].ticktext.join() : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).ticktext,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" || layout[axisId].tickmode !== "array"  || ! layout[axisId].tickvals.length  ? true : false,
                hint: "Sets the text displayed at the ticks position via `tickvals`. Only has an effect if `tickmode` is set to 'array'. Used with `tickvals`"
              },
            ],
          },
          {
            cssClasses : ["field-group", "forty-sixty"],
            inputFields: [
              {
                id : `layout[${axisId}][tickcolor]`,
                title : "Tick color",	
                type : "color",
                value : layout[axisId].tickcolor !== undefined ? layout[axisId].tickcolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickcolor,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" ? true : false,
                hint: "Sets the tick color."
              },
              {
                id : `layout[${axisId}][tickwidth]`,
                title : "Tick width",	
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout[axisId].tickwidth !== undefined ? layout[axisId].tickwidth : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickwidth,
                disabled: ! layout[axisId].visible || layout[axisId].ticks === "" ? true : false,
                // disabled: layout[axisId].tickmode !== "array" ? true : false,
                hint: "Sets the tick width (in px)."
              },
            ],
          }
        ],
      },

      ticklabels: {
        intro : "Here you can modify the bottom x-axis ticklabels",
        title : "Tick Labels",
        fieldGroups : [
          {
            cssClasses : ["field-group", "twentyFive-seventyFive"],
            inputFields: [
              {
                id : `layout[${axisId}][showticklabels]`,
                title : "Show Tick Labels",	
                type : "checkbox",
                value : layout[axisId].showticklabels !== undefined ? layout[axisId].showticklabels : false,
                disabled: ! layout[axisId].visible ? true : false,
                hint: "Determines whether or not the tick labels are drawn."
              },
              {
                id : `layout[${axisId}][ticklabelposition]`,
                title : "Tick Label Position",	
                type : "select",
                options : {
                  outside: "Outside",
                  inside: "Inside",
                  "outside left": "Outside Left",
                  "inside left": "Inside Left",
                  "outside right": "Outside Right",
                  "inside right": "Inside Right",
                },
                value : layout[axisId].ticklabelposition !== undefined ? layout[axisId].ticklabelposition : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).ticklabelposition,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint: "Determines where tick labels are drawn with respect to the axis Please note that top or bottom has no effect on x axes or when `ticklabelmode` is set to 'period'. Similarly left or right has no effect on y axes or when `ticklabelmode` is set to 'period'. Has no effect on 'multicategory' axes or when `tickson` is set to 'boundaries'. When used on axes linked by `matches` or `scaleanchor`, no extra padding for inside labels would be added by autorange, so that the scales could match."
              },
            ],
          },
          {
            cssClasses : ["field-group", "seventyFive-twentyFive"],
            inputFields: [
              {
                id : `layout[${axisId}][tickfont][family]`,
                title : "Tick Label Font",	
                type : "select",
                options : fontFamily(),
                value : layout[axisId].tickfont !== undefined && layout[axisId].tickfont.family !== undefined ? layout[axisId].tickfont.family : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickfont.family,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint: "HTML font family - the typeface that will be applied by the web browser. The web browser will only be able to apply a font if it is available on the system which it operates. These include 'Arial', 'Balto', 'Courier New', 'Droid Sans',, 'Droid Serif', 'Droid Sans Mono', 'Gravitas One', 'Old Standard TT', 'Open Sans', 'Overpass', 'PT Sans Narrow', 'Raleway', 'Times New Roman'."
              },
              {
                id : `layout[${axisId}][tickfont][size]`, 
                title : "Tick  Label Font Size", 
                type : "number",
                min : 1,
                max : 100,
                step : 0.5,
                value : layout[axisId].tickfont !== undefined && layout[axisId].tickfont.size !== undefined ? layout[axisId].tickfont.size : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickfont.size,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint : "number greater than or equal to 1"
              },
            ],
          },
          {
            cssClasses : ["field-group", "sixty-forty"],
            inputFields: [
              {
                id : `layout[${axisId}][tickangle]`, 
                title : "Tick Label Angle", 
                type : "number",
                min : -180,
                max : 180,
                step : 1,
                value : layout[axisId].tickangle !== undefined ? layout[axisId].tickangle : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickangle,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint : "Sets the angle of the tick labels with respect to the horizontal. For example, a `tickangle` of -90 draws the tick labels vertically."
              },
              {
                id : `layout[${axisId}][tickfont][color]`,
                title : "Tick Font Color",
                type : "color", 
                value : layout[axisId].tickfont !== undefined && layout[axisId].tickfont.color !== undefined ? layout[axisId].tickfont.color : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickfont.color,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showtickprefix]`, 
                title : "Show Tick Label Prefix", 
                type : "select",
                options : {
                  all: "All",
                  first: "First",
                  last: "Last",
                  none: "None",
                },
                value : layout[axisId].showtickprefix !== undefined ? layout[axisId].showtickprefix : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).showtickprefix,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint : "If 'all', all tick labels are displayed with a prefix. If 'first', only the first tick is displayed with a prefix. If 'last', only the last tick is displayed with a suffix. If 'none', tick prefixes are hidden.Sets a tick label prefix."
              },
              {
                id : `layout[${axisId}][tickprefix]`, 
                title : "Tick Label Prefix", 
                type : "Text",
                value : layout[axisId].tickprefix !== undefined ? layout[axisId].tickprefix : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).tickprefix,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels || layout[axisId].showtickprefix === "none" ? true : false,
                hint : "Sets a tick label prefix."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showticksuffix]`, 
                title : "Show Tick Label Suffix", 
                type : "select",
                options : {
                  all: "All",
                  first: "First",
                  last: "Last",
                  none: "None",
                },
                value : layout[axisId].showticksuffix !== undefined ? layout[axisId].showticksuffix : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).showticksuffix,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels ? true : false,
                hint : "If 'all', all tick labels are displayed with a suffix. If 'first', only the first tick is displayed with a suffix. If 'last', only the last tick is displayed with a suffix. If 'none', tick suffixes are hidden.Sets a tick label suffix."
              },
              {
                id : `layout[${axisId}][ticksuffix]`, 
                title : "Tick Label Suffix", 
                type : "Text",
                value : layout[axisId].ticksuffix !== undefined ? layout[axisId].ticksuffix : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).ticksuffix,
                disabled: ! layout[axisId].visible || ! layout[axisId].showticklabels  || layout[axisId].showticksuffix === "none" ? true : false,
                hint : "Sets a tick label suffix."
              },
            ],
          }
        ],
      },

      linesGrids: {
        intro : "Here you can modify the bottom x-axis linesGrids",
        title : "Axis Lines & Grids",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showline]`, 
                title : "Show Axis Line", 
                type : "checkbox",
                value : layout[axisId].showline !== undefined ? layout[axisId].showline : false,
                disabled: ! layout[axisId].visible  ? true : false,
                hint : "Determines whether or not a line bounding this axis is drawn."
              },
              {
                id : `layout[${axisId}][linecolor]`, 
                title : "Axis Line Color", 
                type : "color",
                value : layout[axisId].linecolor !== undefined ? layout[axisId].linecolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).linecolor,
                disabled: ( ! layout[axisId].visible || ! layout[axisId].showline )  ? true : false,
                hint : "Sets the axis line color."
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][linewidth]`, 
                title : "Axis Line Width", 
                type : "number",
                min : 1,
                max : 100,
                step : 1,
                value : layout[axisId].linewidth !== undefined ? layout[axisId].linewidth : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).linewidth,
                disabled: ! layout[axisId].visible || ! layout[axisId].showline ? true : false,
                hint : "Sets the width (in px) of the axis line."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showgrid]`, 
                title : "Show Grid", 
                type : "checkbox",
                value : layout[axisId].showgrid !== undefined ? layout[axisId].showgrid : false,
                disabled: ! layout[axisId].visible  ? true : false,
                hint : "Determines whether or not grid lines are drawn. If 'true', the grid lines are drawn at every tick mark.Determines whether or not a line bounding this axis is drawn."
              },
              {
                id : `layout[${axisId}][gridcolor]`, 
                title : "GridColor", 
                type : "color",
                value : layout[axisId].gridcolor !== undefined ? layout[axisId].gridcolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).gridcolor,
                disabled: ! layout[axisId].visible || ! layout[axisId].showgrid ? true : false,
                hint : "Sets the color of the grid lines."
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][gridwidth]`, 
                title : "Grid Width", 
                type : "number",
                min : 1,
                max : 100,
                step : 1,
                value : layout[axisId].gridwidth !== undefined ? layout[axisId].gridwidth : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).gridwidth,
                disabled: ! layout[axisId].visible || ! layout[axisId].showgrid ? true : false,
                hint : "Sets the width (in px) of the grid lines."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][zeroline]`, 
                title : "Show Zero Line", 
                type : "checkbox",
                value : layout[axisId].zeroline !== undefined ? layout[axisId].zeroline : false,
                disabled: ! layout[axisId].visible  ? true : false,
                hint : "Determines whether or not a line is drawn at along the 0 value of this axis. If 'true', the zero line is drawn on top of the grid lines."
              },
              {
                id : `layout[${axisId}][zerolinecolor]`, 
                title : "Zero Line Color", 
                type : "color",
                value : layout[axisId].zerolinecolor !== undefined ? layout[axisId].zerolinecolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).zerolinecolor,
                disabled: ! layout[axisId].visible || ! layout[axisId].zeroline ? true : false,
                hint : "Sets the line color of the zero line."
              },
            ],
          },
          {
            cssClasses : ["field-group"],
            inputFields: [
              {
                id : `layout[${axisId}][zerolinewidth]`, 
                title : "Zero Line Width", 
                type : "number",
                min : 1,
                max : 100,
                step : 1,
                value : layout[axisId].zerolinewidth !== undefined ? layout[axisId].zerolinewidth : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).zerolinewidth,
                disabled: ! layout[axisId].visible || ! layout[axisId].zeroline ? true : false,
                hint : "Sets the width (in px) of the zero line."
              },
            ],
          },
        ]
        
      },

      spikes: {
        intro : "Here you can modify the bottom x-axis spikes",
        title : "Spikes",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showspikes]`,
                title : "Show Spikes",	
                type : "checkbox",
                value : layout[axisId].showspikes !== undefined ? layout[axisId].showspikes : false,
                hint: "Determines whether or not spikes (aka droplines) are drawn for this axis. Note: This only takes affect when hovermode = closest"
              },
              {
                id : `layout[${axisId}][spikemode]`,
                title : "Spike Mode",	
                type : "select",
                options : {
                  toaxis: "To Axis",
                  across: "Across",
                  marker: "Marker",
                  "toaxis+across": "To Axis & Across",
                  "toaxis+marker": "To Axis & Marker",
                  "across+marker": "Across & Marker",
                  "toaxis+across+marker": "To Axis & Across & Marker",
                },
                value : layout[axisId].spikemode !== undefined ? layout[axisId].spikemode : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).spikemode,
                disabled: ! layout[axisId].showspikes ? true : false,
                hint: "Determines the drawing mode for the spike line If 'toaxis', the line is drawn from the data point to the axis the series is plotted on. If 'across', the line is drawn across the entire plot area, and supercedes 'toaxis'. If 'marker', then a marker dot is drawn on the axis the series is plotted on"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][spikedash]`,
                title : "Spike Type",	
                type : "select",
                options : {
                  solid: "Solid",
                  dot: "Dot",
                  dash: "Dash",
                  longdash: "Long Dash",
                  dashdot: "Dash Dot",
                  longdashdot: "Long Dash Dot"
                },
                value : layout[axisId].spikedash !== undefined ? layout[axisId].spikedash : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).spikedash,
                disabled: ! layout[axisId].showspikes ? true : false,
                hint: "Sets the dash style of lines. Set to a dash type string ('solid', 'dot', 'dash', 'longdash', 'dashdot', or 'longdashdot') or a dash length list in px (eg '5px,10px,2px,2px')."
              },
              {
                id : `layout[${axisId}][spikethickness]`,
                title : "Spike Thiclness",	
                type : "number",
                min : 0,
                max : 2000,
                step : 1,
                value : layout[axisId].spikethickness !== undefined ? layout[axisId].spikethickness : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).spikethickness,
                disabled: ! layout[axisId].showspikes ? true : false,
                hint: "Sets the width (in px) of the zero line."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][spikecolor]`,
                title : "Spike Color",	
                type : "color",
                value : layout[axisId].spikecolor !== undefined ? layout[axisId].spikecolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).spikecolor,
                disabled: ! layout[axisId].showspikes || ! layout[axisId].spikethickness ? true : false,
                hint: "Sets the spike color. If undefined, will use the series colorSets the tick color."
              },
            ],
          }
        ],
      },

      exponent: {
        intro : "Here you can modify the bottom x-axis exponent",
        title : "Exponent",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][showexponent]`, 
                title : "Show Exponent", 
                type : "select",
                options : {
                  all: "All",
                  first: "First",
                  last: "Last",
                  none: "None",
                },
                value : layout[axisId].showexponent !== undefined ? layout[axisId].showexponent : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).showexponent,
                disabled: ! layout[axisId].visible  ? true : false,
                hint : "If 'all', all exponents are shown besides their significands. If 'first', only the exponent of the first tick is shown. If 'last', only the exponent of the last tick is shown. If 'none', no exponents appear."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][exponentformat]`, 
                title : "Exponent Format", 
                type : "select",
                options : {
                  e: "e",
                  E: "E",
                  power: "Power",
                  SI: "SI",
                  B: "B",
                  none: "None",
                },
                value : layout[axisId].exponentformat !== undefined ? layout[axisId].exponentformat : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).exponentformat,
                disabled: ! layout[axisId].visible ? true : false,
                hint : "Determines a formatting rule for the tick exponents. For example, consider the number 1,000,000,000. If 'none', it appears as 1,000,000,000. If 'e', 1e+9. If 'E', 1E+9. If 'power', 1x10^9 (with 9 in a super script). If 'SI', 1G. If 'B', 1B.If 'all', all exponents are shown besides their significands. If 'first', only the exponent of the first tick is shown. If 'last', only the exponent of the last tick is shown. If 'none', no exponents appear."
              },
              {
                id : `layout[${axisId}][minexponent]`, 
                title : "Minimum Exponent", 
                type : "number",
                value : layout[axisId].minexponent !== undefined ? layout[axisId].minexponent : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).minexponent,
                disabled: ! layout[axisId].visible ? true : false,
                hint : "Hide SI prefix for 10^n if |n| is below this number. This only has an effect when `tickformat` is 'SI' or 'B'."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][separatethousands]`, 
                title : "Seperate Thousands", 
                type : "checkbox",
                value : layout[axisId].separatethousands !== undefined ? layout[axisId].visible : false,
                disabled: ! layout[axisId].visible ? true : false,
                hint : "If 'true', even 4-digit integers are separated"
              },
            ],
          }
        ],
      },

    }

    const rangesliderSection = ! axisId.includes ( "xaxis" ) ? null : {

      rangeslider: {
        intro : "Here you can modify the plot x-axis range slider",
        title : "Range Slider",
        fieldGroups : [
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id : `layout[${axisId}][rangeslider][visible]`,
                title : "Show Range Slider",
                type : "checkbox", 
                value : layout[axisId].rangeslider !== undefined && layout[axisId].rangeslider.visible !== undefined ? layout[axisId].rangeslider.visible : false,
                hint: "Determines whether or not the range slider will be visible. If visible, perpendicular axes will be set to `fixedrange`"
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id: `layout[${axisId}][rangeslider][thickness]`,
                title:"Height",
                type : "number",
                min : 0,
                max : 1,
                step : 0.01,
                value: layout[axisId].rangeslider !== undefined && layout[axisId].rangeslider.thickness !== undefined ? layout[axisId].rangeslider.thickness : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangeslider.thickness,
                disabled: layout[axisId].rangeslider === undefined || ! layout[axisId].rangeslider.visible === undefined || ! layout[axisId].rangeslider.visible ? true : false,
                hint: "The height of the range slider as a fraction of the total plot area height (0 - 1)."
              },
              {
                id : `layout[${axisId}][rangeslider][bgcolor]`,
                title : "Background Color",
                type : "color", 
                value : layout[axisId].rangeslider !== undefined && layout[axisId].rangeslider.bgcolor !== undefined ? layout[axisId].rangeslider.bgcolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangeslider.bgcolor,
                disabled: layout[axisId].rangeslider === undefined || ! layout[axisId].rangeslider.visible === undefined || ! layout[axisId].rangeslider.visible ? true : false,
                hint: "Sets the background color of the range slider."
              },
            ],
          },
          {
            cssClasses : ["field-group", "fifty-fifty"],
            inputFields: [
              {
                id: `layout[${axisId}][rangeslider][borderwidth]`,
                title:"Border Width",
                type : "number",
                min : 0,
                max : 100,
                step : 1,
                value: layout[axisId].rangeslider !== undefined && layout[axisId].rangeslider.borderwidth !== undefined ? layout[axisId].rangeslider.borderwidth : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangeslider.borderwidth,
                disabled: layout[axisId].rangeslider === undefined || ! layout[axisId].rangeslider.visible === undefined || ! layout[axisId].rangeslider.visible ? true : false,
                hint: "Sets the border width of the range slider."
              },
              {
                id : `layout[${axisId}][rangeslider][bordercolor]`,
                title : "Border Color",
                type : "color", 
                value : layout[axisId].rangeslider !== undefined && layout[axisId].rangeslider.bordercolor !== undefined ? layout[axisId].rangeslider.bordercolor : this.defaultOptions(axisId, axisSide, axisOverlaying, axisTitleText, axisMatches).rangeslider.bordercolor,
                disabled: layout[axisId].rangeslider === undefined || ! layout[axisId].rangeslider.visible === undefined || ! layout[axisId].rangeslider.visible ? true : false,
                hint: "Sets the border color of the range slider."
              },
            ]
          }
        ]  
      }, 

    }


    if ( axisId === "xaxis" || axisId === "xaxis2" ) return { ...axisSections, ...rangesliderSection }
    return axisSections
    
  }
  

}

export default ChartAxis;


