function waitFade() {
  jQuery('#wait-txt span').fadeIn(600, function() {
    jQuery('#wait-txt span').delay(50).fadeOut(500);
  });
}

jQuery(function($){
  var interval;

  // Works vars
  var currentPaginateWorks = 0;
  var nbPaginateWorks = 0;
  var currentWork = 0;
  var currentWorkPage = 0;
  var nbWorks = 0;
  var nbWorkPage = 0;
  var lock = false;
  var urlChangeDetect = true;
  var previousUrl;

  // Pages
  var currentPage = 0;
  var isAutoScroll = false;
  var nbPages = 0;
    
    //HOMEPAGE BXSLIDER
    $('#slider1').bxSlider({
        auto: true,
        // auto: false,
        controls: false,
        pager: false,
        pause: 2200
    });

    $('#slider2').bxSlider({
        auto: true,
        controls: false,
        pause: 3000,
        pager: false
    });

  function scrollPage(destination) {
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
  }

  function displayWork(url) {
      $('#wait').fadeIn(function() {
  		var jqxhr = $.ajax(url)
  					.done(function(data) { 
  					  
  					})
  					.fail(function() { /*scrollPage('travaux');*/ });

      jqxhr.done(function(data) {
  	  $('html').getNiceScroll().hide();
        $('.work-view').remove();
        $('.worksContainer').after(data);
        $('.work-view .rea *:gt(0)').not('iframe').hide();
        $('.work-view').show();

        if( currentWork == 0 )
        {
          var id = $('.work-view').data('id');
          currentWork = $('.work').index( $('.work[data-id='+ id +']') );
        }

        if( currentWork == 0 )
        {
          $('.work-view .work-previous').hide();
        }
        
        if( currentWork == nbWorks-1 )
        {
          $('.work-view .work-next').hide();
        }

        if( $('.work-view .rea img').length > 0 )
        {
          $('.work-view .rea img').load(function() {
            resizeWorks();
            $('#wait').delay(500).fadeOut();
          });
        }
        else
        {
          $('.work-view .pagination, .work-view ul.numbers').hide();
          $('#wait').fadeOut();
        }

        nbWorkPage =  $('.work-view .rea > *').length;
        
        urlChangeDetect = false;
  	  lock = false;
        setTimeout(function(){ urlChangeDetect = true}, 500);
        $.address.value( $('.work-view').data('slug') );
      });
    });
  }

  function closeWorkView() {
  	$('body, html').stop().animate({
  		'scrollTop': $('div#travaux').offset().top
  	}, 10, 'swing');

  	$('.work-view').fadeOut(function() {
  		$('.work-view').remove();
  		$('html').getNiceScroll().show();
  		$.address.value('/page/travaux');
  	});
  }

  function displayWorksCategory(url) {
    $('#wait').fadeIn();
    $('.worksContainer').load( url +' .worksContainer > *', function(data) {

      $('.order-choice').html( $(data).find('.order-choice').html() );

      nbPaginateWorks = $('#travaux .works').length;
      nbWorks = $('#travaux .work > a').length;
      currentWorkPage = 0;

      $('#works-paginate').html( '1/'+ nbPaginateWorks );

      if( nbPaginateWorks > 1 )
        $('#travaux .next').show();
      else
        $('#travaux .next').hide();

      $('#travaux .previous').hide();
      $('#wait').fadeOut();
      $('#order-wrapper').fadeOut();
    });
  }

  function displayCategoriesList() {
    lock = true;

    previousUrl = $.address.value();
    $.address.value('/page/travaux/categories');

    $('#order-wrapper .order').css('margin-top', ($('#order-wrapper .order').height()/2*-1)-42 +'px');

    $('#order-wrapper').fadeIn(function() {
      lock = false;
      setTimeout(function(){ $('.order img').rotate(0); }, 500);
    });
  }

  function resizeWorks() {

    $('.work-view .rea img').each(function() {
      var img = $(this).get(0);
      var ratio = $(this).width() / $(this).height();

      var imgW = $(window).width();
      var imgH = imgW/ratio;
      
      if( imgH < $(window).height() )
      {
        imgH = $(window).height();
        console.log('hauteur image (bis) '+ imgH);
        imgW = imgH*ratio;
      }

      $(this).css({
        'margin-left': (imgW*-1)/2,
        'margin-top': (imgH*-1)/2,
        'width': imgW,
        'height': imgH
      });
    });
  }

  if( navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry/i) ) {
    window.location.href = '/mobile.php';
  }

  $(window).bind('ready', function() {

    if( $.browser.msie == true )
    {
      $('head').append('<script type="text/javascript" src="http://fast.fonts.com/jsapi/d62f573a-8e92-4d00-abeb-61f010d13231.js"></script>'+
                       '<link rel="stylesheet" type="text/css" media="all" href="'+ template_directory +'/style_ie.css" />');
    }
    
    if( $('.work-view .rea').length > 0 )
    {
  	document.location.href = '/#'+ window.location.pathname;
    }

    $("html").niceScroll({cursorcolor:'#fff'});
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

    // url check
    var path = $.address.path();
    var staticPath = window.location.pathname;
    var folders = path.split('/');
    
    if( path == '/' )
    {
      $.address.value('/page/home');
    }
    else if( folders[1] == 'page' && folders[2] != 'home' )
    {
      setTimeout('scrollPage("'+ folders[2] +'")', 500);

      if( folders[3] == 'category') {
        displayWorksCategory('category/'+ folders[4]);
      }
    }
    else if( folders[1] == 'post' ) {
      displayWork( path.substring(1) );
    }

    $.address.externalChange(function(event)
    {
      var folders = event.value.split('/');
      path = $.address.path();

      if( folders[1] == 'post' ) {
        displayWork(path.substring(1));
      }
      else if( folders[1] == 'page' && folders[2] != 'home' ) {
        scrollPage(folders[2], false);
        $('.work-view').fadeOut(100).remove();

        if( folders[3] == 'category') {
          displayWorksCategory('category/'+ folders[4]);
        }
        else if( folders[3] == 'categories') {
          displayCategoriesList();
        }
        else if( folders[2] == 'travaux' ) {
          $('#order-wrapper').fadeOut();
        }
      }

      urlChangeDetect = true;
    });

    // firefox hack for the padding in the menu
    if( $.browser.mozilla )
      $('#menu li span').css('padding', '5px 5px 5px 8px');

    // parallax init
    $('.parallax').each(function() {
      $(this).data('first-top', parseInt($(this).css('marginTop')) );
    })

    $('#logo').on('mouseenter', function() {
      $('#logo').animate({'top': '12'}, {queue: false, duration: 300});
    });

    $('#logo').on('mouseleave', function() {
      $('#logo').animate({'top': '5'}, {queue: false, duration: 300});
    });

    /* Home */

    var angle1 = 0;
    var angle2 = 0;
    setInterval(function(){
      angle1+=0.4;
      angle2-=0.5;
      $('#home #lace1').rotate(angle1);
      $('#home #lace2').rotate(angle2);
    }, 50);

    /* Products */
    var currentProduct = 0;
    var nbProducts = $('#savoir-faire .slide').length;

    $('#savoir-faire .slide').eq(currentProduct).css('opacity', 1);

    $('#savoir-faire .previous, #savoir-faire .next, #contact input[type=submit]').on('mouseenter mouseleave', function(e) {

      switch( e.target.className ) {
        case 'previous':
        case 'next':
          var ml;

          if( e.type == 'mouseenter')
          {
            if( $(e.target).hasClass('previous') )
            {
              ml = -350;
            }
            else if( $(e.target).hasClass('next') )
            {
              ml = 290;
            }
          }
          else
          {
            if( $(e.target).hasClass('previous') )
            {
              ml = -340;
            }
            else if( $(e.target).hasClass('next') )
            {
              ml = 280;
            }
          }

          $(e.target).animate({
            marginLeft: ml
          }, {
            duration: 300,
            queue: false
          });
        break;

        case 'wpcf7-form-control  wpcf7-submit':
          if( e.type == 'mouseenter')
          {
            var opa = 0.8;
          }
          else
          {
            var opa = 1
          }

          $(e.target).animate({
            opacity: opa
          }, {
            duration: 250,
            queue: false
          });
        break;
      }
    })
    $('#savoir-faire .previous, #savoir-faire .next').on('click', function(e) {

  	if( lock == false )
  	{
  		lock = true;
  		var oldProduct = currentProduct;

  		$('#savoir-faire .slide .text').eq(currentProduct).animate({
  			'opacity': '0'
  		  }, 400, 'swing', function() {

  			$('#savoir-faire .slide .text').eq(currentProduct).delay(100).animate({
  			  'opacity': '1'
  			}, 400, 'swing');

  			var posX = parseInt( $('#savoir-faire .slides').css('left') );
  			var nposX = posX;

  			if( $(e.currentTarget).hasClass('previous') && currentProduct > 0 )
  			{
  			  nposX = posX+600;
  			  currentProduct--;
  			}
  			else if( $(e.currentTarget).hasClass('next') && currentProduct < nbProducts-1 )
  			{
  			  nposX = posX-600;
  			  currentProduct++;
  			}

  			$('#savoir-faire .slides').css('left', nposX +'px');
  			$('#savoir-faire .slide').eq(currentProduct).animate({ 'opacity': '1' });

  			if( currentProduct > 0 )
  			  $('#savoir-faire .previous').fadeIn();
  			else
  			  $('#savoir-faire .previous').fadeOut();

  			if( currentProduct < nbProducts-1 )
  			  $('#savoir-faire .next').fadeIn();
  			else
  			  $('#savoir-faire .next').fadeOut();
  		  }
  		);

  		$('#savoir-faire .slide:eq('+ oldProduct +') img').animate({
  			'top': '-=20',
  			'opacity': '0'
  		  }, 400, 'swing', function() {

  			$('#savoir-faire .slide:eq('+ oldProduct +') img').css('top', '+=20');

  			$('#savoir-faire .slide:eq('+ currentProduct +') img').css('top', '-=20').animate({
  			  'top': '+=20',
  			  'opacity': '1'
  			}, 600, 'swing', function() { lock = false } );
  		  }
  		);
  	}
    });

    /** Works **/
    nbPaginateWorks = $('#travaux .works').length;
    nbWorks = $('#travaux .work > a').length;

    $(window).keypress(function(event) {
  	if( event.keyCode == 27 && $('.work-view').css('display') == 'block' ) //esc
  	{
  		closeWorkView();
  	}
    });
  	$('#works-paginate').html( '1/'+ nbPaginateWorks );

    if( nbPaginateWorks == 1 )
      $('#travaux .next').hide();

    $('#travaux').delegate('.thumb:not(.hover)', 'mouseenter', function() {
      $(this).animate({opacity: 0}, {duration: 300, queue: false});
    });

    $('#travaux').delegate('.thumb:not(.hover)', 'mouseleave', function() {
      $(this).animate({opacity: 1}, {duration: 300, queue: false});
    });

    $('#travaux > .order img').on('click', function() {
      displayCategoriesList();
    });
    
    $('#order-wrapper li a').on('click', function(e) {
      e.preventDefault();

      var url = $(this).attr('href');

      displayWorksCategory(url);
    });

    $('#order-back').on('click', function() {
      $.address.value(previousUrl);
      $('#order-wrapper').fadeOut();
    })

    $('#travaux').delegate('.work-close', 'click', function() {
      closeWorkView();
    })

    $('#travaux').delegate('.previous, .next, .work-previous, .work-next, .work-close, .orderIcon', 'mouseover mouseleave', function(e) {
      var target = e.target;
      var eventType = e.type;

      switch( target.className ) {
  	    case 'orderIcon':
      		if( e.type == 'mouseover' && lock == false )
  			{
  			  if( $(this).parent().css('margin-left') == '-60px' )
  			  {
  				  $(this).rotate({animateTo:180});
  			  }
  			  else
  			  {
  				$(this).animate({opacity: 0.8}, {queue: false, duration: 400});
  			  }
      		}
      		else if( lock == false )
      		{
  			  if( $(this).parent().css('margin-left') == '-60px' )
  			  {
  					  $(this).rotate({animateTo:0});
  			  }
  			  else
  			  {
  				$(this).animate({opacity: 1}, {queue: false, duration: 400});
  			  }
      		}
    	  break;
  	  
        case 'previous':
        case 'next':
          var ml;

          if( e.type == 'mouseover')
          {
            if( $(target).hasClass('previous') )
            {
              ml = -410;
            }
            else if( $(target).hasClass('next') )
            {
              ml = 350;
            }
          }
          else
          {
            if( $(target).hasClass('previous') )
            {
              ml = -400;
            }
            else if( $(target).hasClass('next') )
            {
              ml = 340;
            }
          }

          $(target).animate({
            marginLeft: ml
          }, {
      		  duration: 300,
      		  queue: false
      		});
        break;

        case 'work-previous':
        case 'work-next':

          if( e.type == 'mouseover' && lock == false )
          {
            $(target).rotate({animateTo:-180});
          }
          else if( lock == false )
          {
           $(target).rotate({animateTo:0});
          }
        break;

        case 'work-close':
          
          if( e.type == 'mouseover')
          {
            $(target).find('img').rotate({animateTo:180})
          }
          else
          {
            $(target).find('img').rotate({animateTo:0})
          }
        break;
      }
    });

    $('#travaux').delegate('.previous, .next, .work-previous, .work-next, .work-link', 'click', function(e) {
      var target = e.currentTarget;
      var eventType = e.type;

      switch(target.className) {
        case 'previous':
        case 'next':
          if( target.className == 'previous' && currentPaginateWorks > 0 )
          {
            $('#travaux .worksInline').fadeOut(function() {
              $(this).css('left', '+=660');
              $(this).fadeIn();
            });

            currentPaginateWorks -= 1;
          }
          else if( target.className == 'next' && currentPaginateWorks < nbPaginateWorks-1 )
          {
            $('#travaux .worksInline').fadeOut(function() {
              $(this).css('left', '-=660');
              $(this).fadeIn();
            });

            currentPaginateWorks += 1;
          }

          $('#works-paginate').html( (currentPaginateWorks+1) +'/'+ nbPaginateWorks );

          if( currentPaginateWorks > 0 )
            $('#travaux .previous').fadeIn();
          else
            $('#travaux .previous').fadeOut();

          if( currentPaginateWorks < nbPaginateWorks-1 )
            $('#travaux .next').fadeIn();
          else
            $('#travaux .next').fadeOut();
        break;

        case 'work-previous':
        case 'work-next':
        case 'work-link':
          if( lock == false )
          {
            e.preventDefault();
            lock = true;

            if( target.className == 'work-previous' && currentWork > 0 )
              currentWork--;
            else if( target.className == 'work-next' && currentWork < nbWorks )
              currentWork++;
            else if( target.className == 'work-link' )
              currentWork = $('.work').index( $(target).parent() );

            var url = $('.worksInline .work').eq(currentWork).find('a').attr('href');
            
            setTimeout(function(){
              $('travaux').find('.work-previous, .work-next').rotate(0);
              lock = false;
            }, 300);

            displayWork(url);
          }
        break;
      }
    });

    $('#travaux').delegate('.pictures li', 'click', function(e) {
      
      if( currentWorkPage != $(e.target).index() && lock == false)
      {
        currentWorkPage = $(e.target).index();
  	    lock = true;
  	  
        $('.work-view .rea img').fadeOut();
  	  
  	    $('.work-view .rea img').eq( currentWorkPage ).delay(300).fadeIn(300, function() { lock = false });

        $('.work-view .rea .pagination .page').html( (currentWorkPage+1) +'/'+ nbWorkPage);

        $('#travaux .work-view .pictures li').removeClass('current')
        $(e.target).addClass('current');
      }
    });  

    /* Menu */
    nbPages = $('.page').length;

    $('#menu').delegate('li:not(.current) .menutxt', 'mouseenter', function(e) {
      var bloc = $(this).parent().find('div.bloc');

      $(bloc).css('background-color', "#fff");

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
    });

    $('#menu').delegate('li:not(.current) .menutxt', 'mouseleave', function(e) {
      
      var bloc = $(this).parent().find('div.bloc');

      $(bloc).css('background-color', "#3E3E3E");

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
    });

    $('#menu li:not(.fb) a, #logo').on('click', function(e){
      e.preventDefault();

      var page = $(this).attr('href').split('/');
      scrollPage(page[2]);
    });

    $('#menu li.fb a, #footer a').on('click', function(e){
      e.preventDefault();
      window.open($(this).attr('href'));
    });

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

      resizeWorks();
    }

    function update() {
      var pos = $(window).scrollTop();
      var pageHeight = $('.page:first').height();

      var newPage = Math.floor((pos / pageHeight ) - 0.5) + 1;

      if( newPage != currentPage )
      {
        currentPage = newPage;

        urlChangeDetect = false;
        $.address.value( 'page/'+ $('.page').eq(currentPage).attr('id') );

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
      }

      if( currentPage == 0 && pos > 50 || currentPage !== nbPages-1 || (currentPage == 1 && pos < $(window).height()*0.7) )
      {
        $('#next-section').fadeOut({duration: 150, queue: false});
      }
      else if( (currentPage == 0 && pos <= 50 || pos >= $(window).height()*0.7) && currentPage != nbPages-1 && !isAutoScroll )
      {
        $('#next-section').fadeIn({duration: 150, queue: false});
      }

      $('.parallax.p1').each(function() {
        var firsttop = $(this).data('first-top');
        $(this).css('marginTop', firsttop - (pos*5 ) +'px')
      });

      $('.parallax.p2').each(function() {
        var firsttop = $(this).data('first-top');
        $(this).css('marginTop', firsttop - (pos*1 ) +'px')
      });

      $('.parallax.p3').each(function() {
        var firsttop = $(this).data('first-top');
        $(this).css('marginTop', firsttop - (pos*0.5 ) +'px')
      });

      $('.parallax.p3').each(function() {
        var firsttop = $(this).data('first-top');
        $(this).css('marginTop', firsttop - (pos*0.5 ) +'px')
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