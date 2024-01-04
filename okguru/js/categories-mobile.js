;(function($) {
  Drupal.behaviors.okguru_categories_mobile = {

    attach: function(context, settings) {

      //удаление обработчиков для цены "от и до"
      $('#edit-range-from').unbind();
      $('#edit-range-to').unbind();

      if ($(window).width() <= 700) {
        var $buttons = $('<div id="category-actions"></div>');
        var $show = $('<button>Показать</button>')
          .addClass('show')
          .addClass('btn_category')
          .on('click', categoryShow);

        var $apply = $('<button>Применить</button>')
          .addClass('apply')
          .addClass('btn_category')
          .on('click', categoryApply);

        var $reset = $('<button>Сбросить</button>')
          .addClass('reset')
          .addClass('btn_category')
          .on('click', categoryReset);

        $buttons
          .append($reset)
          .append($apply)
          .append($show)
          .css('z-index', 100);
        $('.region-sidebar-first').append($buttons);

        $('.region-sidebar-first input[type="checkbox"]').off();
      }
    },
  }

  function getBasePath() {
    var path = location.pathname;
    var regex = /^\/(\w*)\/?.*/;
    var base = path.replace(regex, '/$1');
    return base;
  }

  function categoryReset(e) {
    var $sidebar = $('.region-sidebar-first');
    var current = $('.current-search-item-reset-filters a');
    if ($sidebar.hasClass('category_inner_view')) {
      $('.region-sidebar-first .category_visible_full input').prop('checked', false);
      $('.region-sidebar-first .category_visible_full input[type="text"]').prop('value', 0);
    }
    else if (current.length > 0) {
      current[0].click();
    }
  }

  function categoryShow(e) {
    var url;
    var pathLinks = [];
    var base = getBasePath();
    var regex = /\/fprice\/.+?5D/gi;
    var regex2 = /\/fprice\/.+?\]/gi;
    var regexCat = /cat\/.+?\/|cat\/.+?$/gi;

    var $links = $('.region-sidebar-first input[type="checkbox"]:checked').parent().find('a');
    $links.each(function(i, el) {
      var linksA = $(el);

      if(linksA.hasClass('facetapi-inactive')){
        url = el.pathname
        .replace(base, '')
        .replace(regex, '');
        url = urlClean(url, location.pathname, /cat\/.+?\/|cat\/.+?$/gi);

      }else{
        url = location.pathname
        .replace(base, '')
        .replace(regex, '')
        .replace(regex2, '');
        url = urlClean(url, el.pathname, /cat\/.+?\/|cat\/.+?$/gi);
      }

      if(pathLinks.indexOf(url) == -1) {
        pathLinks.push(url);
      }
    });

    // цена (начало)
    var fprice_ = $('#search-api-ranges-block-slider-view-form-fprice input[name="range-field"]').val();
    var rangeFrom = $('#edit-range-from').val();
    var rangeTo = $('#edit-range-to').val();
    fieldValuePrice = "[" + rangeFrom + ' TO ' + rangeTo + ']';
    pathLinks.push('/' + fprice_ + '/' + fieldValuePrice);
    // цена (конец)

    var link = pathLinks.join('');
    location.href = location.origin + base + link;
  }

  function categoryApply(e) {
    var $sidebar = $('.region-sidebar-first');
    $('.category_visible_full .content', $sidebar).removeClass('category_visible').hide();
    $('.category_visible_full', $sidebar).removeClass('category_visible_full');
    $(' .category_visible_h2', $sidebar).removeClass('category_visible_h2');
    $sidebar.removeClass('category_inner_view');
  }

  //функция для товаров категории
  function urlClean(url1, url2, regex){
    var regexCat = url2.match(regex);
    if(!!regexCat) {
      regexCat.forEach (function(item){
        item = item.replace(/\/$/, '');
        url1 = url1.replace('/' + item, '');
      });
    }
    return url1;
  }

})(jQuery);