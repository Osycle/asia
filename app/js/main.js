'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='article-l-items']").length != 0 )
		$("[data-fancybox='article-l-items']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();


  // Flikity Carousel
  	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 70, y2: 40,
		  x3: 30
		}
  // PARTNERS
	var carouselPartners = $('.carousel-partners .carousel-content').flickity({
		autoPlay: 3000,
		arrowShape: arrowStyle,
		imagesLoaded: true,
		prevNextButtons: false,
		wrapAround: true,
		adaptiveHeight: true,
		//selectedAttraction: 0.2,
		//friction: 0.2,
		//rightToLeft: true,
		pageDots: false,
		//contain: true,
		percentPosition: true,
		cellAlign: 'center'
	});
	var carouselStock = $('.carousel-stock .carousel-content').flickity({
		//autoPlay: 2000,
		arrowShape: arrowStyle,
		imagesLoaded: true,
		//prevNextButtons: checkView(991),
		draggable: checkView(991),
		//wrapAround: true,
		adaptiveHeight: true,
		selectedAttraction: 0.01,
		friction: 0.15,
		//rightToLeft: true,
		//groupCells: 3,
		pageDots: false,
		initialIndex: 2,
		//contain: true,
		percentPosition: true,
		cellAlign: 'center'
	});

	carouselStock.on( 'select.flickity', function() {

	  $(this)	.find(".is-selected")
				  	.siblings()
				  	.removeClass("is-sel").end()
				  	.prev().addClass("is-sel").end()
				  	.next().addClass("is-sel");

	})

	if( $(".short-stock .flickity-prev-next-button") ){

		var farrows = $(".short-stock .flickity-prev-next-button");

		farrows.eq(0)
			.before("<div class='container'></div>")
			.siblings(".container")
			.append( farrows );

	}

/*	setTimeout( function(){

	if( $(".index-slider .tparrows") ){

		var farrows = $(".index-slider .tparrows");

		var x = farrows.eq(0)
			.before('<div class="container-fluid"><div class="container arrows"></div></div>')
			.siblings(".container-fluid").find(".container")
			.append( farrows );
			console.log( x )
	}
}, 1 )*/

	if( $('.catalog-article-content .carousel-main').length >= 0 ){

		var carouselMain = 		$('.catalog-article-content .carousel-main'),
				carouselNav = 		$('.catalog-article-content .carousel-nav');

		for( var i = 0 ; i < carouselMain.length ; i++ ){

			$(carouselMain).eq(i).flickity({
				imagesLoaded: true,
				prevNextButtons: false,
				cellAlign: 'center',
				friction: 1,
				selectedAttraction: 1,
				draggable: !(checkView(992)),
				contain: true,
				pageDots: false
			});

			$(carouselNav).eq(i).flickity({
				imagesLoaded: true,
			  asNavFor: $(carouselMain)[i],
			  prevNextButtons: true,
			  draggable: !false,
			  cellAlign: 'center',
			  adaptiveHeight: true,
			  contain: true,
			  pageDots: false
			});

		}
	}







	//FORM
	(function() {

		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {

			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();


	function menuBorder(){
		var arr = [];
		var menu = 		$(".menu-list"),
				border = 	$(".menu-border");

		function moveBorder(li){

			var liWidth = li.outerWidth(true),
					liPos = 	li.position().left;

			$(border).find(".line-item").css( {

				"width": liWidth,
				"left": liPos

			});
		}
		$(menu).find("li").hover(
			function() {
				var self = $(this);
				moveBorder(self)
				console.log( $(this).outerWidth(true) );
			},
			function() {

				var self = menu.find(".active");
				moveBorder(self)
			})
		$(".menu-list li").map( function (i, el){

			arr.push( $(el).outerWidth(true) );
		})
		console.log(arr);

	}
	function onLoaded() {

		//MENU

		resizer( function(){
			$(".menu-border").width( $(".menu-list").width() )
		} )
		$(".menu-list li")

		menuBorder();

		//MASONRY
		if( $('.grid-img').length )
			$('.grid-img').masonry({
			  itemSelector: '.grid-img-item',
			  columnWidth: '.grid-img-sizer',
			  percentPosition: true
			});

	}



	//SCROLL
	var header_status = false;
	$( window ).on("scroll", function(e){

		if($(window).scrollTop() > 300 && header_status == false){
			header_status = true;
			if ( $(".min-menu") ) $(".min-menu").addClass("scrolled");
		}else if($(window).scrollTop() < 300 && header_status == true){
			header_status = false;
			if ( $(".min-menu") ) $(".min-menu").removeClass("scrolled");
		}

	});

	var images = 						 		document.images,
			imagesTotalCount = 			images.length,
			imagesLoadedCount = 		0,
			preloadPercent = 		 		$(".percent");

	for ( var i = 0; i < imagesTotalCount ; i++ ) {
		var image_clone = new Image();
				image_clone.onload = 		image_loaded;
				image_clone.onerror = 	image_loaded;
				image_clone.src = 			images[i].src;

	}

	function image_loaded (){
		imagesLoadedCount++;

		var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

		setTimeout( function(){
			$(preloadPercent).text(  per +  "%"); 
		}, 1)

		//$("#pre-logo").css("opacity", per/100);

		imagesLoadedCount >= imagesTotalCount ? 

			setTimeout( function (){

				$(".preloader").fadeOut();
				//$( "body" ).css("overflow-y", "auto");
				onLoaded();

			}, 300)

		: void(0);
	}



	//PAGES REV SLIDER
	if( $('.rev-slider-page') )
	    $('.rev-slider-page').revolution({
				delay:6000,
				startwidth: $( window ).width() < 992 ? $( window ).width() : 1170,
				//startwidth: 1170,
				startheight: $( window ).width() < 992 ? 500 : 500,
				autoHeight:"off",
				fullScreenAlignForce:"off",

				onHoverStop:"off",

				thumbWidth:100,
				thumbHeight:50,
				thumbAmount:3,

				hideThumbsOnMobile:"off",
				hideBulletsOnMobile:"on",
				hideArrowsOnMobile:"off",
				hideThumbsUnderResoluition:0,

				hideThumbs:-1,
				hideTimerBar:"on",

				keyboardNavigation:"off",

				navigationType:"bullet",
				navigationArrows:"small",
				navigationStyle:"round",

				navigationHAlign:"center",
				navigationVAlign:"bottom",
				navigationHOffset: 0,
				navigationVOffset:-30,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,


				touchenabled:"off",
				swipe_velocity:"0.7",
				swipe_max_touches:"1",
				swipe_min_touches:"1",
				drag_block_vertical:"false",

				stopAtSlide:-1,
				stopAfterLoops:-1,
				hideCaptionAtLimit:0,
				hideAllCaptionAtLilmit:0,
				hideSliderAtLimit:0,

				fullWidth:"on",
				fullScreen:"off",
				fullScreenOffsetContainer: "",

				dottedOverlay:"none",
				forceFullWidth:"off",

	      shadow:0
	    });


	});
}) (jQuery);














