<?php

/**
* Interactive WP Plotly Charts
*
* @package Interactive WP Plotly Charts
* @author Abbas Lamouri
* @since 1.0.0
**/

namespace YRL_WP_PLOTLY\Includes;

// Prohibit direct script loading.
defined('ABSPATH') || die('No direct script access allowed!');

// Declare main class if it does not exist
if (!class_exists('Dashboard')) {

	class Dashboard {

		public $name = YRL_WP_PLOTLY_NAME; 				// title of the plugin
		public $path = YRL_WP_PLOTLY_PATH; 				// Path to the plugin directory
		public $url = YRL_WP_PLOTLY_URL; 					// URL to the plugin directory
		public $base = YRL_WP_PLOTLY_BASE; 				// represents plugin-dir/plugin-file
		public $prefix = "yrl_".YRL_WP_PLOTLY_PREFIX; 		// prefix (yrl_wp_plotly_charts)
    public $plugin = "yrl-".YRL_WP_PLOTLY_PLUGIN; 		// plugin (yrl-wp-plotly_charts)
    public $shortcode_text = 'wp-plotly-chart'; 		// plugin (yrl-wp-plotly_charts)
		
	
		
    public $plugin_options = [        // This plugin options
			"version" => "1.0.0",
			"rest_version" => "1"
		];

		public $rest_namespace; // Rest API namespace
		public $rest_base; // Rest API base name
		
		protected $file_types = [        	// Possible file types
			"xlsx", "Xlsx", "xls", "Xls", "csv", "Csv", "xlsm", "Xlsm"
		];
    


		/**
		*Magic constructor.  Gets called when class is instantiated
		*/
		public function __construct() {

      // die($this->prefix);

			$this->rest_namespace = "{$this->plugin}/v{$this->plugin_options['rest_version']}";
      $this->rest_base = 'charts';

			// Declare upload directory
			$this->upload_path = wp_upload_dir()['path']."/";

      // $this->charts = get_option("{$this->prefix}_charts") ? get_option("{$this->prefix}_charts") : [];

			// Add plugin settings link
			add_filter("plugin_action_links_" . $this->base, function ($links) {
				$settings_link = "<a href='admin.php?page=" . "{$this->prefix}" . "'>" . __("Settings") . "</a>";
				array_push($links, $settings_link);
				return $links;
			});

			// Plugin activation and deactivation registration
			register_activation_hook($this->base, [$this, 'activate'] );
			register_deactivation_hook($this->base, [$this, 'deactivate'] );


			// Add admin Submenus, section and fields
      add_action('admin_menu', [$this, 'admin_menu_register'] );
		
			// Register styles and scripts
			add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'] );
      add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);


			// add admin init action
			add_action('admin_init', [$this, 'admin_init'] );


			// // Filters the “Thank you” text displayed in the Wordpress admin dashboard footer text
			add_filter( 'admin_footer_text', [$this, "admin_footer_text"] );
			
			//  // Filter admin bar menu
			add_action( 'wp_before_admin_bar_render', [$this, 'admin_bar'] );

			// // Hide admin bar for non admins
			add_filter('show_admin_bar', function() {
        return (!current_user_can('manage_options')) ? false : true;
      });

			add_shortcode( $this->shortcode_text, [$this, 'render_shortcode'] );


			// Rest API Settings
			add_action('rest_api_init', array($this, "register_rest_api_routes"));
      

    } // END __construct




    public function default_attributes() {
      return ['id' => null];
    }



   



		public function register_rest_api_routes() {

      	// *************************** Dashboard
					register_rest_route( $this->rest_namespace, "/{$this->rest_base}",
          array(
            'methods' => "GET",
            'callback' => [$this, "get_charts_sheets"],
            'args' => array(),
            'permission_callback' => array($this, "permissions_check"),
          )
        );



      // *************************** Dashboard
					register_rest_route( $this->rest_namespace, "/{$this->rest_base}/(?P<id>\d+)",
          array(
            'methods' => "GET",
            'callback' => [$this, "fetch_chart_spreadsheet"],
            'args' => array(),
            'permission_callback' => array($this, "permissions_check"),
          )
        );


					// *************************** Dashboard
					register_rest_route( $this->rest_namespace, "/{$this->rest_base}",
						array(
							'methods' => "POST",
							'callback' => [$this, "save_chart"],
							'args' => array(),
							'permission_callback' => array($this, "permissions_check"),
						)
					);
          

		}





    public function fetch_payload() {

      return $this->fetch_charts_sheets();
     

    }






    public function fetch_charts_sheets(  ) {
      
      $charts = get_option("{$this->prefix}_charts") ? get_option("{$this->prefix}_charts") : [];
      $sheets = [];

			// Assemble payload
			foreach ($charts as $chart_id => $chart) {

				// Fetch spreadsheet
				$spreadsheet = ! is_wp_error( $this->fetch_spreadsheet( $chart['params']['fileId'] ) ) ? $this->fetch_spreadsheet( $chart['params']['fileId'] ) : null;
        $sheets[] = ['chartId' => $chart['params']['chartId'], 'sheet' => $spreadsheet[$chart['params']['sheetId']]];

			}
      // echo "<pre>";
      // var_dump($charts);
      // echo "</pre>";
      // die;

      // return array_reverse( $payload );
      return ["sheets" => $sheets, "charts" => $charts];

    }









    public function get_charts_sheets( $request ) {
      
			return $this->fetch_payload();

    }



    



    public function fetch_chart_spreadsheet( $request ) {
      
			return $this->fetch_spreadsheet( $request->get_params()["id"] );

    }





    public function save_chart( $request ) {

      update_option( "{$this->prefix}_charts", json_decode( $request->get_body(), true ) );
			return  json_decode( $request->get_body(), true );
      
    }



		public function permissions_check() {

			if ( ! current_user_can( 'manage_options' ) ) 
			return new \WP_Error('rest_forbidden', esc_html__('You do not have permissions to access this content.', $this->plugin), array('status' => 401));
			
			return true;

		} // END 	public function permissions_check() {




		
		/**
		 * Shortcode render method
		 *
		 * @param array $atts
		 * @param string $page
		 * @return void
		 */
		public function render_shortcode($atts, $content, $tag) {

			$atts = shortcode_atts(
        $this->default_attributes(), // default array values
        $atts // array of values passed to the shortcode if any
      );


			try {

				// Bail if there is no id
        if ( ! $atts["id"] ) {
          throw new \Exception(  __(wp_kses_post( "A chart ID is required", $this->plugin ) ) );
        }

				// Get charts
				$charts = get_option("{$this->prefix}_charts") ? get_option("{$this->prefix}_charts") : [];

				// Bail if there is no id
        if ( empty( $charts)) {
          throw new \Exception(  __(wp_kses_post( "We cannot find any charts", $this->plugin ) ) );
        }

				// Get chart
				$chart = [];
				foreach ($charts as $value) {
					if (intval($value['params']['chartId']) === intval($atts["id"]) ) {
						$chart = $value;
						break;
					}
				}


				if ( empty( $chart ) ) {
					throw new \Exception(  __(wp_kses_post( "We cannot find a chart with this ID {$atts['id']}", $this->plugin ) ) );
				}

				// Fetch spreadsheet
				$spreadsheet = $this->fetch_spreadsheet( $chart['params']['fileId'] );

				// Bail if error ( fetch_spreadsheet( ) return an spreadsheet (array) or WP error)
			 	if (  is_wp_error( $spreadsheet ) ) {
          $message = array_combine($spreadsheet->get_error_codes(), $spreadsheet->get_error_messages())["error"];
          throw new \Exception(  __(wp_kses_post( $message, $this->plugin ) ) );
        } 

				
				$payload = [
					"chart"  => $chart,
					"spreadsheet"  => $spreadsheet,
					"prefix" => $this->prefix
				];

				// Prepare error output
				$response = ["payload" => $payload];


        // Enqueue Stylesheet
        wp_register_style("{$this->plugin}-frontend", $this->url . "assets/bundle/frontend.css", null, false, 'all');
        wp_enqueue_style("{$this->plugin}-frontend");

        // Register and Enqueue file upload Javascript and use wp_localize_script to pass data to the javascript handler
        wp_register_script("{$this->plugin}-frontend", "{$this->url}assets/bundle/frontend.js", null, false, true);
        wp_enqueue_script("{$this->plugin}-frontend");
  
        wp_localize_script( "{$this->plugin}-frontend", "{$this->prefix}__plotlyChart", $payload);

        // Return login template
        return $this->get_template_html("shortcode", $payload);		


			} catch (\Exception $e) {
  
				// Prepare error output
        $payload =[];
				$response = ["status"	=> "error", "message" => $e->getMessage(), "payload" => $payload];

        return $this->get_template_html("shortcode", $response);		


			}

     	
			

		} // END render_shortcode
    

  


	
		/**
		 * Called when the plugin is activated using register_activation_hook
		 *
		 * @return void
		 */
		public function activate() {

			// Store and/or update plugin options
			if (false === get_option("{$this->plugin}-plugin-options")) {
				add_option("{$this->plugin}-plugin-options", $this->plugin_options);
			} elseif (get_option("{$this->plugin}-plugin-options") != $this->plugin_options) {
				update_option("{$this->plugin}-plugin-options", $this->plugin_options);
			}

		} // END activate





		/**
		 * Called when the plugin is deactivated using register_deactivation_hook
		 *
		 * @return void
		 */
		public function deactivate() {

			//Flush rewrite rules on plugin activation. (woocoommerce endpoint permalink)
			flush_rewrite_rules();

		} // END deactivate




		/**
		 * Admin init tidbits.
		 *
		 * @return void
		 */
		public function admin_init() {

      //Limit access to the dashboard for everybody but administrators
      if (is_admin() && !current_user_can('manage_options') && !(defined('DOING_AJAX') && DOING_AJAX)) {
        wp_redirect(home_url());
        exit;
      }

      

		} // END init
    





		/**
		 * Renders page template
		 *
		 * @param string $template
		 * @param array $atts
		 * @return string page html
		 */
		public function get_template_html($template, $payload = array()) {

			ob_start();

			do_action("{$this->prefix}_before_{$template}");

			require "{$this->path}templates/{$template}.php";

			do_action("{$this->prefix}_after_{$template}");

			$html = ob_get_contents();
			ob_end_clean();

			return $html;

		} // END get_template_html






    	/**
		 * Register and Enque admin stylesheet and scripts.  Hooks into 
		 *
		 * @return void
		 */
		public function enqueue_scripts()	{

			// // Enqueue Stylesheet
			// wp_register_style("{$this->plugin}-public", $this->url . "assets/bundle/public.css", null, false, 'all');
			// wp_enqueue_style("{$this->plugin}-public");

			// // Register and Enqueue file upload Javascript and use wp_localize_script to pass data to the javascript handler
			// wp_register_script("{$this->plugin}-public", "{$this->url}assets/bundle/public.js", null, false, true);
			// wp_enqueue_script("{$this->plugin}-public");

      
      

		} // END enqueue_scripts

	
		/**
		 * Register and Enque admin stylesheet and scripts.  Hooks into 
		 *
		 * @return void
		 */
		public function admin_enqueue_scripts()	{

			// wp_enqueue_media();

			// // Enqueue Stylesheet
			// wp_register_style($this->plugin, $this->url . "assets/bundle/admin.css", [], false, 'all');
			// wp_enqueue_style($this->plugin);


			// // Register and Enqueue file upload Javascript and use wp_localize_script to pass data to the javascript handler
			// wp_register_script("{$this->plugin}-admin", "{$this->url}assets/bundle/admin.js", [], false, true);
			// wp_enqueue_script("{$this->plugin}-admin");
			// wp_localize_script(
			// 	"{$this->plugin}-admin", //handle for the script
			// 	"{$this->prefix}_obj", //  The name of the variable which will contain the data (used in the ajax url)
			// 	array( // Data to be passed
			// 		"plugin" => $this->plugin,
			// 		"prefix" => $this->prefix,
			// 		'url' => $this->url,
      //     'shortcodeText' => $this->shortcode_text,
      //     "wpRestNonce"  => wp_create_nonce("wp_rest" ),
      //     "wpRestUrl" => get_rest_url(null, "{$this->rest_namespace}/{$this->rest_base}"),
      //     "charts" => $this->fetch_payload()["charts"],
      //     "sheets" => $this->fetch_payload()["sheets"]
			// 	)
      // );
      
      

		} // END enqueue_scripts


		

		/**
		* formats spreadsheet
		* @author  Abbas Lamouri
		* @param   string $this->upload_path.$filename (spreadsheet file name)
		* @return  array $data (both raw and formatted Spreadsheet cols and rows data)
		* @version  0.1
		*/
		public function fetch_spreadsheet( $file_id ) {

      // Check if a file Id is submitted
			if ( ! $file_id ) {
				return new \WP_Error ( 'file_id_missing', __( wp_kses_post ( "A file ID is required." ), $this->plugin ), ["status" => 404] );
			}

      // Get file path from file Id
      $file_path = get_attached_file( $file_id );

      // Check if a file with the supplie Id exsts
			if ( ! $file_path ) {
				return new \WP_Error ( 'file_by_id_missing', __( wp_kses_post ( "We cannot find a file with this ID <strong>{$file_id}</strong>." ), $this->plugin ), ["status" => 404] );
			}

			// Initialize spreadsheet
      $spreadsheet = [];

			// Check if the file is already in the upload directory
			if ( ! file_exists ($file_path)) {
				return new \WP_Error ( 'file_missing', __( wp_kses_post ( "File <.>$file_path</.> does not exist." ), $this->plugin ), ["status" => 404] );
			}

      // Check file type
      if ( ! in_array(wp_check_filetype(wp_basename($file_path))["ext"], $this->file_types )) {
        return new \WP_Error  (  'invalid_file_type', __(wp_kses_post("Invalid file type, <strong>".wp_basename($file_path)."</strong> is not a valid file type.  Only excel and csv spreadsheets are allowed"), $this->plugin ), ["status" => 406] );
      }

			
			// Identify input file type
			$file_type = \PhpOffice\PhpSpreadsheet\IOFactory::identify($file_path);

			// Create a new Reader of the type that has been identified
			$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($file_type);

			// Advise the Reader that we only want to load cell data (no fprmating)
			$reader->setReadDataOnly(false);

			// Load $input_file_path to a input_file Object
			$input_file = $reader->load($file_path);

			// Identify all sheets by name in the spreasheet
			$sheet_names = $input_file->getSheetNames();


			// Loop through all sheets
			foreach ($sheet_names as $sheet_key => $sheet_name) {
				
				// Convert data in each input_file to array
				$raw_data = $input_file->getSheetByName($sheet_name)->toArray(
					"",        // Value that should be returned for empty cells
					TRUE,        // Should formulas be calculated (the equivalent of getCalculatedValue() for each cell)
					TRUE,        // Should values be formatted (the equivalent of getFormattedValue() for each cell)
					TRUE         // Should the array be indexed by cell row and cell column
				);

				// Retreive labels
				$labels = !empty($raw_data) ? array_values( array_shift($raw_data) ) : [];

        // return $raw_data;

        // if ( empty($labels) || empty($filtered_data)) {
				// 	$message = "File <strong>{$file_path}</strong> contains invalid data (possible missing labels or empty columns).";
				// 	$errors->add ( 'error', __( wp_kses_post ( $message ), $this->plugin));
				// 	return $errors;
				// }

				// // Filter out empty cells at the end of each column
				// $filtered_data = [];
				// foreach ($raw_data as $row_key => $row_values) {
				// 	// wp_send_json($row_values["A"]);
				// 	if ("" !== $row_values["A"]){
				// 		$counter = 0;
				// 		foreach ($row_values as $cell_key => $cell_value) {
				// 			if ("" === $cell_value) {
				// 				$counter++;
				// 			}
				// 		}

				// 		if ($counter !== count($row_values)) {
				// 			$filtered_data[] = array_values($row_values);
				// 		}
				// 	}
				// }
				// // wp_send_json($filtered_data);

				// Transpose data for plotly plot
				$transposed_data = array_map(null, ...$raw_data);
        // return $transposed_data;

				// Validate data
				// Check if the file is already in the upload directory
				
		
				$spreadsheet[$sheet_key]["data"] = $transposed_data;
				$spreadsheet[$sheet_key]["sheetName"]  = $sheet_name;
				$spreadsheet[$sheet_key]["labels"] = $labels;	
			}

			return $spreadsheet;

		} // END fetch_spreadsheet






		/**
		 * Filter admin footer text
		 *
		 * @return "admin footer text"
		 */
		public function admin_footer_text() {

			return  sprintf( __( 'Let us know if you like this Plugin.   Want the real thing? <a href="%s" title="Click here to purchase a license!" target="_blank">Click here to purchase a license!</a>', $this->plugin ), 'http://abbaslamouri.com' );

		} // END admin_footer_text





		 /**
    * Add plugin links to admin bar
    *
    * @param array $wp_admin_bar:  admin bar menu
    *
    */
		function admin_bar() {

      global $wp_admin_bar;

      //Add a link called for the plugin
      $wp_admin_bar->add_menu( array(
        'id'    => $this->prefix,
        'title' => $this->name,
        'href'  => add_query_arg( array('page' => $this->prefix), admin_url('admin.php')),
      ));

		} // END admin_bar


  


		
		/**
		 * Register admin menus, submenus, sections and fields
		 *
		 * @return void
		 */
		public function admin_menu_register() {

			// Bail if register user does not have adeqaute permission
			if (!is_admin() || !current_user_can('manage_options') ) return;

			// If no admin menus
			if (empty($this->admin_menus())) return;
			
			//add menu page
			foreach ($this->admin_menus() as $menu) {
				add_menu_page(
					$menu['page_title'], // page Title displayed in browser bar
					$menu['menu_title'], // menu title, which is displayed under admin menus
					$menu['caps'], // The capability required for this menu to be displayed to the user.
					$menu['id'], // menu id
					$menu['callback'], //array($this, $menu['callback']), // Callback function used to render the settings
					$menu['dashicon'], // icon url
					$menu['position']// menu position
				);
			}


			// If no admin submenu pages
			if (empty($this->admin_submenus())) return;
			
			//add submenu pages
			foreach ($this->admin_submenus() as $submenu) {
				add_submenu_page(
					$submenu['parent_id'], // Parent id
					$submenu['page_title'], // page title, which is displayed in the browser title bar
					$submenu['menu_title'], // menu title, which is displayed in the browser title bar
					$submenu['caps'], // The capability required for this page to be displayed to the user.
					$submenu['id'], // submenu id
					$submenu['callback']//array($this, $menu['callback']), // Callback function used to render the settings
				);
			}

		}



		/**
		 * Admin menus
		 *
		 * @return void
		 */
		public function admin_menus() {

			return array(

				array(
					'page_title' => __($this->name, $this->plugin), // Text to be displayed in the browser window.
					'menu_title' => __($this->name, $this->plugin), // Text to be displayed for the menu
					'caps' => 'administrator', // The capability required for this page to be displayed to the user.
					'id' => "{$this->prefix}", // Unique id for this menu
					'callback' => function () {}, // Callback to output the menu (Handled by the first submenu in this case
					'dashicon' => 'dashicons-editor-customchar', // icon url
					'position' => '2', // menu position
				),

			);

    } // END admin_menus
    





	
		/**
		 * Admin submenus
		 *
		 * @return void
		 */
		public function admin_submenus() {

			return array(
				array(
					'parent_id' => $this->prefix, 
					'page_title' => __($this->name, $this->plugin), 
					'menu_title' => __('Chart Library', $this->plugin), 
					'caps' => 'administrator', 
					'id' => $this->prefix,
					'callback' => function() {
            wp_enqueue_media();

            // Enqueue Stylesheet
            wp_register_style($this->plugin, $this->url . "assets/bundle/admin.css", [], false, 'all');
            wp_enqueue_style($this->plugin);
      
      
            // Register and Enqueue file upload Javascript and use wp_localize_script to pass data to the javascript handler
            wp_register_script("{$this->plugin}-admin", "{$this->url}assets/bundle/admin.js", [], false, true);
            wp_enqueue_script("{$this->plugin}-admin");
            wp_localize_script(
              "{$this->plugin}-admin", //handle for the script
              "{$this->prefix}_obj", //  The name of the variable which will contain the data (used in the ajax url)
              array( // Data to be passed
                "plugin" => $this->plugin,
                "prefix" => $this->prefix,
                'url' => $this->url,
                'shortcodeText' => $this->shortcode_text,
                "wpRestNonce"  => wp_create_nonce("wp_rest" ),
                "wpRestUrl" => get_rest_url(null, "{$this->rest_namespace}/{$this->rest_base}"),
                "charts" => $this->fetch_payload()["charts"],
                "sheets" => $this->fetch_payload()["sheets"]
              )
            );
            
            echo $this->get_template_html("admin");
          }
				),

				
				array(
					'parent_id' => $this->prefix, 
					'page_title' => __('Settings', $this->plugin), 
					'menu_title' => __('Settings', $this->plugin), 
					'caps' => 'administrator', 
					'id' => "{$this->prefix}_settings", 
					'callback' => function () {
            echo $this->get_template_html("chart-settings");
          }, 
        ),
        
        array(
					'parent_id' => $this->prefix, 
					'page_title' => __('Support', $this->plugin), 
					'menu_title' => __('Support', $this->plugin), 
					'caps' => 'administrator', 
					'id' => "{$this->prefix}_support", 
					'callback' => function () {
            echo $this->get_template_html("support");
          }, 
				),
			);

		} // END admin_submenus




		/**
		 * Admin tabs (sections)
		 *
		 * @return void
		 */
		public function admin_sections() {

			return array(

				"{$this->prefix}_charts" => array(
					'title' => __('', $this->plugin),
          'sectionTitle' => __('Chart Library', $this->plugin),
          'registerSetting' => false,
					'callback' => function () { echo "Charts";},
        ),

        "{$this->prefix}_settings" => array(
					'title' => __('', $this->plugin),
          'sectionTitle' => __('Chart Settings', $this->plugin),
          'registerSetting' => true,
					'callback' => function () {echo "<h2>Chart Settings</h2>"; },
				),
        
        "{$this->prefix}_files" => array(
					'title' => __('', $this->plugin),
          'sectionTitle' => __('Files', $this->plugin),
          'registerSetting' => false,
					// 'submenu' => "{$this->prefix}_charts",
					'callback' => function () {  echo "Files";},
				),

				"{$this->prefix}_other" => array(
					'title' => __('', $this->plugin),
          'sectionTitle' => __('Other', $this->plugin),
          'registerSetting' => false,
					'callback' => function () { echo "Other";},
				),
				

			);

		} // END admin_tabs



		
		




    

	} // END Dashboard

}