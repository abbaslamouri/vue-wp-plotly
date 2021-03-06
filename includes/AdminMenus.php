<?php

/**
* Interactive Vue WP Vue Plotly Charts
*
* @package Interactive WP Vue Plotly Charts
* @author Abbas Lamouri
* @since 1.0.0
**/

namespace YRL_WP_VUE_PLOTLY\Includes;

// Prohibit direct script loading.
defined('ABSPATH') || die('No direct script access allowed!');

// Declare main class if it does not exist
if (!class_exists('AdminMenus')) {

	class AdminMenus extends \YRL_WP_VUE_PLOTLY\Includes\Dashboard {


    /**
     * Magic constructor.  Gets called when class is instantiated
     */
		protected function __construct() {

      // Add admin Submenus, section and fields
      add_action('admin_menu', [$this, 'admin_menu_register'] );

    } // END __construct



   

    	/**
		 * Admin menus
		 *
		 * @return void
		 */
		protected function admin_menus() {

			return array(

				array(
					'page_title' => __($this->name, $this->plugin), // Text to be displayed in the browser window.
					'menu_title' => __($this->name, $this->plugin), // Text to be displayed for the menu
					'caps' => 'administrator', // The capability required for this page to be displayed to the user.
					'id' => "{$this->prefix}", // Unique id for this menu
					'callback' => function () {}, // Callback to output the menu (Handled by the first submenu in this case
					'dashicon' => 'dashicons-chart-line', // icon url
					'position' => '2', // menu position
				),

			);

    } // END admin_menus
    





	
		/**
		 * Admin submenus
		 *
		 * @return void
		 */
		protected function admin_submenus() {

			return array(
				array(
					'parent_id' => "{$this->prefix}", 
					'page_title' => __($this->name, $this->plugin), 
					'menu_title' => __('Chart Library', $this->plugin), 
					'caps' => 'administrator', 
					'id' => "{$this->prefix}",
					'callback' => [$this, 'admin']
				),

				
				array(
					'parent_id' => "{$this->prefix}", 
					'page_title' => __('Settings', $this->plugin), 
					'menu_title' => __('Settings', $this->plugin), 
					'caps' => 'administrator', 
					'id' => "{$this->prefix}#/settings", 
					'callback' => [$this, 'admin'] 
        ),
        
        array(
					'parent_id' => "{$this->prefix}", 
					'page_title' => __('Support', $this->plugin), 
					'menu_title' => __('Support', $this->plugin), 
					'caps' => 'administrator', 
					'id' => "{$this->prefix}#/support", 
					'callback' => [$this, 'admin']
				),
			);

		} // END admin_submenus




		/**
		 * Admin tabs (sections)
		 *
		 * @return void
		 */
		protected function admin_sections() {

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






     /**
		 * Register admin menus, submenus, sections and fields
		 *
		 * @return void
		 */
		public function admin_menu_register() {

			if ( ! is_admin() || ! current_user_can('manage_options') || empty( $this->admin_menus() ) ) return;

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





    public function admin() {

      // var_dump( "{$this->prefix}_obj");
      
      wp_enqueue_media();

      // // Enqueue Stylesheet
      // wp_register_style($this->plugin, $this->url . "assets/bundle/admin.css", [], false, 'all');
      // wp_enqueue_style($this->plugin);


      // Register and Enqueue file upload Javascript and use wp_localize_script to pass data to the javascript handler
      wp_register_script("{$this->plugin}-admin", "{$this->url}dist/admin.js", [], false, true);
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
          "charts" => $this->fetch_charts_sheets()["charts"],
          "sheets" => $this->fetch_charts_sheets()["sheets"]
        )
      );
          
      echo $this->get_template_html("admin");
      
    }



    /**
		 * Renders page template
		 *
		 * @param string $template
		 * @param array $atts
		 * @return string page html
		 */
		protected function get_template_html($template, $payload = array()) {

			ob_start();

			do_action("{$this->prefix}_before_{$template}");

			require "{$this->path}templates/{$template}.php";

			do_action("{$this->prefix}_after_{$template}");

			$html = ob_get_contents();
			ob_end_clean();

			return $html;

		} // END get_template_html



		
		



    

	} // END AdminMenus

}