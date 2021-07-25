<?php

// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) die;

delete_option("axl_wp_member");
delete_option("axl_wp_member_settings");
delete_option("axl_wp_member_pages");
delete_option("axl_wp_member_captcha");
delete_option("axl_wp_member_email");
delete_option("axl_wp_member_dialogs");