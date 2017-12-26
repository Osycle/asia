'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='article-l-items']").length != 0 )
		$("[data-fancybox='article-l-items']").fancybox({
			afterShow : function( instance, current ) {},
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


	function onLoaded() {

		//MASONRY
		if( $('.grid-img').length )
			$('.grid-img').masonry({
			  itemSelector: '.grid-img-item',
			  columnWidth: '.grid-img-sizer',
			  percentPosition: true
			});

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





