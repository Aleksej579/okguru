;(function($) {
  var dialogWrap;
  var buyForm;
  var formHolder;
  var submited = false;
  var needUpdate = false;
  Drupal.behaviors.viwe_new = {
    attach: function(context, settings) {





      // создание плейсхолдера для полеы быстрого заказа модального окна
      $('#edit-submitted-name').attr('placeholder', 'Имя');
      $('#edit-submitted-phone').attr('placeholder', 'Телефон');
      $('#edit-submitted-e-mail').attr('placeholder', 'E-mail');
      
      // ограничение ввода только цифер в поле номер модального окна
      $("#edit-submitted-phone").keypress(function(event){
        event = event || window.event;
        if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
          return false;
      });

      // замена (согласен не согласен ) в модальном окне товара при быстром заказе
      var replaced_agree = $(".form-item-submitted-rule-agree:nth-child(1) .option").text().replace('Согласен','Я согласен с <a href="/politika-konfidencialnosti" target="_blank">правилами</a> сайта');
          $(".form-item-submitted-rule-agree:nth-child(1) .option").text(replaced_agree);

      var replaced_no_agree = $(".form-item-submitted-rule-agree:nth-child(2) .option").text().replace('Не согласен','Я не согласен с политикой сайта');
          $(".form-item-submitted-rule-agree:nth-child(2) .option").text(replaced_no_agree);

      // замена чекбокса с радио на галочку
      $("#edit-submitted-rule-agree-1, #edit-submitted-rule-agree--2-1").prop("type", "checkbox");
      $("#edit-submitted-rule-agree-2, #edit-submitted-rule-agree--2-2").hide();







      // created false button
      //$("#webform-ajax-wrapper-88531").append('<div id="edit-actions--w" class="form-actions"><input type="submit" id="edit-webform-ajax-submit-88531_w" value="Заказать" class="form-submit"></div>');



    
      // if($('#edit-submitted-rule-agree-1').is(":checked")) {
      //   $('.form-actions').css({'pointer-events' : 'auto'});
      // } else {
      //   $('.form-actions').css({'pointer-events': 'none'});
      // }









      formHolder = $('#block-webform-client-block-88531')
      
      if(!context.hasOwnProperty('context') || !dialogWrap) {
        if (!dialogWrap) {
           dialogWrap = $('<div title="Быстрая покупка"></div>');
           var buyForm = $('#block-webform-client-block-88531 .content');
            buyForm.appendTo(dialogWrap);
        }
        
        if (context.hasOwnProperty('tagNAme') && context.tagName == 'FORM' && $('.error', context).length > 0) {
          submited = false;
          }
       
     
       $('body').on('click', '.btn-quick-buy' ,function(e) {
          var $target = $(e.target);
          var sku = $target.data('sku');
          var nid = $target.data('productId');
          var link = $target.data('link');
          $('[name="submitted[artikul]"]', dialogWrap).val(sku);
          $('[name="submitted[id_product_node]"]', dialogWrap).val(nid);
          $('[name="submitted[product_link]"]', dialogWrap).val(link);
          dialogWrap.dialog({ modal: true});
          $('[type="submit"]', dialogWrap ).on('click', function() {
           submited = true;
           })
           
          $('input', dialogWrap).on('blur', blurHandler)
         
          $('[name="submitted[rule_agree]"]', dialogWrap).on('change', changeHandler)
       });
       
                dialogWrap.on('blur', 'input', blurHandler)
         
          dialogWrap.on('change', '[name="submitted[rule_agree]"]', changeHandler)
       
       
      }
      
        dialogWrap.on( "dialogbeforeclose", function( event, ui ) {
          var $target = $(event.currentTarget);
          if (submited && $('.links', $target).length > 0) {
         
         $('.content', $target).appendTo(formHolder);
        $('.links a', formHolder).mousedown();
        submited = false;
        needUpdate = true;
        }
        
         } )
         
         
         dialogWrap.on('blur', 'input', blurHandler)
         
         dialogWrap.on('change', '[name="submitted[rule_agree]"]', changeHandler)
         
         
           
         dialogWrap.on('click','[type="submit"]', function() {
           submited = true;
           })
           
           function chechRequired(ctx) {
             var valid = true;
             $('.required', ctx).each(function(i,el) {
                  valid &= !!el.value;
               })
               var phoneVal = $('[name="submitted[phone]"]', ctx).val();
               var phoneTest = /[0-9]/.test(phoneVal);
               var mail = !!$('[name="submitted[e_mail]"]', ctx).val();
               if (!!phoneVal && !phoneTest) {
                 valid = false;
                 }
               
              return valid && ((!!phoneVal && phoneTest )|| mail);
             }
            
            
            function checkAgree(ctx) {
              var agree = false;
              var agreeField = $('[name="submitted[rule_agree]"]:checked', ctx)
              return agreeField.val() === '1';
              }
              
          function blurHandler(e) {
            if (chechRequired(dialogWrap) && checkAgree(dialogWrap)) {
             $('.form-actions', dialogWrap).show();
             $('.form-actions').css({'pointer-events' : 'auto'});
             } else {
               $('.form-actions', dialogWrap).hide();
               $('.form-actions').css({'pointer-events' : 'none'});
               }
            }
            
          function changeHandler(e) {
            if (e.target.value === '0') {
              $('.form-actions', dialogWrap).hide();
              $('.form-actions').css({'pointer-events' : 'none'});
             } else if (chechRequired(dialogWrap)){
                 $('.form-actions', dialogWrap).show();
                 $('.form-actions').css({'pointer-events' : 'auto'});
               }
            }
    }
 }

  $(document).ajaxComplete(function(e) {
      if (!submited && needUpdate) {
       dialogWrap = $('<div title="Быстрая покупка"></div>');
       var buyForm = $('#block-webform-client-block-88531 .content');
       buyForm.appendTo(dialogWrap);
        needUpdate  = false;
     
        }

    });
})(jQuery)
    
