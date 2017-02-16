;(function($) {

	"use strict";

	var jPM = $.jPanelMenu({
	 	menu: '#site-navigation',
	 	trigger: '.nav-toggle',
	 	duration: 300,
	 	direction: 'right'
	 }),
		win = $(window),
		body = $('body'),
		winHeight = win.height(),
		header = $('#masthead'),
		transparentHeader = header.hasClass('transparent-header'),
		revsliderWrapper = header.next('.revslider-wrapper'),
		gravitySlider = header.next('.gravity-slider'),
		gravitySlider = body.find('.gravity-slider'), 
		mainContent = $('div[role="main"]'),
		mainHeader = $('#main-header'),
		logoHeight = mainHeader.data('logo-height'),
		topHeader = $('#top-header'),
		navHeader = topHeader.find('.nav-header'),
		headerLayout = header.data('header-layout'),
		mainNavigation = $('#site-navigation'),
		mainNavbar = mainNavigation.find('.navbar'),
		navbar = $('.navbar'),
		pageHeader = $('#page-header'),
		shareButtons = $('.share-buttons'),
		shareButtonsItems = shareButtons.find('li').css({'opacity': '0', 'right' : '-60px'}),
		isSearchButton = (0 === mainNavigation.data('search-button')) ? false : true,
		scrollTop = $('#scroll-top'),
		cookieWrapper = $('#cookie-wrapper'),
		hasAnimation = $('.has-animation'),
		parallaxItem = $('.has-parallax'),
		masonryWrapper = $('.masonry'),
		alerts = $('.alert'),
		tabs = $('.tab-wrapper'),
		accordions = $('.panel-group'),
		googleMap = $('.google-map-wrapper'),
		videoBGItem = $('.video-bg'),
		lightbox = $('.popup'),
		banner = $('.banner'),
		flexGallery = $('.flex-gallery'),
		mfGallery = $('.mf-gallery'),
		carouselItem = $('.carousel'),
		progressWrapper = $('.progress-wrapper'),
		counterItem = $('.counter'),
		chart = $('.chart');

	body.addClass('js');

	// IE detection
	var msie = window.navigator.userAgent.indexOf("MSIE ");
	if(msie > 0) {
		body.addClass('ie');
	}

	/**
	 * Breakpoints
	 * ------------------------------------------------------------------------
	 */
	var jRes = jRespond([
		{
			label: 'small',
			enter: 0,
			exit: 768
		}, {
			label: 'medium',
			enter: 768,
			exit: 10000
		}
	]);

	jRes.addFunc({
		breakpoint: 'small',
		enter: function() {
			jPM.on();
			$('.navbar-secondary').clone().appendTo($('#jPanelMenu-menu'));
			$('.menu-item-has-children > a').on('click', function(e) {
				var $this = $(this);
				e.preventDefault();
				$this.toggleClass('active').next('ul').toggleClass('active');
				if($this.parent().hasClass('mega-menu')) {
					$this.next('ul').find('ul').toggleClass('active');
				}
			});
			body.addClass('mobile');
			body.data('device', 'small');
		},
		exit: function() {
			jPM.off();
			body.removeClass('mobile');
		}
	});

	jRes.addFunc({
		breakpoint: 'medium',
		enter: function() {

			navbar.superfish({
				autoArrows: false,
				dropShadows: false,
				disableHI: true,
				delay: 200,
				speed: 'fast',
				speedOut: 'fast',
				animation: { height: 'show', opacity: 'show' },
				animationOut: { height: 'hide', opacity: 'hide' },		
			});

			// Logo Height
			if(logoHeight !== undefined) {
				if(logoHeight > 45) {
					if(headerLayout === 'centered-logo' || headerLayout === 'left-menu') {
						topHeader.css({'height': (logoHeight + 18) + 'px', 'padding-top': '9px'});
					} else {
						var paddingVal = (((logoHeight + 18) - 63) / 2) + 21;
						mainNavbar.find('> li > a').each(function() {
							$(this).css({'padding-top': paddingVal, 'padding-bottom': paddingVal});
						});
						mainHeader.find('.nav-header').css('margin-top', (parseInt(mainHeader.outerHeight() - logoHeight) / 2) + 'px');
						$('.submit-btn').css('height', (logoHeight + 18) + 'px');
					}
				}
			}

			// Center Logo
			if(headerLayout === 'centered-logo') {
				navHeader.css('margin-left', '-' + (navHeader.outerWidth() / 2) + 'px');
			}

			// Cart Nav
			$('.cart-nav-wrapper').css({'height': mainNavigation.outerHeight() + 'px', 'line-height': mainNavigation.outerHeight() + 'px', 'background-position': '8px ' + ((mainNavigation.outerHeight() / 2) - 20) + 'px'});

			// Fixed Navigation
			if(header.hasClass('header-fixed')) {
				var fixedPadding = header.outerHeight(),
					headerTopPadding = parseInt(pageHeader.css('padding-top')) + fixedPadding,
					mainTopPadding = parseInt(mainContent.css('margin-top'));
				if(transparentHeader) {
					pageHeader.css({'padding-top': headerTopPadding + 'px'});
					mainContent.css({'margin-top': '-' + fixedPadding + 'px'});
				} else {
					if(pageHeader.length > 0) {
						var pageHeaderTopPadding = parseInt(pageHeader.css('padding-top'));
						pageHeader.css('padding-top', (fixedPadding + 32) + 'px');
					} else if (revsliderWrapper.length > 0) {
						revsliderWrapper.css('top', fixedPadding + 'px');
					} else if (gravitySlider.length > 0) {
						gravitySlider.css('top', fixedPadding + 'px');
						mainContent.css({'padding-top': fixedPadding + 'px', 'margin-top': 0});
					} else {
						mainContent.css({'padding-top': fixedPadding + mainTopPadding + 'px', 'margin-top': 0});
					}
				}
			}

			// Search Button
			if(isSearchButton) {
				$('.submit-btn').on('click', function(e) {
					e.preventDefault();
					var searchWrapper = $(this).parent().parent().addClass('active'),
						searchInput = searchWrapper.find('input[type="search"]');
					searchInput.attr('placeholder', searchInput.data('text')).focus();
					
					searchInput.animate({ width: '100%' }, '300', function() {
						$(document).on('click', function(e) {
							if( !searchInput.is(e.target) ) {
								searchInput.animate({
									width: '0'},
									'300', function() {
										searchWrapper.removeClass('active');
										searchInput.blur();
										$(document).off('click');
								});
							}

						})
					});
				});
			}

			// Nicescroll
			if(body.data('nicescroll')) {
				$('html').niceScroll({
					cursorwidth: 12,
					cursorborder: 0,
					autohidemode: false
				});
			}

			// WooCommerce Cart
			$('.cart-nav-outer').hover(function() {
				$(this).find('.widget_shopping_cart').stop(true, true).slideDown(300);
			}, function() {
				$(this).find('.widget_shopping_cart').stop(true, true).slideUp(300);
			});

			var productAddedText = '';
			$('.woocommerce .product-wrapper .add_to_cart_button').on('click', function() {
				productAddedText = $(this).parents('.product').find('h3').text();
				$('.add-cart-notification span').html(productAddedText);
				$('.add-cart-notification').fadeIn();
				setTimeout(function() {
					$('.add-cart-notification').stop(true, true).fadeOut();
				}, 2000);
			});

			body.data('device', 'medium');
		},
		exit: function() {
			navbar.superfish('destroy');
			$('.cart-nav-outer').off('hover');
			$('.woocommerce .product-wrapper .add_to_cart_button').off('click');
		}
	});

	// Remove shortcode gallery when slider from gallery is turned on
	// $('article.format-gallery .gallery, #project-body.project-gallery .gallery').remove();
	

	// body.bind('adding_to_cart', shoppingCart);

	// function shoppingCart() {
		// console.log(!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length);
		// console.log($('.has-products'));
		// if(!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length && $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length) {
		// 	body.addClass('has-products');
		// }
	// }
	

	/**
	 * Search
	 * ------------------------------------------------------------------------
	 */
	var search = {

		init: function() {
			if(! isSearchButton) {
				return;
			}
			if($('#jPanelMenu-menu').length) {
				var searchItem = $('<li class="search-item"></li>').append($('.search-wrapper').css('opacity', '1'));
				$('#jPanelMenu-menu #menu-primary-navigation').find('> li:last-child').after(searchItem);
				// var searchWrapper = $('.search-wrapper').clone();
				// var	searchItem = $('<li class="search-item"></li>').append(searchWrapper.css('opacity', '1'));
				// $('#jPanelMenu-menu > #menu-primary-navigation > li:last-child').after(searchItem);
			} else {
				var searchItem = $('<li class="search-item"></li>').append($('.search-wrapper').css('opacity', '1'));
				mainNavbar.find('> li:last-child').after(searchItem);
				var searchInput = $('.search-item').find('input[type="search"]');
			}
		}

	};


	/**
	 * Love Share
	 * ------------------------------------------------------------------------
	 */
	var share = {

		init: function() {

			shareButtons.each(function() {
				var $this = $(this),
					loveShare = $this.find('.love-share a'),
					facebookShare = $this.find('.facebook-share a'),
					twitterShare = $this.find('.twitter-share a'),
					pinterestShare = $this.find('.pinterest-share a'),
					googleShare = $this.find('.googleplus-share a'),
					postID = $this.data('id');

				//Animate buttons
				$this.appear(function() {
					shareButtonsItems.each(function(i) {
						$(this).delay(i * 200).animate({ 'opacity':1, 'right': '0' }, 300, 'easeOutSine');
					});
				}, { accX: 0, accY: -100 }, 'easeInCubic');

				//Love It
				if(loveShare.length) {
					var loveShareTooltip = loveShare.find('.tooltip-data'),
						loveShareTooltipData = loveShare.data('loved');

					if($.cookie('lato_count_love_' + postID) == '1') {
						loveShareTooltip.text(loveShareTooltipData);
					}
					loveShare.on('click', function(e) {

						e.preventDefault();

						var $that = $(this),
							data = {
								action: 'lato-love',
								id: $that.data('id')
							};
						if($.cookie('lato_count_love_' + data.id)) return;

						$.post(Lato.ajaxurl, data, function(response) {
							$that.find('.count').text(response);
							loveShareTooltip.text(loveShareTooltipData);
						});
						$that.addClass('loved');

					});
				}

				//Facebook
				if(facebookShare.length) {

					facebookShare.on('click', function(e) {
						e.preventDefault();

						window.open( 'https://www.facebook.com/sharer/sharer.php?u=' + window.location, 'facebookWindow', 'height=450,width=700,resizable=0,scrollbars=0,toolbar=0,location=0,toolbar=0'  );
					});
				}

				//Twitter
				if(twitterShare.length) {

					twitterShare.on('click', function(e) {
						e.preventDefault();

						window.open( 'http://twitter.com/intent/tweet?text=' + $('.page-header-top h1').text() + ' ' + window.location, 'twitterWindow', 'height=450,width=700,resizable=0,scrollbars=0,toolbar=0,location=0,toolbar=0'  );
					});
				}

				//Google+
				if(googleShare.length) {

					googleShare.on('click', function(e) {
						e.preventDefault();

						window.open( ' https://plusone.google.com/_/+1/confirm?url=' + window.location, 'googleWindow', 'height=450,width=700,resizable=0,scrollbars=0,toolbar=0,location=0,toolbar=0'  );
					});
				}

				//Pinterest
				if(pinterestShare.length) {

					pinterestShare.on('click', function(e) {
						e.preventDefault();

						var projectArticle = $('#project-detail'),
							shareImage = (projectArticle.length && projectArticle.data('featured-image') == 'no') ? projectArticle.data('featured-image') : $('#project-body img').first().data('featured-image');
						window.open( 'http://www.pinterest.com/pin/create/button/?url=' + window.location + '&media=' + shareImage + '&description='+projectArticle.data('title'), "pinterestWindow", "height=450,width=700,resizable=0,scrollbars=0,toolbar=0,location=0,toolbar=0");
					});
				}
			});
		}

	};


	/**
	 * Scroll to Top
	 * ------------------------------------------------------------------------
	 */
	var scrollToTop = {

		init: function() {
			scrollTop.on('click', function(e) {
				e.preventDefault();
				$('body, html').animate({scrollTop: 0}, 500);
			});

			if(win.scrollTop() > 500) {
				scrollToTop.show();
				win.on('scroll', scrollToTop.hide);
			} else {
				scrollToTop.hide();
				win.on('scroll', scrollToTop.show);
			}
		},

		show: function() {
			if(win.scrollTop() > 500) {
				scrollTop.stop(true, true).animate({ 'opacity': 1, 'bottom': '62px' }, 300, 'easeInOutCubic');
				win.off('scroll', scrollToTop.show);
				win.on('scroll', scrollToTop.hide);
			}
		},

		hide: function() {
			if(win.scrollTop() < 500) {
				scrollTop.stop(true, true).animate({ 'opacity': 0, 'bottom': '-30px' }, 300, 'easeInOutCubic');
				win.off('scroll', scrollToTop.hide);
				win.on('scroll', scrollToTop.show);
			}
		}

	};


	/**
	 * Cookies
	 * ------------------------------------------------------------------------
	 */
	var cookies = {

		init: function() {
			cookieWrapper.find('.icon').on('click', function(e) {
				e.preventDefault();
				
				var expire = new Date(),
				cookieTime = parseInt(cookieWrapper.data('cookie-time'), 10);
				expire.setTime(new Date().getTime()+(1000*60*60*24*cookieTime));
				document.cookie = "lato-visited-settings=yes; expires=" + expire.toGMTString();
				
				cookieWrapper.css('display', 'none');
			});
		}

	};


	/**
	 * Animation
	 * ------------------------------------------------------------------------
	 */
	var animation = {

		init: function() {

			hasAnimation.each(function() {
				var $this = $(this),
					$animation = $this.data('animation'),
					$delay = $this.data('delay'),
					$speed = $this.data('speed'),
					$align = $this.data('align'),
					$alignV = $this.data('align-v'),
					$defaults = {
						animation: 'fade-from-right',
						speed: 800,
						delay: 0
					};

				var $options = $.extend({}, $defaults, {
					animation: $animation,
					speed: $speed,
					delay: $delay
				});

				$this.appear(function() {
					if('fade-from-right' == $options.animation) {
						if('left' == $align && $this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'left': '10%'
							}, $options.speed, 'easeOutSine');
						} else if($this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'right': '10%'
							}, $options.speed, 'easeOutSine');
						} else {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'right': 0
							}, $options.speed, 'easeOutSine');
						}	
					}else if('fade-from-left' == $options.animation) {
						if('right' == $align && $this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'right': '10%'
							}, $options.speed, 'easeOutSine');
						} else if($this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'left': '10%'
							}, $options.speed, 'easeOutSine');
						} else {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'left': 0
							}, $options.speed, 'easeOutSine');
						}
					}else if('fade-from-top' == $options.animation) {
						if('bottom' == $alignV && $this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'bottom': '15px'
							}, $options.speed, 'easeOutSine');
						} else if($this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'top': '15px'
							}, $options.speed, 'easeOutSine');
						} else {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'top': 0
							}, $options.speed, 'easeOutSine');
						}
					}else if('fade-from-bottom' == $options.animation) {
						if('top' == $alignV && $this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'top': '15px'
							}, $options.speed, 'easeOutSine');
						} else if($this.hasClass('banner-inner')) {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'bottom': '15px'
							}, $options.speed, 'easeOutSine');
						} else {
							$this.stop().delay($options.delay).animate({
								'opacity': 1,
								'bottom': 0
							}, $options.speed, 'easeOutSine');
						}
					}else if('grow-in' == $options.animation) {
						$this.stop().delay($options.delay).transition({
							'opacity': 1,
							'scale': 1
						}, $options.speed, 'easeOutSine');
					}else if('flip-vertical' == $options.animation) {
						$this.addClass('start-animation');
					}else if('flip-horizontal' == $options.animation) {
						$this.addClass('start-animation');
					}
				}, { accX: 0, accY: -100 }, 'easeInCubic');
			});
		}

	};


	/**
	 * Parallax
	 * ------------------------------------------------------------------------
	 */
	$.fn.parallax = function() {
		var $this = $(this),
			initTop;

		$this.each(function() {
			initTop = $this.offset().top;
		});

		win.on('load resize', function() {
			$this.each(function() {
				initTop = $this.offset().top;
			});
		});

		function getHeight(el) {
			return el.outerHeight();
		}

		function update() {
			var pos = win.scrollTop();

			$this.each(function() {
				var $el = $(this),
					top = $el.offset().top,
					height = getHeight($el);

				if ( top + height < pos || top > pos + winHeight ) {
					return;
				}

				$this.css('backgroundPosition', '50%' + ' ' + Math.round((initTop - pos) * .2) + 'px');
			});
		}

		win.on('scroll resize', update);
		update();
	}

	var parallax = {

		init: function() {
			var scrollTop = win.scrollTop();

			parallaxItem.each(function() {
				$(this).parallax();
			});

			// $win.on('scroll', parallax.projectParallax);			
		},

		projectParallax: function() {
			$('.project-images-section, .parallax-img').transition({y: $win.scrollTop()*-.2},0);
		}

	};


	/**
	 * Isotope/Masonry
	 * ------------------------------------------------------------------------
	 */
	
	var isotopeObj = {

		init: function() {

			var masonryLayout = 'masonry' === masonryWrapper.data('layout') ? true : false,
				options = {};

			var portfolioFilterList = $('#filters'),
				portfolioFilterTop = portfolioFilterList.parent().prev('h4'),
				portfolioFilterLink = portfolioFilterList.find('a');

			portfolioFilterList.children('li').first().find('a').addClass('selected');

			if( masonryLayout ) {
				options = {
					itemSelector: '.masonry-item',
					resizable: false,
					animationOptions: {
						queue: true
					},
					masonry: {
						columnWidth: masonryWrapper.find('.masonry-item')[0]
					}
				}
			} else {
				options = {
					itemSelector: '.masonry-item',
					layoutMode: 'fitRows',
					resizable: false,
					animationOptions: {
						queue: true
					},
				}
			}
						
			masonryWrapper.imagesLoaded(function() {
				masonryWrapper.isotope(options);
			});

			portfolioFilterLink.on('click', function(e) {
				e.preventDefault();

				var $this = $(this);

				if($this.hasClass('selected')) {
					return false;
				}

				portfolioFilterList.find('.selected').removeClass('selected');
				$this.addClass('selected');
				portfolioFilterTop.html($this.text());

				var filters = $this.attr('data-filter');

				masonryWrapper.isotope( { 
					filter: filters
				});

			});
		},

	};


	/**
	 * Fluid Video
	 * ------------------------------------------------------------------------
	 */

	var video = {

		init: function() {

			var videos = $("iframe[src^='http://www.youtube.com'], iframe[src^='http://player.vimeo.com'], iframe[src^='//player.vimeo.com'], object, embed"),
				iframe = $("iframe[src^='http://www.youtube.com']");

			videos.each(function() {
				var $this = $(this),
				aspectRatio = $this.attr('height') / $this.attr('width') * 100;
				if(aspectRatio !== 56.25) {
					$this.parent('.video-inner').css('padding-bottom', aspectRatio + '%');
				}

			});

			iframe.each(function() {
				var $this = $(this),
					url = $this.attr('src');
				$this.attr('src', url + '&wmode=transparent');
			});

		}

	};


	/**
	 * Alert
	 * ------------------------------------------------------------------------
	 */
	var alert = {

		init: function() {
			alerts.each(function() {
				
				var $this = $(this);

				$this.find('.close').on('click', function() {
					$this.slideUp(300, 'easeOutCubic');
				});

			});
		}

	};


	/**
	 * Tab
	 * ------------------------------------------------------------------------
	 */
	
	var tab = {

		init: function() {

			tabs.each(function() {

				$(this).tabs({active: 0});
			});
		}
	};


	/**
	 * Accordion
	 * ------------------------------------------------------------------------
	 */
	
	var accordion = {

		init: function() {

			accordions.each(function() {
				var $this = $(this),
					activePanel = parseInt($this.data('active'), 10),
					collapse = (true == $this.data('collapsible')) ? true : false;

				$this.accordion({
					header: '.panel-heading',
					heightStyle: 'content',
					active: activePanel,
					collapsible: collapse
				});
			});
		}
	};


	/**
	 * Google Map
	 * ------------------------------------------------------------------------
	 */
	var map = {

		init: function() {
			googleMap.each(function(i, el) {
				var mapContainer = $(this),
					mapLat = mapContainer.data('lat'),
					mapLong = mapContainer.data('long'),
					mapHeight = mapContainer.data('height'),
					mapZoom = mapContainer.data('zoom'),
					mapType = mapContainer.data('type'),
					markerLat = mapContainer.data('marker-lat'),
					markerLong = mapContainer.data('marker-long'),
					zoomIn = mapContainer.data('zoom-in'),
					marker = mapContainer.data('marker'),
					marker1 = [],
					marker2 = [],
					marker3 = [],
					marker4 = [],
					marker5 = [],
					markers = [],
					markerImage = mapContainer.data('marker-image'),
					marker2Lat = mapContainer.data('marker2-lat'),
					marker2Long = mapContainer.data('marker2-long'),
					marker3Lat = mapContainer.data('marker3-lat'),
					marker3Long = mapContainer.data('marker3-long'),
					marker4Lat = mapContainer.data('marker4-lat'),
					marker4Long = mapContainer.data('marker4-long'),
					marker5Lat = mapContainer.data('marker5-lat'),
					marker5Long = mapContainer.data('marker5-long'),
					mapTypeIdentifier = '';

				if(mapType === 'map') {
					mapTypeIdentifier = google.maps.MapTypeId.ROADMAP;
				} else if(mapType === 'satellite') {
					mapTypeIdentifier = google.maps.MapTypeId.SATELLITE;
				} else if(mapType === 'terrain') {
					mapTypeIdentifier = google.maps.MapTypeId.TERRAIN;
				} else if(mapType === 'hybrid') {
					mapTypeIdentifier = google.maps.MapTypeId.HYBRID;
				}

				zoomIn = ('yes' === zoomIn || 1 === zoomIn) ? true : false;

				var ltnlng = new google.maps.LatLng(mapLat, mapLong);
				var settings = {
					zoom: parseInt(mapZoom, 10),
					center: ltnlng,
					mapTypeId: mapTypeIdentifier,
					zoomControl: zoomIn,
					scrollwheel: false,
					panControl: false,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.LARGE,
				    	position: google.maps.ControlPosition.LEFT_CENTER
				   	},
				};
				var mapInstance = new google.maps.Map(el, settings);
				var companyPos = new google.maps.LatLng(markerLat, markerLong);

				if(marker && ('image' === marker || 'default' === marker) && '' !== markerLat && '' !== markerLong) {
					if( 'image' === marker && '' !== markerImage) {
						markerImage = markerImage;
					} else {
						markerImage = null;
					}

					var markerAnimation = null;
					if('yes' === mapContainer.data('marker-animation')) {
						markerAnimation = google.maps.Animation.DROP;
					}

					marker1 = [parseFloat(markerLat), parseFloat(markerLong), 5];

					if(marker2Lat && marker2Long) {
						marker2 = [parseFloat(marker2Lat), parseFloat(marker2Long), 4];
					} else {
						marker2 = null;
					}

					if(marker3Lat && marker3Long) {
						marker3 = [parseFloat(marker3Lat), parseFloat(marker3Long), 3];
					} else {
						marker3 = null;
					}

					if(marker4Lat && marker4Long) {
						marker4 = [parseFloat(marker4Lat), parseFloat(marker4Long), 2];
					} else {
						marker4 = null;
					}

					if(marker5Lat && marker5Long) {
						marker5 = [parseFloat(marker5Lat), parseFloat(marker5Long), 1];
					} else {
						marker5 = null;
					}

					markers = [marker1, marker2, marker3, marker4, marker5];

					for(var i = 0; i < markers.length; i++) {
						if(markers[i]) {
							var markerArr = markers[i],
								markerLatLong = new google.maps.LatLng(markerArr[0], markerArr[1]),
								markerMap = new google.maps.Marker({
									position: markerLatLong,
									map: mapInstance,
									icon: markerImage,
									animation: markerAnimation,
									zIndex: markerArr[2],
								});
						}
					}

					if(typeof gravityMap !== 'undefined') {
						
						var infowindow = new google.maps.InfoWindow({
							content: gravityMap.infowindow,
							maxWidth: 300
						});

						google.maps.event.addListener(markerMap, 'click', function() {
							infowindow.open(mapInstance, markerMap);
							
						});
					}

				}


				$(mapContainer).css('height', mapHeight + 'px');
			});
		}
	};


	/**
	 * Video Background
	 * ------------------------------------------------------------------------
	 */
	var videoBG = {

		init: function() {

			videoBGItem.mediaelementplayer({				
				enableKeyboard: false,
				iPadUseNativeControls: false,
			    iPhoneUseNativeControls: false,
			    AndroidUseNativeControls: false,
				pauseOtherPlayers: false
			});

			setTimeout(function() {
				videoBG.resizeVideo();
				$('.video-color-overlay').each(function() {
					$(this).css('background-color', $(this).data('color'));
				});
				$('.video-wrapper').animate({
					'opacity' : '1'
				}, 800);
			}, 400);

			win.on('resize', videoBG.resizeVideo);
		},

		resizeVideo: function() {
			var minWidth = 1200,
				videoWidth = 1280,
				videoHeight = 720;

			$('.video-wrapper').each(function() {
				var $this = $(this),
					video = $this.find('video'),
					rowHeight = $this.parent('.section').outerHeight(),
					rowWidth = $this.parent('.section').outerWidth(),
					scaleWidth = rowWidth / videoWidth,
					scaleHeight = rowHeight / videoHeight,
					scale = scaleHeight > scaleWidth ? scaleHeight : scaleWidth;
				
				$this.width(rowWidth);
				$this.height(rowHeight);

				minWidth = 1280 / 720 * (rowHeight + 40);
				if(scale * videoWidth < minWidth) {
					scale = minWidth / videoWidth;
				}
				video
					.width(Math.ceil(scale * videoWidth + 20))
					.height(Math.ceil(scale * videoHeight + 20));

				$this.scrollLeft((video.width() - rowWidth) / 2);
				$this.scrollTop((video.height() - rowHeight) / 2);

			});

		}

	};


	/**
	 * Sliders
	 * ------------------------------------------------------------------------
	 */
	var sliders = {

		init: function() {
			flexGallery.each(function() {
				
				var $this = $(this),
					autoplay = ($this.data('autoplay')) ? true : false,
					interval = ($this.data('interval')) ? parseInt($this.data('interval')) : 7000,
					speed = ($this.data('speed')) ? parseInt($this.data('speed')) : 600,
					effect = ($this.data('effect')) ? $this.data('effect') : 'fade';

				imagesLoaded($this, function(instance) {
					$this.flexslider({
						animation: effect,
						slideshow: autoplay,
						slideshowSpeed: interval,
						animationSpeed: speed,
						controlNav: false,
						smoothHeight: true,
						useCSS: false,
					});

					$this.find('.flex-prev').html('<span class="icon icon-angle-left"></span>');
					$this.find('.flex-next').html('<span class="icon icon-angle-right"></span>');
				});

			});
		}

	};


	/**
	 * Lightboxes
	 * ------------------------------------------------------------------------
	 */
	var lightboxes = {

		init: function() {
			var popupType = (lightbox.hasClass('popup-image')) ? 'image' : 'inline';
			lightbox.magnificPopup({
				type: popupType,
				closeBtnInside: true
			});
		}

	};


	/**
	 * Magnific Gallery
	 * ------------------------------------------------------------------------
	 */
	var galleries = {

		init: function() {
			mfGallery.each(function() {
				var $this = $(this);

				$this.magnificPopup({
					type: 'image',
					delegate: 'a',
					gallery: {
						enabled: true
					},
					closeBtnInside: true
				});
			});
		}

	};


	/**
	 * Banners
	 * ------------------------------------------------------------------------
	 */
	var banners = {

		init: function() {
			banner.each(function() {
				var $this = $(this);

				$this.find('.banner-center').each(function() {
					var $this = $(this),
						offset = ($this.parent().outerHeight() - $this.outerHeight()) / 2;
					$this.css('top', offset + 'px');
				});

				$('.banner.has-animation').each(function() {
					var $this = $(this);

					$this.appear(function() {
						$this.addClass('start-animation');
					}, { accX: 0, accY: -100 });
				});
			});
		}
	};


	/**
	 * Gravity Slider
	 * ------------------------------------------------------------------------
	 */
	var gtSlider = {

		init: function() {
			gravitySlider.each(function() {
				var $this = $(this),
					autoplay = ($this.data('autoplay')) ? true : false,
					interval = ($this.data('interval')) ? parseInt($this.data('interval')) : 7000,
					speed = ($this.data('speed')) ? parseInt($this.data('speed')) : 600,
					effect = ($this.data('effect')) ? $this.data('effect') : 'fade';

				imagesLoaded($this, function(instance) {
					$this.flexslider({
						animation: effect,
						slideshow: autoplay,
						slideshowSpeed: interval,
						animationSpeed: speed,
						directionNav: ($this.data('arrows')) ? $this.data('arrows') : false,
						controlNav: ($this.data('bullets')) ? $this.data('bullets') : false,
						smoothHeight: true,
						useCSS: false,
						start: function() {
							// if($('.flex-active-slide').find('video').length > 0) {
							// 	$('.flex-active-slide video').on('load', function() {
							// 		console.log('lola');
							// 		$this.find('.loader').removeClass('loader');
							// 	});
							// } else {
								$this.find('.loader').removeClass('loader');
							// }
							$this.find('.flex-active-slide .slide-content > h2, .flex-active-slide .slide-content > p, .flex-active-slide .slide-content > .slide-buttons').delay(200).animate({
								paddingTop: '0',
								opacity: '1'},
								'400');
						},
						after: function() {
							$this.find('.flex-active-slide .slide-content > h2, .flex-active-slide .slide-content > p, .flex-active-slide .slide-content > .slide-buttons').delay(200).animate({
								paddingTop: '0',
								opacity: '1'},
								'400');
							$this.find('.slide-item').not('.flex-active-slide').find('.slide-content > h2, .slide-content > p, .slide-content > .slide-buttons').css({paddingTop: '30px', opacity: '0'});
						}
					});

					$this.find('.flex-prev').html('<span class="icon icon-angle-left"></span>');
					$this.find('.flex-next').html('<span class="icon icon-angle-right"></span>');
				});
					
				$this.find('.slide-content-middle').each(function() {
					var $that = $(this),
						heading = $that.children('h2'),
						caption = $that.children('p'),
						buttons = $that.children('.slide-buttons'),
						headingHeight = ( heading.length > 0 ) ? heading.outerHeight() - 30 : 0,
						captionHeight = ( caption.length > 0 ) ? caption.outerHeight() - 30 : 0,
						buttonsHeight = ( buttons.length > 0 ) ? buttons.outerHeight() - 30 : 0,
						offset = ($that.parent().parent().outerHeight() - (headingHeight + captionHeight + buttonsHeight)) / 2;
					$that.css('top', offset + 'px');
				});

			});
		}
	};


	/**
	 * Carousel
	 * ------------------------------------------------------------------------
	 */
	var carousel = {

		init: function() {

			carouselItem.each(function() {
				var $this = $(this),
					columns = $this.data('max') || 3,
					speed = $this.data('speed') || 600,
					duration = $this.data('duration') || 2500,
					easingFunc = $this.data('easing') || 'easeOutSine',
					play = ('auto' === $this.data('autoplay') ) ? true : false,
					fx = ('scroll' === $this.data('effect') ) ? 'scroll' : 'fade',
					scrollItems = $this.data('scroll-items') || 3,
					next = $this.parents('.carousel-wrapper').find('.carousel-next'),
					prev = $this.parents('.carousel-wrapper').find('.carousel-prev');

				imagesLoaded($this, function() {
					$this.carouFredSel({
						responsive: true,
						items: {
							width: 150,
							visible: {
								min: 1,
								max: columns
							}
						},
						scroll: {
							items: scrollItems,
							easing: easingFunc,
							duration: speed,
							fx: fx,
							pauseOnHover: true
						},
						auto: {
							play: play,
							timeoutDuration: duration
						},
						swipe: {
							onTouch: true
						},
						next: next,
						prev: prev,
					});
				}); //end imagesLoaded
			});
		}

	};


	/**
	 * Progress Bar
	 * ------------------------------------------------------------------------
	 */
	var progressBar = {

		init: function() {
			progressWrapper.find('.progress-bar').width(0);

			progressWrapper.each(function() {
				var $this = $(this),
					bar = $this.find('.progress-bar'),
					amount = bar.data('amount');

				$this.appear(function() {
					bar.animate({
						width: amount + '%'
					}, 800, 'easeOutSine');
				}, { accX: 0, accY: -100 });
			});
		}

	};


	/**
	 * Counter
	 * ------------------------------------------------------------------------
	 */
	$.fn.countTo = function(options) {

		if(this.length == 0) {
			return;
		}
		var self = this;
		self.options = {};
		jQuery.extend(true, self.options, {
			interval: 50,
			from: 10,
			to: 0,
			onLoop: function(self, current, loop) {
				$(self).text(current);
			},
			onStart: function(self) {},
			onFinish: function(self, current, loop) {}
		}, options);

		self.current = self.options.from;
		self.direction = self.options.from > self.options.to ? true : false;
		self.loop = 0;
		self.finished = false;

		self.timer = function(self) {
			self.intervalId = setInterval(self._interval, self.options.interval)
		}

		self._interval = function() {
			self.options.onLoop(self, self.current, self.loop);
			if(self.direction) {
				if(self.current > self.options.to) {
					self.current--;
				}else{
					self.finished = true;
				}
			}else{
				if(self.current < self.options.to) {
					self.current++;
				}else{
					self.finished = true;
				}
			}
			if(self.finished) {
				clearInterval(self.intervalId);
				self.options.onFinish(self, self.current, self.loop)
			}
			self.loop++;
		}

		self.start = function(self) {
			self.options.onStart(self);
			self.timer(self);
		}

		self.start(self);
	}

	var counter = {

		init: function() {

			counterItem.each(function() {
				var $this = $(this).text('0'),
					from = $this.data('from'),
					to = $this.data('to');

				$this.appear(function() {
					$this.countTo({
						from: from,
						to: to
					});
				}, { accX: 0, accY: -100 });
			});
		}

	};


	/**
	 * Pie Chart
	 * ------------------------------------------------------------------------
	 */
	var pieChart = {

		init: function() {

			chart.each(function() {
				var $this = $(this),
					color = $this.data('color'),
					trackColor = '#eaeaea';

				$this.appear(function() {
					$this.easyPieChart({
						barColor: color,
						trackColor: trackColor,
						lineWidth: 6,
						size: 120,
						lineCap: 'butt',
						scaleColor: false
					});
				}, { accX: 0, accY: -100 });
			});
		}

	};


	/**
	 * Init Functions
	 * ------------------------------------------------------------------------
	 */
	var onReady = {

		init: function() {
			search.init();
			if(shareButtons.length) {
				share.init();
			}
			if(document.cookie.indexOf("lato-visited-settings") < 0 && cookieWrapper.length) {
				cookies.init();
			}
			if(hasAnimation.length) {
				animation.init();
			}
			if(parallaxItem.length) {
				parallax.init();
			}
			video.init();
			if(alerts.length) {
				alert.init();
			}
			if(videoBGItem.length) {
				videoBG.init();
			}
			if(lightbox.length) {
				lightboxes.init();
			}
			if(mfGallery.length) {
				galleries.init();
			}
			if(banner.length) {
				banners.init();
			}
			if(flexGallery.length) {
				sliders.init();
			}
			if(gravitySlider.length) {
				gtSlider.init();
			}
			if(carouselItem.length) {
				carousel.init();
			}
			if(tabs.length) {
				tab.init();
			}
			if(accordions.length) {
				accordion.init();
			}
			if(progressWrapper.length) {
				progressBar.init();
			}
			if(counterItem.length) {
				counter.init();
			}
			if(chart.length) {
				pieChart.init();
			}
			$('.widget > ul > li').has('> .children').css('border-bottom', 'none');
		}

	}

	var onLoad = {
		init: function() {
			if(masonryWrapper.length) {
				isotopeObj.init();
			}
			if(scrollTop.length) {
				scrollToTop.init();
			}
			if(googleMap.length) {
				map.init();
			}
		}
	};


	$(document).ready(onReady.init);
	win.ready(onLoad.init);

}(jQuery));