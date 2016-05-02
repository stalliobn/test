(function($) {
'use strict';

  $('ul.tabs-control').on('click', 'li:not(.active)', function() {
    $(this)
    .addClass('active').siblings().removeClass('active')
    .closest('div.user-list').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
  });

  var owlMain = $('.owl').owlCarousel({
    margin: 10,
    items: 1,
    slideSpeed : 500,
    paginationSpeed: 500,
    dotsContainer: '.pagination'
  });

  var users = $('.users').owlCarousel({
    margin:7,
    items: 5,
    dots: false,
    autoWidth: true,
    loop: true
  });
  $('.next').click(function() {
    users.trigger('next.owl');
  })
  $('.prev').click(function() {
    users.trigger('prev.owl');
  });

  var $container = $(".tabs-content");
  var svgStrokeLength = 380;
  function container(percent) {
    var percent = svgStrokeLength - (svgStrokeLength * percent / 100)
    $container.find("circle.circle-color").animate({
      'stroke-dashoffset': percent
    });
  };

  var dataProgress = ($(".circle-color").data('progress')),
  dataSpeed = ($(".circle-color").data('speed'));
  $container.find("circle.circle-color")
  .css({'stroke-dashoffset': svgStrokeLength, 'transition': dataSpeed + 's'})
  container(dataProgress);

  var cont = 0;
  var min = parseInt($(".circle-color").data('progress'), 10);
  function count(min, cont) {
    $('.numbers').each(function() {
    var $element = $(this);
     $({count: cont}).animate({count: min}, {
      duration: 1000 * (dataSpeed),
      step: function(value) {
        $element.html(Math.ceil(value) + '%');
      }
    });
  });
  };
  count(min, cont);

  var slider = document.getElementById('slider');
  noUiSlider.create(slider, {
    start: [30, 70],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

  $('.select').selectik();

  var $userName = $('#userName')
  $('.submit-button').on('click', function() {
    var nameLngth = $('#userName').val().length;
    if (nameLngth <= 1) {
      $('.eror').css('display', 'block')
      $('#userName').css('border-color', '#eeabab');
      return false;
    } else {
      $('.eror').remove();
    }
  })

  activeTab();
  function activeTab() {
    $('.active').next().click(function(){
      var $this = $(this);
      if ($this.hasClass('done')) return;
      $this.addClass('active');
      $this.prev().addClass('done').removeClass('active');
      progressLine ();
    });
  }

  function progressLine() {
    var number = 20;
    $('.steps ul li').each(function(){
      if ($(this).hasClass('done')) {
        number = number + 20;
      }
    });
    $('.progress-line').animate({
      'width': number + '%'
    }, 200);
    $('.load-line span').text(number + '%');
    activeTab();
  }

})(jQuery);










