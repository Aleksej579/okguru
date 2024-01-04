'use strict';

;(function ($) {
  Drupal.behaviors.sriptsJS = {
    attach: function attach(context, settings) {

      // ==========================================================================
      // Profile Edit Page
      // ==========================================================================
      var fpl = ['#edit-current-pass', '#edit-mail', '#edit-pass-pass1', '#edit-pass-pass2'];

      fpl.forEach(function (el, i) {
        var label = $('#user-profile-form ' + el).prev('label');

        $('#user-profile-form ' + el, context).attr('placeholder', label.text());
        label.hide();
      }, this);
    }
  };
})(jQuery);