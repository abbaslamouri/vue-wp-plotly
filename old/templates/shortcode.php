
<div class="<?php echo "{$this->prefix} {$this->prefix}__frontend"; ?>">
<div class = 'message'><?php if ( isset( $payload['status'] ) && $payload['status'] == 'error') echo $payload['message']; ?></div>
  <div class="plotly">
    <div class = 'chart' id="<?php echo "{$this->prefix}__plotlyChart__{$payload["chart"]["params"]["chartId"]}"; ?>" ></div>
    <div class="min-max-avg-table"><?php require "{$this->path}templates/min-max-inputs.php"; ?></div>
  </div>
<div>



  


