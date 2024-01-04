<?php

/**
 * Add body classes if certain regions have content.
 */
function okguru_preprocess_html(&$variables) {
// ... there might be other stuff here ...
$body_classes = array($variables['classes_array']);
if ($variables['user']) {
  foreach($variables['user']->roles as $key => $role){
    $role_class = 'role-' . str_replace(' ', '-', $role);
    $variables['classes_array'][] = $role_class;
  }
}

  if (!empty($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }

  if (!empty($variables['page']['triptych_first'])
    || !empty($variables['page']['triptych_middle'])
    || !empty($variables['page']['triptych_last'])) {
    $variables['classes_array'][] = 'triptych';
  }

  if (!empty($variables['page']['footer_firstcolumn'])
    || !empty($variables['page']['footer_secondcolumn'])
    || !empty($variables['page']['footer_thirdcolumn'])
    || !empty($variables['page']['footer_fourthcolumn'])) {
    $variables['classes_array'][] = 'footer-columns';
  }
  if (!empty($variables['page']['region-1'])
    || !empty($variables['page']['region-2'])
    || !empty($variables['page']['region-3'])
    || !empty($variables['page']['region-4'])
    || !empty($variables['page']['region-5'])
    || !empty($variables['page']['region-6'])) {
    $variables['classes_array'][] = 'region-astroshop';
  }




if (arg(0) == 'taxonomy' && arg(1) == 'term') {
    $term = taxonomy_term_load(arg(2));
    $variables['classes_array'][] = 'vocabulary-' . strtolower($term->vocabulary_machine_name);
  }


  // Add conditional stylesheets for IE
  drupal_add_css(path_to_theme() . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function okguru_process_html(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Override or insert variables into the page template.
 */
function okguru_process_page(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function okguru_preprocess_maintenance_page(&$variables) {
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }
  drupal_add_css(drupal_get_path('theme', 'okguru') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function okguru_process_maintenance_page(&$variables) {
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function okguru_preprocess_node(&$variables) {
  if ($variables['view_mode'] == 'full' && node_is_page($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }
}

/**
 * Override or insert variables into the block template.
 */
function okguru_preprocess_block(&$variables) {
  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Overide or insert variables into page templates
 */
function okguru_admin_preprocess_page(&$variables) {
  global $user;

  // Node type Pages
  if (isset($variables['node']->type)) {
    $nodetype = $variables['node']->type;
    $variables['theme_hook_suggestions'][] = 'page__' . $nodetype;
  }
}

/**
 * Implements theme_menu_tree().
 */
function okguru_menu_tree($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implement hook_menu_local_tasks_alter
 */
function okguru_menu_local_tasks_alter(&$data, $router_item, $root_path) {

}

/**
 * Implements theme_field__field_type().
 */
function okguru_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] .'>' . $output . '</div>';

  return $output;
}



function okguru_breadcrumb($variables) {
  $sep = ' > ';
  if (count($variables['breadcrumb']) > 0) {
    return implode($sep, $variables['breadcrumb']);
  }
  else {
    return t("Главная");
  }
}

/*
 * Implements hook_entity_property_info_alter
 *
 */

function okguru_entity_property_info_alter(&$info){
  $info['node']['properties']['sort_price'] = array(
     'type' => 'decimal',
     'label' => 'Sort price',
     'description' => 'The price to sort this product by.',
     'getter callback' => '_example_get_sort_price',
  );

}



/**
* Theme the participants field.
*
* @see theme_privatemsg_list_field()
*/
function okguru_privatemsg_list_field__participants($variables) {
  $thread = $variables['thread'];
  $participants = _privatemsg_generate_user_array($thread['participants'], -4);

  // Remove ourselves from the list of participants
  global $user;
  foreach($participants as $key => $participant) {
      if ($participant->uid == $user->uid) {
          unset($participants[$key]);
      }
  }

  $field = array();
  $field['data'] = _privatemsg_format_participants($participants, 3, TRUE);
  $field['class'] = 'privatemsg-list-participants';
	//     return $field;

	// select last author uid except the current user.
	$uid = db_query('SELECT pm.author FROM {pm_message} pm INNER JOIN {pm_index} pmi ON pmi.mid = pm.mid AND pmi.thread_id = :thread WHERE pm.author <> :author ORDER BY pm.timestamp DESC LIMIT 1', array(':thread' => $thread['thread_id'], 'author' => $user->uid))->fetchField();
  // Only display something if we have an uid.
  $account = user_load($uid);
  if ($uid) {
    return theme('user_picture', array('account' =>$account)) . theme('username', array('account' =>$account)) ;
  }
}

function okguru_preprocess_facetapi_link_inactive(&$variables) {
   // hide facet count
   unset($variables['count']);
 }



/*замена сабмит на страницах*/
function okguru_form_alter(&$form, &$form_state, $form_id) {
	$request_path = request_uri();

  	if (strrpos($form_id, 'commerce_cart_add_to_cart_form_') === 0) {
		if (drupal_match_path($request_path, '/video')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video-exclusive')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video-training')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video-tekhniki')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video-master-class')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/master-profile/master-video/*')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video-new')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/video/full/*')) $form['submit']['#value'] = t('оплатить курс');
		if (drupal_match_path($request_path, '/fly-stars')) $form['submit']['#value'] = t('В корзину');
		if (drupal_match_path($request_path, '/users/client-consultation/*')) $form['submit']['#value'] = t('Оплатить');
		if (drupal_match_path($request_path, '/shop-certificate')) $form['submit']['#value'] = t('В корзину');
		if (drupal_match_path($request_path, '/shop-shares')) $form['submit']['#value'] = t('В корзину');
		if (drupal_match_path($request_path, '/shop-new')) $form['submit']['#value'] = t('В корзину');
		if (drupal_match_path($request_path, '/live-seminars/*')) $form['submit']['#value'] = t('ПРИНЯТЬ УЧАСТИЕ');
		if (drupal_match_path($request_path, '/user/password*')) $form['submit']['#value'] = t('E-mail');

	}
	if ($form_id == 'webform_client_form_86936') {

	 if (arg(0) == 'node' &&  is_numeric(arg(1))) {
	  $node = node_load(arg(1));
	  $author = user_load($node->uid);

	  $form['submitted']['master_email'] = array(
	   '#type' => 'hidden',
	   '#value' => $author->mail,
	  );
	 }
	}

  if ($form_id == 'user_register_form') {
    if (isset($form['field_master_profile']['und']['form'])) {
      $form['field_master_profile']['und']['form']['title']['#default_value'] = 'Master-profile';
      $form['field_master_profile']['und']['form']['title']['#access'] = FALSE;

      $form['field_master_profile']['und']['form']['field_mp_services']['und']['#required'] = FALSE;
    }

    // // Admin Views Set fieldset permitions
    // if (isset($form['field_master_profile']['und']['form']['#groups']['group_mp_admin_set']->children)) {
    //   foreach ($form['field_master_profile']['und']['form']['#groups']['group_mp_admin_set']->children as $field_id) {
    //     $form[$field_id]['#access'] = FALSE;
    //   }
    // }

    // Unset Master Profile field
    if (isset($form_state['reg_rid']) && isset($form['field_master_profile']) && $form_state['reg_rid'] == 10) {
      unset($form['field_master_profile']);
    }

    // dpm($form);
    // dpm($form_state);
  }
}

/**
 * Submit handler
 * @see okguru_form_alter
 */
function okguru_registration_attach_user_role($form, &$form_state) {

}
