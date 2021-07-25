<?php
/**
 * Interactive WP Plotly Charts
 *
 * @package   Interactive WP Plotly Charts
 * @author    Abbas Lamouri  <abbaslamouri@yrlus.com>
 * @license   GPL-2.0+
 * @link      http://abbaslamouri.com
 * @copyright 2020 Abbas Lamouri
 *
 * @wordpress-plugin
 * Plugin Name: Interactive WP Plotly Charts
 * Plugin URI:  TODO
 * Description: Worpress Interactive Google Charts plugin.
 * Version:     1.0.0
 * Author:      Abbas Lamouri
 * Author URI:  http://abbaslamouri.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Prohibit direct script loading.  ABSPATH returns site path with trailing slash (/home/yrlusc5/public_html/sandbox/)
defined('ABSPATH') || die('No direct script access allowed!');

if (!function_exists("add_action")) {
  echo "Hi there!  I am simply a plugin, not much I can do when called directly";
  exit;
}

// Define this plugin name (Interactive WP Plotly Charts)
defined('YRL_WP_PLOTLY_NAME') ? null : define('YRL_WP_PLOTLY_NAME', 'Interactive WP Plotly Charts');

// Define this plugin directory PATH with trailing slashes (/home/yrlusc5/public_html/sandbox/wp-content/plugins/iwpgv/)
defined('YRL_WP_PLOTLY_PATH') ? null : define('YRL_WP_PLOTLY_PATH', plugin_dir_path(__FILE__));

// Define this plugin directory URL with trailing slashes (http://sandbox.yrlus.com/wp-content/plugins/iwpgv/)
defined('YRL_WP_PLOTLY_URL') ? null : define('YRL_WP_PLOTLY_URL', plugin_dir_url(__FILE__));

// Define this plugin file path with file extension (/home/yrlusc5/public_html/sandbox/wp-content/plugins/iwpgv/iwpgv.php)
defined('YRL_WP_PLOTLY_FILE_PATH') ? null : define('YRL_WP_PLOTLY_FILE_PATH', __FILE__);

// Define this plugin directory/plugin URL with trailing slashes (iwpgv/iwpgv.php)
defined('YRL_WP_PLOTLY_BASE') ? null : define('YRL_WP_PLOTLY_BASE', plugin_basename(__FILE__));

// Define this plugin name (iwpgv)
defined('YRL_WP_PLOTLY_PLUGIN') ? null : define('YRL_WP_PLOTLY_PLUGIN', basename(YRL_WP_PLOTLY_FILE_PATH, ".php"));

// Define this plugin prefix (IWPGV)
defined('YRL_WP_PLOTLY_PREFIX') ? null : define('YRL_WP_PLOTLY_PREFIX', str_replace("-", "_", YRL_WP_PLOTLY_PLUGIN));


require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Includes
require_once YRL_WP_PLOTLY_PATH . "includes/Dashboard.php";

// Instantiate Dashboard class
if ( class_exists( 'YRL_WP_PLOTLY\\Includes\\Dashboard' ) ) {
  new YRL_WP_PLOTLY\Includes\Dashboard;
}


