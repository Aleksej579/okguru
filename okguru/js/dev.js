;(function($) {

  //правильный скрол без множества запросов
  $.extend({
    /**
     * Throttle's decorator from https://github.com/dfilatov/jquery-plugins
     * @param {Function} fn original function
     * @param {Number} timeout timeout
     * @param {Object} [ctx] context of original function
     */
    throttle : function(fn, timeout, ctx) {
        var timer, args, needInvoke;
        return function() {
            args = arguments;
            needInvoke = true;
            ctx = ctx || this;
            timer || (function tmp() {
                if(needInvoke) {
                    fn.apply(ctx, args);
                    needInvoke = false;
                    timer = setTimeout(tmp, timeout);
                }
                else {
                    timer = null;
                }
            })();
        };
      }
    });

  //глобальное смещение (при удалении товара из корзины)
  var currentPosition = 0;
  $(document).ajaxStart(function() {
    currentPosition = $(window).scrollTop();
  });

  //вариант смещения после перезагрузки Два
  var count_click_input_ajax = false;

  Drupal.behaviors.drupp = {
    attach: function(context, settings) {

      $(".view-filters").prepend('<p class="filters_ok">ФИЛЬТРЫ</p>');
      if($(".filters_ok").length == 1) {

        if ($(window).width() <= 700) { 
          $('.filters_ok').click(function(){
            $(".mobile-filters").slideToggle();
            $('.filters_ok').toggleClass('filters_ok_active');
            $('.views-exposed-widgets').toggleClass('filt_inner_bac');
            $('.btn_xw').show();
            document.body.scrollTop = document.documentElement.scrollTop = 305;

            $('#edit-search-api-views-fulltext-wrapper, #edit-field-product-ref-field-country-manufacturer-wrapper, #edit-field-product-ref-field-prod-prizn-wrapper, #edit-field-product-ref-field-product-availability-wrapper, #edit-sort-bef-combine-wrapper .form-item-sort-bef-combine, .views-submit-button, .views-reset-button, #edit-field-product-ref-field-prod-prizn-1-wrapper label').slideToggle();

            $('html').addClass('notScroling');
          });
        };

        // --- Ajax preloader 2 -----------------------------------
				$('body').ajaxStart(function(){
					$('#preloader').fadeIn(100);
				});
				$('.body').ajaxSuccess(function(){
					$('#preloader').fadeOut(100);
				});
        
        // сортировать по (стрелка)
        $('#edit-sort-bef-combine-wrapper label').after('<p class="btn_xws"></p>');
        $('#edit-sort-bef-combine-wrapper').children().first('label').click(function(){
          $('.btn_xws').toggleClass('btn_xwsv');
        });

        //создаем кнопку для закрытия фильтра
        $( ".views-exposed-widgets" ).prepend( '<p class="btn_xw"></p>' );

        // кнопка закрытия фильтра (обработка события)
        $('.btn_xw').click(function(){
          $(".mobile-filters").slideToggle();
          $('.filters_ok').toggleClass('filters_ok_active');
          $('.views-exposed-widgets').toggleClass('filt_inner_bac');
          $('#edit-search-api-views-fulltext-wrapper, #edit-field-product-ref-field-country-manufacturer-wrapper, #edit-field-product-ref-field-prod-prizn-wrapper, #edit-field-product-ref-field-product-availability-wrapper, #edit-sort-bef-combine-wrapper .form-item-sort-bef-combine, .views-submit-button, .views-reset-button, #edit-field-product-ref-field-prod-prizn-1-wrapper label').slideToggle();
          $('.btn_xw').hide();
          $('html').removeClass('notScroling');
        });

        // кнопка закрытия категории
        $("#sidebar-first").prepend('<div class="btn_xx"></div>');
        $("#sidebar-first").prepend('<div class="category_logo">Категории</div>');
        $('.btn_xx').click(function(){
          $('#sidebar-first').removeClass('open');
          $('html').removeClass('notScroling');
        });

        // кнопка закрытия фильтра
        $(".views-widget .form-type-select").prepend('<div class="btn_x"></div>');
        $('.btn_x').click(function(){
          $('.views-widget').removeClass('.menuVisible');
        });

        // фиксация фильтров при прокрутке
        var filter2_ = $('.filters_ok, .mobile-filters');
        var filter1_ = $('#views-exposed-form-fgh-page');
        var filt_max = $('.view-filters');
        
        $(window).scroll($.throttle(function () {
          if ($(this).scrollTop() > 305) {
            filter2_.addClass("filt");
            filter1_.addClass("filt, filt_inner");
            filt_max.addClass("filt_max");
            filt_max.addClass("filt_max_701_960");
          } else {
            filter2_.removeClass("filt");
            filter1_.removeClass("filt, filt_inner");
            filt_max.removeClass("filt_max");
            filt_max.removeClass("filt_max_701_960");
          }
        }));
      }else {
        $(".filters_ok").first().remove();
      }


      // категории --------------------------------------
      $('#sidebar-first h2').off("click");

      function btn_xx_none() {
        $('.btn_xx').toggleClass('btn_xx_none');
      }

      $('#block-facetapi-iybuxmkgswpzbylp3bdvjd1tb1ow4viq h2').click(function(){
        $('#block-facetapi-iybuxmkgswpzbylp3bdvjd1tb1ow4viq').toggleClass('category_visible_full');
        $('#block-facetapi-iybuxmkgswpzbylp3bdvjd1tb1ow4viq h2').toggleClass('category_visible_h2');
        $('#sidebar-first .region-sidebar-first').toggleClass('category_inner_view');
        btn_xx_none();
      });
      $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x h2').click(function(){
        $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x .content').toggleClass('category_visible');
        $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x').toggleClass('category_visible_full');
        $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x h2').toggleClass('category_visible_h2');
        $('#sidebar-first .region-sidebar-first').toggleClass('category_inner_view');
        btn_xx_none();
      });
      $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7 h2').click(function(){
        $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7 .content').toggleClass('category_visible');
        $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7').toggleClass('category_visible_full');
        $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7 h2').toggleClass('category_visible_h2');
        $('#sidebar-first .region-sidebar-first').toggleClass('category_inner_view');
        btn_xx_none();
      });

      if ($(window).width() > 701) {
        //показать скрыть (назначение)
        $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x h2').on('click',function(){
          $('#block-facetapi-g21ch4ohv0e8vsqh77i0ohlesuuvck2x .content').toggle();
        });
        //показать скрыть (цена)
        $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7 h2').on('click',function(){
          $('#block-facetapi-awu51webs0tc60uvoaniideesqht0nx7 .content').toggle();
        });
      }
      
      //индикатор загрузки
      $('#iL').remove();
      $("#edit-submit-fgh, #edit-submit, #edit-reset, .form-submit, .current-search-item-reset-filters").click(function() {
        $('.page-shop, .page-shop-new, .page-shop-shares, .page-bookmarks, .page-node').prepend('<span id="iL" class="i-load"></span>');
        $('#iL').addClass('i-load-full').fadeOut(2000);
      });

      //по открытию закрывать другие пункты фильтров
      $('.views-exposed-widgets label:not(.views-exposed-widgets .views-widget label )').on('click', (e) => $('.menuVisible').removeClass('menuVisible'));
      $('.views-exposed-widgets label:not(.views-exposed-widgets .views-widget label )').on('click', (e) => $('.list_filter_active').removeClass('list_filter_active'));
      
      // фильтры
      var filter3_ = $('.mobile-filters');
        $(window).scroll($.throttle(function () {
          if ($(this).scrollTop() > 305) {
            filter3_.addClass("filt");
          } else {
            filter3_.removeClass("filt");
          }
        }));

      //добавление кнопки "Сбросить" для фильтров в каждом отдельно
      $('#edit-sort-bef-combine-').prop('checked', true);

      //при ширине 700 px
      if ($(window).width() <= 700) {
        var $wrapper_for_reset = $('.view-filters .views-exposed-widgets');
        var $resett = $('<input type="button" value="Сбросить">')
          .addClass('reset_t')
          .addClass('btn_category');

        // проверка на множество элементов
        $wrapper_for_reset.append($resett);
        if($('.views-exposed-widgets').find('.reset_t').length > 1) {
          $('.views-exposed-widgets').find('.reset_t').not().first().remove();
        }

        $('.reset_t').on('click', filter_Reset);
        $('.views-exposed-widgets input[type="checkbox"]').off();
      }

      function filter_Reset(e) {
        var $filter = $('.filt_inner_bac .views-widget');
        if ($filter.hasClass('menuVisible')) {
          $('.menuVisible input[type="checkbox"]').prop('checked', false);
          $('.menuVisible #edit-sort-bef-combine-').prop('checked', true);
        }
      }

      //добавление кнопки "Применить" для фильтров в каждом отдельно
      if ($(window).width() <= 700) {

        //создаем класс для привязки кнопки "Применить"
        var class_for_apply = $('#edit-field-product-ref-field-country-manufacturer-wrapper, #edit-field-product-ref-field-prod-prizn-wrapper, #edit-field-product-ref-field-product-availability-wrapper');
        class_for_apply.click(function(){ 
				  $('.view-filters .views-exposed-widgets').toggleClass('class_for_apply');
        });

        //создаем кнопку "Применить" + назначаем обработчик
        var $applyy = $('<input type="button" value="Применить">')
          .addClass('btn_apply_filter')
          .on('click', filterApply);

        //вставляем ее в блок предварительно удалив ее дубликат
        $('.view-filters .views-exposed-widgets .btn_apply_filter').remove();
        $('.view-filters .views-exposed-widgets').append($applyy);
        
        //функция логики применить
        function filterApply() {
          $('.views-exposed-widget').removeClass('list_filter_active');
          $('.views-exposed-widgets').removeClass('class_for_apply');
          $('.views-widget').removeClass('menuVisible');
          $('.views-exposed-widgets').removeClass('for_button_reset');
        }
      }

      //Добавление функции нормальной цены для категории на десктопе
      if ($(window).width() > 700) {
        if($('#search-api-ranges-block-slider-view-form-fprice').attr("action")) {
          $('#search-api-ranges-block-slider-view-form-fprice').submit(function() {
            this.action = $('#search-api-ranges-block-slider-view-form-fprice').attr("action").replace(/fprice.*/, '');
            this.submit();
          });
        }
      }
      
      //обвертка для сортировки для вывода с нижним отступом
      $('#edit-sort-bef-combine .form-item-sort-bef-combine').wrapAll('<div class="wrapSort">');

      // плейсхолдер для поиска в фильтрах
      $(".view-filters #edit-search-api-views-fulltext").attr("placeholder", "Поиск");
      $("#views-exposed-form-search-test-page-search-resault #edit-combine").attr("placeholder", "Поиск");

      //атрибут для подарочных карт
      $("#edit-charge-code").attr("placeholder", "Введите 'промокод'");
      
      //убрать обработчик на селекте в странице результатов поиска
      $('.page-search-test #views-exposed-form-search-test-page #edit-type-wrapper').unbind();

      //что б цена в категории могла меняться нормально без 27 и ...
      $('#search-api-ranges-block-slider-view-form-fprice #edit-range-from, #search-api-ranges-block-slider-view-form-fprice #edit-range-to').unbind();

      //убрать обработчик с удаления товаров из корзины с пролистыванием в верх
      $('.page-cart #views-form-commerce-cart-form-default input').not('.page-cart #views-form-commerce-cart-form-default #edit-actions input').unbind('change');
      $('.page-cart #views-form-commerce-cart-form-default input').not('.page-cart #views-form-commerce-cart-form-default #edit-actions input').unbind('keypress');


      //применение позиционирования при удалении товара из корзины (аякс)

      //кнопка удалить на товаре
      $('#views-form-commerce-cart-form-default .views-row .views-field-edit-delete input').on('click, mousedown',  function(){
        count_click_input_ajax = true;
        // console.log(count_click_input_ajax);
      });

      //кнопка убновить (общая) на той же странице
      $('#views-form-commerce-cart-form-default #edit-actions input').on('click, mousedown',  function(){
        count_click_input_ajax = false;
        // console.log(count_click_input_ajax);
      });

      //отложенная функция смещения страницы после аякса
      setTimeout(function(){
        if(count_click_input_ajax == true){
          $(window).scrollTop(currentPosition - 400);
          // console.log('смещение');
        }else{
          $(window).scrollTop(currentPosition);
          // console.log('норм');
        }
      }, 500);




      //label add too cart

      var $wrapInputAddTooCart = $('.commerce-add-to-cart .form-submit', context);

      $( $wrapInputAddTooCart ).each(function() {
        var $this = $(this);
        var $label_ = $('<label> <p class="fas fa-cart-plus"></p> </label>')
          .addClass('addTooCart')
          .attr('for', $this.attr('id'));
        $this.parent().append($label_);
      });



      //as 73 фигня на фронте вместо бекенда (обьединение позиций товара)
      var $arrTr = $('.view-id-commerce_user_orders')
        .find('tbody tr');

      $( $arrTr ).each(function() {
        var $this = $(this);
        var order_id = $this.find('.views-field-order-id').text();
        var order_id_next = $this.next().find('.views-field-order-id').text();
        if(order_id == order_id_next ){
          $this.next().find('.views-field-order-id').addClass('removeTr');
          $this.next().find('.views-field-view-order').addClass('removeTr');
          $this.next().find('.views-field-created').addClass('removeTr');
          $this.next().find('.views-field-commerce-order-total').addClass('removeTr');
          $this.next().find('.views-field-status').addClass('removeTr');
          $this.next().find('.views-field-delete-order').addClass('removeTr');
        }
      });


      //кабинет мастера
      var $btnCategoryForMaster = $('.page-master-catalog .mobile-filters');
      var $sidebar_first_ForMaster = $('.page-master-catalog #sidebar-first');

      $btnCategoryForMaster.on('click',  function(){
        $sidebar_first_ForMaster
          .toggleClass('sidebar_first_ForMaster_V');
      });
      

      
      


    }
  };


      $(document).ready(function() {
        if(document.getElementById('edit-captcha-response')){
          document.getElementById('edit-captcha-response').placeholder = 'Введите символы с картинки';
        }   

        document.title = 'OkGuru - для тех, кто хочет знать больше!';
        // add cart left
        $("#header .px1200").prepend('<div class="box_cart_left"><a href="/cart"></a></div>');
        // created arrow for slider
        $("#block-menu-menu-astroshop").append('<div class="arrows"><span class="arrow arrow-left_"></span><span class="arrow arrow-right_"></span></div>');

        //---СЛАЙДЕР МЕНЮ --------------------------------------------------------------------------
        if ($(window).width() <= 768) { 
          //добавляем атрибут к content (общий счетчик)
          $('.content').attr('data-position', 0);

          // добавляем дата атрибут index & width
          var totalWidth = 0;
          $( "#block-menu-menu-astroshop .menu li" ).each(function(i, elem) {
            $( this ).attr({
              'data-id': i,
              'data-s': totalWidth,
            });
            totalWidth += $(elem).width();
          });         

          //шаг слайдера кнопка налево
          $('.arrow-right_').click(function(){
            var data_position = $('.content[data-position]').data("position");
            if(data_position < $('.menu').length -1) {
              console.log('работаем !' + data_position);
              var width_li = $('li[data-id="'+ data_position +'"]').width();
              var width_li_next = $('li[data-id="'+ (data_position + 1) +'"]').width();
              var move_right =  (width_li / 2) + (width_li_next / 2);
              //обновляем позицию
              $('.content[data-position]').data("position", data_position+1);
              //смещаем
              $('.content').animate( { scrollLeft: '+=' + move_right }, 500);
            }else {
              console.log('все !');
            }
          });

          //шаг слайдера кнопка направо
          $('.arrow-left_').click(function(){
            var data_position = $('.content[data-position]').data("position");
            if(data_position > 0) {
              console.log('работаем !' + data_position);
              var width_li = $('li[data-id="'+ data_position +'"]').width();
              var width_li_prev = $('li[data-id="'+ (data_position - 1) +'"]').width();
              var move_left =  (width_li / 2) + (width_li_prev / 2);
              //обновляем позицию
              $('.content[data-position]').data("position", data_position-1);
              //смещаем
              $('.content').animate( { scrollLeft: '-=' + move_left }, 500);
            }else {
              //console.log('все !');
            }
          });

          //центрирование категорий слайдера
          $('#block-menu-menu-astroshop .menu li').each(function(i,elem) {
            if ($(this).hasClass("active-trail")) {
              switch (i) {
                case 0:
                  $('.content').animate( { scrollLeft: '+=0' }, 500).attr('data-position', 0);
                  break;
                case 1:
                  $('.content').animate( { scrollLeft: '+=90' }, 500).attr('data-position', 1);
                  break;
                case 2:
                  $('.content').animate( { scrollLeft: '+=195' }, 500).attr('data-position', 2);
                  break;
                case 3:
                  $('.content').animate( { scrollLeft: '+=340' }, 500).attr('data-position', 3);
                  break;
                case 4:
                  $('.content').animate( { scrollLeft: '+=495' }, 500).attr('data-position', 4);
                  break;
                default:
                  console.log( "Нет таких значений" );
              }
              // console.log("Остановлено на " + i + "-м пункте списка.");
              return false;
            } else {
              // console.log(i + ': ' + $(elem).text());
            }
          });
        }

        // центрирование категории названия при ширине меньше 700 px
        if ($(window).width() <= 700) {

          $('body').on('click', '#edit-field-product-ref-field-country-manufacturer-wrapper', function() {
            $('#edit-field-product-ref-field-country-manufacturer-wrapper').toggleClass('list_filter_active');
          });
          $('body').on('click', '#edit-field-product-ref-field-prod-prizn-wrapper', function() {
            $('#edit-field-product-ref-field-prod-prizn-wrapper').toggleClass('list_filter_active');
          });
          $('body').on('click', '#edit-field-product-ref-field-product-availability-wrapper', function() {
            $('#edit-field-product-ref-field-product-availability-wrapper').toggleClass('list_filter_active');
          });
          $('body').on('click', '#edit-sort-bef-combine-wrapper', function() {
            $('#edit-sort-bef-combine-wrapper').toggleClass('list_filter_active');
          });
          $('body').on('click', '#edit-field-product-ref-field-prod-prizn-1-wrapper', function() {
            $('#edit-field-product-ref-field-prod-prizn-1-wrapper').toggleClass('list_filter_active');
          });

          $(window).scroll($.throttle(function(){
            $(".view-filters").css("top",Math.max(0,361-$(this).scrollTop()));
          }));
        }

        // кнопка "показать" в фильтрах
        if(document.querySelector('#edit-submit-fgh')) {
          document.querySelector('#edit-submit-fgh').value = 'Показать';
        }

        // обвертка для двух кнопок
        $('.node-full .group-right .field-name-quick-buying, .node-full .group-right .field-type-commerce-product-reference').wrapAll('<div class="wrap_ror_2_button">');
          
        if($(".view-lk-userpoint").length > 0) {
          var replaced_31 = $(".view-lk-userpoint").html().replace(/User points for specific products/g,'Пользовательские баллы за конкретные продукты');
          $(".view-lk-userpoint").html(replaced_31);
        }
        if($(".view-lk-userpoint").length > 0){
          var replaced_32 = $(".view-lk-userpoint").html().replace(/Order total/g,'Общая сумма');
          $(".view-lk-userpoint").html(replaced_32);
        }
        if($(".component-type-commerce-price-formatted-amount").length > 0){
          var replaced_32_ = $(".component-type-commerce-price-formatted-amount").html().replace(/Order total/g,'Общая сумма');
          $(".component-type-commerce-price-formatted-amount").html(replaced_32_);
        }
        if($(".view-lk-userpoint").length > 0) {
          var replaced_33 = $(".view-lk-userpoint").html().replace(/Discount/g,'Скидка');
          $(".view-lk-userpoint").html(replaced_33);
        }
        if($(".component-type-discountdiscount-discount-test-10-").length > 0) {
          var replaced_33_ = $(".component-type-discountdiscount-discount-test-10-").html().replace(/Discount/g,'Скидка');
          $(".component-type-discountdiscount-discount-test-10-").html(replaced_33_);
        }
        if($(".view-lk-userpoint").length > 0) {
          var replaced_34 = $(".view-lk-userpoint").html().replace(/\+\-/g,'-');
          $(".view-lk-userpoint").html(replaced_34);
        }


        // //совпадение паролей при регистрации
        // $('#edit-account .password-confirm').text().replace(/Совпадение пароля/g,'Пароли');
        // $('#edit-account .password-confirm .ok').text().replace(/да/g,'совпадают');
        // $('#edit-account .password-confirm .error').text().replace(/нет/g,'не совпадают');
        

        //фиксация категрии при прокрутке
        var categoryWrapper = $('#sidebar-first');
	      $(window).scroll($.throttle(function () {
		      if ($(this).scrollTop() > 305) {
			      categoryWrapper.addClass("sbf");
		      } else {
			      categoryWrapper.removeClass("sbf");
          }
        }));

        var hMonitor = $(window).height();
        var hCategoryWrapper = $('#sidebar-first').height();
        if(hCategoryWrapper > hMonitor){
          categoryWrapper.addClass("sbfImportant");
          $(window).scroll($.throttle(function() {
            var categoryWrapperr = $('#sidebar-first');
            var footer_wrapper =$('#footer-wrapper').offset().top;
            var i_var = $(this).scrollTop() + hMonitor;
            if (i_var > footer_wrapper) {
              categoryWrapperr.addClass("sbfImportantTwice");
            }else{
              categoryWrapperr.removeClass("sbfImportantTwice");
            }
            var scrolled_window = $(document).scrollTop().valueOf();
            $('#sidebar-first').scrollTop(scrolled_window - 300);
          }));
        }

        $(window).scroll($.throttle(function() {
          var categoryWrapperrr = $('#sidebar-first');
          var footer_wrapperr =$('#footer-wrapper').offset().top;
          var i_varr = $(this).scrollTop() + hMonitor;
          if (i_varr > footer_wrapperr) {
            categoryWrapperrr.addClass("sbfImportantTwice");
          }else{
            categoryWrapperrr.removeClass("sbfImportantTwice");
          }
        }));

        





      })
})(jQuery);

