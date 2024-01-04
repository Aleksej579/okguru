;(function($) {
  Drupal.behaviors.viwe_new = {
    attach: function(context, settings) {
			var formAddVseminar = $('#vseminar-node-form');
			$('.form-item-title input', formAddVseminar).on('change', function (el) {
				var a = $(this).val();
				$('input#edit-field-vsem-enref-und-form-field-vsemin-nodeforsale-und-form-title').val(a);
			});
			/* note form cart */
			$('#views-form-commerce-cart-form-default .views-row', context).wrapAll('<div class="rigth-content"></div>');
			$('#views-form-commerce-cart-form-default .line-item-summary, #views-form-commerce-cart-form-default .form-actions, #views-form-commerce-cart-form-default .wrapp-order', context).wrapAll('<div class="left-content"></div>');
			if ($('body', context).is('.page-cart')) {
					var sumcart = 0,
							cartprocent = 0,
							procent = 0;
					$('.view-content', context).each(function() {
							$(this).find('.views-row', context).each(function() {
									$(this).find('td.webprice-total').each(function() {
											sumcart1 = parseInt($(this).text().replace(' ', ''));
											// console.log(sumcart1);
									});
									$(this).find('.views-field-edit-quantity input[type="text"]').each(function() {
											sumcart2 = parseInt($(this).val());
											// console.log(sumcart2);
											if ($(this).bind()) {
												sumcart2 = parseInt($(this).val());
												// console.log(sumcart2);

											}
									});

									sumcart += sumcart1 * sumcart2;
									// console.log(sumcart);
							});
							$(this).find('.fo-summ span', context).html(sumcart + " руб.");
							/**/
							cartprocent = parseInt($('.line-item-total-raw').text().replace(' ', ''));
							if (sumcart === cartprocent) {
									$('.discount span', context).html('0 %');
							} else {
									procent = sumcart / cartprocent * 100;
									procent = 100 - procent;
									$('.discount span').html(procent + ' %');
							}
							//                    sumcart = 0;
							/**/
					});
			}
			/* note form cart */
			/** page consultation */
			var cons_page = $('#views-exposed-form-consulr-index-consultations-list-page-new .views-exposed-widgets');
			$('#edit-field-consult-link-commerce-price-amount-decimal-wrapper, #edit-field-consult-link-commerce-price-amount-decimal-1-wrapper', cons_page).wrapAll('<div class="price-range"></div>');
			$('.price-range > div', cons_page).wrapAll('<div class="content"></div>');
			$('.price-range', cons_page).prepend('<span class="label">Цена</span>');
			/** page consultation */
			/** NOTE: page master-cons */
			$('.page-master-catalog #edit-reset').on('click', function (e) {
				e.preventDefault();
				var a = window.location.host;
				console.log(a);
				window.location = "http://" + a + "/master-catalog";
			});

			/** edn page master-cons */
			/**page bookmarck */
			$('.page-bookmarks .add-cart').on('click', function  () {
				// body
				$('.page-bookmarks .field-name-field-product-ref.field-type-commerce-product-reference input#edit-submit').click(); 
				console.log('sdfasdfasdf');
			});
			/**page bookmarck */

		}
  };
	  $(document).ready(function() {
			var pageCart = $('#views-form-commerce-cart-form-default');
			// $('.select-all-rows', pageCart).val(true);
			// $('#edit-operation [value="action::views_bulk_operations_delete_item"]', pageCart).attr('selected', 'true');
			$('.page-cart .wrapp-order h4').on('click', function () {
				a = $('.delete-line-item', pageCart).mousedown();
				// var a = $('.delete-line-item', pageCart);
				// console.log(a);
			});
		});
})(jQuery);
