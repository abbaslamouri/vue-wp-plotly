<!-- Create a plugin wraper in the default WordPress 'wrap' container -->
<div id="<?php echo "{$this->prefix}__admin"; ?>" class="<?php echo "{$this->prefix} wrap"; ?>" >

<?php require_once "{$this->path}templates/chart-library.php"; ?>
<?php require_once "{$this->path}templates/edit-chart.php"; ?>

</div> <!-- // END <div class='<?php //echo $this->plugin; ?> wrap'> -->