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




	function onLoaded() {

		//MENU

		resizer( function(){
			$(".menu-border").width( $(".menu-list").width() )
		} )
		

		setTimeout( function(){

			$( tpl.section ).find( tpl.sectionContent ).removeClass("in");
			preLoader.preToggle();
			preLoader.enter = true;
			bgLineAnimation(1);
		}, 600);

	}
	onLoaded();

	window.preLoader = {

		preBox: ".pre-box",
		enter: false,
		status: $(".pre-box").hasClass("in"),

		preToggle: function ( bool ) {

			if( !this.enter ) 
				return;

			var preBox = $(this.preBox);

			bool || this.status ?
				preBox.removeClass("in").setTimeout( function(){ $( preBox ).hide(); }, 600 )
			:
				preBox.show().addClass("in").find(".box-content");
			
			return this.status = !this.status;

		},


		preImg: function ( img ) {

			var images = 						 		img || document.images,
					imagesTotalCount = 			images.length,
					imagesLoadedCount = 		0,
					preloadPercent = 		 		$(".percent").text("0 %");


			if( imagesTotalCount == 0 ){
				preOnload();
				$(preloadPercent).text("100 %"); 
			}

			for ( var i = 0; i < imagesTotalCount ; i++ ) {
				var image_clone = new Image();
						image_clone.onload = 		image_loaded;
						image_clone.onerror = 	image_loaded;
						image_clone.src = 			images[i].src;
			}

			function preOnload (){
				onLoaded();
			}

			function image_loaded (){
				imagesLoadedCount++;

				var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

				setTimeout( function(){
					//log(per)
					$(preloadPercent).text(  per +  "%"); 
				}, 1)

				if(imagesLoadedCount >= imagesTotalCount )	preOnload();
			}

		}
	}








	window.pageInf = {

			menu: ".menu-list li",

			menuCount: function () {

				var num = $(this.menu).length;
				console.log( num );
				if( num < 9 )
					return "0"+num;
				return num;

			},
			menuActive: function () {

				var num = $(this.menu).filter( function(i, el) {
						return location.hash.replace(/#\//, "").trim() == $(el).attr("filename");
					} ).attr("menu-num")

				if( num < 9 ) 
					return "0"+num;
				return num;

			}
		
	}













	/* ---VUE--- */

	Vue.use(VueResource);
	Vue.use(VueRouter);


	var defaultHash = "about";


	var Section = {

		template: "<template><h1>{{ $route.params.id }}</h1></template>",

		beforeRouteEnter: function(to, from, next){
			console.log( "Section:Enter");
			next(function(){
				var url = to.fullPath.replace(/\//gim, "");
				v.getSinglePost( url, next );
				preLoader.preToggle();
			})
			
		},

		beforeRouteUpdate: function(to, from, next) {
			console.log( "Section:Update");
			var url = to.fullPath.replace(/\//gim, "");
			preLoader.preToggle(false);
	    v.getSinglePost( url, next );		
	  }
	}

var Project = {

		template: "<template><h1>{{ $route.params.id }}</h1></template>",

		beforeRouteEnter: function(to, from, next){
			console.log( "Project:Enter" );
			next(function(){
				var url = ( to.fullPath.substring( to.fullPath.length, 1 ) );
				preLoader.preToggle();	
				v.getSinglePost( url, next );
			})
			
		},

		beforeRouteUpdate: function(to, from, next) {
			console.log( "Project:Update" );
			console.log( to );
			var url = ( to.fullPath.substring( to.fullPath.length, 1 ) );
			preLoader.preToggle(false);
	    v.getSinglePost( url, next );			

	  }
	}



	window.router = new VueRouter({
	  routes: [
	  	{ 
				path: "/", 
				redirect: "/about",
				name: "index"
			},
			{ 
				path: "/:section", 
				name: "sections",
				components: {
					default: Section
				},

			},
			{ 
				path: "/nashi_proekty/:id",
				name: "section-projects",
				components: {
					default: Project
				},
			}



	  ]
	})



	router.beforeEach( function(to, from, next) {
  	next();
	})



































	window.v = new Vue({
		el: "#page",
		router: router,
		components: {},
		data: {
			defaultHash: defaultHash,
			currentView: Section,
			link: "",
			msg: "WOOOWWWWWWWWWW",
			responsePage: "",
			ol: "",
			vueOnload: vueOnload
		},

		computed: {},



		methods: {

			getSinglePost: function (id, func) {
				var self = this;
				var actions = {}
				var options = {
					params: {
						//orderBy: "articleId"
						//limit: "2"
					},
					before: function(request) {
						if (/(.htm)/gim.test( request.params.id ) ) 
							void(0);
					}
				}

				var url = location.origin+'{/id}';
				var resource = self.$resource( url, {}, actions, options );

				$( tpl.section ).find( tpl.sectionContent ).addClass("in");


				resource.get( {id: decodeURIComponent(id)} ).then(
						function ( response ) {
							log(response);
							self.responsePage = response.data;
							if( /(<html+)/gim.test(  response.data ) ) {
								v.getSinglePost( self.defaultHash , func );
								return;
							}
							func();
							tpl.sectionInner( self.responsePage )

				},	function ( response ) {
							self.responsePage = response.data;
							func();
							tpl.sectionInner( self.responsePage )
				})
			},
			guideUrl: function(e) {
				
			}
		},
		created: function () {

		},
		beforeCreate: function () {

		}, 
		mounted: function () {
		  this.$nextTick(function () {
				vueOnload();
		  })
		}
	});

	log(v)



	function vueOnload(){

		preLoader.preImg();
		var menu = $(".menu-list");

		menu.find("li").click( function() {

			var self = this;
			var text = $(self).text().trim();
			$(".box-content .content h1").attr("data-flicker", text).text(text);

		} )
		menu.find("li").map( function(i, el) {
			$(el).attr("menu-num", i+1);
		} )
		console.log( pageInf.menuCount() );

		$(".total-menu-num").text( pageInf.menuCount() );
		$(".active-menu-num").text( pageInf.menuActive() );
		

		$("#hamburger").on("click", function(){
			console.log( this );
			$(".menu-switch").toggleClass("open");
		})




		return true;
	}





















	
	// TPL
	window.tpl = {
		section: "#sec",
		sectionContent: "#sectionContent",
		sectionData: {},
		sectionTemplate: {},

		sectionInner: function (responsePage, func) {

			var self = this;
			setTimeout(function (){

				$(self.section).find(self.sectionContent).remove();
				self.sectionTemplate = $(self.section).append( responsePage )
																							.find( self.sectionContent )
																							.addClass("in");
				
				self.sectionData = window.sectionData || {};
				self.sectionUpdate();

			}, 400)
			
			preLoader.preImg( $(self.sectionTemplate).find("img") );
			

			if( typeof func == "function" ) func();
		},
		sectionUpdate: function() {
			$(".active-menu-num").text( pageInf.menuActive() );
			$("#page", "#sectionContent").addClass("in");
			$("#sectionContent").addClass("active");
			menuBorder();
		}

	}
























	function bgLineAnimation( bool ) {
		if ( $(".bg-lines").length )
			bool ? 
				$(".bg-lines").addClass("in").removeClass("out") 
			: 		 
				$(".bg-lines").addClass("out").removeClass("in");
	}
	
	

	function menuBorder(){

		var menu = 				$(".menu-list"),
				border = 			$(".menu-border"),
				menuItem = 		menu.find("li"),
				lineItem = 		border.find(".line-item");

		function moveBorder(li){
			if(!li)
				return;

			var liWidth = li.outerWidth(true),
					liPos = 	li.position().left;

			lineItem.css( {
				"width": liWidth,
				"left": liPos
			});
		}
		function activeBorder(){

			moveBorder( menu.find(".router-link-active") )

		}

		activeBorder();
		lineItem.addClass("router-link-active");


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