var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac =  	 /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);










// COMMON FUNCTION

function resizer(f) {
	if( typeof f == "function" ) f();
	$( window ).on("resize", function(e){
		if( typeof f == "function" ) f();
	});
}
function checkView( width ) {
	return ($( document ).width() > width);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}








/**
	REVOLUTION Slider
*/
	// INDEX SLIDER

	  $(function() {
	  	
	   window.revSlider = $('.rev-slider')
	   .revolution({
				delay:6000,
				startwidth: $( window ).width() < 992 ? $( window ).width() : 1170,
				startheight: $( window ).width() < 992 ? 400 : 610,
				autoHeight:"off",
				fullScreenAlignForce:"off",

				onHoverStop:"off",

				thumbWidth:100,
				thumbHeight:50,
				thumbAmount:3,

				hideThumbsOnMobile:"on",
				hideBulletsOnMobile:"on",
				hideArrowsOnMobile:"on",
				hideThumbsUnderResoluition:0,

				hideThumbs: 500,
				hideTimerBar:"on",

				keyboardNavigation:"off",

				navigationType:"bullet",
				navigationArrows:"small",
				navigationStyle:"round",

				navigationHAlign:"center",
				navigationVAlign:"bottom",
				navigationHOffset: 0,
				navigationVOffset: 30,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:30,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:30,
				soloArrowRightVOffset:0,


				touchenabled: $( window ).width() < 992 ? "on" : "off",
				swipe_velocity:"0.7",
				swipe_max_touches:"1",
				swipe_min_touches:"1",
				drag_block_vertical: "false",

				stopAtSlide:-1,
				stopAfterLoops:-1,
				hideCaptionAtLimit:0,
				hideAllCaptionAtLilmit:0,
				hideSliderAtLimit:0,

				fullWidth:"on",
				fullScreen:"off",
				fullScreenOffsetContainer: "",

				dottedOverlay:"none",
				forceFullWidth:"off",

	      shadow:0

	    });
			$(revSlider).find("li").click(function(){ revSlider.revnext(); console.log("s") })
	 	});

