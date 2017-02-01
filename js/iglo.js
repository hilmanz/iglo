function waitFade() {
  jQuery('#wait-txt span').fadeIn(600, function() {
    jQuery('#wait-txt span').delay(50).fadeOut(500);
  });
}

jQuery(function($){
  var interval;

  // Pages
  var currentPage = 0;
  var isAutoScroll = false;
  var nbPages = 0;

  /*function scrollPage(destination) {
    var easing = 'easeInOutQuart';

    if( $('div#' + destination).length == 1 )
    {
      isAutoScroll = true;

      $('#next-section').fadeOut({
        duration: 150,
        queue: false,
        complete: function(){

          $('body, html').stop().animate({
            'scrollTop': $('div#' + destination).offset().top
            }, 2500, easing, function() {

              if( currentPage != nbPages-1 && $(window).height() > 750 )
                $('#next-section').fadeIn();

              isAutoScroll = false;
            }
          );
        }
      });
    }
  }*/

    /* MOBILE VERSION */
  /*if( navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry/i) ) {
    window.location.href = 'index-mobile.html';
  }*/

  $(window).bind('ready', function() {

    if( $.browser.msie == true )
    {
      //$('head').append('<script type="text/javascript" src="http://fast.fonts.com/jsapi/d62f573a-8e92-4d00-abeb-61f010d13231.js"></script>'+'<link rel="stylesheet" type="text/css" media="all" href="'+ template_directory +'/style_ie.css" />');
    }

    if( $('.work-view .rea').length > 0 )
    {
  	document.location.href = '/#'+ window.location.pathname;
    }

    //$("html").niceScroll({cursorcolor:'#fff'});
    $('#post-wait').show();

    $('#wait-txt').fadeIn(function() {
      waitFade();
      interval = setInterval('waitFade()', 1200);
    });
  });

  $(window).bind('load', function() {

    if( navigator.userAgent.match(/iPad/i) != null )
    {
    	$('body, #content').css('background', '#F2F2F2');
    	$('.parallax').css('display', 'none');
    }

    $('#wait').fadeOut(1000, function() {
      $('#post-wait').fadeOut(1300);
    });





    // firefox hack for the padding in the menu
    if( $.browser.mozilla )
      $('#menu li span').css('padding', '5px 5px 5px 8px');

    // parallax init
    $('.parallax').each(function() {
      $(this).data('first-top', parseInt($(this).css('marginTop')) );
    })


    /* Home */


    /* Products */




    /* Menu */
    $(document).ready(function(){
      $(window).bind('scroll', function() {
        var distance = 50;
        if ($(window).scrollTop() > distance) {
          $('#marginHead').addClass('scrolled');
        }
        else {
          $('#marginHead').removeClass('scrolled');
        }
      });
    });


    nbPages = $('.page').length;

    /*$('#menu').delegate('li:not(.current) .menutxt', 'mouseenter', function(e) {
      var bloc = $(this).parent().find('div.bloc');

      //$(bloc).css('background-color', "#fff");

      $(bloc).animate({
        width: 12,
        right: 20
      }, {
        queue: false,
        duration: 500,
        specialEasing: {
          width: 'easeOutExpo',
          right: 'easeOutExpo',
          backgroundColor: 'linear'
        }
      });

      $(bloc).parent().find('.menutxt').animate({
        right: 9,
        opacity: 1,
      }, {
        queue: false,
        duration: 500,
        easing: 'easeOutExpo'
      });
    });*/

    /*$('#menu').delegate('li:not(.current) .menutxt', 'mouseleave', function(e) {

      var bloc = $(this).parent().find('div.bloc');

      $(bloc).css('background-color', "#00a1d2");

      $(bloc).animate({
        width: 6,
        right: 23
      }, {
        queue: false,
        duration: 500,
        specialEasing: {
          width: 'easeOutExpo',
          right: 'easeOutExpo',
          backgroundColor: 'linear'
        }
      });

      $(bloc).parent().find('.menutxt').animate({
        opacity: 0,
      }, {
        queue: false,
        duration: 500,
        easing: 'easeOutExpo'
      }, function() {
        $(bloc).parent().find('.menutxt').css('right', '0')
      });
    });*/




    $('#next-section').on('click', function(e){
      var nextPageName = $('.page').eq(currentPage+1).attr('id');
      scrollPage(nextPageName);
    });


    $(window).bind('scroll', update);
    $(window).resize(resize);

    setNextSection();
    resize();

    function resize() {
      var pos = $(window).scrollTop();
      var currentSection = $('.page').eq(currentPage).attr('id');

      if( pos > 50 )
        scrollPage(currentSection);

      /*if( $(window).height() < 750 )
      {
        $('#next-section').hide();
        $('#menu').css('right', '15px');
        $('#contact p.int').hide();
        $('#contact .text').css('padding-top', '70px')
      }
      else
      {
        $('#next-section').show();
        $('#menu').css('right', '');
        $('#contact p.int').show();
        $('#contact .text').css('padding-top', '0')
      }*/

      //resizeWorks();
    }

    function update() {
      var pos = $(window).scrollTop();
      var pageHeight = $('.page:first').height();

      var newPage = Math.floor((pos / pageHeight ) - 0.5) + 1;

      /*if( newPage != currentPage )
      {
        currentPage = newPage;

        //urlChangeDetect = false;
        //$.address.value( 'page/'+ $('.page').eq(currentPage).attr('id') );

        $('#menu li.current').find('a .bloc').css('background-color', "#3E3E3E").animate({
          width: 6,
          right: 23
        }, {
          queue: false,
          duration: 500,
          specialEasing: {
            width: 'easeOutExpo',
            right: 'easeOutExpo',
            backgroundColor: 'linear'
          }
        });

        $('#menu li').eq(currentPage).find('a .bloc').css('background-color', "#fff").animate({
          width: 12,
          right: 20
        }, {
          queue: false,
          duration: 500,
          specialEasing: {
            width: 'easeOutExpo',
            right: 'easeOutExpo',
            backgroundColor: 'linear'
          }
        });

        $('#menu li').find('a .menutxt').animate({
          opacity: '0',
          right: 0
        }, {
          queue: false,
          duration: 500,
          easing: 'easeOutExpo'
        });

        $('#menu li').eq(currentPage).find('a .menutxt').animate({
          opacity: 1,
          right: 10
        }, {
          queue: false,
          duration: 500,
          easing: 'easeOutExpo'
        });

        $('#menu li').removeClass('current');
        $('#menu li').eq(currentPage).addClass('current');
      }*/

      if( currentPage == 0 && pos > 50 || currentPage !== nbPages-1 || (currentPage == 1 && pos < $(window).height()*0.7) )
      {
        $('#next-section').fadeOut({duration: 150, queue: false});
      }
      else if( (currentPage == 0 && pos <= 50 || pos >= $(window).height()*0.7) && currentPage != nbPages-1 && !isAutoScroll )
      {
        $('#next-section').fadeIn({duration: 150, queue: false});
      }

        $('.parallax.p0').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*1 ) +'px')
        });

        $('.parallax.p1').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*1.5 ) +'px')
        });

        $('.parallax.p2').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*0.6 ) +'px')
        });

        $('.parallax.p3').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*0.9 ) +'px')
        });

        $('.parallax.p4').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*0.1 ) +'px')
        });

        $('.parallax.p5').each(function() {
            var firsttop = $(this).data('first-top');
            $(this).css('marginTop', firsttop - (pos*1.3 ) +'px')
        });

        setNextSection();
    }

    function setNextSection() {

      if( currentPage == 0 )
      {
        $('#next-section').css({'bottom': '', 'top': '50%', 'margin-top': '160px'});
      }
      else
      {
        $('#next-section').css({'bottom': '50px', 'top': '', 'margin-top': ''});
      }
    }
  });
});
