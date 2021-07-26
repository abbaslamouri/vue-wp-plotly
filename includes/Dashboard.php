<?php

/**
* Interactive Vue WP Plotly Charts
*
* @package Interactive WP Vue Plotly Charts
* @author Abbas Lamouri
* @since 1.0.0
**/

namespace YRL_WP_VUE_PLOTLY\Includes;

// Prohibit direct script loading.
defined('ABSPATH') || die('No direct script access allowed!');

// Declare main class if it does not exist
if (!class_exists('Dashboard')) {

	class Dashboard {

    public $name = YRL_WP_VUE_PLOTLY_NAME; 				// title of the plugin
		public $path = YRL_WP_VUE_PLOTLY_PATH; 				// Path to the plugin directory
		public $url = YRL_WP_VUE_PLOTLY_URL; 					// URL to the plugin directory
		public $base = YRL_WP_VUE_PLOTLY_BASE; 				// represents plugin-dir/plugin-file
		public $prefix = "yrl_".YRL_WP_VUE_PLOTLY_PREFIX; 		// prefix (yrl_wp_vue_plotly_charts)
    public $plugin = "yrl-".YRL_WP_VUE_PLOTLY_PLUGIN; 		// plugin (yrl-wp-plotly_charts)
    public $shortcode_text = 'wp-plotly-chart'; 		// plugin (yrl-wp-plotly_charts)
		
    public $plugin_options = [
			"version" => "1.0.0",
			"rest_version" => "1"
		];

		public $rest_namespace; // Rest API namespace
		public $rest_base; // Rest API base name
		
		protected $file_types = [        	// Possible file types
			"xlsx", "Xlsx", "xls", "Xls", "csv", "Csv", "xlsm", "Xlsm"
		];



    /**
     * Magic constructor.  Gets called when class is instantiated
     */
		public function __construct() {


			// Instantiate Dashboard class
			// if ( class_exists( 'YRL_WP_VUE_PLOTLY\\Includes\\Rest_API' ) ) {
				new RestAPI();
			// }

    } // END __construct


	} // END Dashboard

}