;(function($) {

		Drupal.behaviors.wer = {
			attach: function (context, settings) {


				if($('.mobile-filters').length == 0) {
					$('<button class="mobile-filters">Категории</button>').appendTo('.region-astroshop #main-wrapper .views-exposed-widgets');
				}else if($('.mobile-filters').length > 1) {
					$('.views-exposed-widgets').children().last().remove();
				}

				$('.mobile-filters').on('click', function(e){
					e.preventDefault()
					$('#sidebar-first').addClass('open');
					$('html').addClass('notScroling');
				})

				$('.not-logged-in.page-user-password #user-pass #edit-actions #edit-submit').val('Выслать новый пароль')

				$('.commerce_add_to_cart_confirmation_overlay').each(function(key, item){
					if(key != 0){
						$(this).remove()
					}
				})

				if($('.node-type-product-dsp .node-full .field-name-field-product-availability span:contains("Скоро в продаже")').length > 0){
					$('.field-name-field-product-ref').css('display', "none")
				}

				$('.views-row .field-name-field-product-availability span:contains("Скоро в продаже")').each(function(){
					$(this).closest('.views-row').find('.field-name-field-product-ref').css('display', "none")
				})
				$('.page-bookmarks span:contains("Скоро в продаже")').each(function(){
					$(this).closest('.views-row').find('.views-field-add-to-cart-form').css('display', "none")
				})

				if( $('#edit-sort-bef-combine-wrapper select').length > 0 ) {

					$('#edit-sort-bef-combine-wrapper select').chosen();

				}

				if($('[name="customer_profile_billing[commerce_customer_address][und][0][thoroughfare]"]').length>0){
					window.yMapsOnload = function (ymaps) {
						var suggestView = new ymaps.SuggestView($('[name="customer_profile_billing[commerce_customer_address][und][0][thoroughfare]"]')[0]);
					}

					$('body').append('<script src="//api-maps.yandex.ru/2.1/?lang=ru_RU&load=SuggestView&onload=yMapsOnload"></script>')
				}


				$('.view-commerce-cart-summary.view-id-commerce_cart_summary .commerce-order-handler-area-order-total .component-type-commerce-price-formatted-amount .component-title',context).text('Итого');
				$('.group-product-right .field-name-field-product-ref .form-item-quantity .form-text,.page-cart .views-field-edit-quantity .form-text',context).each(function(){
					$(this).after('<span class="plus"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>');
					$(this).before('<span class="minus"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>');
				});
				//
				$('.minus',context).on('click',function () {
						var input = $(this).parent().find('input'),
								count = parseInt(input.val()) - 1;

						count = count < 1 ? 1 : count;
						input.val(count);
						input.change();
						return false;
				});

				$('.plus', context).on('click',function () {
						var input = $(this).parent().find('input');
						input.val(parseInt(input.val()) + 1);
						input.change();
						return false;
				});
				//

				$('#block-block-8').appendTo('.group-product-left');

				//
				if ( $('select.country.form-select').length > 0 ) {
					$('select.country.form-select',context).chosen();
					$('select.state',context).chosen();
				}

				//
				if( $('.field-name-field-select-guru select,.field-name-field-cons-format select,.field-name-field-payment-method select').length > 0 ) {
					$('.field-name-field-select-guru select,.field-name-field-cons-format select,.field-name-field-payment-method select',context).chosen();
				}

				//
				$('.field-name-field-customer-phone-shipping input,.field-name-field-customer-phone input,.field-name-field-phone input',context).each(function() {
					$(this).mask("9 (999) 999-99-99");
				});

				var sidebar = $('#main > .sidebar');

				if( !(sidebar.length > 0) ) {
					$('#content').addClass('full-width');
				}

				$('table',context).not('.field-name-commerce-price table').not('.views-field-commerce-price table').addClass('responsive');
				$.each($('body.page-checkout table'), function(){
					$(this).removeClass('responsive')
				})
				$.each($('body.page-user-orders table'), function(){
					$(this).removeClass('responsive')
				})

				$('input.facetapi-checkbox',context).labelauty();
				$('.commerce-add-to-cart-confirmation-close',context).on('click',function() {
					$(this).closest('#messages').hide();
				});


				$('.page-checkout input.form-radio',context).each(function() {

					if(! $(this).parent().hasClass('check-radio') ) {
						$(this).wrapAll('<div class="check-radio"></div>');
					}

					if( $(this).is(":checked") ) {
						$(this).parent().addClass('checkkk');
					} else {
						$(this).parent().removeClass('checkkk');
					}

				});

				$('.page-checkout input.form-radio',context).ajaxComplete(function() {

					$('.page-checkout input.form-radio',context).each(function() {

						if(! $(this).parent().hasClass('check-radio') ) {
							$(this).wrapAll('<div class="check-radio"></div>');
						}

						if( $(this).is(":checked") ) {
							$(this).parent().addClass('checkkk');
						} else {
							$(this).parent().removeClass('checkkk');
						}

					});

				});

				$('.page-checkout input.form-radio',context).each(function() {
					$('.page-checkout input.form-radio',context).on('change',function() {
						$(this).parent().addClass('checkkk', $(this).is(':checked'));
						$(this).closest('.form-item').siblings().find('.check-radio').removeClass('checkkk');
					});
				});

				$(window).on('load resize',function() {
					if( $(window).width() <= 767 ) {
						if(! $('.sf-accordion-toggle',context).children().is('#nav-toggle') ) {
							$('.sf-accordion-toggle',context).append('<a id="nav-toggle" href="#"><span></span></a>');
							$('#nav-toggle',context).on('click',function() {
								$(this).toggleClass('active');
								$(this).closest('.sf-accordion-toggle').siblings('#superfish-1-accordion').toggleClass('sf-expanded');
							});
						}
					}
				});

				//
				$('#cons-calc-node-form .form-submit',context).val('Записаться');

				$('.node-okguru_consultation-form .form-submit',context).val('Записаться');
				
				//
				$('.view-shop-categos .views-row',context).each(function() {
					var getHrefCat = $(this).find('a').attr('href');
					$(this).on('click',function() {
						location.href = getHrefCat;
					});
				});

				// BRACELET CONSTUCTOR
				var methods = {
					isEmpty: function (arg) {
						if ( arg !== undefined && arg !== "" && arg.length > 0 ) {
							return false;
						}
						return true;
					}
				};

				// --- Ajax preloader
				$('.page-node-86197').ajaxStart(function(){
					$('#preloader').fadeIn(100);
				});
				$('.page-node-86197').ajaxSuccess(function(){
					$('#preloader').fadeOut(100);
				});

				// калькуляо банзи
				$('#banzee',context).on('load', function() {
					$('#banzee').contents().on('click','span.v-button-wrap', function() {
						setTimeout(function() {
							var tableStolpi = $('#banzee').contents().find("html").html();
							$('.html.not-front #edit-field-stolpi-sudbi-und-0-value').val('');
							$('.html.not-front #edit-field-stolpi-sudbi-und-0-value').val( tableStolpi );
						}, 1000)
					});

				});
				//
				$('.page-node-add.page-node-add-banzi .form-item-title input',context).val('Результат калькулятора');

				// калькуляо звёзды
				$('#stars',context).on('load', function() {
					$('#stars').contents().on('click','button.btn.btn-default:first', function() {
						setTimeout(function() {
							var tableStarsi = $('#stars').contents().find("html").html();
							$('.html.not-front #edit-field-cal-stars-field-und-0-value').val('');
							$('.html.not-front #edit-field-cal-stars-field-und-0-value').val( tableStarsi );
							
						}, 1000)
					});

				});

				$('.page-node-add.page-node-add-calcul-stars .form-item-title input',context).val('Результат калькулятора');

				// --- Master frofiles
				// tooltips
				$('.view-display-id-master_service_full_node_block .views-field-field-ms-desrc').each(function() {
					$(this).attr( 'data-jb-title', $.trim( $(this).prevAll('.views-field-title-1').text() ));
					$(this).attr( 'data-jb-content', $.trim( $(this).nextAll('.views-field-field-ms-desrc-1').text() ));
				});

				$('.view-display-id-master_service_full_node_block .views-field-field-ms-desrc').jBox('Modal', {
					trigger: 'click',
					getTitle: 'data-jb-title',
					getContent: 'data-jb-content',
					delayOpen: 50,
					delayClose: 10
				});

				// --- Dialogs new commesnts counter
				var dialogItem = $('.view-display-id-dialogs_page .dialog-table-item', context);

				dialogItem.each(function() {
					var newCont = $(this).find('.view-display-id-new_comments_block'),
						newItem = newCont.find('.views-row'),
						newNum = 0;
					newItem.each(function() {
						if ( $.trim($(this).text()) === 'new' ) {
							newNum++;
						}
						
					});
					if ( newNum > 0 ) {
						newCont.after('<a href="' + newItem.find('a').first().attr('href') + '">' + newNum + '</a>');
					}
				});

				if($('body.page-checkout').hasClass('not-logged-in')){
					if ($('#edit-account-form-select-register').length > 0) {
						$('#edit-account-form-select-register').html('<p class="account-login_checkout"><a class="checkout-register-btn" href="/user/register-user">Зарегестрируйтесь и продолжите покупку</a></p>');
					}
				}

				$('.page-checkout #edit-account-form-select-login-continue').attr("value","Войти и продолжить покупку");
				$('.page-checkout .form-item-account-form-select-login-mail label').html('E-mail<span class="form-required" title="Это поле обязательно для заполнения.">*</span>');
        
        // delete value for commerce billing profile
        $('.page-checkout .customer_profile_billing .form-type-textfield:not(.delete-poressed)').each(function(i, el) {
            var $element = $(el);
            var $button = $('<button class="ui-delete-value" title="Очистить"><i class="fa fa-times"></i></button>');
            $button.on('click', function(event) {
              event.preventDefault();
                var $target = $(event.target);
                var $parent = $target.closest('.form-type-textfield');
                $('input', $parent).val('');
                $('input', $parent).change();
              });
            $element.append($button);
            $element.addClass('delete-poressed');
          });

			}
		};

	$(document).ready(function() {
		$('.page-consultations #edit-sort-bef-combine').on('hover', function(e) {
			$('#edit-sort-bef-combine').click()
		    //do_something(evt, params);
		 });

//-----------------

		$('ul.tabs.primary').each(function() {
			$(this).addClass('cl-effect-4');
		});
		//
		$('#block-commerce-cart-cart').on('click',function() {
			location.href = '/cart';
		});
		$('#block-views-flag-bookmarks-block-1 > h2').on('click',function() {
			location.href = '/bookmarks';
		});

		$('.clo-win').on('click',function() {
			$(this).closest('.messages').fadeOut(600);
		});
		//
		$('#edit-field-sum input').val('0');
		$('.field-name-field-cons-type select').on('change',function() {
			var summa = 0;
			$('.field-type-number-decimal:not(.field-name-field-sum)').each(function() {
				if( $(this).is(":visible") ) {
					var dec = +$(this).find('input').val();
					summa += dec;
				} else {
				}
			});
			$('#edit-field-sum input').val( summa );

			var getItems = $('.group-wrap-consult > .field-type-number-decimal');
			getItems.each(function() {
				if ( getItems.is(':visible') ) {
					getItems.parent().css('border','1px solid #000');
				} else {
					getItems.parent().css('border','none');
				}
			});


		});
		//
			if( $(window).width() < 767 ) {
				$('#block-menu-menu-menu-e-shop').before('<div class="title-vkl">Вкладки</div>');
			} else {
				$('.title-vkl').remove();
			}
		//-------------------------------------

		$(".cart-empty-page").empty();
		$(".cart-empty-page").html('<div class="empty-page-wrapp"><h3>Пока тут пусто.</h3><h3>Посетите наш магазин и все наладится!</h3><div class="shop-link"><a href="/astroshop">в магазин</a></div></div>');
		
		var sumStr = $('.fo-summ span').text();
		var sumStr = sumStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
		$('.fo-summ span').text(sumStr);

		//mobile
		var menuMail = $('.region-header #block-views-2bc36bd10012c72fe017efb188f21b9b');
		var menuSearch = $('.region-header #block-search-form');
		var menuGuruRight = $('.region-header #block-menu-menu-guru-right-menu');
		var menuLogin = $('.region-header #block-menu-menu-guru-login');
		var menuCart = $('.region-header #block-commerce-cart-cart');
		var menuBookmarks = $('.region-header #block-views-4afbfdaed6866ac0c17a8d5dea3353ab');

		menuLogin.find('a:contains("/выход")').text('выход')
		var menuMobiItems = [menuSearch, menuGuruRight, menuBookmarks, menuCart, menuMail, menuLogin,];
		$.each(menuMobiItems, function( item ) {
		  $(this).addClass('mobi-item').clone().appendTo("#block-menu-menu-main-menu-top");
		});
		
		var menuButton = document.getElementById('menuButton'),
			menuMobile = document.getElementById('block-menu-menu-main-menu-top');

			if ( menuButton !== null ) {
				menuButton.addEventListener('click', function (e) {
					menuButton.classList.toggle('is-active');
					menuMobile.classList.toggle('open');
					e.preventDefault();
				});
			}
		$('body').on('click', function(e){

			if(!$(e.target).is("#block-menu-menu-main-menu-top") && 
				!$(e.target).closest('#block-menu-menu-main-menu-top').length>0 &&
				!$(e.target).is("#menuButton") &&
				!$(e.target).closest('#menuButton').length>0){
				$('#menuButton').removeClass('is-active');
				$('#block-menu-menu-main-menu-top').removeClass('open');
			}

			var div = $("#sidebar-first");
			if(!div.is(e.target) && div.has(e.target).length === 0 && !$('.mobile-filters').is(e.target)){
				div.removeClass('open')
			}
		})
	});

	$(window).on('load',function() {
		$('.resize-block > h2').on('click',function() {
			$(this).toggleClass('open-title');
			$(this).siblings('.content').slideToggle(300);
		});
		$('.title-vkl').on('click',function() {
			$(this).toggleClass('open-title');
			$(this).next().find('.content').slideToggle();
		});
	});

	$(window).on('load',function() {
		$('.node-product-dsp .swiper-button-next').removeClass('swiper-button-disabled');
	});
////////////////////////////////////////////////
// выпадающее меню
////////////////////////////////////////////////

$.menuDrop = function(){
		var menu4Btn = $('.views-exposed-widgets').children().not('.views-widget-filter-search_api_views_fulltext, .views-exposed-widget.views-submit-button, .views-exposed-widget.views-reset-button, #edit-field-master-skils-wrapper, .reset_t, .btn_apply_filter, .page-search-test #views-exposed-form-search-test-page #edit-type-wrapper');
		
		menu4Btn.mouseout(function(){ 
			if($(window).width()>700){
				$(this).find(".bef-slider").removeClass('menuVisible');
				$(this).find(".views-widget").removeClass('menuVisible');
			}
		});	

		menu4Btn.mouseover(function(){
			if($(window).width()>700){
				$(this).find(".bef-slider").addClass('menuVisible');
				$(this).find(".views-widget").addClass('menuVisible');
			}
		});	

		$('#edit-sort-bef-combine-wrapper').mouseout(function(){
			if($(window).width()>700){
				$(this).find(".chosen-container").removeClass('chosen-with-drop chosen-container-active');
				$(this).find("#edit-sort-bef-combine").removeClass('menuVisible');
				$(this).find("#edit_sort_bef_combine_chosen").removeClass('menuVisible');
			}
		});	
		
		$('#edit-sort-bef-combine-wrapper').mouseover(function(){	
			if($(window).width()>700){
				$(this).find(".chosen-container").addClass('chosen-container-active chosen-with-drop');
				$(this).find(".chosen-container").mousedown()
				$(this).find("#edit-sort-bef-combine").addClass('menuVisible');
				$(this).find("#edit_sort_bef_combine_chosen").addClass('menuVisible');
			}
		});	

		$('.views-widget-per-page').mouseout(function(){				
			$(this).find(".bef-select-as-links.jquery-once-2-processed").removeClass('menuVisible');
		});	

		$('.views-widget-per-page').mouseover(function(){			
			$(this).find(".bef-select-as-links.jquery-once-2-processed").addClass('menuVisible');
		});	

		$('.views-widget-per-page').mouseout(function(){				
			$(this).find(".bef-select-as-links.jquery-once-1-processed").removeClass('menuVisible');
		});	

		$('.views-widget-per-page').mouseover(function(){			
			$(this).find(".bef-select-as-links.jquery-once-1-processed").addClass('menuVisible');
		});	

		$('#edit-field-master-skils-wrapper').mouseout(function(){				
			$(this).find(".views-widget").removeClass('menuVisibleSkils');
		});	

		$('#edit-field-master-skils-wrapper').mouseover(function(){			
			$(this).find(".views-widget").addClass('menuVisibleSkils');
		});	
	
		menu4Btn.click(function(){ 
				$(this).find(".bef-slider").toggleClass('menuVisible');
				$(this).find(".views-widget").toggleClass('menuVisible');
				$('.views-exposed-widgets').toggleClass('for_button_reset');
		});	


		$('#edit-sort-bef-combine-wrapper').click(function(){
			
				$(this).find(".chosen-container").toggleClass('chosen-with-drop chosen-container-active');
				$(this).find("#edit-sort-bef-combine").toggleClass('menuVisible');
				$(this).find("#edit_sort_bef_combine_chosen").toggleClass('menuVisible');
			
		});	
		
		var inputAttr = $('#edit-search-api-views-fulltext')
		$(inputAttr).attr('placeholder','Поиск');
	};
$(document).ajaxComplete($.menuDrop);
$(document).ready($.menuDrop);
$(window).resize($.menuDrop);
////////////////////////////////////////////////
// выпадающее меню
////////////////////////////////////////////////


////////////////////////////////////////////////
// оформление заказа
////////////////////////////////////////////////

	$.checkPhone = function(){
	    if($('#customer-profile-shipping-ajax-wrapper input.form-checkbox').is(':checked')){
						$(".field-name-field-customer-phone-shipping").css({'display' : 'none'});
					}
					else {
						$(".field-name-field-customer-phone-shipping").css({'display' : 'block'});
					}
	};
	$(document).ajaxComplete($.checkPhone);
	$(document).ready($.checkPhone);
	
////////////////////////////////////////////////
// оформление заказа
////////////////////////////////////////////////


////////////////////////////////////////////////
// эксклюзивные товары
////////////////////////////////////////////////

	$(function() {	
		$('.node-product-dsp').mouseout(function(){
			$(this).find(".views-field-field-price-ex-goods .field-content").css({'color' : 'black'});
		});	


		$('.node-product-dsp').mouseover(function(){
			$(this).find(".views-field-field-price-ex-goods .field-content").css({'color' : '#a461cc'});
		});	

	});

	$(function() {	
	
		var block_title = $('.page-node-86966 .titel-block, .link-gift-cart span, .link-book span, .link-creation span, #block-block-63 .titel-block, #block-block-64 .titel-block, #block-block-65 .titel-block');

		for(var i = 0; i<block_title.length; i++){
			if(block_title[i].innerHTML.length>19){
				block_title[i].innerHTML = block_title[i].innerHTML.substr(0,19)
			}		
		}

		var block_title_small = $('.link-for-shi span, .link-for-hi span, .link-for-home span');

		for(var i = 0; i<block_title_small.length; i++){
			if(block_title_small[i].innerHTML.length>12){
				block_title_small[i].innerHTML = block_title_small[i].innerHTML.substr(0,12)
			}		
		}

		var block_title_long = $('#block-block-67 .titel-block, #block-block-68 .titel-block');

		for(var i = 0; i<block_title_long.length; i++){
			if(block_title_long[i].innerHTML.length>31){
				block_title_long[i].innerHTML = block_title_long[i].innerHTML.substr(0,31)
			}		
		}
	});
	
	$(function() {	
		$('#block-block-74, #block-block-62, #block-block-46, #block-block-75, #block-block-68, #block-block-67, #block-block-66, #block-block-65, #block-block-64, #block-block-63, #block-block-76, #block-block-51, #block-block-52, #block-block-60, #block-block-59, #block-block-58, #block-block-57, #block-block-56, #block-block-77, #block-block-55, .jcarousel-container').click(function() {
		    $(this).css({'transform' : 'scale(0.95)','transition' : '0.5s'});
		});

	});

////////////////////////////////////////////////
// эксклюзивные товары
////////////////////////////////////////////////

	$(document).ajaxComplete(function() {
	  	$(".cart-empty-page").empty();
		$(".cart-empty-page").html('<div class="empty-page-wrapp"><h3>Пока тут пусто.</h3><h3>Посетите наш магазин и все наладится!</h3><div class="shop-link"><a href="/astroshop">в магазин</a></div></div>');
		$(".messages.status").append("<i class='fa fa-times' aria-hidden='true'></i>")
		$(".messages.status .fa-times").click(function() {
		   $(".messages.status").remove()
		});
		$(".messages.error .fa-times").click(function() {
		   $(".messages.error").remove()
		});

		$('.field-name-comments-count-custom').css({'visibility' : 'visible'});
		$('.edit-commerce-payment-payment-method label').on('click', function() {
				$( "#edit-commerce-payment-payment-method-commerce-robokassacommerce-payment-commerce-robokassa" )[0].checked;
		
		});
		$.each( $('#edit-commerce-payment-payment-method input'), function( key, value ) {
			if(value.checked==true){
				$(value).parent().siblings('label').css({'border-color' : '#55a6e8'})
			}else{
				$(value).parent().siblings('label').css({'border-color' : '#ecedee'})
			}

		});

		$.each( $('#edit-commerce-shipping-shipping-service .form-item'), function( key, value ) {
			if(($(value).find('input')[0].checked)==true){
				($(value).find('label').addClass('checked'))
			}
		});

		if($('body.page-checkout').hasClass('not-logged-in')){
			if( $('#account-login-container input').val()!=="" && $("input").is('#edit-account-login-login-now')!==true && $("p").is('.account-login_checkout')!==true){
				$('#account-login-container').append('<p class="account-login_checkout"><a href="/user/register-user">Зарегестрируйтесь и продолжите покупку</a></p>');
				
			}
			if ($('#edit-account-form-select-register').length > 0) {
				$('#edit-account-form-select-register').html('<p class="account-login_checkout"><a href="/user/register-user">Зарегестрируйтесь и продолжите покупку</a></p>');
			}
		}

		$(".messages.status").append("<i class='fa fa-times' aria-hidden='true'></i>")
		$(".messages.error").append("<i class='fa fa-times' aria-hidden='true'></i>")
		$(".messages.status .fa-times").click(function() {
		   $(this).closest(".messages").remove()
		});

		$(".messages.error .fa-times").click(function() {
		   $(this).closest(".messages").remove()
		});
		
		$('.page-bookmarks .views-field-add-to-cart-form .form-submit').val('В корзину');

		if(!($('.page-checkout .commerce_shipping p').hasClass('subtitle-checkout'))){
			$('.page-checkout .commerce_shipping.form-wrapper span').after('<p class="subtitle-checkout">Для получения расценок на доставку службами Почта РФ или СДЭК пожалуйста заполните корректно: индекс, город, адрес, ФИО</p>')
		}

	 	$('.customer_profile_shipping #edit-customer-profile-shipping-edit-button').mousedown();

	 	//SDEK
	 	if(!($('.page-checkout .commerce_shipping div').hasClass('wrap_SDEK')) ){
	 		$('.page-checkout .commerce_shipping .form-radios').append('<div class="form-type-radio wrap_SDEK"><input type="radio"><label class="option" title="Укажите страну, индекс, город чтобы рассчитать стоимость!">Доставка СДЭК</label></div>');
	 	}

	 	if(!($('.page-checkout .commerce_shipping div').hasClass('SDEK_container'))){
	 		$('.page-checkout .commerce_shipping').append('<div class="SDEK_container"></div>');
 			$.each( $('.page-checkout .commerce_shipping .fieldset-wrapper .form-item input'), function( key, value ){
		    	var str = $(value).val();
		        if(str.search( /sdek_/i )==0 ){
					$('.page-checkout .commerce_shipping .SDEK_container').append($(value).parent())
		    	}   
			});
	 	}

	 	if(($('.SDEK_container .form-item').length == 0)){
	 		$('.page-checkout .wrap_SDEK').css({'opacity' : '0.4'});
	 	}else{
	 		$('.page-checkout .wrap_SDEK').css({'opacity' : '1'});
	 	}
	 	
	 	$('.wrap_SDEK label').click(function(){
			$('.SDEK_container input:first').click()
			$('.page-checkout .commerce_shipping .SDEK_container').css({'display' : 'block'});
		})
	 	$('.wrap_SDEK input').prop("checked", false);
	 	$('.page-checkout .commerce_shipping .SDEK_container').css({'display' : 'none'});
		$.each( $('.page-checkout .commerce_shipping .SDEK_container input'), function( key, value ){
		        if(($(value).attr("checked") == 'checked')==true){
		        	$('.wrap_SDEK input').prop("checked", true);
		        	$('.page-checkout .commerce_shipping .SDEK_container').css({'display' : 'block'});
		        }
		});

	 	//pochta rf
	 	if(!($('.page-checkout .commerce_shipping div').hasClass('wrap_pochta')) ){
	 		$('.page-checkout .commerce_shipping .form-radios').append('<div class="form-type-radio wrap_pochta"><input type="radio"><label class="option" title="Укажите страну, индекс, город чтобы рассчитать стоимость!">Доставка почтой россии</label></div>');
	 	}

	 	if(!($('.page-checkout .commerce_shipping div').hasClass('pochta_container'))){
	 		$('.page-checkout .commerce_shipping').append('<div class="pochta_container"></div>');
 			$.each( $('.page-checkout .commerce_shipping .fieldset-wrapper .form-item input'), function( key, value ){
		    	var str = $(value).val();
		        if(str.search( /pochtaru_/i )==0 ){
					$('.page-checkout .commerce_shipping .pochta_container').append($(value).parent())
		    	}   
			});
	 	}

	 	if(($('.pochta_container .form-item').length == 0)){
	 		$('.page-checkout .wrap_pochta').css({'opacity' : '0.4'});
	 	}else{
	 		$('.page-checkout .wrap_pochta').css({'opacity' : '1'});
	 	}

	 	$('.wrap_pochta label').click(function(){
			$('.pochta_container input:first').click()
			$('.page-checkout .commerce_shipping .pochta_container').css({'display' : 'block'});
		})

	 	$('.wrap_pochta input').prop("checked", false);
	 	$('.page-checkout .commerce_shipping .pochta_container').css({'display' : 'none'});
		$.each( $('.page-checkout .commerce_shipping .pochta_container input'), function( key, value ){
		        if(($(value).attr("checked") == 'checked')==true){
		        	$('.wrap_pochta input').prop("checked", true);
		        	$('.page-checkout .commerce_shipping .pochta_container').css({'display' : 'block'});
		        }
		});
	 	//pochta rf
	 	$('.page-checkout .locality-block .form-item-customer-profile-shipping-commerce-customer-address-und-0-locality input').attr("placeholder","Город *");
	 	$('.page-checkout .locality-block .form-item-customer-profile-shipping-commerce-customer-address-und-0-postal-code input').attr("placeholder","Почтовый индекс *");
	 	$('.page-checkout .customer_profile_billing .fieldset-description').text('Укажите максимально полную информацию и тогда вы точно получите посылку вовремя');

	 	$('.page-checkout #page-wrapper .pageShadow').remove();

	 	$('.page-checkout form #account-login-container .form-submit').attr("value","Войти");
		 $('.page-checkout form #account-login-container .form-submit').parent().parent().siblings('.check-login').css({'display' : 'none'});
		 
		 $('.page-checkout #edit-account-form-select-login-continue').attr("value","Войти и продолжить покупку");
	});

	$(document).ajaxStart(function() {
		if(!$('.page-checkout #page-wrapper div').hasClass('pageShadow')){
			$('.page-checkout #page-wrapper').append('<div class="pageShadow"></div>');
		}
		
	});

	$(window).on('load',function() {
		$(".messages.status").append("<i class='fa fa-times' aria-hidden='true'></i>")
		$(".messages.error").append("<i class='fa fa-times' aria-hidden='true'></i>")

		$(".messages.status .fa-times").click(function() {
		   $(this).closest(".messages").remove()
		});

		$(".messages.error .fa-times").click(function() {
		   $(this).closest(".messages").remove()
		});

	    if($('.field-name-news-akciy #edit-submit').attr("value")=="Отписаться"){
			$('.field-name-news-akciy .field-label').css({'visibility' : 'hidden'});
		}

		$('.page-shop .current-search-item-reset-filters a').attr("href","/shop");
		$('.page-video .current-search-item-reset-filters a').attr("href","/video");
		$('.page-master-catalog .current-search-item-reset-filters a').attr("href","/master-catalog");
	});

	$(document).ready(function() {
		$('.field-name-like-flag-custom').on('click', '.flag-wrapper a', function() {
					if($(this).parent().parent().find('.flag-count.unflaggedStyle').length==true){
						var disLikeCount = +$(this).parent().parent().find('.flag-count').html()
						disLikeCount--
						$(this).parent().parent().find('.flag-count').html(disLikeCount)
						
					}else{
						var disLikeCount = +$(this).parent().parent().find('.flag-count').html()
						disLikeCount++
						$(this).parent().parent().find('.flag-count').html(disLikeCount)
					}
		});

		$('#block-block-51').wrap( "<div class='wrapper-51-52'></div>" );
		$('.wrapper-51-52').append($("#block-block-52"));
		$('#block-block-59').wrap( "<div class='wrapper-59-60'></div>" );
		$('.wrapper-59-60').append($("#block-block-60"));
		$('.field-name-bookmark-flag-custom').on('click', '.flag-wrapper a', function() {
			
			if($(this).parent().parent().parent().find('.unflaggedStyle').length==true){
					
						var disLikeCount = +$(this).parent().parent().parent().find('.flag-count').html()
						disLikeCount--
						$(this).parent().parent().parent().find('.flag-count').html(disLikeCount)
						
					}else{
				
						var disLikeCount = +$(this).parent().parent().parent().find('.flag-count').html()
						disLikeCount++
						$(this).parent().parent().parent().find('.flag-count').html(disLikeCount)
					}
		});

		$('.field-name-comments-count-custom .field-item:contains("Показать все (0)") ').css({'visibility' : 'hidden'});
		$('.field-name-comments-count-custom .field-item:contains("Показать все (1)") ').css({'visibility' : 'hidden'});
		$('.field-name-comments-count-custom .field-item:contains("Показать все (2)") ').css({'visibility' : 'hidden'});
		$('#user-profile-form #edit-field-master-profile-und-form-field-field-birthday-user label').html('Дата рождения');

		//////////////////////склонение месяцев
		mounthArr = ["февраля" , "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря", "января"];
		replaceArr = ["февраль" , "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", "январь"];
		var mounthCount = $('#block-views-archive-block .views-summary li');
		for (var i = 0; i<mounthCount.length; i++ ){
			var mounthCheck =  $('#block-views-archive-block .views-summary li a')[i].innerHTML
			mounthCheck = mounthCheck.split(/\s+/);
			for(var k = 0; k<12; k++){
				if(mounthCheck[0]==mounthArr[k]){
					mounthCheck[0] = replaceArr[k];
					mounthCheck = mounthCheck.join(' ');
					$('#block-views-archive-block .views-summary li a')[i].innerHTML = mounthCheck				
				}
			}			
		}
		if ($('body').is('.page-archive')) {
			var titleMounthCheck =  $('.page-archive #page-title')[0].innerHTML
			
			titleMounthCheck = titleMounthCheck.split(/\s+/);
			for(var k = 0; k<12; k++){
				if(titleMounthCheck[1]==mounthArr[k]){
					titleMounthCheck[1] = replaceArr[k];
					titleMounthCheck = titleMounthCheck.join(' ');
					$('.page-archive #page-title')[0].innerHTML = titleMounthCheck	
				}
			}	
		}

		//////////////////////заглушка видео
		if(($('.node-vseminar .field-name-field-v-anons').length == 0)){
			$('.node-vseminar .field-name-field-video-cap').css({'display' : 'block'});
		}

		//////////////////////неопубликованные консультации
		var constSelect = $(".view-consulr-index").find('.view-content').filter( ':first' ).children()
		for(var i = 0; i<constSelect.length; i++){
			if(constSelect.eq(i).children().length<1){
				constSelect.eq(i).css({'display' : 'none'})
			}
		}

		//////////////////////неопубликованные консультации
		$('.page-bookmarks .views-field-add-to-cart-form .form-submit').val('В корзину');
		$('.page-checkout .commerce_shipping.form-wrapper span').after('<p class="subtitle-checkout">Для получения расценок на доставку службами Почта РФ или СДЭК пожалуйста заполните корректно: индекс, город, адрес, ФИО</p>')
		$('#edit-customer-profile-billing-edit-button').mousedown();
		$('.page-checkout #account-login-container').after('<button class="check-login">Проверить логин</button>');
	});

	$.breakTitle = function(){
		var amountDec= $('.page-consultations #edit-field-consult-link-commerce-price-amount-decimal');
		var amountDec1 = $('.page-consultations #edit-field-consult-link-commerce-price-amount-decimal-1');
		amountDec.attr("placeholder","от");
		amountDec1.attr("placeholder","до");

	    var container = document.querySelectorAll(".page-consultations .field.field-name-author-name-custom.field-type-ds.field-label-hidden .field-item.even");
		for(var k = 0; k < container.length; k++){
			var arr = container[k].innerHTML.split(/\s+/);
			for(var i = 0; i < arr.length; i++)
			{
			    if(arr[i]){
			        arr[i] = '<p>'+arr[i]+'</p>';
			    }
			}
			container[k].innerHTML = arr.join(' ');
	    }
	    /////////////////breakTitle
	    $('.unflag-action.flag-link-toggle').parent().siblings('.flag-count').addClass("unflaggedStyle")
	    $('.flag-action.flag-link-toggle').parent().siblings('.flag-count').removeClass("unflaggedStyle")
	    $('.unflag-action.flag-link-toggle').parent().parent('.field-content').addClass("unflaggedStyle")
	    $('.flag-action.flag-link-toggle').parent().parent('.field-content').removeClass("unflaggedStyle")
	    $('.comment-form input.form-submit').val('комментировать');
	    $('.field-name-comments-form-custom .comment-form .form-item-name input').attr("placeholder","Ваше имя");
		$('.role-anonymous-user .text-full.form-textarea').attr("placeholder","Написать комментарий...(Комментарий будет опубликован после проверки администратором.)");
	    $('.role-authenticated-user .text-full.form-textarea').attr('placeholder', 'Написать комментарий...')
	    $('.view-archive .form-item .form-text').attr('placeholder', 'Поиск по тексту')
	    $('.page-consultations #edit-author-field-master-profile-field-mp-name').attr('placeholder', 'Имя автора')
	    $('.flag-outer-bookmarks a:contains("Удалить") ').css({"font-size": "11px", "padding": "0 5px"}).html('Удалить из избранного');
	    $('.flag-bookmarks a:contains("Удалить") ').css({"font-size": "11px", "padding": "0 5px"}).html('Удалить из избранного');
	    $('.field-name-like-flag-custom a, .flag-comment-like a').html(' ');
	    $('.field-name-bookmark-flag-custom a').html(' ');

	};

	var testId = 1;
	$.pay_icon = function(){
		$('.form-radio').click(function() {
			testId = $(this).attr('id');
	   	});
	   	if(testId=='edit-commerce-payment-payment-method-paypal-wpscommerce-payment-paypal-wps'){	
				$( "#payment-details" ).prepend("<img class='paypal-icon' src='/sites/all/themes/okguru/images/paypal.png' alt='Доставка'>");				
		}else
		if(testId=='edit-commerce-payment-payment-method-commerce-qiwicommerce-payment-commerce-qiwi'){		
				$( "#payment-details" ).prepend("<img class='qiwi' src='/sites/all/themes/okguru/images/qiwi.png' alt='Доставка'>");			
		}
	};

	$.feedLinks = function(){
		$.each( $('.page-news-feed .node-master-profile'), function( key, value ) {
			var profLink = $(value).find('.field-name-node-link a').attr('href');
			$(value).find('.field-name-ds-user-picture a').attr('href', profLink);
			$(value).find('.field-name-field-mp-cv .field-item').wrapAll("<a class='profLink'></a>");
			$(value).find('.field-name-field-mp-name .field-item').wrapAll("<a class='profLink'></a>");
		 	if($('body').hasClass('role-anonymous-user')){
			 	$(value).find('.field-name-ds-user-picture img').wrapAll("<a class='profLink'></a>");
			}
			$(value).find('.profLink').attr('href', profLink);
		});

		$.each( $('.page-news-feed .node-consultation'), function( key, value ) {
			var profLinkConsVar = $(value).closest('.views-field-field-message-node-ref').siblings('.views-field-php').find('pre').html();
			var profLinkCons = '/master-profile/' + profLinkConsVar
			$(value).find('.field-name-ds-user-picture a').attr('href', profLinkCons);
			if($('body').hasClass('role-anonymous-user')){
			 	$(value).find('.field-name-ds-user-picture img').wrapAll("<a class='profLinkAnon'></a>");
			 	$(value).find('.profLinkAnon').attr('href', profLinkCons);
			}
		});
	
	};

	$(document).ajaxComplete($.breakTitle);
	$(document).ready($.breakTitle);
	$(document).ajaxComplete($.feedLinks);
	$(document).ready($.feedLinks);
	 Drupal.ajax.prototype.commands.ajaxCommentsAfter = function(ajax, response, status) {
	 try {
	     location.reload();
	 } catch (e) {
	     console.log('ajaxComments-After: ' + e.name)
	 }
	};

	//добавление заглушки нет изображения к слайдеру товаров 
	$('.node-full .group-left').prepend('<div id="wrapp-fotoo"></div>');


})(jQuery);
