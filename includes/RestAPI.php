<?php

/**
* Interactive Vue WP Plotly Charts
*
* @package Interactive WP Vue Plotly Charts
* @author Abbas Lamouri
* @since 1.0.0
**/

namespace YRL_WP_VUE_PLOTLY\Includes;

// Declare main class if it does not exist
if (!class_exists('RestAPI')) {

	class RestAPI extends \YRL_WP_VUE_PLOTLY\Includes\Dashboard {

    /**
     * Magic constructor.  Gets called when class is instantiated
     */
		public function __construct() {


      $this->rest_namespace = "{$this->plugin}/v{$this->plugin_options['rest_version']}";
      $this->rest_base = 'charts';

			// Rest API Settings
			add_action('rest_api_init', array($this, "register_rest_api_routes"));

    } // END __construct


	} // END RestAPI

}