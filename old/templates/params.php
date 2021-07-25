            
<p class="ac-text intro">Select/Upload your excel file here. The first row of your file should contain the column headings.  </p>
<div class="field-group">
  <div class="form-group">
    <button type="button" class="form-group__btn btn button" id="<?php echo "{$this->prefix}__params[mediaUploadBtn]"; ?>" name="<?php echo "{$this->prefix}__params[mediaUploadBtn]"; ?>" >Upload New File </button>
    <label for="" class="form-group__label"></label>
    <div class="form-group__tooltip fileUpload">
      <div class="form-group__tooltip-question-mark">?</div>
      <div class="form-group__tooltip-hint">
      Click the question mark If you are unsure about how to format your data CSV then please take a look at this sample: line.csv. If you are using non-English characters, please make sure you save the file in UTF-8 encoding.
      </div>
    </div>
  </div>
</div>

<div class="field-group hidden">
  <div class="form-group">
    <input type="text" class="form-group__input" id="<?php echo "{$this->prefix}__params[fileName]"; ?>" name="<?php echo "{$this->prefix}__params[fileName]"; ?>" placeholder="Selected File" disabled>
    <label for="" class="form-group__label">Selected File</label>
  </div>
</div>

<div class="field-group hidden">
  <div class="form-group">
    <select class="form-group__input form-group__input-select" id="<?php echo "{$this->prefix}__params[sheetId]"; ?>" name="<?php echo "{$this->prefix}__params[sheetId]"; ?>" placeholder="Sheet">
    </select>
    <label for="" class="form-group__label">Sheet</label>
  </div>
</div>

<div class="field-group hidden">
  <div class="form-group">
    <input type='checkbox' class="form-group__input form-group__input-checkbox" id="<?php echo "{$this->prefix}__params[enableMinMaxAvgTable]"; ?>" name="<?php echo "{$this->prefix}__params[enableMinMaxAvgTable]"; ?>" checked >
    </select>
    <label for="" class="form-group__label">Enable Min/Max/Avg Table</label>
  </div>
  <div class="form-group">
    <input type="text" class="form-group__input" id="<?php echo "{$this->prefix}__params[chartId]"; ?>" name="<?php echo "{$this->prefix}__params[chartId]"; ?>" placeholder="Chart Id"  disabled>
    <label for="" class="form-group__label">Chart Id</label>
  </div>
</div>

<!-- <div class="field-group hidden">
  <div class="form-group">
    <input type="text" class="form-group__input" id="<?php echo "{$this->prefix}__params[chartId]"; ?>" name="<?php echo "{$this->prefix}__params[chartId]"; ?>" placeholder="Chart Id"  disabled>
    <label for="" class="form-group__label">Chart Id</label>
  </div>
</div> -->

<div class="field-group">
  <div class="form-group">
    <input type="hidden" id="<?php echo "{$this->prefix}__params[fileId]"; ?>" name="<?php echo "{$this->prefix}__params[fileId]"; ?>" >
    <!-- <label for="" class="form-group__label">File Id</label> -->
  </div>
</div>
