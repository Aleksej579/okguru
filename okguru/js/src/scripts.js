;(function($) {
  Drupal.behaviors.sriptsJS = {
    attach: function(context, settings) {

    	// ==========================================================================
    	// Profile Edit Page
    	// ==========================================================================
    	let fpl = [
    		'#edit-current-pass',
    		'#edit-mail',
    		'#edit-pass-pass1',
    		'#edit-pass-pass2'
    	];

    	fpl.forEach((el, i) => {
    		let label = $('#user-profile-form ' + el).prev('label');

    		$('#user-profile-form ' + el, context).attr('placeholder', label.text());
    		label.hide();
    	}, this);

    }
  }
})(jQuery);