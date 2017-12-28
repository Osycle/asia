'use strict';

(function(){
$(function(){




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

		activeBorder();

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
		$(".menu-list li")

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

				$(".preloader").fadeOut();
				//$( "body" ).css("overflow-y", "auto");
				onLoaded();

			}, 300)

		: void(0);
	}




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

