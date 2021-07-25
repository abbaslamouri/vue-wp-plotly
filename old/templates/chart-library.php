<div class="chart-library">

  <div class='chart-library__header'>
    <h2 class="page-title"> <?php echo esc_html(get_admin_page_title()) ?></h2>
    <a class="button-secondary btn" id="<?php echo"{$this->prefix}__addNewChart"; ?>" ><?php esc_attr_e( 'Add New Chart' ); ?></a>
  </div>
    
  <div class="chart-library__content">
    <!-- <div class='loading'>Loading...</div> -->
    <img class='loading-spinner' src='<?php echo "{$this->url}assets/img/loading-spinner.svg" ?>' alt='Loading Spinner'>
  </div>

</div>
