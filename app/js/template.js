'use strict';

var log = console.log;

(function(){
$(function(){



	// JQUERY FUNCTION

	$.fn.setTimeout = function( func, time ){
		var self = $(this);
		setTimeout( function(){ func.call(self); }, time ); 
		return self.valueOf();
	}





	window.preBox = function(){
		var preBox = $(".pre-box");

		if( preBox.hasClass("in") )
			preBox.removeClass("in").setTimeout( function(){ $(this).hide(); }, 600 ).find(".box-content");
		else
			preBox.show().addClass("in").find(".box-content");
			//$(".pre-box").removeClass("in").setTimeout( function(){ $(this).hide(); }, 600 );
		

	}
	preBox();








//-ВКЛЮЧЕНИЕ ЭКРАНА ЗАГРУЗКИ ПРИ ПЕРЕХОДЕ
$(".aLoad").on("click", "a", function(e){

	if( !/#/.test(this.href) ){
		e.preventDefault();
		var self = this;
		var text = $(self).text().trim();
		$(".box-content .content h1").attr("data-flicker", text).text(text);
		 preBox();
		 setTimeout(function(){ preBox(); }, 2000)
	}
});

















	window.bgLineAnimation = function( bool ) {
		if ( $(".bg-lines").length )
			bool ? 
				$(".bg-lines").addClass("in").removeClass("out") 
			: 		 
				$(".bg-lines").addClass("out").removeClass("in");
	}
	


	bgLineAnimation(1);
	$("main").addClass("in");
	if( !$("#page").hasClass("in") ) $("#page").addClass("in");
	



	function menuBorder(){
		var menu = 				$(".menu-list"),
				border = 			$(".menu-border"),
				menuItem = 		menu.find("li"),
				lineItem = 		border.find(".line-item");



		function moveBorder(li){
			var liWidth = li.outerWidth(true),
					liPos = 	li.position().left;
			lineItem.css( {
				"width": liWidth,
				"left": liPos
			});
		}
		function activeBorder(){
				moveBorder( menu.find(".active") )
		}
		activeBorder();
		lineItem.addClass("active");


		menu.hover(
			function() {
				lineItem.addClass("in");
			},
			function() {
				lineItem.removeClass("in");
			}
		);
		menuItem.hover(
			function() {
				moveBorder( $(this) )
			},
			function() {
				activeBorder();
			})


	}
	function onLoaded() {

		//MENU

		resizer( function(){
			$(".menu-border").width( $(".menu-list").width() )
		} )
		

		menuBorder();


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

				//$(".preloader").fadeOut();
				//$( "body" ).css("overflow-y", "auto");
				onLoaded();

			}, 300)

		: void(0);
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

