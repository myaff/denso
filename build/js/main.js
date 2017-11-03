var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/calvin-klein/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Togglers = __webpack_require__(2);
	var Carousel = __webpack_require__(3);
	var Modal = __webpack_require__(4);
	var Anchor = __webpack_require__(5);
	//let Input = require("./components/input");
	//let Select = require("./components/select");
	var Animation = __webpack_require__(6);
	var Test = __webpack_require__(7);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Togglers.init();
	  //Carousel.init();
	  Modal.init();
	  //Anchor.init();
	  //Input.init();
	  //Select.init();

	  $('.water-back, .water-front').each(function () {
	    //let img = $(this).children('img');
	    $(this).wrapInner('<div class="hexagon-outer"><div class="hexagon-1"><div class="hexagon-2"><div class="hexagon-3"><div class="hexagon-4"><div class="hexagon-5"></div></div></div></div></div></div>');
	  });

	  Animation.init();
	  Test.init();
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Togglers: Togglers,
	  //Carousel,
	  Modal: Modal,
	  //Anchor,
	  Animation: Animation,
	  Test: Test
	  //Input,
	  //Select
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	    sm: 576,
	    md: 768,
	    lg: 992,
	    xl: 1200
	};

	function isMobile() {
	    return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	    return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isTouch() {
	    return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	    return !!~window.location.href.indexOf('/mobile/');
	}
	function isClipPathSupport() {

	    var base = 'clipPath',
	        prefixes = ['webkit', 'moz', 'ms', 'o'],
	        properties = [base],
	        testElement = document.createElement('testelement'),
	        attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

	    // Push the prefixed properties into the array of properties.
	    for (var i = 0, l = prefixes.length; i < l; i++) {
	        var prefixedProperty = prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
	        properties.push(prefixedProperty);
	    }

	    // Interate over the properties and see if they pass two tests.
	    for (var i = 0, l = properties.length; i < l; i++) {
	        var property = properties[i];

	        // First, they need to even support clip-path (IE <= 11 does not)...
	        if (testElement.style[property] === '') {

	            // Second, we need to see what happens when we try to create a CSS shape...
	            testElement.style[property] = attribute;
	            if (testElement.style[property] !== '') {
	                return true;
	            }
	        }
	    }

	    return false;
	};

	function run() {
	    if (isTouch()) {
	        $('html').removeClass('no-touch').addClass('touch');
	    } else {
	        $('html').removeClass('touch').addClass('no-touch');
	    }
	    if (!isClipPathSupport()) {
	        $('html').addClass('no-clip-path');
	    }
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isMobileVersion: isMobileVersion, isClipPathSupport: isClipPathSupport };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Togglers
	 */

	function toggleClassIf(el, cond, toggledClass) {
		if (cond) {
			el.addClass(toggledClass);
		} else {
			el.removeClass(toggledClass);
		}
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
		var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

		if (el.length == 0) {
			//console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
			return false;
		}

		if (scrollValue == 'this') {
			scrollValue = el.offset().top - $(window).outerHeight() / 2;
		}

		$(window).on('scroll', function (e) {
			if ($(window).scrollTop() > scrollValue) {
				el.addClass(toggledClass);
			} else {
				el.removeClass(toggledClass);
			}
		});
	};

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Togglers.init();
	 */
	function init() {

		//toggleElementClassOnScroll($('.header'), $(window).outerHeight() / 3);

	}

	module.exports = { init: init, toggleClassIf: toggleClassIf, toggleElementClassOnScroll: toggleElementClassOnScroll };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Карусель
	 * @module Carousel
	 */

	/**
	 * Инициализация карусели
	 */
	function init() {
	  var carouselHome = $(".owl-carousel.carousel--home");
	  var carouselDefault = $(".owl-carousel.carousel--default");

	  carouselHome.owlCarousel({
	    items: 1,
	    nav: true,
	    navText: ['', ''],
	    dots: false,
	    loop: true,
	    autoplay: true,
	    autoplayTimeout: 3000,
	    lazyLoad: true,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	  carouselDefault.owlCarousel({
	    items: 1,
	    nav: true,
	    navText: ['', ''],
	    dots: false,
	    loop: true,
	    lazyLoad: true,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Всплывающие окна
	 * @module Modal
	 */

	var layout = $('.layout');
	var modalWrapperClass = '.modal__wrapper';
	//let modalWrapper = $('.modal__wrapper');

	function openModal(modal) {
	  var isFullscreen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var modalWrapper = modal.closest(modalWrapperClass);
	  modalWrapper.removeClass('invisible');
	  modal.removeClass('invisible');
	  var wrapperClasses = 'is-opened';
	  if (isFullscreen) {
	    wrapperClasses += ' is-fullscreen';
	  }
	  layout.addClass('modal-open');
	  modalWrapper.addClass(wrapperClasses);
	  modal.addClass('is-opened');
	  modal.trigger('opened');
	  $('html, body').css('overflow-y', 'hidden');
	}

	function closeModal(modal) {
	  var openNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var modalWrapper = modal.closest(modalWrapperClass);
	  modal.removeClass('is-opened');
	  modal.trigger('closed');
	  if (!openNext) {
	    layout.removeClass('modal-open');
	    modalWrapper.removeClass('is-opened is-fullscreen');
	    $('html, body').css('overflow-y', '');
	  }
	  setTimeout(function () {
	    modal.addClass('invisible');
	    modalWrapper.addClass('invisible');
	  }, 300);
	}

	/**
	 * инициализация событий для всплывающих окон
	 * @example
	 * Modal.init();
	 */
	function init() {

	  $('.js-modal').click(function (e) {
	    e.preventDefault();
	    var target = $(this).attr('data-target');
	    var modal = $(target);
	    var isFullscreen = modal.attr('data-fullscreen') !== undefined;
	    if (!modal.hasClass('is-opened')) {
	      openModal(modal, isFullscreen);
	    } else {
	      closeModal(modal);
	    }
	  });

	  function openModalHash() {
	    var hash = ['competition'],
	        isFullscreen = void 0,
	        modal = void 0,
	        i = void 0;

	    for (i = 0; i < hash.length; i++) {
	      if ('#' + hash[i] == window.location.hash && $('#' + hash[i]).length) {
	        modal = $('#' + hash[i]);
	        isFullscreen = modal.attr('data-fullscreen') !== undefined;

	        openModal(modal, isFullscreen);
	      }
	    }
	  }

	  openModalHash();
	}

	module.exports = { init: init, openModal: openModal, closeModal: closeModal };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Anchor scrolling
	 * @module Anchor
	 */

	function scrollToAnchor(newpos) {
	  TweenMax.to(window, 0.5, { scrollTo: { y: newpos, offsetY: 200 } });
	}

	/**
	 * инициализация событий якорного меню
	 * @example
	 * Anchor.init();
	 */
	function init() {

	  $('.js-anchor').click(function (e) {
	    var id = $(this).attr('href');
	    var scrollToID = id + '-title';
	    if (!!$(this).closest('.modal')) {
	      Main.Modal.closeModal($(this).closest('.modal'));
	    }
	    if ($(id).length > 0 && $(scrollToID).length > 0) {
	      e.preventDefault();

	      setTimeout(scrollToAnchor, 400, scrollToID);
	      ;

	      //if (window.history && window.history.pushState) {
	      //  history.pushState("", document.title, id);
	      //}
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	var endEvent = 'animationend';

	function testAnimation(el) {
	  var isCorrect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	  this[0] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var gazStation = el.find('.gaz-station');
	    var smokeBack = el.find('.smoke-back');
	    var smokeFront = el.find('.smoke-front');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(gazStation, 1, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(smokeBack, 2, { scale: 0 }, { scale: 1 }, 2.75);
	    tl.fromTo(smokeFront, 2, { scale: 0 }, { scale: 1 }, '-=1.5');
	  };
	  this[1] = function () {
	    var tl = new TimelineMax();
	    var tlFlippers = new TimelineMax({ delay: 3.15, repeat: 8, yoyo: true });
	    var tlSparks = new TimelineMax({
	      delay: 4.9,
	      repeat: 17,
	      yoyo: true,
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var waterBack = el.find('.water-back img');
	    var waterFront = el.find('.water-front img');
	    var flipperLeft = el.find('.flipper-left');
	    var flipperRight = el.find('.flipper-right');
	    var bubbles = el.find('.bubbles');
	    var tube = el.find('.tube');
	    var smoke = el.find('.smoke');
	    var sparks = el.find('.sparks');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(waterBack, 0.9, { x: 100, y: 500, ease: 'easeInOut' }, { x: 0, y: 0 }, 1.5);
	    tl.fromTo(waterFront, 0.9, { x: 100, y: 500, ease: 'easeInOut' }, { x: 0, y: 0 }, 1.5);
	    tl.fromTo(bubbles, 1, { scale: 0, x: 50, y: 200 }, { scale: 1, x: 0, y: 0 }, 1.5);
	    tl.fromTo(tube, 0.3, { scale: 0 }, { scale: 1 }, 2.6);
	    tl.fromTo(flipperLeft, 0.25, { scale: 0 }, { scale: 1 }, 2.9);
	    tl.fromTo(flipperRight, 0.25, { scale: 0 }, { scale: 1 }, 3.15);
	    tl.fromTo(sparks, 0.2, { opacity: 0 }, { opacity: 1 }, 4.9);
	    tl.fromTo(smoke, 1.66, { scale: 0 }, { scale: 1 }, 4.9);
	    tlFlippers.fromTo(flipperLeft, 0.5, { skewX: '-5deg', skewY: '-5deg', rotationX: 0, transformOrigin: "50% 50%" }, { skewX: '10deg', skewY: '-5deg', rotationX: 30, ease: Power1.easeIn }, 'flipper');
	    tlFlippers.fromTo(flipperRight, 0.5, { skewX: '-10deg', skewY: '5deg', rotationX: 0, transformOrigin: "50% 50%" }, { skewX: '5deg', skewY: '5deg', rotationX: 20, ease: Power1.easeOut }, 'flipper');
	    tlSparks.fromTo(sparks, 0.05, { x: 0, y: 0 }, { x: 20, y: 20 }).to(sparks, 0.05, { x: 20, y: 0 });
	  };
	  this[2] = function () {
	    var tl = new TimelineMax();
	    var tlSpark = new TimelineMax({
	      delay: 3.7,
	      repeat: 50,
	      yoyo: true,
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var bubbleBig = el.find('.bubble-big');
	    var bubbleMedium = el.find('.bubble-medium');
	    var bubbleSmall = el.find('.bubble-small');
	    var plug = el.find('.plug');
	    var spark = el.find('.spark');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(bubbleBig, 0.9, { scale: 0 }, { scale: 1 }, 1.5);
	    tl.fromTo(bubbleMedium, 0.6, { scale: 0 }, { scale: 1 }, '-=0.8');
	    tl.fromTo(bubbleSmall, 0.3, { scale: 0 }, { scale: 1 }, '-=0.4');
	    tl.fromTo(plug, 1, { scale: 0, rotation: 315 }, { scale: 1, rotation: 360 }, 2.5);
	    tl.fromTo(spark, 1, { scale: 0, rotation: 345 }, { scale: 1, rotation: 360 });
	    tlSpark.fromTo(spark, 0.07, { skewY: "-5deg", skewX: "-5deg", scale: 1 }, { skewY: "5deg", skewX: "5deg", scale: 0.7 });
	  };
	  this[3] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var tank = el.find('.tank');
	    var barrels = el.find('.barrels');
	    var pipe = el.find('.pipe');
	    var puddle = el.find('.puddle');
	    var drops = el.find('.drops');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(barrels, 0.01, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(tank, 0.8, { scale: 0 }, { scale: 1 }, 1.7);
	    tl.fromTo(pipe, 0.75, { opacity: 0 }, { opacity: 1 }, 2.75);
	    tl.fromTo(drops, 0.2, { opacity: 0 }, { opacity: 1 }, 4);
	    tl.fromTo(drops, 2.4, { scale: 0.7 }, { scale: 1 }, '-=0.2');
	    tl.fromTo(puddle, 2.2, { scale: 0 }, { scale: 1 }, 4.2);
	  };
	  this[4] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var tube = el.find('.tube');
	    var temp = el.find('.temp');
	    var arrow = el.find('.arrow');
	    var colorBack = el.find('.color-back');
	    var colorFront = el.find('.color-front');
	    var smokeTop = el.find('.smoke-top');
	    var smokeLeft = el.find('.smoke-left');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(tube, 0.37, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(temp, 0.5, { scale: 0 }, { scale: 1 }, 1.8);
	    tl.fromTo(arrow, 0.5, { scale: 0, rotation: -66 }, { scale: 1, rotation: -66 }, 1.8);
	    if (isCorrect) {
	      tl.fromTo(arrow, 0.5, { rotation: -66 }, { rotation: 0 }, 2.9);
	    } else {
	      tl.fromTo(arrow, 1, { rotation: -66 }, { rotation: 58 }, 2.9);
	      tl.fromTo(colorBack, 0.5, { opacity: 0 }, { opacity: 1 }, 4);
	      tl.fromTo(colorFront, 0.5, { opacity: 0 }, { opacity: 1 }, 4);
	      tl.fromTo(smokeTop, 1, { scale: 0 }, { scale: 1 }, 4.5);
	      tl.fromTo(smokeLeft, 1, { scale: 0 }, { scale: 1 }, 4.5);
	    }
	  };
	  this[5] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var funnel = el.find('.funnel');
	    var bang = el.find('.bang');
	    var flaskGreenEmpty = el.find('.flask-green-empty');
	    var flaskGreenFull = el.find('.flask-green-full');
	    var flaskBlueEmpty = el.find('.flask-blue-empty');
	    var flaskBlueFull = el.find('.flask-blue-full');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(funnel, 1, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(bang, 1.66, { scale: 0 }, { scale: 1 }, 3.83);
	    tl.fromTo(flaskGreenFull, 0.5, { opacity: 0 }, { opacity: 1 }, 2.5);
	    tl.fromTo(flaskBlueFull, 0.5, { opacity: 0 }, { opacity: 1 }, 2.5);
	    tl.fromTo(flaskGreenFull, 0.8, { rotation: 0 }, { rotation: 125 }, 3);
	    tl.fromTo(flaskBlueFull, 0.8, { rotation: 0 }, { rotation: -125 }, 3);
	    tl.to(flaskGreenFull, 0.25, { opacity: 0 }, 3.8);
	    tl.to(flaskBlueFull, 0.25, { opacity: 0 }, 3.8);
	    tl.fromTo(flaskGreenEmpty, 0.25, { opacity: 0 }, { opacity: 1 }, 3.7);
	    tl.fromTo(flaskBlueEmpty, 0.25, { opacity: 0 }, { opacity: 1 }, 3.7);
	  };
	  this[6] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var ice = el.find('.ice');
	    var smoke = el.find('.smoke');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(ice, 1, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(smoke, 3, { scale: 0 }, { scale: 1 }, 2.83);
	  };
	  this[7] = function () {
	    var tl = new TimelineMax({
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.bg');
	    var car = el.find('.car');
	    var gazStation = el.find('.gaz-station');
	    var hosepipe = el.find('.hosepipe');
	    var smokeLeft = el.find('.smoke-left');
	    var smokeRight = el.find('.smoke-right');

	    tl.fromTo(bg, 1, { scale: 0 }, { scale: 1 });
	    tl.fromTo(car, 1, { scale: 0 }, { scale: 1 }, '-=0.5');
	    tl.fromTo(gazStation, 1, { opacity: 0 }, { opacity: 1 }, 1.5);
	    tl.fromTo(hosepipe, 1, { opacity: 0 }, { opacity: 1 }, 2.83);
	    tl.fromTo(smokeLeft, 2, { scale: 0 }, { scale: 1 }, 3.83);
	    tl.fromTo(smokeRight, 2, { scale: 0 }, { scale: 1 }, 3.83);
	  };
	  this['finger'] = function () {
	    var tl = new TimelineMax({
	      delay: 0.3,
	      onComplete: function onComplete() {
	        el.trigger(endEvent);
	      }
	    });
	    var bg = el.find('.romb');
	    var finger = el.find('.finger');

	    tl.fromTo(bg, 0.41, { scale: 0 }, { scale: 1 });
	    tl.fromTo(finger, 0.41, { scale: 0 }, { scale: 1 }, 0.4);
	    tl.to(finger, 0.6, { scale: 1.2 }, 1.33);
	    tl.to(finger, 0.6, { scale: 1 });
	    tl.to(bg, 0.45, { scale: 0 }, 3.1);
	    tl.to(finger, 0.45, { scale: 0 }, 3.4);
	  };
	};

	function init() {
	  /*
	  $('.test__img').on('click', function(){
	    let modal = $(this).closest('.test').find('.test__animation');
	    let index = $(this).closest('.test').index();
	    Main.Modal.openModal(modal);
	    var animation = new testAnimation(modal);
	    animation[index]();
	    modal.on('click', function(e){
	      e.stopPropagation();
	      animation[index]();
	    });
	    modal.closest('.modal__wrapper').on('click', function(){
	      Main.Modal.closeModal(modal);
	    });
	  });
	  */
	}

	module.exports = { init: init, testAnimation: testAnimation };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Тест
	 * @module Test
	 */

	var sum = 0;
	var test = $(".test__wrapper");
	var testCtrl = $('.test-ctrl');
	var testNext = $('.test-next');
	var testReset = $('.js-test-reset');
	var resultModal = $('#test-result');
	var activeClass = 'is-active';
	var skipAnimation = void 0;

	function testStart() {
	  test.children('.' + activeClass).removeClass(activeClass);
	  var firstTest = test.children('.test').eq(0);
	  firstTest.addClass(activeClass);
	  test.trigger('loaded');
	  firstTest.trigger('active');
	}

	function isLastSlide() {
	  return test.find('.test').filter(':last').hasClass(activeClass);
	}
	function getModal(answer) {
	  return answer ? $('#test-correct') : $('#test-incorrect');
	}
	function prepareResultModal(sum, total) {
	  if (sum / 2 === total) {
	    resultModal.addClass('high');
	  } else if (sum / 2 < total && sum / 2 >= total / 2) {
	    resultModal.addClass('medium');
	  } else {
	    resultModal.addClass('low');
	  }
	}

	function isCorrect(el) {
	  var answer = parseInt($(el).closest('.test').attr('data-value'));
	  var value = parseInt($(el).find('.test-ctrl__input:checked').attr('value'));
	  return answer === value;
	}
	function processTest(el) {
	  var testContainer = $(el).closest('.test');
	  var testIndex = testContainer.index();
	  var answer = isCorrect(el);
	  if (answer) {
	    sum += 1;
	  }
	  var modal = getModal(answer);
	  var modalAnswer = testContainer.find('.test__answer.modal');
	  var modalAnimation = testContainer.find('.test__animation.modal');
	  if (!skipAnimation) {
	    Main.Modal.openModal(modal);
	    modal.on('opened', function () {
	      setTimeout(function () {
	        var fingerAnimation = new Main.Animation.testAnimation(modal);
	        fingerAnimation['finger']();
	        testContainer.find('.test__img').addClass('faden');
	      }, 500, modal, testContainer);
	    });
	    modal.on('animationend', function () {
	      setTimeout(function () {
	        Main.Modal.closeModal(modal, true);
	        modal.on('closed', function () {
	          Main.Modal.openModal(modalAnimation);
	          var animation = new Main.Animation.testAnimation(modalAnimation, answer);
	          animation[testIndex]();
	        });
	        modalAnimation.on('animationend', function () {
	          Main.Modal.closeModal(modalAnimation, true);
	        });
	      }, 300, modal, answer, modalAnimation, testIndex);
	    });
	    modalAnimation.on('closed', function () {
	      setTimeout(Main.Modal.openModal, 500, modalAnswer);
	    });
	  } else {
	    setTimeout(function () {
	      Main.Modal.openModal(modalAnswer);
	    }, 500, modalAnswer);
	  }
	}

	function showNext(el) {
	  $(el).closest('.test').removeClass(activeClass);
	  $(el).closest('.test').next().addClass(activeClass);
	  $(el).closest('.test').next().trigger('active');
	}
	function showResult() {
	  var total = test.find('.test').length;
	  prepareResultModal(sum, total);
	  Main.Modal.openModal(resultModal);
	}
	function resetTest() {
	  sum = 0;
	  testCtrl.each(function () {
	    $(this).prop('checked', false);
	  });
	  testStart();
	  setTimeout(function () {
	    Main.Modal.closeModal(resultModal);
	  }, 300, resultModal);
	}

	/**
	 * Инициализация теста
	 */
	function init() {
	  skipAnimation = Main.DeviceDetection.isMobileVersion();
	  testStart();

	  testCtrl.on('click', function () {
	    setTimeout(processTest, 400, this);
	  });
	  testNext.on('click', function () {
	    if (!isLastSlide()) {
	      showNext(this);
	    } else {
	      showResult();
	    }
	  });
	  testReset.on('click', function () {
	    resetTest();
	  });

	  resultModal.on('opened', function () {
	    $('body').addClass('result-opened');
	  });
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkM2VlNDFhOWUwMzYyYjE5OGE1NiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jYWx2aW4ta2xlaW4vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDNlZTQxYTllMDM2MmIxOThhNTYiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgVG9nZ2xlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RvZ2dsZXJzXCIpO1xyXG5sZXQgQ2Fyb3VzZWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Nhcm91c2VsXCIpO1xyXG5sZXQgTW9kYWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21vZGFsXCIpO1xyXG5sZXQgQW5jaG9yID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmNob3JcIik7XHJcbi8vbGV0IElucHV0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9pbnB1dFwiKTtcclxuLy9sZXQgU2VsZWN0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWxlY3RcIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IFRlc3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGVzdCcpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgVG9nZ2xlcnMuaW5pdCgpO1xyXG4gIC8vQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIE1vZGFsLmluaXQoKTtcclxuICAvL0FuY2hvci5pbml0KCk7XHJcbiAgLy9JbnB1dC5pbml0KCk7XHJcbiAgLy9TZWxlY3QuaW5pdCgpO1xyXG4gIFxyXG4gICQoJy53YXRlci1iYWNrLCAud2F0ZXItZnJvbnQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvL2xldCBpbWcgPSAkKHRoaXMpLmNoaWxkcmVuKCdpbWcnKTtcclxuICAgICQodGhpcykud3JhcElubmVyKCc8ZGl2IGNsYXNzPVwiaGV4YWdvbi1vdXRlclwiPjxkaXYgY2xhc3M9XCJoZXhhZ29uLTFcIj48ZGl2IGNsYXNzPVwiaGV4YWdvbi0yXCI+PGRpdiBjbGFzcz1cImhleGFnb24tM1wiPjxkaXYgY2xhc3M9XCJoZXhhZ29uLTRcIj48ZGl2IGNsYXNzPVwiaGV4YWdvbi01XCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgQW5pbWF0aW9uLmluaXQoKTtcclxuICBUZXN0LmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqINCh0L/QuNGB0L7QuiDRjdC60YHQv9C+0YDRgtC40YDRg9C10LzRi9GFINC80L7QtNGD0LvQtdC5LCDRh9GC0L7QsdGLINC40LzQtdGC0Ywg0Log0L3QuNC8INC00L7RgdGC0YPQvyDQuNC30LLQvdC1XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1haW4uRm9ybS5pc0Zvcm1WYWxpZCgpO1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgIERldmljZURldGVjdGlvbixcclxuICAgVG9nZ2xlcnMsXHJcbiAgIC8vQ2Fyb3VzZWwsXHJcbiAgIE1vZGFsLFxyXG4gICAvL0FuY2hvcixcclxuICAgQW5pbWF0aW9uLFxyXG4gICBUZXN0XHJcbiAgIC8vSW5wdXQsXHJcbiAgIC8vU2VsZWN0XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG5cdHNtOiA1NzYsXHJcblx0bWQ6IDc2OCxcclxuXHRsZzogOTkyLFxyXG5cdHhsOiAxMjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG5cdHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcblx0cmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuXHRyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKSB7XHJcbiAgcmV0dXJuICEhfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy9tb2JpbGUvJyk7XHJcbn1cclxuZnVuY3Rpb24gaXNDbGlwUGF0aFN1cHBvcnQoKSB7XHJcblxyXG4gICAgdmFyIGJhc2UgPSAnY2xpcFBhdGgnLFxyXG4gICAgICAgIHByZWZpeGVzID0gWyAnd2Via2l0JywgJ21veicsICdtcycsICdvJyBdLFxyXG4gICAgICAgIHByb3BlcnRpZXMgPSBbIGJhc2UgXSxcclxuICAgICAgICB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICd0ZXN0ZWxlbWVudCcgKSxcclxuICAgICAgICBhdHRyaWJ1dGUgPSAncG9seWdvbig1MCUgMCUsIDAlIDEwMCUsIDEwMCUgMTAwJSknO1xyXG5cclxuICAgIC8vIFB1c2ggdGhlIHByZWZpeGVkIHByb3BlcnRpZXMgaW50byB0aGUgYXJyYXkgb2YgcHJvcGVydGllcy5cclxuICAgIGZvciAoIHZhciBpID0gMCwgbCA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcclxuICAgICAgICB2YXIgcHJlZml4ZWRQcm9wZXJ0eSA9IHByZWZpeGVzW2ldICsgYmFzZS5jaGFyQXQoIDAgKS50b1VwcGVyQ2FzZSgpICsgYmFzZS5zbGljZSggMSApOyAvLyByZW1lbWJlciB0byBjYXBpdGFsaXplIVxyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCggcHJlZml4ZWRQcm9wZXJ0eSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEludGVyYXRlIG92ZXIgdGhlIHByb3BlcnRpZXMgYW5kIHNlZSBpZiB0aGV5IHBhc3MgdHdvIHRlc3RzLlxyXG4gICAgZm9yICggdmFyIGkgPSAwLCBsID0gcHJvcGVydGllcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gcHJvcGVydGllc1tpXTtcclxuXHJcbiAgICAgICAgLy8gRmlyc3QsIHRoZXkgbmVlZCB0byBldmVuIHN1cHBvcnQgY2xpcC1wYXRoIChJRSA8PSAxMSBkb2VzIG5vdCkuLi5cclxuICAgICAgICBpZiAoIHRlc3RFbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9PT0gJycgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTZWNvbmQsIHdlIG5lZWQgdG8gc2VlIHdoYXQgaGFwcGVucyB3aGVuIHdlIHRyeSB0byBjcmVhdGUgYSBDU1Mgc2hhcGUuLi5cclxuICAgICAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gYXR0cmlidXRlO1xyXG4gICAgICAgICAgICBpZiAoIHRlc3RFbGVtZW50LnN0eWxlW3Byb3BlcnR5XSAhPT0gJycgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuXHRpZihpc1RvdWNoKCkpe1xyXG5cdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcblx0fVxyXG4gIGlmKCFpc0NsaXBQYXRoU3VwcG9ydCgpKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ25vLWNsaXAtcGF0aCcpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7cnVuLCBpc1RvdWNoLCBpc01vYmlsZSwgaXNUYWJsZXQsIGlzTW9iaWxlVmVyc2lvbiwgaXNDbGlwUGF0aFN1cHBvcnR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgVG9nZ2xlcnNcclxuICovXHJcbiBcclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogVG9nZ2xlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcblx0Ly90b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMyk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlcnMuanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgbGV0IGNhcm91c2VsSG9tZSA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS1ob21lXCIpO1xyXG4gIGxldCBjYXJvdXNlbERlZmF1bHQgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tZGVmYXVsdFwiKTtcclxuXHJcbiAgY2Fyb3VzZWxIb21lLm93bENhcm91c2VsKHtcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgbmF2VGV4dDogWycnLCAnJ10sXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgIGF1dG9wbGF5VGltZW91dDogMzAwMCxcclxuICAgIGxhenlMb2FkOiB0cnVlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG4gIGNhcm91c2VsRGVmYXVsdC5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IFsnJywgJyddLFxyXG4gICAgZG90czogZmFsc2UsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgbGF6eUxvYWQ6IHRydWUsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIi8qKlxyXG4gKiDQktGB0L/Qu9GL0LLQsNGO0YnQuNC1INC+0LrQvdCwXHJcbiAqIEBtb2R1bGUgTW9kYWxcclxuICovXHJcblxyXG5sZXQgbGF5b3V0ID0gJCgnLmxheW91dCcpO1xyXG5sZXQgbW9kYWxXcmFwcGVyQ2xhc3MgPSAnLm1vZGFsX193cmFwcGVyJztcclxuLy9sZXQgbW9kYWxXcmFwcGVyID0gJCgnLm1vZGFsX193cmFwcGVyJyk7XHJcbiBcclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsLCBpc0Z1bGxzY3JlZW4gPSBmYWxzZSkge1xyXG4gIGxldCBtb2RhbFdyYXBwZXIgPSBtb2RhbC5jbG9zZXN0KG1vZGFsV3JhcHBlckNsYXNzKTtcclxuICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIG1vZGFsLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcclxuICBsZXQgd3JhcHBlckNsYXNzZXMgPSAnaXMtb3BlbmVkJztcclxuICBpZiAoaXNGdWxsc2NyZWVuKSB7XHJcbiAgICB3cmFwcGVyQ2xhc3NlcyArPSAnIGlzLWZ1bGxzY3JlZW4nO1xyXG4gIH1cclxuICBsYXlvdXQuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3Mod3JhcHBlckNsYXNzZXMpO1xyXG4gIG1vZGFsLmFkZENsYXNzKCdpcy1vcGVuZWQnKTtcclxuICBtb2RhbC50cmlnZ2VyKCdvcGVuZWQnKTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKG1vZGFsLCBvcGVuTmV4dCA9IGZhbHNlKSB7XHJcbiAgbGV0IG1vZGFsV3JhcHBlciA9IG1vZGFsLmNsb3Nlc3QobW9kYWxXcmFwcGVyQ2xhc3MpO1xyXG4gIG1vZGFsLnJlbW92ZUNsYXNzKCdpcy1vcGVuZWQnKTtcclxuICBtb2RhbC50cmlnZ2VyKCdjbG9zZWQnKTtcclxuICBpZiAoIW9wZW5OZXh0KSB7XHJcbiAgICBsYXlvdXQucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgIG1vZGFsV3JhcHBlci5yZW1vdmVDbGFzcygnaXMtb3BlbmVkIGlzLWZ1bGxzY3JlZW4nKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgfVxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIG1vZGFsLmFkZENsYXNzKCdpbnZpc2libGUnKTtcclxuICAgIG1vZGFsV3JhcHBlci5hZGRDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgfSwgMzAwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQstGB0L/Qu9GL0LLQsNGO0YnQuNGFINC+0LrQvtC9XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1vZGFsLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG4gICQoJy5qcy1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgICAgIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICAgICAgbGV0IGlzRnVsbHNjcmVlbiA9IG1vZGFsLmF0dHIoJ2RhdGEtZnVsbHNjcmVlbicpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmICghbW9kYWwuaGFzQ2xhc3MoJ2lzLW9wZW5lZCcpKSB7XHJcbiAgICAgICAgb3Blbk1vZGFsKG1vZGFsLCBpc0Z1bGxzY3JlZW4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsb3NlTW9kYWwobW9kYWwpO1xyXG4gICAgICB9XHJcbiAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsSGFzaCgpIHtcclxuICAgICAgICBsZXQgaGFzaCA9IFsnY29tcGV0aXRpb24nXSxcclxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuLFxyXG4gICAgICAgICAgICBtb2RhbCxcclxuICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDtpIDwgaGFzaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoICcjJytoYXNoW2ldID09IHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmICQoJyMnK2hhc2hbaV0pLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWwgPSAkKCcjJytoYXNoW2ldKTtcclxuICAgICAgICAgICAgICAgIGlzRnVsbHNjcmVlbiA9IG1vZGFsLmF0dHIoJ2RhdGEtZnVsbHNjcmVlbicpICE9PSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsKG1vZGFsLCBpc0Z1bGxzY3JlZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Nb2RhbEhhc2goKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgb3Blbk1vZGFsLCBjbG9zZU1vZGFsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCIvKipcclxuICogQW5jaG9yIHNjcm9sbGluZ1xyXG4gKiBAbW9kdWxlIEFuY2hvclxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbFRvQW5jaG9yKG5ld3Bvcykge1xyXG4gIFR3ZWVuTWF4LnRvKHdpbmRvdywgMC41LCB7c2Nyb2xsVG86IHt5OiBuZXdwb3MsIG9mZnNldFk6IDIwMH19KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRj9C60L7RgNC90L7Qs9C+INC80LXQvdGOXHJcbiAqIEBleGFtcGxlXHJcbiAqIEFuY2hvci5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtYW5jaG9yJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgIGxldCBzY3JvbGxUb0lEID0gaWQgKyAnLXRpdGxlJztcclxuICAgIGlmICghISQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykpIHtcclxuICAgICAgTWFpbi5Nb2RhbC5jbG9zZU1vZGFsKCQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKCQoaWQpLmxlbmd0aCA+IDAgJiYgJChzY3JvbGxUb0lEKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgXHJcbiAgICAgIHNldFRpbWVvdXQoc2Nyb2xsVG9BbmNob3IsIDQwMCwgc2Nyb2xsVG9JRCk7XHJcbiAgICAgIDtcclxuICAgICAgXHJcbiAgICAgIC8vaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xyXG4gICAgICAvLyAgaGlzdG9yeS5wdXNoU3RhdGUoXCJcIiwgZG9jdW1lbnQudGl0bGUsIGlkKTtcclxuICAgICAgLy99XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hbmNob3IuanMiLCIvKipcclxuICog0J/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L4g0YDQsNC30LvQuNGH0L3Ri9C8INGB0L7QsdGL0YLQuNGP0LxcclxuICogQG1vZHVsZSBBbmltYXRpb25cclxuICovXHJcblxyXG5sZXQgZW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kJztcclxuXHJcbmZ1bmN0aW9uIHRlc3RBbmltYXRpb24gKGVsLCBpc0NvcnJlY3QgPSB0cnVlKSB7XHJcbiAgdGhpc1swXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBnYXpTdGF0aW9uID0gZWwuZmluZCgnLmdhei1zdGF0aW9uJyk7XHJcbiAgICBsZXQgc21va2VCYWNrID0gZWwuZmluZCgnLnNtb2tlLWJhY2snKTtcclxuICAgIGxldCBzbW9rZUZyb250ID0gZWwuZmluZCgnLnNtb2tlLWZyb250Jyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oY2FyLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjUnKTtcclxuICAgIHRsLmZyb21UbyhnYXpTdGF0aW9uLCAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhzbW9rZUJhY2ssIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDIuNzUpO1xyXG4gICAgdGwuZnJvbVRvKHNtb2tlRnJvbnQsIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTEuNScpO1xyXG4gIH07XHJcbiAgdGhpc1sxXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBsZXQgdGxGbGlwcGVycyA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDMuMTUsIHJlcGVhdDogOCwgeW95bzogdHJ1ZX0pO1xyXG4gICAgbGV0IHRsU3BhcmtzID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgZGVsYXk6IDQuOSwgXHJcbiAgICAgIHJlcGVhdDogMTcsIFxyXG4gICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLmJnJyk7XHJcbiAgICBsZXQgY2FyID0gZWwuZmluZCgnLmNhcicpO1xyXG4gICAgbGV0IHdhdGVyQmFjayA9IGVsLmZpbmQoJy53YXRlci1iYWNrIGltZycpO1xyXG4gICAgbGV0IHdhdGVyRnJvbnQgPSBlbC5maW5kKCcud2F0ZXItZnJvbnQgaW1nJyk7XHJcbiAgICBsZXQgZmxpcHBlckxlZnQgPSBlbC5maW5kKCcuZmxpcHBlci1sZWZ0Jyk7XHJcbiAgICBsZXQgZmxpcHBlclJpZ2h0ID0gZWwuZmluZCgnLmZsaXBwZXItcmlnaHQnKTtcclxuICAgIGxldCBidWJibGVzID0gZWwuZmluZCgnLmJ1YmJsZXMnKTtcclxuICAgIGxldCB0dWJlID0gZWwuZmluZCgnLnR1YmUnKTtcclxuICAgIGxldCBzbW9rZSA9IGVsLmZpbmQoJy5zbW9rZScpO1xyXG4gICAgbGV0IHNwYXJrcyA9IGVsLmZpbmQoJy5zcGFya3MnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgdGwuZnJvbVRvKHdhdGVyQmFjaywgMC45LCB7eDogMTAwLCB5OiA1MDAsIGVhc2U6ICdlYXNlSW5PdXQnfSwge3g6IDAsIHk6IDB9LCAxLjUpO1xyXG4gICAgdGwuZnJvbVRvKHdhdGVyRnJvbnQsIDAuOSwge3g6IDEwMCwgeTogNTAwLCBlYXNlOiAnZWFzZUluT3V0J30sIHt4OiAwLCB5OiAwfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhidWJibGVzLCAxLCB7c2NhbGU6IDAsIHg6IDUwLCB5OiAyMDB9LCB7c2NhbGU6IDEsIHg6IDAsIHk6IDB9LCAxLjUpO1xyXG4gICAgdGwuZnJvbVRvKHR1YmUsIDAuMywge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgMi42KTtcclxuICAgIHRsLmZyb21UbyhmbGlwcGVyTGVmdCwgMC4yNSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgMi45KTtcclxuICAgIHRsLmZyb21UbyhmbGlwcGVyUmlnaHQsIDAuMjUsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDMuMTUpO1xyXG4gICAgdGwuZnJvbVRvKHNwYXJrcywgMC4yLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgNC45KTtcclxuICAgIHRsLmZyb21UbyhzbW9rZSwgMS42Niwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgNC45KTtcclxuICAgIHRsRmxpcHBlcnMuZnJvbVRvKGZsaXBwZXJMZWZ0LCAwLjUsIHtza2V3WDogJy01ZGVnJywgc2tld1k6ICctNWRlZycsIHJvdGF0aW9uWDogMCwgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIn0sIHtza2V3WDogJzEwZGVnJywgc2tld1k6ICctNWRlZycsIHJvdGF0aW9uWDogMzAsIGVhc2U6IFBvd2VyMS5lYXNlSW59LCAnZmxpcHBlcicpO1xyXG4gICAgdGxGbGlwcGVycy5mcm9tVG8oZmxpcHBlclJpZ2h0LCAwLjUsIHtza2V3WDogJy0xMGRlZycsIHNrZXdZOiAnNWRlZycsIHJvdGF0aW9uWDogMCwgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIn0sIHtza2V3WDogJzVkZWcnLCBza2V3WTogJzVkZWcnLCByb3RhdGlvblg6IDIwLCBlYXNlOiBQb3dlcjEuZWFzZU91dH0sICdmbGlwcGVyJyk7XHJcbiAgICB0bFNwYXJrcy5mcm9tVG8oc3BhcmtzLCAwLjA1LCB7eDogMCwgeTogMH0sIHt4OiAyMCwgeTogMjB9KS50byhzcGFya3MsIDAuMDUsIHt4OiAyMCwgeTogMH0pO1xyXG4gIH07XHJcbiAgdGhpc1syXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBsZXQgdGxTcGFyayA9IG5ldyBUaW1lbGluZU1heCh7XHJcbiAgICAgIGRlbGF5OiAzLjcsIFxyXG4gICAgICByZXBlYXQ6IDUwLCBcclxuICAgICAgeW95bzogdHJ1ZSxcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBidWJibGVCaWcgPSBlbC5maW5kKCcuYnViYmxlLWJpZycpO1xyXG4gICAgbGV0IGJ1YmJsZU1lZGl1bSA9IGVsLmZpbmQoJy5idWJibGUtbWVkaXVtJyk7XHJcbiAgICBsZXQgYnViYmxlU21hbGwgPSBlbC5maW5kKCcuYnViYmxlLXNtYWxsJyk7XHJcbiAgICBsZXQgcGx1ZyA9IGVsLmZpbmQoJy5wbHVnJyk7XHJcbiAgICBsZXQgc3BhcmsgPSBlbC5maW5kKCcuc3BhcmsnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgdGwuZnJvbVRvKGJ1YmJsZUJpZywgMC45LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAxLjUpO1xyXG4gICAgdGwuZnJvbVRvKGJ1YmJsZU1lZGl1bSwgMC42LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjgnKTtcclxuICAgIHRsLmZyb21UbyhidWJibGVTbWFsbCwgMC4zLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjQnKTtcclxuICAgIHRsLmZyb21UbyhwbHVnLCAxLCB7c2NhbGU6IDAsIHJvdGF0aW9uOiAzMTV9LCB7c2NhbGU6IDEsIHJvdGF0aW9uOiAzNjB9LCAyLjUpO1xyXG4gICAgdGwuZnJvbVRvKHNwYXJrLCAxLCB7c2NhbGU6IDAsIHJvdGF0aW9uOiAzNDV9LCB7c2NhbGU6IDEsIHJvdGF0aW9uOiAzNjB9KTtcclxuICAgIHRsU3BhcmsuZnJvbVRvKHNwYXJrLCAwLjA3LCB7c2tld1k6IFwiLTVkZWdcIiwgc2tld1g6IFwiLTVkZWdcIiwgc2NhbGU6IDF9LCB7c2tld1k6IFwiNWRlZ1wiLCBza2V3WDogXCI1ZGVnXCIsIHNjYWxlOiAwLjd9KTtcclxuICB9O1xyXG4gIHRoaXNbM10gPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7XHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlbC50cmlnZ2VyKGVuZEV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgYmcgPSBlbC5maW5kKCcuYmcnKTtcclxuICAgIGxldCBjYXIgPSBlbC5maW5kKCcuY2FyJyk7XHJcbiAgICBsZXQgdGFuayA9IGVsLmZpbmQoJy50YW5rJyk7XHJcbiAgICBsZXQgYmFycmVscyA9IGVsLmZpbmQoJy5iYXJyZWxzJyk7XHJcbiAgICBsZXQgcGlwZSA9IGVsLmZpbmQoJy5waXBlJyk7XHJcbiAgICBsZXQgcHVkZGxlID0gZWwuZmluZCgnLnB1ZGRsZScpO1xyXG4gICAgbGV0IGRyb3BzID0gZWwuZmluZCgnLmRyb3BzJyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oY2FyLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjUnKTtcclxuICAgIHRsLmZyb21UbyhiYXJyZWxzLCAwLjAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21Ubyh0YW5rLCAwLjgsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDEuNyk7XHJcbiAgICB0bC5mcm9tVG8ocGlwZSwgMC43NSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDIuNzUpO1xyXG4gICAgdGwuZnJvbVRvKGRyb3BzLCAwLjIsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCA0KTtcclxuICAgIHRsLmZyb21Ubyhkcm9wcywgMi40LCB7c2NhbGU6IDAuN30sIHtzY2FsZTogMX0sICctPTAuMicpO1xyXG4gICAgdGwuZnJvbVRvKHB1ZGRsZSwgMi4yLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCA0LjIpO1xyXG4gIH07XHJcbiAgdGhpc1s0XSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCB0dWJlID0gZWwuZmluZCgnLnR1YmUnKTtcclxuICAgIGxldCB0ZW1wID0gZWwuZmluZCgnLnRlbXAnKTtcclxuICAgIGxldCBhcnJvdyA9IGVsLmZpbmQoJy5hcnJvdycpO1xyXG4gICAgbGV0IGNvbG9yQmFjayA9IGVsLmZpbmQoJy5jb2xvci1iYWNrJyk7XHJcbiAgICBsZXQgY29sb3JGcm9udCA9IGVsLmZpbmQoJy5jb2xvci1mcm9udCcpO1xyXG4gICAgbGV0IHNtb2tlVG9wID0gZWwuZmluZCgnLnNtb2tlLXRvcCcpO1xyXG4gICAgbGV0IHNtb2tlTGVmdCA9IGVsLmZpbmQoJy5zbW9rZS1sZWZ0Jyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oY2FyLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjUnKTtcclxuICAgIHRsLmZyb21Ubyh0dWJlLCAwLjM3LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21Ubyh0ZW1wLCAwLjUsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDEuOCk7XHJcbiAgICB0bC5mcm9tVG8oYXJyb3csIDAuNSwge3NjYWxlOiAwLCByb3RhdGlvbjogLTY2fSwge3NjYWxlOiAxLCByb3RhdGlvbjogLTY2fSwgMS44KTtcclxuICAgIGlmIChpc0NvcnJlY3QpIHtcclxuICAgICAgdGwuZnJvbVRvKGFycm93LCAwLjUsIHtyb3RhdGlvbjogLTY2fSwge3JvdGF0aW9uOiAwfSwgMi45KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRsLmZyb21UbyhhcnJvdywgMSwge3JvdGF0aW9uOiAtNjZ9LCB7cm90YXRpb246IDU4fSwgMi45KTtcclxuICAgICAgdGwuZnJvbVRvKGNvbG9yQmFjaywgMC41LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgNCk7XHJcbiAgICAgIHRsLmZyb21Ubyhjb2xvckZyb250LCAwLjUsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCA0KTtcclxuICAgICAgdGwuZnJvbVRvKHNtb2tlVG9wLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCA0LjUpO1xyXG4gICAgICB0bC5mcm9tVG8oc21va2VMZWZ0LCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCA0LjUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgdGhpc1s1XSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBmdW5uZWwgPSBlbC5maW5kKCcuZnVubmVsJyk7XHJcbiAgICBsZXQgYmFuZyA9IGVsLmZpbmQoJy5iYW5nJyk7XHJcbiAgICBsZXQgZmxhc2tHcmVlbkVtcHR5ID0gZWwuZmluZCgnLmZsYXNrLWdyZWVuLWVtcHR5Jyk7XHJcbiAgICBsZXQgZmxhc2tHcmVlbkZ1bGwgPSBlbC5maW5kKCcuZmxhc2stZ3JlZW4tZnVsbCcpO1xyXG4gICAgbGV0IGZsYXNrQmx1ZUVtcHR5ID0gZWwuZmluZCgnLmZsYXNrLWJsdWUtZW1wdHknKTtcclxuICAgIGxldCBmbGFza0JsdWVGdWxsID0gZWwuZmluZCgnLmZsYXNrLWJsdWUtZnVsbCcpO1xyXG4gICAgXHJcbiAgICB0bC5mcm9tVG8oYmcsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgdGwuZnJvbVRvKGNhciwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC41Jyk7XHJcbiAgICB0bC5mcm9tVG8oZnVubmVsLCAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhiYW5nLCAxLjY2LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAzLjgzKTtcclxuICAgIHRsLmZyb21UbyhmbGFza0dyZWVuRnVsbCwgMC41LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMi41KTtcclxuICAgIHRsLmZyb21UbyhmbGFza0JsdWVGdWxsLCAwLjUsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCAyLjUpO1xyXG4gICAgdGwuZnJvbVRvKGZsYXNrR3JlZW5GdWxsLCAwLjgsIHtyb3RhdGlvbjogMH0sIHtyb3RhdGlvbjogMTI1fSwgMyk7XHJcbiAgICB0bC5mcm9tVG8oZmxhc2tCbHVlRnVsbCwgMC44LCB7cm90YXRpb246IDB9LCB7cm90YXRpb246IC0xMjV9LCAzKTtcclxuICAgIHRsLnRvKGZsYXNrR3JlZW5GdWxsLCAwLjI1LCB7b3BhY2l0eTogMH0sIDMuOCk7XHJcbiAgICB0bC50byhmbGFza0JsdWVGdWxsLCAwLjI1LCB7b3BhY2l0eTogMH0sIDMuOCk7XHJcbiAgICB0bC5mcm9tVG8oZmxhc2tHcmVlbkVtcHR5LCAwLjI1LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMy43KTtcclxuICAgIHRsLmZyb21UbyhmbGFza0JsdWVFbXB0eSwgMC4yNSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDMuNyk7XHJcbiAgfTtcclxuICB0aGlzWzZdID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLmJnJyk7XHJcbiAgICBsZXQgY2FyID0gZWwuZmluZCgnLmNhcicpO1xyXG4gICAgbGV0IGljZSA9IGVsLmZpbmQoJy5pY2UnKTtcclxuICAgIGxldCBzbW9rZSA9IGVsLmZpbmQoJy5zbW9rZScpO1xyXG4gICAgXHJcbiAgICB0bC5mcm9tVG8oYmcsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgdGwuZnJvbVRvKGNhciwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC41Jyk7XHJcbiAgICB0bC5mcm9tVG8oaWNlLCAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhzbW9rZSwgMywge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgMi44Myk7XHJcbiAgfTtcclxuICB0aGlzWzddID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLmJnJyk7XHJcbiAgICBsZXQgY2FyID0gZWwuZmluZCgnLmNhcicpO1xyXG4gICAgbGV0IGdhelN0YXRpb24gPSBlbC5maW5kKCcuZ2F6LXN0YXRpb24nKTtcclxuICAgIGxldCBob3NlcGlwZSA9IGVsLmZpbmQoJy5ob3NlcGlwZScpO1xyXG4gICAgbGV0IHNtb2tlTGVmdCA9IGVsLmZpbmQoJy5zbW9rZS1sZWZ0Jyk7XHJcbiAgICBsZXQgc21va2VSaWdodCA9IGVsLmZpbmQoJy5zbW9rZS1yaWdodCcpO1xyXG4gICAgXHJcbiAgICB0bC5mcm9tVG8oYmcsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgdGwuZnJvbVRvKGNhciwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC41Jyk7XHJcbiAgICB0bC5mcm9tVG8oZ2F6U3RhdGlvbiwgMSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDEuNSk7XHJcbiAgICB0bC5mcm9tVG8oaG9zZXBpcGUsIDEsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCAyLjgzKTtcclxuICAgIHRsLmZyb21UbyhzbW9rZUxlZnQsIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDMuODMpO1xyXG4gICAgdGwuZnJvbVRvKHNtb2tlUmlnaHQsIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDMuODMpO1xyXG4gIH07XHJcbiAgdGhpc1snZmluZ2VyJ10gPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7XHJcbiAgICAgIGRlbGF5OiAwLjMsXHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlbC50cmlnZ2VyKGVuZEV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgYmcgPSBlbC5maW5kKCcucm9tYicpO1xyXG4gICAgbGV0IGZpbmdlciA9IGVsLmZpbmQoJy5maW5nZXInKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAwLjQxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhmaW5nZXIsIDAuNDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDAuNCk7XHJcbiAgICB0bC50byhmaW5nZXIsIDAuNiwge3NjYWxlOiAxLjJ9LCAxLjMzKTtcclxuICAgIHRsLnRvKGZpbmdlciwgMC42LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLnRvKGJnLCAwLjQ1LCB7c2NhbGU6IDB9LCAzLjEpO1xyXG4gICAgdGwudG8oZmluZ2VyLCAwLjQ1LCB7c2NhbGU6IDB9LCAzLjQpO1xyXG4gIH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpbml0ICgpIHtcclxuICAvKlxyXG4gICQoJy50ZXN0X19pbWcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG1vZGFsID0gJCh0aGlzKS5jbG9zZXN0KCcudGVzdCcpLmZpbmQoJy50ZXN0X19hbmltYXRpb24nKTtcclxuICAgIGxldCBpbmRleCA9ICQodGhpcykuY2xvc2VzdCgnLnRlc3QnKS5pbmRleCgpO1xyXG4gICAgTWFpbi5Nb2RhbC5vcGVuTW9kYWwobW9kYWwpO1xyXG4gICAgdmFyIGFuaW1hdGlvbiA9IG5ldyB0ZXN0QW5pbWF0aW9uKG1vZGFsKTtcclxuICAgIGFuaW1hdGlvbltpbmRleF0oKTtcclxuICAgIG1vZGFsLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBhbmltYXRpb25baW5kZXhdKCk7XHJcbiAgICB9KTtcclxuICAgIG1vZGFsLmNsb3Nlc3QoJy5tb2RhbF9fd3JhcHBlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIE1haW4uTW9kYWwuY2xvc2VNb2RhbChtb2RhbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICAqL1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCB0ZXN0QW5pbWF0aW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwiLyoqXHJcbiAqINCi0LXRgdGCXHJcbiAqIEBtb2R1bGUgVGVzdFxyXG4gKi9cclxuXHJcbmxldCBzdW0gPSAwO1xyXG5sZXQgdGVzdCA9ICQoXCIudGVzdF9fd3JhcHBlclwiKTtcclxubGV0IHRlc3RDdHJsID0gJCgnLnRlc3QtY3RybCcpO1xyXG5sZXQgdGVzdE5leHQgPSAkKCcudGVzdC1uZXh0Jyk7XHJcbmxldCB0ZXN0UmVzZXQgPSAkKCcuanMtdGVzdC1yZXNldCcpO1xyXG5sZXQgcmVzdWx0TW9kYWwgPSAkKCcjdGVzdC1yZXN1bHQnKTtcclxubGV0IGFjdGl2ZUNsYXNzID0gJ2lzLWFjdGl2ZSc7XHJcbmxldCBza2lwQW5pbWF0aW9uO1xyXG5cclxuZnVuY3Rpb24gdGVzdFN0YXJ0KCkge1xyXG4gIHRlc3QuY2hpbGRyZW4oJy4nICsgYWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICBsZXQgZmlyc3RUZXN0ID0gdGVzdC5jaGlsZHJlbignLnRlc3QnKS5lcSgwKTtcclxuICBmaXJzdFRlc3QuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gIHRlc3QudHJpZ2dlcignbG9hZGVkJyk7XHJcbiAgZmlyc3RUZXN0LnRyaWdnZXIoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0xhc3RTbGlkZSgpIHtcclxuICByZXR1cm4gdGVzdC5maW5kKCcudGVzdCcpLmZpbHRlcignOmxhc3QnKS5oYXNDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TW9kYWwoYW5zd2VyKSB7XHJcbiAgcmV0dXJuIGFuc3dlciA/ICQoJyN0ZXN0LWNvcnJlY3QnKSA6ICQoJyN0ZXN0LWluY29ycmVjdCcpO1xyXG59XHJcbmZ1bmN0aW9uIHByZXBhcmVSZXN1bHRNb2RhbChzdW0sIHRvdGFsKSB7XHJcbiAgaWYgKHN1bS8yID09PSB0b3RhbCkge1xyXG4gICAgcmVzdWx0TW9kYWwuYWRkQ2xhc3MoJ2hpZ2gnKTtcclxuICB9IGVsc2UgaWYgKHN1bS8yIDwgdG90YWwgJiYgc3VtLzIgPj0gdG90YWwvMikge1xyXG4gICAgcmVzdWx0TW9kYWwuYWRkQ2xhc3MoJ21lZGl1bScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHRNb2RhbC5hZGRDbGFzcygnbG93Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NvcnJlY3QoZWwpIHtcclxuICBsZXQgYW5zd2VyID0gcGFyc2VJbnQoJChlbCkuY2xvc2VzdCgnLnRlc3QnKS5hdHRyKCdkYXRhLXZhbHVlJykpO1xyXG4gIGxldCB2YWx1ZSA9IHBhcnNlSW50KCQoZWwpLmZpbmQoJy50ZXN0LWN0cmxfX2lucHV0OmNoZWNrZWQnKS5hdHRyKCd2YWx1ZScpKTtcclxuICByZXR1cm4gYW5zd2VyID09PSB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBwcm9jZXNzVGVzdChlbCkge1xyXG4gIGxldCB0ZXN0Q29udGFpbmVyID0gJChlbCkuY2xvc2VzdCgnLnRlc3QnKTtcclxuICBsZXQgdGVzdEluZGV4ID0gdGVzdENvbnRhaW5lci5pbmRleCgpO1xyXG4gIGxldCBhbnN3ZXIgPSBpc0NvcnJlY3QoZWwpO1xyXG4gIGlmIChhbnN3ZXIpIHtcclxuICAgIHN1bSArPSAxO1xyXG4gIH1cclxuICBsZXQgbW9kYWwgPSBnZXRNb2RhbChhbnN3ZXIpO1xyXG4gIGxldCBtb2RhbEFuc3dlciA9IHRlc3RDb250YWluZXIuZmluZCgnLnRlc3RfX2Fuc3dlci5tb2RhbCcpO1xyXG4gIGxldCBtb2RhbEFuaW1hdGlvbiA9IHRlc3RDb250YWluZXIuZmluZCgnLnRlc3RfX2FuaW1hdGlvbi5tb2RhbCcpO1xyXG4gIGlmICghc2tpcEFuaW1hdGlvbikge1xyXG4gICAgTWFpbi5Nb2RhbC5vcGVuTW9kYWwobW9kYWwpO1xyXG4gICAgbW9kYWwub24oJ29wZW5lZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGZpbmdlckFuaW1hdGlvbiA9IG5ldyBNYWluLkFuaW1hdGlvbi50ZXN0QW5pbWF0aW9uKG1vZGFsKTtcclxuICAgICAgICBmaW5nZXJBbmltYXRpb25bJ2ZpbmdlciddKCk7XHJcbiAgICAgICAgdGVzdENvbnRhaW5lci5maW5kKCcudGVzdF9faW1nJykuYWRkQ2xhc3MoJ2ZhZGVuJyk7XHJcbiAgICAgIH0sIDUwMCwgbW9kYWwsIHRlc3RDb250YWluZXIpO1xyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5vbignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBNYWluLk1vZGFsLmNsb3NlTW9kYWwobW9kYWwsIHRydWUpO1xyXG4gICAgICAgIG1vZGFsLm9uKCdjbG9zZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIE1haW4uTW9kYWwub3Blbk1vZGFsKG1vZGFsQW5pbWF0aW9uKTtcclxuICAgICAgICAgIGxldCBhbmltYXRpb24gPSBuZXcgTWFpbi5BbmltYXRpb24udGVzdEFuaW1hdGlvbihtb2RhbEFuaW1hdGlvbiwgYW5zd2VyKTtcclxuICAgICAgICAgIGFuaW1hdGlvblt0ZXN0SW5kZXhdKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbW9kYWxBbmltYXRpb24ub24oJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgTWFpbi5Nb2RhbC5jbG9zZU1vZGFsKG1vZGFsQW5pbWF0aW9uLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMzAwLCBtb2RhbCwgYW5zd2VyLCBtb2RhbEFuaW1hdGlvbiwgdGVzdEluZGV4KTtcclxuICAgIH0pO1xyXG4gICAgbW9kYWxBbmltYXRpb24ub24oJ2Nsb3NlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KE1haW4uTW9kYWwub3Blbk1vZGFsLCA1MDAsIG1vZGFsQW5zd2VyKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIE1haW4uTW9kYWwub3Blbk1vZGFsKG1vZGFsQW5zd2VyKTtcclxuICAgIH0sIDUwMCwgbW9kYWxBbnN3ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd05leHQoZWwpIHtcclxuICAkKGVsKS5jbG9zZXN0KCcudGVzdCcpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAkKGVsKS5jbG9zZXN0KCcudGVzdCcpLm5leHQoKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgJChlbCkuY2xvc2VzdCgnLnRlc3QnKS5uZXh0KCkudHJpZ2dlcignYWN0aXZlJyk7XHJcbn1cclxuZnVuY3Rpb24gc2hvd1Jlc3VsdCgpIHtcclxuICBsZXQgdG90YWwgPSB0ZXN0LmZpbmQoJy50ZXN0JykubGVuZ3RoO1xyXG4gIHByZXBhcmVSZXN1bHRNb2RhbChzdW0sIHRvdGFsKTtcclxuICBNYWluLk1vZGFsLm9wZW5Nb2RhbChyZXN1bHRNb2RhbCk7XHJcbn1cclxuZnVuY3Rpb24gcmVzZXRUZXN0KCkge1xyXG4gIHN1bSA9IDA7XHJcbiAgdGVzdEN0cmwuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gIH0pO1xyXG4gIHRlc3RTdGFydCgpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIE1haW4uTW9kYWwuY2xvc2VNb2RhbChyZXN1bHRNb2RhbCk7XHJcbiAgfSwgMzAwLCByZXN1bHRNb2RhbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgtC10YHRgtCwXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgc2tpcEFuaW1hdGlvbiA9IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlVmVyc2lvbigpO1xyXG4gIHRlc3RTdGFydCgpO1xyXG4gIFxyXG4gIHRlc3RDdHJsLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0VGltZW91dChwcm9jZXNzVGVzdCwgNDAwLCB0aGlzKTtcclxuICB9KTtcclxuICB0ZXN0TmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGlmKCFpc0xhc3RTbGlkZSgpKSB7XHJcbiAgICAgIHNob3dOZXh0KHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hvd1Jlc3VsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHRlc3RSZXNldC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHJlc2V0VGVzdCgpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIHJlc3VsdE1vZGFsLm9uKCdvcGVuZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygncmVzdWx0LW9wZW5lZCcpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdGVzdC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDN0RBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNqREE7Ozs7O0FBTUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBOzs7Ozs7Ozs7QUNwQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDNUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7Ozs7Ozs7OztBQ3BQQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9