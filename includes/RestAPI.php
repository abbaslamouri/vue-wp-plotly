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

    public $rest_namespace;
    public $rest_base;

    /**
     * Magic constructor.  Gets called when class is instantiated
     */
		public function __construct() {

      $this->rest_namespace = "{$this->plugin}/v{$this->plugin_options['rest_version']}";
      $this->rest_base = 'charts';

      // die($this->rest_namespace);


			// Rest API Settings
			add_action('rest_api_init', array($this, "register_rest_api_routes"));

    } // END __construct




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





  // public function fetch_payload() {

  //   return $this->fetch_charts_sheets();
   

  // }






  // public function fetch_charts_sheets(  ) {
    
  //   $charts = get_option("{$this->prefix}_charts") ? get_option("{$this->prefix}_charts") : [];
  //   $sheets = [];

  //   // Assemble payload
  //   foreach ($charts as $chart_id => $chart) {

  //     // Fetch spreadsheet
  //     $spreadsheet = ! is_wp_error( $this->fetch_spreadsheet( $chart['params']['fileId'] ) ) ? $this->fetch_spreadsheet( $chart['params']['fileId'] ) : null;
  //     $sheets[] = ['chartId' => $chart['params']['chartId'], 'sheet' => $spreadsheet[$chart['params']['sheetId']]];

  //   }
  //   // echo "<pre>";
  //   // var_dump($charts);
  //   // echo "</pre>";
  //   // die;

  //   // return array_reverse( $payload );
  //   return ["sheets" => $sheets, "charts" => $charts];

  // }









  public function get_charts_sheets( $request ) {

    // return  $this->rest_namespace;

    return $this->fetch_charts_sheets();
    
    // return $this->fetch_payload();

  }



  



  public function fetch_chart_spreadsheet( $request ) {
    
    return $this->fetch_spreadsheet( $request->get_params()["id"] );

  }




  public function permissions_check() {

    if ( ! current_user_can( 'manage_options' ) ) 
    return new \WP_Error('rest_forbidden', esc_html__('You do not have permissions to access this content.', $this->plugin), array('status' => 401));
    
    return true;

  } // END 	public function permissions_check() {








		// /**
		// * formats spreadsheet
		// * @author  Abbas Lamouri
		// * @param   string $this->upload_path.$filename (spreadsheet file name)
		// * @return  array $data (both raw and formatted Spreadsheet cols and rows data)
		// * @version  0.1
		// */
		// public function fetch_spreadsheet( $file_id ) {

    //   // Check if a file Id is submitted
		// 	if ( ! $file_id ) {
		// 		return new \WP_Error ( 'file_id_missing', __( wp_kses_post ( "A file ID is required." ), $this->plugin ), ["status" => 404] );
		// 	}

    //   // Get file path from file Id
    //   $file_path = get_attached_file( $file_id );

    //   // Check if a file with the supplie Id exsts
		// 	if ( ! $file_path ) {
		// 		return new \WP_Error ( 'file_by_id_missing', __( wp_kses_post ( "We cannot find a file with this ID <strong>{$file_id}</strong>." ), $this->plugin ), ["status" => 404] );
		// 	}

		// 	// Initialize spreadsheet
    //   $spreadsheet = [];

		// 	// Check if the file is already in the upload directory
		// 	if ( ! file_exists ($file_path)) {
		// 		return new \WP_Error ( 'file_missing', __( wp_kses_post ( "File <.>$file_path</.> does not exist." ), $this->plugin ), ["status" => 404] );
		// 	}

    //   // Check file type
    //   if ( ! in_array(wp_check_filetype(wp_basename($file_path))["ext"], $this->file_types )) {
    //     return new \WP_Error  (  'invalid_file_type', __(wp_kses_post("Invalid file type, <strong>".wp_basename($file_path)."</strong> is not a valid file type.  Only excel and csv spreadsheets are allowed"), $this->plugin ), ["status" => 406] );
    //   }

			
		// 	// Identify input file type
		// 	$file_type = \PhpOffice\PhpSpreadsheet\IOFactory::identify($file_path);

		// 	// Create a new Reader of the type that has been identified
		// 	$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($file_type);

		// 	// Advise the Reader that we only want to load cell data (no fprmating)
		// 	$reader->setReadDataOnly(false);

		// 	// Load $input_file_path to a input_file Object
		// 	$input_file = $reader->load($file_path);

		// 	// Identify all sheets by name in the spreasheet
		// 	$sheet_names = $input_file->getSheetNames();


		// 	// Loop through all sheets
		// 	foreach ($sheet_names as $sheet_key => $sheet_name) {
				
		// 		// Convert data in each input_file to array
		// 		$raw_data = $input_file->getSheetByName($sheet_name)->toArray(
		// 			"",        // Value that should be returned for empty cells
		// 			TRUE,        // Should formulas be calculated (the equivalent of getCalculatedValue() for each cell)
		// 			TRUE,        // Should values be formatted (the equivalent of getFormattedValue() for each cell)
		// 			TRUE         // Should the array be indexed by cell row and cell column
		// 		);

		// 		// Retreive labels
		// 		$labels = !empty($raw_data) ? array_values( array_shift($raw_data) ) : [];

    //     // return $raw_data;

    //     // if ( empty($labels) || empty($filtered_data)) {
		// 		// 	$message = "File <strong>{$file_path}</strong> contains invalid data (possible missing labels or empty columns).";
		// 		// 	$errors->add ( 'error', __( wp_kses_post ( $message ), $this->plugin));
		// 		// 	return $errors;
		// 		// }

		// 		// // Filter out empty cells at the end of each column
		// 		// $filtered_data = [];
		// 		// foreach ($raw_data as $row_key => $row_values) {
		// 		// 	// wp_send_json($row_values["A"]);
		// 		// 	if ("" !== $row_values["A"]){
		// 		// 		$counter = 0;
		// 		// 		foreach ($row_values as $cell_key => $cell_value) {
		// 		// 			if ("" === $cell_value) {
		// 		// 				$counter++;
		// 		// 			}
		// 		// 		}

		// 		// 		if ($counter !== count($row_values)) {
		// 		// 			$filtered_data[] = array_values($row_values);
		// 		// 		}
		// 		// 	}
		// 		// }
		// 		// // wp_send_json($filtered_data);

		// 		// Transpose data for plotly plot
		// 		$transposed_data = array_map(null, ...$raw_data);
    //     // return $transposed_data;

		// 		// Validate data
		// 		// Check if the file is already in the upload directory
				
		
		// 		$spreadsheet[$sheet_key]["data"] = $transposed_data;
		// 		$spreadsheet[$sheet_key]["sheetName"]  = $sheet_name;
		// 		$spreadsheet[$sheet_key]["labels"] = $labels;	
		// 	}

		// 	return $spreadsheet;

		// } // END fetch_spreadsheet






	} // END RestAPI

}