;
(function($) {
    Drupal.behaviors.viwe = {

        attach: function(context, settings) {
            
              // --- System messages
            var messages = $('#messages', context);

            // message close btn
            $('.messages', messages).append('<span class="close fa fa-times" aria-hidden="true"></span>').on('click', '.close', function(event) {
                    $(this).parent('.messages').fadeOut('300', function() {}).remove();

                    if ($('.messages:not(.close-all)', messages).length == 1)
                        $('.close-all', messages).fadeOut('300', function() {});
                });

            // messages timeout fadeOut
            // $('.messages', messages).each(function(index, el) {
            //  var t = setTimeout(function () {

            //  })
            // });

            // messages close all btn
            if ($('.messages', messages).length > 1 && $('.close-all', messages).length == 0) {
                $('.section', messages)
                    .append('<div class="messages close-all">close all</div>')
                    .on('click', '.close-all', function(event) {
                        $('.messages', messages).fadeOut('300', function() {});
                    });
            }

            $('#block-search-form input[type="submit"]', context).val('');
            $('#block-menu-menu-guru-login .content ul.menu li.first', context).prepend('<i`mg src="/sites/all/themes/okguru/images/smal-logo-white.png" class="smal-logo">');
            // $('#block-menu-menu-guru-login .content ul.menu li.first', context).prepend('<img src="/sites/all/themes/okguru/images/smal-logo.png" class="smal-logo-black">');
            //			$('.logged-in #block-menu-menu-guru-login .content ul.menu li.first', context).prepend('<img src="/sites/all/themes/okguru/images/smal-logo-white.png" class="smal-logo">');
            //			$('.page-astroshop.logged-in #block-menu-menu-guru-login .content ul.menu li.first', context).prepend('<img src="/sites/all/themes/okguru/images/smal-logo.png" class="smal-logo-black">');
            //			$('.page-user.logged-in #block-menu-menu-guru-login .content ul.menu li.first', context).prepend('<img src="/sites/all/themes/okguru/images/smal-logo.png" class="smal-logo-black">');
            $('#comments #comment-form', context).before('<div  class="arrow-down"><img src="/sites/all/themes/okguru/images/arrow-down.png"></div>');
            /* ------------------------------------------------------------login */
            $('<span class="login-text">или по логину</span>', context).insertAfter($('#user-login .form-item.form-type-ulogin-widget'));
            $('#user-login input#edit-name', context).attr("placeholder", "введите ваш логин");
            $('#user-login input#edit-pass', context).attr("placeholder", "введите ваш пароль");
            $('#user-register-form input#edit-name', context).attr("placeholder", "ваше имя");
            $('#user-register-form input#edit-mail', context).attr("placeholder", "введите ваш e-mail");
            $('#user-register-form input#edit-pass-pass1', context).attr("placeholder", "введите ваш пароль");
            $('#user-register-form input#edit-pass-pass2', context).attr("placeholder", "повторите ваш пароль");
            if ($('body').is('.not-logged-in.page-user, .not-logged-in.page-user-signup, .not-logged-in.page-user-password')) {
                $('#user-pass input#edit-name').attr('placeholder', 'введите E-mail');
                $('#user-pass input[type="submit"]').val('выслать на E-mail');
                if ($('div').is('#messages')) {
                    $('#messages').prependTo('.region-content');
                    // $('.region-content').prepend(messages);
                }
            }
            /* ------------------------------------------------------------login */
            /**page users ruls fs-user */
            $('#field-phone-user-add-more-wrapper input').mask("+7(999)999-99-99");
            $('#field-phone-user-add-more-wrapper input').attr({placeholder:"+7(999)999-99-99"});
            if ($('body').hasClass('page-user page-user-edit role-fs_user')) {
                console.log('title', );
            }
            /**page users ruls fs-user */

            /*NOTE  ball to left*/
            //console.log($('#block-menu-menu-guru-login .content li.last a').text())
            if ($('body').hasClass('role-authenticated-user')) {
                $('#block-menu-menu-guru-login .content li.last a').clone().addClass('ball').appendTo('#block-commerce-cart-cart');
                $('#block-menu-menu-guru-login .content li.last a').css({
                    display: 'none',
                    visibility: 'none'
                });
            }
            /*  ball*/
            /* shop linck */
            if ($('div').is('#block-commerce-cart-cart')) {
                $('#block-commerce-cart-cart h2', context).wrap('<a href="/cart"></a>');
            }
            /* shop linck */
            /* ----------------------------------------------------------------------------------slider */
            //			$('select#edit-sort-bef-combine').before('<i class="select-arrow"><i>');
            /* ----------------------------------------------------------------------------------slider */
            /* рассылка */
            $('form.simplenews-subscribe input#edit-mail', context).attr('placeholder', 'email-адрес');
            $('form#comment-form input[type="submit"]', context).val('комментировать');
            
            $('.field-name-field-socknopka .field-label', context).text('РАССКАЗАТЬ ДРУЗЬЯМ В СОЦИАЛЬНЫХ СЕТЯХ');
            /* рассылка */
            /* comment */
            $('#comment-form textarea.text-full', context).attr('placeholder', 'Напишите, если есть что сказать по поводу данной статьи ...');
            /* comment */
            $('.view-id-okguru_astroshop .view-display-id-okguru_slider_shop .view-header a', context).attr("href", "shop/prizn/novinki-1271");
            $('.view-id-okguru_astroshop .view-display-id-okguru_slider_shop .view-header a h2', context).text("Новинки");
            /* slider shop front */

            //			$('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop',context).addClass('swiper-container');
            $('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop .view-content', context).wrapAll('<div class="swiper-container">');
            $('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop .view-content', context).addClass('swiper-wrapper');
            $('#block-views-slider-okguru-slider-shop .view-display-id-okguru_slider_shop .view-content .views-row', context).addClass('swiper-slide');
            /* slider shop front */
            /* slider shop astrosop */
            //			$('.page-astroshop .view-display-id-okguru_slider_shop')
            $('.page-astroshop .view-display-id-okguru_slider_shop .view-content', context).wrapAll('<div class="swiper-container">');
            $('.page-astroshop .view-display-id-okguru_slider_shop .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('.page-astroshop .view-display-id-okguru_slider_shop', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('.page-astroshop .view-display-id-okguru_slider_shop .view-content', context).addClass('swiper-wrapper');
            $('.page-astroshop .view-display-id-okguru_slider_shop .view-content .views-row', context).addClass('swiper-slide');
            /* slider shop astrosop */
            /* slider shares */
            $('#block-views-slider-okguru-slider-shares .view-content', context).wrapAll('<div class="swiper-container">');
            $('#block-views-slider-okguru-slider-shares .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('#block-views-slider-okguru-slider-shares', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('#block-views-slider-okguru-slider-shares .view-content', context).addClass('swiper-wrapper');
            $('#block-views-slider-okguru-slider-shares .view-content .views-row', context).addClass('swiper-slide');
            /* slider shares */
            /* slider shares */
            $('.view-display-id-okguru_shop_interested .view-content', context).wrapAll('<div class="swiper-container">');
            $('.view-display-id-okguru_shop_interested .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('.view-display-id-okguru_shop_interested', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('.view-display-id-okguru_shop_interested .view-content', context).addClass('swiper-wrapper');
            $('.view-display-id-okguru_shop_interested .view-content .views-row', context).addClass('swiper-slide');
            /* slider shares */
            /* full page video seminar */
            $('.view-display-id-okguru_video_interested .view-content', context).wrapAll('<div class="swiper-container">');
            $('.view-display-id-okguru_video_interested .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('.view-display-id-okguru_video_interested', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('.view-display-id-okguru_video_interested .view-content', context).addClass('swiper-wrapper');
            $('.view-display-id-okguru_video_interested .view-content .views-row', context).addClass('swiper-slide');
            /* full page video seminar */
            /* full page video next */
            $('.view-display-id-okguru_upcoming_workshops .view-content', context).wrapAll('<div class="swiper-container">');
            $('.view-display-id-okguru_upcoming_workshops .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
            $('.view-display-id-okguru_upcoming_workshops', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
            $('.view-display-id-okguru_upcoming_workshops .view-content', context).addClass('swiper-wrapper');
            $('.view-display-id-okguru_upcoming_workshops .view-content .views-row', context).addClass('swiper-slide');
            /* full page video next */
            /* socblok shop */
            if ($('body').is('.page-astroshop')) {
                $('.view-id-okguru_astroshop .views-field.views-field-view-1', context).after('<div class="block-socwrapp"></div>');
                $('.block-socwrapp').prepend($('#block-block-46, #block-simplenews-1329'));
                $('#block-simplenews-1329 h2', context).text('Хотите быть в курсе новостей?').after('<span>Подпишитесь на нашу рассылку</span>');
            }
            /* socblok shop */
            /* renge price */
            if ($('div').is('#search-api-ranges-search_api_aggregation_1')) {
                $('.yui3-u.range-box.range-box-left').insertAfter('.yui3-u.range-slider-box');
            }
            /* renge price */
            $('.page-shop .view-display-id-page .fivestar-widget .fivestar-summary-average-count .average-rating').text('Оценили');
            $('.page-shop .view-display-id-page .link-wrapper .node-readmore a').text('Смотреть');
            $('.page-shop .view-display-id-page .field-name-field-product-ref input[type="submit"]').val('в корзину');
            //
            /* full-page-shop */
            $('.page-node.node-type-product-dsp .group-header .field-group-format-wrapper form', context).prepend('<span>Заполните форму и мы вам перезвоним</h3SPAN>');
            if ($('.page-node.node-type-product-dsp .field-name-field-product-ref.field-type-commerce-product-reference form').is('.commerce-add-to-cart')) {
                $('.page-node.node-type-product-dsp .field-name-field-product-ref.field-type-commerce-product-reference input[type="submit"]').val('в корзину');
            }

            if ($('.page-node.node-type-product-dsp .group-left div').is('.field-name-field-prod-imgs')) {
                $('.page-node.node-type-product-dsp .group-left .commerce-product-field-field-imagh', context).css({display: "none"});
                $('.page-node.node-type-product-dsp .group-left .field-name-field-prod-imgs', context).addClass('top-slider');
                $('.page-node.node-type-product-dsp .group-left .top-slider', context).clone().removeClass('top-slider').addClass('bottom-slider').appendTo('.page-node.node-type-product-dsp .group-left');
               // $('.page-node.node-type-product-dsp .group-left .bottom-slider', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
                $('.page-node.node-type-product-dsp .group-left .top-slider', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
                $('.page-node.node-type-product-dsp .group-left .bottom-slider, .page-node.node-type-product-dsp .group-left .top-slider, .page-node.node-type-product-dsp .group-left .commerce-product-field-field-imagh, .page-node.node-type-product-dsp .group-left .commerce-product-field-field-prod-prizn', context).wrapAll('<div class="wrapp-foto"></div>');
            } else {
                $('.page-node.node-type-product-dsp .group-left .commerce-product-field-field-imagh, .page-node.node-type-product-dsp .group-left .commerce-product-field-field-prod-prizn', context).wrapAll('<div class="wrapp-foto"></div>');
            }

            /* проверка флага на профиле мастера */
            if ($('#block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-ops a').is('.unflag-action')) {
                $('#block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-ops').css({"background-color": "#d7dee4"});
            }
            if ($('#block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-ops a').is('.flag-action')) {
                $('#block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-ops').css({"background-color": "#9cb1c2"});
            }
            if ($('#block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-ops a').is('.unflag-action')) {
                $('#block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-ops').css({"background-color": "#d7dee4"});
            }
            if ($('#block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-ops a').is('.flag-action')) {
                $('#block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-ops').css({"background-color": "#9cb1c2"});
            }
            /* проверка флага на профиле мастера */
            /* коментарии магазин фул */
            if ($('body').is('node-type-product-dsp')) {
                $('.wrapp-slide-comment', context).customScroll();
            }
            if (!$('div').is('.custom-scroll_container.custom-scroll_hidden-y')) {
                $('.custom-scroll_container', context).prepend('<div class="custom-scroll-pretty_track-y"></div>');
            }
            $('.horizontal-tabs-panes .fieldset-wrapper', context).customScroll();
            $('.horizontal-tabs-panes .fieldset-wrapper', context).prepend('<div class="custom-scroll-pretty_track-y"></div>');
            /* коментарии магазин фул */
            /* видео изменение label */
            if ($('body').is('.page-video')) {
                $('.field-name-author .field-label', context).text('Мастер:'); //ex Автор -> Наставник
                $('.field-name-post-date .field-label', context).text('Дата:');
                $('.field-name-commerce-price > div', context).prepend('<div class="field-label">Цена:</div>');
            }
            if ($('div').is('.group-contact-info-one')) {
                $('.group-contact-info-one .field-name-author .field-label', context).text('Мастер'); // ex Автор -> Наставник
                $('.field-name-commerce-price', context).prepend('<div class="field-label">Стоимость</div>');
            }
            /* видео изменение label */
            /* full page video */
            if ($('body').is('.node-type-vseminar')) {
                $('.field-name-news-akciy .field-label', context).text('').prepend('<h3>Хотите быть в курсе новостей?</h3><span>Подпишитесь на нашу рассылку</span>');
                $('.node-type-vseminar .group-contact-info-addcart.field-group-div .flag-outer-subscribe-to-master a.flag-action').text('Подписаться на обновления автора');
                $('.node-type-vseminar .group-contact-info-addcart.field-group-div .flag-outer-subscribe-to-master a.unflag-action').text('Отписаться от обновлений автора');
                $('.node-type-vseminar .field-name-body .field-label').text('Подробнее');
            }
            /* full page video */
            /* add video user page */
            $('#block-formblock-vseminar > h2', context).after('<div class="add-video close"><span class="add-video-button">Загрузить видео</span></div>');
            $('#block-formblock-blog > h2', context).after('<div class="add-blog-news close"><span class="add-blog-news-button">Добавть статью</span></div>');
            $('#block-formblock-vseminar .add-video-button', context).on('click', function() {
                if ($('#block-formblock-vseminar .add-video').hasClass('close')) {
                    $('#block-formblock-vseminar .add-video').removeClass('close');
                    $('#block-formblock-vseminar .content').fadeIn(300);
                } else {
                    $('#block-formblock-vseminar .add-video').addClass('close');
                    $('#block-formblock-vseminar .content').fadeOut(300);
                }
            });
            $('#block-formblock-blog .add-blog-news-button', context).on('click', function() {
                if ($('#block-formblock-blog .add-blog-news').hasClass('close')) {
                    $('#block-formblock-blog .add-blog-news').removeClass('close');
                    $('#block-formblock-blog .content').fadeIn(300);
                } else {
                    $('#block-formblock-blog .add-blog-news').addClass('close');
                    $('#block-formblock-blog .content').fadeOut(300);
                }
            });
            //			$('#block-formblock-vseminar .add-video-button', context).click(function(){
            //				$('#block-formblock-vseminar .add-video', context).next().fadeIn(300);
            //			});
            /* add video user page */
            /* progressbar masterprofile */
            $('.node-type-master-profile .field-name-field-mp-vote-rate', context).append('<div id="progress-bar"><div class="progress-bar-top"></div></div>');
            if ($('body').is('.node-type-master-profile')) {
                $('.view-display-id-okguru_videoseminar_master .view-content', context).wrapAll('<div class="swiper-container">');
                $('.view-display-id-okguru_videoseminar_master .swiper-container', context).wrapAll('<div class="wrapp-swiper"></div>');
                if (!$('.view-display-id-okguru_videoseminar_master div').hasClass('view-empty')) {
                    $('.view-display-id-okguru_videoseminar_master', context).prepend('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
                }
                $('.view-display-id-okguru_videoseminar_master .view-content', context).addClass('swiper-wrapper');
                $('.view-display-id-okguru_videoseminar_master .view-content .views-row', context).addClass('swiper-slide');

                // NOTE calc profile master
                $('#okguru-consultation-node-form #edit-field-field-master-name-cons-und .form-item-field-field-master-name-cons-und:last-child input', context).attr('checked', true);
                var select1 = [],
                    select2 = [],
                    rezultS = 0;
                $('#okguru-consultation-node-form').each(function() {
                    $(this).find('#edit-field-theme-cons-und .chosen-results').each(function() {
                        select1 += $(this).find('li').text();
                        console.log(select1);
                    });
                });
                $('#okguru-consultation-node-form #edit-field-theme-cons-und .chosen-container', context).on(function() {});
                /*$('#okguru-consultation-node-form #edit-field-theme-cons-und ', context).each(function(){
                $(this).find('option').each(function(){
                	var themeConsClass = [];
                	themeConsClass += name=$(this).text();
                	console.log(themeConsClass);
                });
                });*/

            }
            /* progressbar masterprofile */
            /* master profile reiting */
            $('#block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-field-mp-cv, #block-views-9e1fb27ba912a028acd93576e7a7a6d5 .views-field-field-mp-vote-rate', context).wrapAll('<div class="wrapp-reyting"></div>');
            /* master profile reiting */
            /* master video- news */
            //			$('.region-sidebar-first', context)
            if ($('body').is('.page-master-profile-master-video, .page-master-profile-master-news')) {
                $('.page-master-profile-master-video .region-sidebar-first > div:not(:first-child)', context).wrapAll('<div class="master-materials"></div>');
                $('.page-master-profile-master-news .region-sidebar-first > div:not(:first-child)', context).wrapAll('<div class="master-materials"></div>');
                $('#block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-field-mp-cv, #block-views-22a311300b347e5d740ace0cb3a411e5 .views-field-field-mp-vote-rate', context).wrapAll('<div class="wrapp-reyting"></div>');
                /**/
                $('form#views-exposed-form-okguru-facet-page-1, form#views-exposed-form-video-new-page-6', context).change(function() {
                    $('#views-exposed-form-okguru-facet-page-1, #views-exposed-form-video-new-page-6', context).submit();
                });
            }
            if ($('body').is('.page-master-profile-master-video')) {
                $('#edit-combine', context).attr('placeholder', 'искать видео');
                $('#block-menu-menu-guru-top-menu li:nth-child(3) a', context).addClass('hover');
                var nastavnik = $('.view-id-video_new .view-header .views-row .field-content', context).text();
                $('.view-id-video_new .views-row .field-name-author .field-label', context).text('Мастер:'); // Автор -> Наставник
                $('.view-id-video_new .views-row .field-name-post-date .field-label', context).text('Дата:');
                $('.view-id-video_new .views-row .price-label', context).text('Стоимость:');
                $('.view-id-video_new .views-row .field-name-author .field-item', context).text(nastavnik);
            }
            if ($('body').is('.page-master-profile-master-news')) {
                $('#edit-combine', context).attr('placeholder', 'искать статьи');
                $('#block-menu-menu-guru-top-menu li:first-child > a', context).addClass('hover');
            }
            /* master video- news */
            /* calendar */
            if ($('body').is('.page-users-calendar-month', context)) {
                $('.page-users-calendar-month .view .date-nav-wrapper .date-prev a').text('').val('');
                $('.page-users-calendar-month .view .date-nav-wrapper .date-next a').text('').val('');
            }
            if ($('body').is('.page-users-calendar-week', context)) {
                $('.page-users-calendar-week .view .date-nav-wrapper .date-prev a').text('').val('');
                $('.page-users-calendar-week .view .date-nav-wrapper .date-next a').text('').val('');
            }
            if ($('body').is('.page-users-calendar-day', context)) {
                $('.page-users-calendar-day .view .date-nav-wrapper .date-prev a').text('').val('');
                $('.page-users-calendar-day .view .date-nav-wrapper .date-next a').text('').val('');
            }
            if ($('body').is('.page-users-calendar-year', context)) {
                $('.page-users-calendar-year .view .date-nav-wrapper .date-prev a').text('').val('');
                $('.page-users-calendar-year .view .date-nav-wrapper .date-next a').text('').val('');
            }
            /* calendar */
            
            if ($('body').is('.page-bookmarks')) {
                //$('input[type="submit"].form-submit').val('В корзину');
                // $('input[type="submit"].form-submit').val('');
                // // NOTE add all products to cart
                // $('input.vbo-select.form-checkbox').prop('checked', true);
                // $('.add-cart').on('click', function() {
                //     $('#edit-rules-componentrules-add-to-cart-bookmarks', context).click();
                //     //                    $('.vbo-select-all-markup .form-actions.form-wrapper input[type="submit"]', context).click();
                //     //					location.reload();
                // });

                ////
                $('.del-bookmarks', context).on('click', function() {
                    $('.flag-bookmarks-del-all a', context).click();
                    location.reload();
                });
                $('.view-id-flag_bookmarks', context).each(function() {
                    $(this).find('.views-row').each(function() {
                        $(this).find('.views-field.views-field-commerce-price, .views-field.views-field-nothing, .views-field.views-field-commerce-price-1').wrapAll('<div class="wrapp-price"></div>');
                    });
                });
                var sum = 0;
                $('.view-id-flag_bookmarks', context).each(function() {
                    $(this).find('td.webprice-total', context).each(function() {
                        sum += parseInt($(this).text().replace(' ', ''));
                    });
                    $(this).find('.total-sum span', context).html(sum + " руб.");
                    sum = 0;
                });
            }
            if ($('body').is('.node-type-master-profile')) {
                $('#block-formblock-okguru-consultation').appendTo('.group-left');
            }
            if ($('body').is('.page-video-master-class')) {
                //				$('.page-video-new #block-menu-menu-guru-top-menu li.expanded li:nth-child(2) a', context).attr(hover);
                //				$('#edit-sort-bef-combine', context).chosen();
            }
            if ($('body').is('.role-anonymous-user')) {
                $('#comments #edit-name', context).attr('placeholder', 'Ваше имя');
            }

            /* NOTE consultation submit button */

            if ($('body.node-type-consultation').hasClass('role-anonymous-user')) {
                // $('.field-type-commerce-product-reference form input').css({display: "none"});
                $('.field-type-commerce-product-reference form').prepend('<span><a href="/user/login">Войдите</a> или <a href="/user/register">Зарегистрируйтесь</a> для продолжения</span>')
            }
            /* consultation submit button */

            /* NOTE master profile form */

            if ($('body.node-type-master-profile .group-left > div').hasClass('field-type-video-embed-field')) {
                // console.log('title',);
                $('body.node-type-master-profile .group-left > .field-type-static-field').css({display: 'none'});
            }
            if ($('body.node-type-master-profile').hasClass('role-anonymous-user')) {
                $('#block-formblock-okguru-consultation .form-actions').prepend('<span>Чтобы отправить запрос мастеру вы должны быть авторизованы. <a href="/user/login">Войдите</a> или <a href="/user/register">Зарегистрируйтесь</a> для продолжения</span>');
            }

            if ($('body').is('.node-type-master-profile')) {
                var masterNid = $('.view-display-id-master_profile_nid .field-content > a').text();
                // console.log('masterNid', masterNid);
                $('#edit-field-master-name-cons-und-0-value').val(masterNid);

            }
            /* NOTE master profile form */
            /**/
            if ($('body').is('.page-users-master-consultation')) {
                $('.page-users-master-consultation .views-row', context).each(function() {
                    $(this).find('.field-status').each(function() {
                        var a = $(this).find('tbody .views-field-status').text().split(':');
                        $('tbody .views-field-status').text(a[1]);
                    });
                });

            }
            if ($('body').is('.page-users-client-consultation')) {
                $('.view-display-id-client_consultation .views-row', context).each(function() {
                    $(this).find('.views-field.views-field-view').each(function() {
                        var a = $(this).find('tbody .views-field-status').text().split(':');
                        $('tbody .views-field-status').text(a[1]);
                    });
                });
            }
            if ($('body').is('.page-node-86197')) {
                $('#edit-field-bracelet-size-tid', context).chosen();
                $('#edit-field-furniture-style-tid', context).chosen();
                $('#edit-field-stone-size-tid', context).chosen();
                $('.owl-carousel-block69', context).each(function() {
                    $(this).find('[class^="item-"]').each(function() {
                        a = $(this).find('.views-field-field-furniture-style, .views-field-field-bracelet-size, .views-field-commerce-price, .views-field-field-furniture-description', context);
                        $(this).find('.views-field-field-furniture-image').css({cursor: 'pointer'}).tooltipster({
                            animation: 'grow',
                            delay: 100,
                            trigger: 'click',
                            side: ['bottom'],
                            content: $(a),
                            contentCloning: true
                        });

                    });
                });
                $('.view-display-id-bracelete_block', context).each(function() {
                    $(this).find('.views-row', context).each(function() {
                        a = $(this).find('.views-field-field-stone-category-planet, .views-field-field-stone-category-life-style, .views-field-field-stone-size, .views-field-commerce-price, .views-field-field-stone-description', context);
                        $(this).find('.views-field-field-stone-image').css({cursor: 'pointer'}).tooltipster({
                            animation: 'grow',
                            delay: 200,
                            trigger: 'click',
                            side: ['top'],
                            content: $(a),
                            contentCloning: true

                        });

                    });
                });
            }

            $('#block-views-exp-full-search-site-page-1 #edit-combine-wrapper').on('click', function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });
            /* chekaut */
            if ($('body').is('.page-checkout')) {

            }
            /* chekaut */
            $('.field-name-field-news-social .social-button:nth-child(2) td:nth-child(2), .field-name-field-socbutton-shop .social-button:nth-child(2) td:nth-child(2), .field-name-field-socbutton-video .social-button:nth-child(2) td:nth-child(2)', context).text('').prepend('<i class="fa fa-heart" aria-hidden="true"></i>');
            $('.field-name-field-socbutton-video .field-label', context).text('').append('<span class="field-label">Понравился материал?</span><span>Поделитесь с друзьями в социальных сетях</span>');

            /**/
            if ($('body').is('.front')) {
                $('.view-display-id-okguru_slider_shop').each(function() {
                    $(this).find('.price-amount').each(function() {
                        a = $(this).text().replace("уб", "");
                        $(this).text(a);
                    });
                });
            }

            /* form search */
            $('#block-search-form .form-item-search-block-form').each(function() {
                // body...
                fa = $(this).find('label').text();
                $(this).find('input').attr('placeholder', fa);
            });

            /**/
            $(window).on('load resize', function() {
                if ($(window).width() <= 768) {
                    var lkUserMaster = $('.page-user #sidebar-second .region-sidebar-second').height();
                    $('.page-user #sidebar-second .region-sidebar-second').css({'min-height': lkUserMaster});
                    $('.page-user #sidebar-second .region-sidebar-second > :not(:first-child)').wrapAll('<div class="zsdgfas"></div>');
                } else {
                    return false;
                }
                /* filtr lamoda */

            });
            /* NOTE feeds */
            var feedFiltr = $('#block-views-cd7427b5754ee1d7ebc444becec1b188 .view-filters');
            feedFiltr.fadeOut(0);
            $('#block-views-cd7427b5754ee1d7ebc444becec1b188 h2').on('click', function() {
                if ($(feedFiltr).is('.show')) {
                    feedFiltr.removeClass('show').fadeOut();
                } else {
                    feedFiltr.addClass('show').fadeIn();

                }
            });

            /* NOTE comment feed */
            if ($('body').is('.page-news-feed, .page-users')) {
                $('.view-display-id-news_feed_page .views-row, .view-display-id-page_1 .views-row').each(function() {
                   
                    var a = $(this).find('.field-name-comments-custom .ds-1col.comment:not(".comment-unpublished"):gt(1)');
                    a.fadeOut(0);
                    $('.field-name-comments-count-custom .field-item', this).on('click', function() {                       
                        
                        $(this).toggleClass('closeComments');
                        
                        if ( $(this).hasClass("closeComments") ) {
                            this.originalText = $(this).html();
                             a.fadeIn(0);
                             $(this).html('скрыть комментарии')
                        }else{
                            a.fadeOut(0);
                            $(this).html(this.originalText)        
                        }
                    });
                });
                $('#comment-form #edit-name').attr('placeholder', 'Ваше имя');
                $('.form-textarea-wrapper textarea').attr('placeholder', 'Написать комментарий...')
            }

            /**/
            /* NOTE запись на консультацию */
            $('.view-display-id-master_form_consultation').each(function() {
                $(this).find('.row').each(function() {
                    console.log('row');
                });
            });
            /**/
            /* NOTE block-current-search-standard*/
            $('#block-current-search-standard .item-list ul  li').attr('title', 'Удалить фильтр');
            /*  block-current-search-standard*/


        }
    };
    $(document).ready(function() {
        /*NOTE reset faset in shop*/
        var urlPath = window.location.pathname.split('cat');
        $('.current-search-item-reset-filters.current-search-item-reset > a').attr('href', urlPath[0]);
        /* reset faset in shop*/

        var urlPathNews = $('#block-block-73 .facetapi-facet-field-subjects li').each(function () {
            var a = $('a', this).attr('href').split('field_subjects');
            $('a', this).attr('href', '/news/field_subjects' + a[1])
            // console.log('a', a);
        });
        
        $('#block-menu-menu-astroshop h2').on('click', function(){
            $('#block-menu-menu-astroshop').toggleClass('open')
        })

        /*NOTE sidebar pin*/
        // $('.page-shop #sidebar-first').pin({
        //     containerSelector: ".page-shop #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-shop-new #sidebar-first').pin({
        //     containerSelector: ".page-shop-new #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-shop-shares #sidebar-first').pin({
        //     containerSelector: ".page-shop-shares #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-exclusive-goods #sidebar-first').pin({
        //     containerSelector: ".page-exclusive-goods #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-master-catalog #sidebar-first').pin({
        //     containerSelector: ".page-master-catalog #main-wrapper #main",
        //     minWidth: 960
        // });

        // $('.page-video #sidebar-first').pin({
        //     containerSelector: ".page-video #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-videoseminar #sidebar-first').pin({
        //     containerSelector: ".page-videoseminaro #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-video-exclusive #sidebar-first').pin({
        //     containerSelector: ".page-video-exclusive #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-video-training #sidebar-first').pin({
        //     containerSelector: ".page-video-training #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-video-tekhniki #sidebar-first').pin({
        //     containerSelector: ".page-video-tekhniki #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-video-master-class #sidebar-first').pin({
        //     containerSelector: ".page-video-master-class #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-video-new #sidebar-first').pin({
        //     containerSelector: ".page-video-new #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-news #sidebar-first').pin({
        //     containerSelector: ".page-news #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-live-seminars #sidebar-first').pin({
        //     containerSelector: ".page-live-seminars #main-wrapper #main",
        //     minWidth: 960
        // });
        // $('.page-consultations #sidebar-first').pin({
        //     containerSelector: ".page-consultations #main-wrapper #main",
        //     minWidth: 960
        // });


        /* master front */
        var MasterProf = $('#block-views-9ebc5d3bb1f1886d598e6a61a561585f .front-slider-master > div, .view-id-okguru_astroshop .front-slider-master > div').owlCarousel({
            items: 1,
            itemsDesktop: [
                1000, 1
            ], //5 items between 1000px and 901px
            itemsDesktopSmall: [
                900, 1
            ], // betweem 900px and 601px
            itemsTablet: [
                600, 1
            ],
            smartSpeed: 450,
            lazyLoad: true,
            margin: 20, // Autoplay
            autoPlay: false, // Navigation
            navigation: true,
            pagination: false,
            navigationText: ["<span class='prev'></span>", "<span class='next'></span>"]
        });
        /* master front */
        /* fron shop bottom slaider */
        var galleryShopFront = new Swiper('.view-display-id-okguru_slider_shop .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 4,
            loop: true,
            spaceBetween: 0,
            breakpoints: {
                // when window width is <= 480px
                768: {
                    slidesPerView: 3
                }
            }
        });
        /* fron shop bottom slaider */
        /* slider fuul prod */
        var galleryTop = new Swiper('.top-slider', {
            wrapperClass: 'field-items',
            slideClass: 'field-item',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
	        loop: true
        });
        var galleryThumbs = new Swiper('.bottom-slider', {
            wrapperClass: 'field-items',
            slideClass: 'field-item',
            direction: 'vertical', 
	        loop: true,
            spaceBetween: 10,
            centeredSlides: true,
            touchRatio: 0.2,
            slidesPerView: 4,
            slideToClickedSlide: true
        });

        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
        /* slider fuul prod */
        /* slider shares */
        var galleryShopFront = new Swiper('#block-views-slider-okguru-slider-shares .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 4,
            loop: true,
            spaceBetween: 10,
            slidesPerView: 1,
            autoplay: 4000
        });
        /* slider shares */
        /* slider interest */
        var galleryShopFront = new Swiper('.view-display-id-okguru_shop_interested .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 4,
	        loop: true,
            spaceBetween: 10,
            breakpoints: {
                // when window width is <= 480px
                960: {
                    slidesPerView: 3
                },
                680: {
                    slidesPerView: 2
                },
                420: {
                    slidesPerView: 1
                }
            }
        });
        /* slider interest */
        /* slider interest video */
        var galleryShopFront = new Swiper('.view-display-id-okguru_video_interested .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
	        loop: true,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            }
        });
        /* slider interest video */
        /* slider next seminar video */
        var galleryShopFront = new Swiper('.view-display-id-okguru_upcoming_workshops .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
	        loop: true,
            spaceBetween: 10,
            breakpoints: {
                680: {
                    slidesPerView: 2
                },
                420: {
                    slidesPerView: 1
                }
            }

        });
        /* slider next seminar video */
        var progresscount = $('.node-type-master-profile .field-name-field-mp-vote-rate .field-item > div').text();
        $(".node-type-master-profile .field-name-field-mp-vote-rate .progress-bar-top").animate({
            width: progresscount
        }, 1500);
        /* slider master-profile */
        var galleryShopFront = new Swiper('.view-display-id-okguru_videoseminar_master .swiper-container', {
            wrapperClass: 'view-content',
            slideClass: 'views-row',
            direction: 'horizontal',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
	        loop: true,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            }
        });

        function swiperCarouselAfter(parent, container, options) {
            $(parent + ' > ' + container).addClass('swiper-wrapper').wrap('<div class="swiper-container"></div>').after('<div class="swiper-nav"><div class="swiper-pagination"></div><div class="swipe-prev"></div><div class="swipe-next"></div></div>').find('.views-row').addClass('swiper-slide');
            return new Swiper(parent + ' .swiper-container', options);
        }

        var pageProjectSlider = swiperCarouselAfter('.view-display-id-okguru_slider_shop', '.view-content', {
            slidesPerView: 4,
            nextButton: '.swiper-nav .swipe-next',
            prevButton: '.swiper-nav .swipe-prev',
            paginationClickable: true,
            speed: 800,
            loop: true,
            breakpoints: {
                // when window width is <= 480px
                960: {
                    slidesPerView: 3
                },
                680: {
                    slidesPerView: 2
                },
                420: {
                    slidesPerView: 1
                }
            }
        });

        var pageMasterProfileSlider = swiperCarouselAfter('.view-display-id-master_profile_cons', '.view-content', {
            slidesPerView: 3,
            nextButton: '.swiper-nav .swipe-next',
            prevButton: '.swiper-nav .swipe-prev',
            paginationClickable: true,
            direction: 'horizontal',
            speed: 800,
            loop: true
        });
        var pageMasterSlider = swiperCarouselAfter('.view-id-master_profiles.view-display-id-block_3', '.view-content', {
            slidesPerView: 1,
            nextButton: '.swiper-nav .swipe-next',
            prevButton: '.swiper-nav .swipe-prev',
            paginationClickable: true,
            speed: 800,
            autoplay: 5000,
            loop: true
        });
        var pageMasterSliderC = swiperCarouselAfter('.view-display-id-okguru_profile_m_community', '.view-content', {
            slidesPerView: 2,
            nextButton: '.swipe-next',
            prevButton: '.swipe-prev',
            speed: 800,
            autoplay: 5000,
            paginationClickable: true,
			loop: true
        });

        /* NOTE master-catalog */
        $('.page-master-catalog #edit-field-master-skils').chosen();
        function toggleAsideMaster(el) {
            $(el + ' h2').on('click', function() {
                $(el + ' .content').fadeToggle("linear", "linear");
            });
        }
        toggleAsideMaster('#block-facetapi-bgbkxanjmz7oh68xmvi89h28hnon01rx');
        toggleAsideMaster('#block-facetapi-4eklc6knthm2mwelwqgkz307jchyt4ta');
        toggleAsideMaster('#block-facetapi-vlww6hmdx4wfxz0z0ffcpl0nmmjcsomf');
        /* master-catalog */
        toggleAsideMaster('#block-facetapi-esp6gpjde8w7kmwc8ybwa6fedujgtmem');
        toggleAsideMaster('#block-facetapi-iybuxmkgswpzbylp3bdvjd1tb1ow4viq');
        toggleAsideMaster('#block-facetapi-pnk9pok7yt6wcjoubbpjno264k9nn1ih');
        /* master-catalog */
        /* NOTE Прилипание меню */
        var stickyHeaders = (function() {
            var $window = $(window),
                $stickies;
            var load = function(stickies) {
                if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
                    $stickies = stickies.each(function() {
                        var $thisSticky = $(this).wrap('<div class="followWrap" />');
                        $thisSticky.data('originalPosition', $thisSticky.offset().top).data('originalHeight', $thisSticky.outerHeight()).data('originalWidth', $thisSticky.outerWidth()).parent().height($thisSticky.outerHeight());
                    });
                    $window.off("scroll.stickies").on("scroll.stickies", function() {
                        _whenScrolling();
                    });
                }
            };
            var _whenScrolling = function() {
                $stickies.each(function(i) {
                    var $thisSticky = $(this),
                        $stickyPosition = $thisSticky.data('originalPosition');
                    if ($stickyPosition <= $window.scrollTop()) {
                        var $nextSticky = $stickies.eq(i + 1),
                            $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
                        $thisSticky.addClass("fixed").width($thisSticky.data('originalWidth'));
                        if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
                            $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                        }
                    } else {
                        var $prevSticky = $stickies.eq(i - 1);
                        $thisSticky.removeClass("fixed");
                        if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
                            $prevSticky.removeClass("absolute").removeAttr("style");
                        }
                    }
                });
            };

            return {load: load};
        })();

        $(function() {
            stickyHeaders.load($(".page-shop .view-display-id-page .view-filters"));
            stickyHeaders.load($(".page-shop-new .view-display-id-page_shop_new .view-filters"));
            stickyHeaders.load($(".page-shop-shares .view-display-id-page_shop_shares .view-filters"));
            stickyHeaders.load($(".page-exclusive-goods .view-display-id-pagepage_shop_exclusive_goods .view-filters"));
            stickyHeaders.load($(".page-exclusive-goods .view-filters"));
            stickyHeaders.load($(".page-master-catalog .view-filters"));
            stickyHeaders.load($(".page-news .view-filters"));
            stickyHeaders.load($(".page-news .view-filters"));
            stickyHeaders.load($(".view-display-id-live_seminars_new .view-filters"));
            stickyHeaders.load($(".view-display-id-consultations_list_page_new .view-filters"));
        });

    });

})(jQuery);
