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
	var isClipPathSupport = void 0;

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
	    if (isClipPathSupport) {
	      tl.fromTo(waterBack, 0.9, { x: 100, y: 500, ease: 'easeInOut' }, { x: 0, y: 0 }, 1.5);
	      tl.fromTo(waterFront, 0.9, { x: 100, y: 500, ease: 'easeInOut' }, { x: 0, y: 0 }, 1.5);
	    } else {
	      tl.fromTo(waterBack, 1, { scale: 0 }, { scale: 1 });
	      tl.fromTo(waterFront, 1, { scale: 0 }, { scale: 1 });
	    }
	    tl.fromTo(bubbles, 1, { scale: 0, x: 50, y: 200 }, { scale: 1, x: 0, y: 0 }, 1.5);
	    tl.fromTo(tube, 0.3, { scale: 0 }, { scale: 1 }, 2.6);
	    tl.fromTo(flipperLeft, 0.25, { scale: 0 }, { scale: 1 }, 2.9);
	    tl.fromTo(flipperRight, 0.25, { scale: 0 }, { scale: 1 }, 3.15);
	    tl.fromTo(sparks, 0.2, { opacity: 0 }, { opacity: 1 }, 4.9);
	    tl.fromTo(smoke, 1.66, { scale: 0 }, { scale: 1 }, 4.9);
	    tlFlippers.fromTo(flipperLeft, 0.2, { skewX: '-5deg', skewY: '-5deg' }, { skewX: '10deg', skewY: '-5deg' });
	    tlFlippers.fromTo(flipperRight, 0.2, { skewX: '-10deg', skewY: '5deg' }, { skewX: '5deg', skewY: '5deg' }, 0.19);
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
	  $('.test__img').on('click', function () {
	    var modal = $(this).closest('.test').find('.test__animation');
	    var index = $(this).closest('.test').index();
	    Main.Modal.openModal(modal);
	    var animation = new testAnimation(modal);
	    animation[index]();
	    modal.on('click', function (e) {
	      e.stopPropagation();
	      animation[index]();
	    });
	    modal.closest('.modal__wrapper').on('click', function () {
	      Main.Modal.closeModal(modal);
	    });
	  });
	  isClipPathSupport = Main.DeviceDetection.isClipPathSupport();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMmI2MzZjZmMyZDRmZGE5NzE5ZiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuY2hvci5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jYWx2aW4ta2xlaW4vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjJiNjM2Y2ZjMmQ0ZmRhOTcxOWYiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgVG9nZ2xlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RvZ2dsZXJzXCIpO1xyXG5sZXQgQ2Fyb3VzZWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Nhcm91c2VsXCIpO1xyXG5sZXQgTW9kYWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21vZGFsXCIpO1xyXG5sZXQgQW5jaG9yID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmNob3JcIik7XHJcbi8vbGV0IElucHV0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9pbnB1dFwiKTtcclxuLy9sZXQgU2VsZWN0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWxlY3RcIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IFRlc3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGVzdCcpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgVG9nZ2xlcnMuaW5pdCgpO1xyXG4gIC8vQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIE1vZGFsLmluaXQoKTtcclxuICAvL0FuY2hvci5pbml0KCk7XHJcbiAgLy9JbnB1dC5pbml0KCk7XHJcbiAgLy9TZWxlY3QuaW5pdCgpO1xyXG4gIEFuaW1hdGlvbi5pbml0KCk7XHJcbiAgVGVzdC5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgIFRvZ2dsZXJzLFxyXG4gICAvL0Nhcm91c2VsLFxyXG4gICBNb2RhbCxcclxuICAgLy9BbmNob3IsXHJcbiAgIEFuaW1hdGlvbixcclxuICAgVGVzdFxyXG4gICAvL0lucHV0LFxyXG4gICAvL1NlbGVjdFxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbWFpbi5qcyIsImxldCBicmVha3BvaW50cyA9IHtcclxuXHRzbTogNTc2LFxyXG5cdG1kOiA3NjgsXHJcblx0bGc6IDk5MixcclxuXHR4bDogMTIwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuXHRyZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLnNtKTtcclxufVxyXG5mdW5jdGlvbiBpc1RhYmxldCgpe1xyXG5cdHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5zbSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc1RvdWNoKCl7XHJcblx0cmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XHJcbn1cclxuZnVuY3Rpb24gaXNNb2JpbGVWZXJzaW9uKCkge1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcvbW9iaWxlLycpO1xyXG59XHJcbmZ1bmN0aW9uIGlzQ2xpcFBhdGhTdXBwb3J0KCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gJ2NsaXBQYXRoJyxcclxuICAgICAgICBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXSxcclxuICAgICAgICBwcm9wZXJ0aWVzID0gWyBiYXNlIF0sXHJcbiAgICAgICAgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAndGVzdGVsZW1lbnQnICksXHJcbiAgICAgICAgYXR0cmlidXRlID0gJ3BvbHlnb24oNTAlIDAlLCAwJSAxMDAlLCAxMDAlIDEwMCUpJztcclxuXHJcbiAgICAvLyBQdXNoIHRoZSBwcmVmaXhlZCBwcm9wZXJ0aWVzIGludG8gdGhlIGFycmF5IG9mIHByb3BlcnRpZXMuXHJcbiAgICBmb3IgKCB2YXIgaSA9IDAsIGwgPSBwcmVmaXhlcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XHJcbiAgICAgICAgdmFyIHByZWZpeGVkUHJvcGVydHkgPSBwcmVmaXhlc1tpXSArIGJhc2UuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIGJhc2Uuc2xpY2UoIDEgKTsgLy8gcmVtZW1iZXIgdG8gY2FwaXRhbGl6ZSFcclxuICAgICAgICBwcm9wZXJ0aWVzLnB1c2goIHByZWZpeGVkUHJvcGVydHkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbnRlcmF0ZSBvdmVyIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZWUgaWYgdGhleSBwYXNzIHR3byB0ZXN0cy5cclxuICAgIGZvciAoIHZhciBpID0gMCwgbCA9IHByb3BlcnRpZXMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xyXG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XHJcblxyXG4gICAgICAgIC8vIEZpcnN0LCB0aGV5IG5lZWQgdG8gZXZlbiBzdXBwb3J0IGNsaXAtcGF0aCAoSUUgPD0gMTEgZG9lcyBub3QpLi4uXHJcbiAgICAgICAgaWYgKCB0ZXN0RWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPT09ICcnICkge1xyXG5cclxuICAgICAgICAgICAgLy8gU2Vjb25kLCB3ZSBuZWVkIHRvIHNlZSB3aGF0IGhhcHBlbnMgd2hlbiB3ZSB0cnkgdG8gY3JlYXRlIGEgQ1NTIHNoYXBlLi4uXHJcbiAgICAgICAgICAgIHRlc3RFbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgaWYgKCB0ZXN0RWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gIT09ICcnICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcblx0aWYoaXNUb3VjaCgpKXtcclxuXHRcdCQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG5cdH1cclxuICBpZighaXNDbGlwUGF0aFN1cHBvcnQoKSkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCduby1jbGlwLXBhdGgnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc01vYmlsZVZlcnNpb24sIGlzQ2xpcFBhdGhTdXBwb3J0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIFRvZ2dsZXJzXHJcbiAqL1xyXG4gXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIFRvZ2dsZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG5cdC8vdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoJCgnLmhlYWRlcicpLCAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDMpO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCB0b2dnbGVDbGFzc0lmLCB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3RvZ2dsZXJzLmpzIiwiLyoqXHJcbiAqINCa0LDRgNGD0YHQtdC70YxcclxuICogQG1vZHVsZSBDYXJvdXNlbFxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGxldCBjYXJvdXNlbEhvbWUgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0taG9tZVwiKTtcclxuICBsZXQgY2Fyb3VzZWxEZWZhdWx0ID0gJChcIi5vd2wtY2Fyb3VzZWwuY2Fyb3VzZWwtLWRlZmF1bHRcIik7XHJcblxyXG4gIGNhcm91c2VsSG9tZS5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IFsnJywgJyddLFxyXG4gICAgZG90czogZmFsc2UsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICBhdXRvcGxheVRpbWVvdXQ6IDMwMDAsXHJcbiAgICBsYXp5TG9hZDogdHJ1ZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxuICBjYXJvdXNlbERlZmF1bHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBuYXZUZXh0OiBbJycsICcnXSxcclxuICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGxhenlMb2FkOiB0cnVlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCIvKipcclxuICog0JLRgdC/0LvRi9Cy0LDRjtGJ0LjQtSDQvtC60L3QsFxyXG4gKiBAbW9kdWxlIE1vZGFsXHJcbiAqL1xyXG5cclxubGV0IGxheW91dCA9ICQoJy5sYXlvdXQnKTtcclxubGV0IG1vZGFsV3JhcHBlckNsYXNzID0gJy5tb2RhbF9fd3JhcHBlcic7XHJcbi8vbGV0IG1vZGFsV3JhcHBlciA9ICQoJy5tb2RhbF9fd3JhcHBlcicpO1xyXG4gXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuID0gZmFsc2UpIHtcclxuICBsZXQgbW9kYWxXcmFwcGVyID0gbW9kYWwuY2xvc2VzdChtb2RhbFdyYXBwZXJDbGFzcyk7XHJcbiAgbW9kYWxXcmFwcGVyLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcclxuICBtb2RhbC5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgbGV0IHdyYXBwZXJDbGFzc2VzID0gJ2lzLW9wZW5lZCc7XHJcbiAgaWYgKGlzRnVsbHNjcmVlbikge1xyXG4gICAgd3JhcHBlckNsYXNzZXMgKz0gJyBpcy1mdWxsc2NyZWVuJztcclxuICB9XHJcbiAgbGF5b3V0LmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgbW9kYWxXcmFwcGVyLmFkZENsYXNzKHdyYXBwZXJDbGFzc2VzKTtcclxuICBtb2RhbC5hZGRDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgbW9kYWwudHJpZ2dlcignb3BlbmVkJyk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCwgb3Blbk5leHQgPSBmYWxzZSkge1xyXG4gIGxldCBtb2RhbFdyYXBwZXIgPSBtb2RhbC5jbG9zZXN0KG1vZGFsV3JhcHBlckNsYXNzKTtcclxuICBtb2RhbC5yZW1vdmVDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgbW9kYWwudHJpZ2dlcignY2xvc2VkJyk7XHJcbiAgaWYgKCFvcGVuTmV4dCkge1xyXG4gICAgbGF5b3V0LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5lZCBpcy1mdWxsc2NyZWVuJyk7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gIH1cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBtb2RhbC5hZGRDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgICBtb2RhbFdyYXBwZXIuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gIH0sIDMwMCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtbW9kYWwnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpO1xyXG4gICAgICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgICAgIGxldCBpc0Z1bGxzY3JlZW4gPSBtb2RhbC5hdHRyKCdkYXRhLWZ1bGxzY3JlZW4nKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdpcy1vcGVuZWQnKSkge1xyXG4gICAgICAgIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbG9zZU1vZGFsKG1vZGFsKTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbEhhc2goKSB7XHJcbiAgICAgICAgbGV0IGhhc2ggPSBbJ2NvbXBldGl0aW9uJ10sXHJcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbixcclxuICAgICAgICAgICAgbW9kYWwsXHJcbiAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7aSA8IGhhc2gubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCAnIycraGFzaFtpXSA9PSB3aW5kb3cubG9jYXRpb24uaGFzaCAmJiAkKCcjJytoYXNoW2ldKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsID0gJCgnIycraGFzaFtpXSk7XHJcbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW4gPSBtb2RhbC5hdHRyKCdkYXRhLWZ1bGxzY3JlZW4nKSAhPT0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbCwgaXNGdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuTW9kYWxIYXNoKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIG9wZW5Nb2RhbCwgY2xvc2VNb2RhbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwiLyoqXHJcbiAqIEFuY2hvciBzY3JvbGxpbmdcclxuICogQG1vZHVsZSBBbmNob3JcclxuICovXHJcblxyXG5mdW5jdGlvbiBzY3JvbGxUb0FuY2hvcihuZXdwb3MpIHtcclxuICBUd2Vlbk1heC50byh3aW5kb3csIDAuNSwge3Njcm9sbFRvOiB7eTogbmV3cG9zLCBvZmZzZXRZOiAyMDB9fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0Y/QutC+0YDQvdC+0LPQviDQvNC10L3RjlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBBbmNob3IuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcbiAgJCgnLmpzLWFuY2hvcicpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICBsZXQgc2Nyb2xsVG9JRCA9IGlkICsgJy10aXRsZSc7XHJcbiAgICBpZiAoISEkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpKSB7XHJcbiAgICAgIE1haW4uTW9kYWwuY2xvc2VNb2RhbCgkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpKTtcclxuICAgIH1cclxuICAgIGlmICgkKGlkKS5sZW5ndGggPiAwICYmICQoc2Nyb2xsVG9JRCkubGVuZ3RoID4gMCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIFxyXG4gICAgICBzZXRUaW1lb3V0KHNjcm9sbFRvQW5jaG9yLCA0MDAsIHNjcm9sbFRvSUQpO1xyXG4gICAgICA7XHJcbiAgICAgIFxyXG4gICAgICAvL2lmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuICAgICAgLy8gIGhpc3RvcnkucHVzaFN0YXRlKFwiXCIsIGRvY3VtZW50LnRpdGxlLCBpZCk7XHJcbiAgICAgIC8vfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5jaG9yLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgQW5pbWF0aW9uXHJcbiAqL1xyXG5cclxubGV0IGVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCc7XHJcbmxldCBpc0NsaXBQYXRoU3VwcG9ydDtcclxuXHJcbmZ1bmN0aW9uIHRlc3RBbmltYXRpb24gKGVsLCBpc0NvcnJlY3QgPSB0cnVlKSB7XHJcbiAgdGhpc1swXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBnYXpTdGF0aW9uID0gZWwuZmluZCgnLmdhei1zdGF0aW9uJyk7XHJcbiAgICBsZXQgc21va2VCYWNrID0gZWwuZmluZCgnLnNtb2tlLWJhY2snKTtcclxuICAgIGxldCBzbW9rZUZyb250ID0gZWwuZmluZCgnLnNtb2tlLWZyb250Jyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oY2FyLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjUnKTtcclxuICAgIHRsLmZyb21UbyhnYXpTdGF0aW9uLCAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhzbW9rZUJhY2ssIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDIuNzUpO1xyXG4gICAgdGwuZnJvbVRvKHNtb2tlRnJvbnQsIDIsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTEuNScpO1xyXG4gIH07XHJcbiAgdGhpc1sxXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBsZXQgdGxGbGlwcGVycyA9IG5ldyBUaW1lbGluZU1heCh7ZGVsYXk6IDMuMTUsIHJlcGVhdDogOCwgeW95bzogdHJ1ZX0pO1xyXG4gICAgbGV0IHRsU3BhcmtzID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgZGVsYXk6IDQuOSwgXHJcbiAgICAgIHJlcGVhdDogMTcsIFxyXG4gICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLmJnJyk7XHJcbiAgICBsZXQgY2FyID0gZWwuZmluZCgnLmNhcicpO1xyXG4gICAgbGV0IHdhdGVyQmFjayA9IGVsLmZpbmQoJy53YXRlci1iYWNrIGltZycpO1xyXG4gICAgbGV0IHdhdGVyRnJvbnQgPSBlbC5maW5kKCcud2F0ZXItZnJvbnQgaW1nJyk7XHJcbiAgICBsZXQgZmxpcHBlckxlZnQgPSBlbC5maW5kKCcuZmxpcHBlci1sZWZ0Jyk7XHJcbiAgICBsZXQgZmxpcHBlclJpZ2h0ID0gZWwuZmluZCgnLmZsaXBwZXItcmlnaHQnKTtcclxuICAgIGxldCBidWJibGVzID0gZWwuZmluZCgnLmJ1YmJsZXMnKTtcclxuICAgIGxldCB0dWJlID0gZWwuZmluZCgnLnR1YmUnKTtcclxuICAgIGxldCBzbW9rZSA9IGVsLmZpbmQoJy5zbW9rZScpO1xyXG4gICAgbGV0IHNwYXJrcyA9IGVsLmZpbmQoJy5zcGFya3MnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgaWYgKGlzQ2xpcFBhdGhTdXBwb3J0KSB7XHJcbiAgICAgIHRsLmZyb21Ubyh3YXRlckJhY2ssIDAuOSwge3g6IDEwMCwgeTogNTAwLCBlYXNlOiAnZWFzZUluT3V0J30sIHt4OiAwLCB5OiAwfSwgMS41KTtcclxuICAgICAgdGwuZnJvbVRvKHdhdGVyRnJvbnQsIDAuOSwge3g6IDEwMCwgeTogNTAwLCBlYXNlOiAnZWFzZUluT3V0J30sIHt4OiAwLCB5OiAwfSwgMS41KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRsLmZyb21Ubyh3YXRlckJhY2ssIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgICB0bC5mcm9tVG8od2F0ZXJGcm9udCwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB9XHJcbiAgICB0bC5mcm9tVG8oYnViYmxlcywgMSwge3NjYWxlOiAwLCB4OiA1MCwgeTogMjAwfSwge3NjYWxlOiAxLCB4OiAwLCB5OiAwfSwgMS41KTtcclxuICAgIHRsLmZyb21Ubyh0dWJlLCAwLjMsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDIuNik7XHJcbiAgICB0bC5mcm9tVG8oZmxpcHBlckxlZnQsIDAuMjUsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDIuOSk7XHJcbiAgICB0bC5mcm9tVG8oZmxpcHBlclJpZ2h0LCAwLjI1LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAzLjE1KTtcclxuICAgIHRsLmZyb21UbyhzcGFya3MsIDAuMiwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDQuOSk7XHJcbiAgICB0bC5mcm9tVG8oc21va2UsIDEuNjYsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDQuOSk7XHJcbiAgICB0bEZsaXBwZXJzLmZyb21UbyhmbGlwcGVyTGVmdCwgMC4yLCB7c2tld1g6ICctNWRlZycsIHNrZXdZOiAnLTVkZWcnfSwge3NrZXdYOiAnMTBkZWcnLCBza2V3WTogJy01ZGVnJ30pO1xyXG4gICAgdGxGbGlwcGVycy5mcm9tVG8oZmxpcHBlclJpZ2h0LCAwLjIsIHtza2V3WDogJy0xMGRlZycsIHNrZXdZOiAnNWRlZyd9LCB7c2tld1g6ICc1ZGVnJywgc2tld1k6ICc1ZGVnJ30sIDAuMTkpO1xyXG4gICAgdGxTcGFya3MuZnJvbVRvKHNwYXJrcywgMC4wNSwge3g6IDAsIHk6IDB9LCB7eDogMjAsIHk6IDIwfSkudG8oc3BhcmtzLCAwLjA1LCB7eDogMjAsIHk6IDB9KTtcclxuICB9O1xyXG4gIHRoaXNbMl0gPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgbGV0IHRsU3BhcmsgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG4gICAgICBkZWxheTogMy43LCBcclxuICAgICAgcmVwZWF0OiA1MCwgXHJcbiAgICAgIHlveW86IHRydWUsXHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlbC50cmlnZ2VyKGVuZEV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgYmcgPSBlbC5maW5kKCcuYmcnKTtcclxuICAgIGxldCBjYXIgPSBlbC5maW5kKCcuY2FyJyk7XHJcbiAgICBsZXQgYnViYmxlQmlnID0gZWwuZmluZCgnLmJ1YmJsZS1iaWcnKTtcclxuICAgIGxldCBidWJibGVNZWRpdW0gPSBlbC5maW5kKCcuYnViYmxlLW1lZGl1bScpO1xyXG4gICAgbGV0IGJ1YmJsZVNtYWxsID0gZWwuZmluZCgnLmJ1YmJsZS1zbWFsbCcpO1xyXG4gICAgbGV0IHBsdWcgPSBlbC5maW5kKCcucGx1ZycpO1xyXG4gICAgbGV0IHNwYXJrID0gZWwuZmluZCgnLnNwYXJrJyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oY2FyLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAnLT0wLjUnKTtcclxuICAgIHRsLmZyb21UbyhidWJibGVCaWcsIDAuOSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgMS41KTtcclxuICAgIHRsLmZyb21UbyhidWJibGVNZWRpdW0sIDAuNiwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC44Jyk7XHJcbiAgICB0bC5mcm9tVG8oYnViYmxlU21hbGwsIDAuMywge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC40Jyk7XHJcbiAgICB0bC5mcm9tVG8ocGx1ZywgMSwge3NjYWxlOiAwLCByb3RhdGlvbjogMzE1fSwge3NjYWxlOiAxLCByb3RhdGlvbjogMzYwfSwgMi41KTtcclxuICAgIHRsLmZyb21UbyhzcGFyaywgMSwge3NjYWxlOiAwLCByb3RhdGlvbjogMzQ1fSwge3NjYWxlOiAxLCByb3RhdGlvbjogMzYwfSk7XHJcbiAgICB0bFNwYXJrLmZyb21UbyhzcGFyaywgMC4wNywge3NrZXdZOiBcIi01ZGVnXCIsIHNrZXdYOiBcIi01ZGVnXCIsIHNjYWxlOiAxfSwge3NrZXdZOiBcIjVkZWdcIiwgc2tld1g6IFwiNWRlZ1wiLCBzY2FsZTogMC43fSk7XHJcbiAgfTtcclxuICB0aGlzWzNdID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLmJnJyk7XHJcbiAgICBsZXQgY2FyID0gZWwuZmluZCgnLmNhcicpO1xyXG4gICAgbGV0IHRhbmsgPSBlbC5maW5kKCcudGFuaycpO1xyXG4gICAgbGV0IGJhcnJlbHMgPSBlbC5maW5kKCcuYmFycmVscycpO1xyXG4gICAgbGV0IHBpcGUgPSBlbC5maW5kKCcucGlwZScpO1xyXG4gICAgbGV0IHB1ZGRsZSA9IGVsLmZpbmQoJy5wdWRkbGUnKTtcclxuICAgIGxldCBkcm9wcyA9IGVsLmZpbmQoJy5kcm9wcycpO1xyXG4gICAgXHJcbiAgICB0bC5mcm9tVG8oYmcsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgdGwuZnJvbVRvKGNhciwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC41Jyk7XHJcbiAgICB0bC5mcm9tVG8oYmFycmVscywgMC4wMSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDEuNSk7XHJcbiAgICB0bC5mcm9tVG8odGFuaywgMC44LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAxLjcpO1xyXG4gICAgdGwuZnJvbVRvKHBpcGUsIDAuNzUsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCAyLjc1KTtcclxuICAgIHRsLmZyb21Ubyhkcm9wcywgMC4yLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgNCk7XHJcbiAgICB0bC5mcm9tVG8oZHJvcHMsIDIuNCwge3NjYWxlOiAwLjd9LCB7c2NhbGU6IDF9LCAnLT0wLjInKTtcclxuICAgIHRsLmZyb21UbyhwdWRkbGUsIDIuMiwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgNC4yKTtcclxuICB9O1xyXG4gIHRoaXNbNF0gPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7XHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlbC50cmlnZ2VyKGVuZEV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgYmcgPSBlbC5maW5kKCcuYmcnKTtcclxuICAgIGxldCBjYXIgPSBlbC5maW5kKCcuY2FyJyk7XHJcbiAgICBsZXQgdHViZSA9IGVsLmZpbmQoJy50dWJlJyk7XHJcbiAgICBsZXQgdGVtcCA9IGVsLmZpbmQoJy50ZW1wJyk7XHJcbiAgICBsZXQgYXJyb3cgPSBlbC5maW5kKCcuYXJyb3cnKTtcclxuICAgIGxldCBjb2xvckJhY2sgPSBlbC5maW5kKCcuY29sb3ItYmFjaycpO1xyXG4gICAgbGV0IGNvbG9yRnJvbnQgPSBlbC5maW5kKCcuY29sb3ItZnJvbnQnKTtcclxuICAgIGxldCBzbW9rZVRvcCA9IGVsLmZpbmQoJy5zbW9rZS10b3AnKTtcclxuICAgIGxldCBzbW9rZUxlZnQgPSBlbC5maW5kKCcuc21va2UtbGVmdCcpO1xyXG4gICAgXHJcbiAgICB0bC5mcm9tVG8oYmcsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0pO1xyXG4gICAgdGwuZnJvbVRvKGNhciwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgJy09MC41Jyk7XHJcbiAgICB0bC5mcm9tVG8odHViZSwgMC4zNywge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDEuNSk7XHJcbiAgICB0bC5mcm9tVG8odGVtcCwgMC41LCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAxLjgpO1xyXG4gICAgdGwuZnJvbVRvKGFycm93LCAwLjUsIHtzY2FsZTogMCwgcm90YXRpb246IC02Nn0sIHtzY2FsZTogMSwgcm90YXRpb246IC02Nn0sIDEuOCk7XHJcbiAgICBpZiAoaXNDb3JyZWN0KSB7XHJcbiAgICAgIHRsLmZyb21UbyhhcnJvdywgMC41LCB7cm90YXRpb246IC02Nn0sIHtyb3RhdGlvbjogMH0sIDIuOSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0bC5mcm9tVG8oYXJyb3csIDEsIHtyb3RhdGlvbjogLTY2fSwge3JvdGF0aW9uOiA1OH0sIDIuOSk7XHJcbiAgICAgIHRsLmZyb21Ubyhjb2xvckJhY2ssIDAuNSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDQpO1xyXG4gICAgICB0bC5mcm9tVG8oY29sb3JGcm9udCwgMC41LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgNCk7XHJcbiAgICAgIHRsLmZyb21UbyhzbW9rZVRvcCwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgNC41KTtcclxuICAgICAgdGwuZnJvbVRvKHNtb2tlTGVmdCwgMSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgNC41KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHRoaXNbNV0gPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCh7XHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBlbC50cmlnZ2VyKGVuZEV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgYmcgPSBlbC5maW5kKCcuYmcnKTtcclxuICAgIGxldCBjYXIgPSBlbC5maW5kKCcuY2FyJyk7XHJcbiAgICBsZXQgZnVubmVsID0gZWwuZmluZCgnLmZ1bm5lbCcpO1xyXG4gICAgbGV0IGJhbmcgPSBlbC5maW5kKCcuYmFuZycpO1xyXG4gICAgbGV0IGZsYXNrR3JlZW5FbXB0eSA9IGVsLmZpbmQoJy5mbGFzay1ncmVlbi1lbXB0eScpO1xyXG4gICAgbGV0IGZsYXNrR3JlZW5GdWxsID0gZWwuZmluZCgnLmZsYXNrLWdyZWVuLWZ1bGwnKTtcclxuICAgIGxldCBmbGFza0JsdWVFbXB0eSA9IGVsLmZpbmQoJy5mbGFzay1ibHVlLWVtcHR5Jyk7XHJcbiAgICBsZXQgZmxhc2tCbHVlRnVsbCA9IGVsLmZpbmQoJy5mbGFzay1ibHVlLWZ1bGwnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgdGwuZnJvbVRvKGZ1bm5lbCwgMSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDEuNSk7XHJcbiAgICB0bC5mcm9tVG8oYmFuZywgMS42Niwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSwgMy44Myk7XHJcbiAgICB0bC5mcm9tVG8oZmxhc2tHcmVlbkZ1bGwsIDAuNSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDIuNSk7XHJcbiAgICB0bC5mcm9tVG8oZmxhc2tCbHVlRnVsbCwgMC41LCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMi41KTtcclxuICAgIHRsLmZyb21UbyhmbGFza0dyZWVuRnVsbCwgMC44LCB7cm90YXRpb246IDB9LCB7cm90YXRpb246IDEyNX0sIDMpO1xyXG4gICAgdGwuZnJvbVRvKGZsYXNrQmx1ZUZ1bGwsIDAuOCwge3JvdGF0aW9uOiAwfSwge3JvdGF0aW9uOiAtMTI1fSwgMyk7XHJcbiAgICB0bC50byhmbGFza0dyZWVuRnVsbCwgMC4yNSwge29wYWNpdHk6IDB9LCAzLjgpO1xyXG4gICAgdGwudG8oZmxhc2tCbHVlRnVsbCwgMC4yNSwge29wYWNpdHk6IDB9LCAzLjgpO1xyXG4gICAgdGwuZnJvbVRvKGZsYXNrR3JlZW5FbXB0eSwgMC4yNSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDMuNyk7XHJcbiAgICB0bC5mcm9tVG8oZmxhc2tCbHVlRW1wdHksIDAuMjUsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCAzLjcpO1xyXG4gIH07XHJcbiAgdGhpc1s2XSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBpY2UgPSBlbC5maW5kKCcuaWNlJyk7XHJcbiAgICBsZXQgc21va2UgPSBlbC5maW5kKCcuc21va2UnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgdGwuZnJvbVRvKGljZSwgMSwge29wYWNpdHk6IDB9LCB7b3BhY2l0eTogMX0sIDEuNSk7XHJcbiAgICB0bC5mcm9tVG8oc21va2UsIDMsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sIDIuODMpO1xyXG4gIH07XHJcbiAgdGhpc1s3XSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGVsLnRyaWdnZXIoZW5kRXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBiZyA9IGVsLmZpbmQoJy5iZycpO1xyXG4gICAgbGV0IGNhciA9IGVsLmZpbmQoJy5jYXInKTtcclxuICAgIGxldCBnYXpTdGF0aW9uID0gZWwuZmluZCgnLmdhei1zdGF0aW9uJyk7XHJcbiAgICBsZXQgaG9zZXBpcGUgPSBlbC5maW5kKCcuaG9zZXBpcGUnKTtcclxuICAgIGxldCBzbW9rZUxlZnQgPSBlbC5maW5kKCcuc21va2UtbGVmdCcpO1xyXG4gICAgbGV0IHNtb2tlUmlnaHQgPSBlbC5maW5kKCcuc21va2UtcmlnaHQnKTtcclxuICAgIFxyXG4gICAgdGwuZnJvbVRvKGJnLCAxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9KTtcclxuICAgIHRsLmZyb21UbyhjYXIsIDEsIHtzY2FsZTogMH0sIHtzY2FsZTogMX0sICctPTAuNScpO1xyXG4gICAgdGwuZnJvbVRvKGdhelN0YXRpb24sIDEsIHtvcGFjaXR5OiAwfSwge29wYWNpdHk6IDF9LCAxLjUpO1xyXG4gICAgdGwuZnJvbVRvKGhvc2VwaXBlLCAxLCB7b3BhY2l0eTogMH0sIHtvcGFjaXR5OiAxfSwgMi44Myk7XHJcbiAgICB0bC5mcm9tVG8oc21va2VMZWZ0LCAyLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAzLjgzKTtcclxuICAgIHRsLmZyb21UbyhzbW9rZVJpZ2h0LCAyLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAzLjgzKTtcclxuICB9O1xyXG4gIHRoaXNbJ2ZpbmdlciddID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG4gICAgICBkZWxheTogMC4zLFxyXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZWwudHJpZ2dlcihlbmRFdmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGJnID0gZWwuZmluZCgnLnJvbWInKTtcclxuICAgIGxldCBmaW5nZXIgPSBlbC5maW5kKCcuZmluZ2VyJyk7XHJcbiAgICBcclxuICAgIHRsLmZyb21UbyhiZywgMC40MSwge3NjYWxlOiAwfSwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC5mcm9tVG8oZmluZ2VyLCAwLjQxLCB7c2NhbGU6IDB9LCB7c2NhbGU6IDF9LCAwLjQpO1xyXG4gICAgdGwudG8oZmluZ2VyLCAwLjYsIHtzY2FsZTogMS4yfSwgMS4zMyk7XHJcbiAgICB0bC50byhmaW5nZXIsIDAuNiwge3NjYWxlOiAxfSk7XHJcbiAgICB0bC50byhiZywgMC40NSwge3NjYWxlOiAwfSwgMy4xKTtcclxuICAgIHRsLnRvKGZpbmdlciwgMC40NSwge3NjYWxlOiAwfSwgMy40KTtcclxuICB9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgJCgnLnRlc3RfX2ltZycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgbW9kYWwgPSAkKHRoaXMpLmNsb3Nlc3QoJy50ZXN0JykuZmluZCgnLnRlc3RfX2FuaW1hdGlvbicpO1xyXG4gICAgbGV0IGluZGV4ID0gJCh0aGlzKS5jbG9zZXN0KCcudGVzdCcpLmluZGV4KCk7XHJcbiAgICBNYWluLk1vZGFsLm9wZW5Nb2RhbChtb2RhbCk7XHJcbiAgICB2YXIgYW5pbWF0aW9uID0gbmV3IHRlc3RBbmltYXRpb24obW9kYWwpO1xyXG4gICAgYW5pbWF0aW9uW2luZGV4XSgpO1xyXG4gICAgbW9kYWwub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGFuaW1hdGlvbltpbmRleF0oKTtcclxuICAgIH0pO1xyXG4gICAgbW9kYWwuY2xvc2VzdCgnLm1vZGFsX193cmFwcGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgTWFpbi5Nb2RhbC5jbG9zZU1vZGFsKG1vZGFsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGlzQ2xpcFBhdGhTdXBwb3J0ID0gTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNDbGlwUGF0aFN1cHBvcnQoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgdGVzdEFuaW1hdGlvbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIi8qKlxyXG4gKiDQotC10YHRglxyXG4gKiBAbW9kdWxlIFRlc3RcclxuICovXHJcblxyXG5sZXQgc3VtID0gMDtcclxubGV0IHRlc3QgPSAkKFwiLnRlc3RfX3dyYXBwZXJcIik7XHJcbmxldCB0ZXN0Q3RybCA9ICQoJy50ZXN0LWN0cmwnKTtcclxubGV0IHRlc3ROZXh0ID0gJCgnLnRlc3QtbmV4dCcpO1xyXG5sZXQgdGVzdFJlc2V0ID0gJCgnLmpzLXRlc3QtcmVzZXQnKTtcclxubGV0IHJlc3VsdE1vZGFsID0gJCgnI3Rlc3QtcmVzdWx0Jyk7XHJcbmxldCBhY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnO1xyXG5sZXQgc2tpcEFuaW1hdGlvbjtcclxuXHJcbmZ1bmN0aW9uIHRlc3RTdGFydCgpIHtcclxuICB0ZXN0LmNoaWxkcmVuKCcuJyArIGFjdGl2ZUNsYXNzKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgbGV0IGZpcnN0VGVzdCA9IHRlc3QuY2hpbGRyZW4oJy50ZXN0JykuZXEoMCk7XHJcbiAgZmlyc3RUZXN0LmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICB0ZXN0LnRyaWdnZXIoJ2xvYWRlZCcpO1xyXG4gIGZpcnN0VGVzdC50cmlnZ2VyKCdhY3RpdmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNMYXN0U2xpZGUoKSB7XHJcbiAgcmV0dXJuIHRlc3QuZmluZCgnLnRlc3QnKS5maWx0ZXIoJzpsYXN0JykuaGFzQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG59XHJcbmZ1bmN0aW9uIGdldE1vZGFsKGFuc3dlcikge1xyXG4gIHJldHVybiBhbnN3ZXIgPyAkKCcjdGVzdC1jb3JyZWN0JykgOiAkKCcjdGVzdC1pbmNvcnJlY3QnKTtcclxufVxyXG5mdW5jdGlvbiBwcmVwYXJlUmVzdWx0TW9kYWwoc3VtLCB0b3RhbCkge1xyXG4gIGlmIChzdW0vMiA9PT0gdG90YWwpIHtcclxuICAgIHJlc3VsdE1vZGFsLmFkZENsYXNzKCdoaWdoJyk7XHJcbiAgfSBlbHNlIGlmIChzdW0vMiA8IHRvdGFsICYmIHN1bS8yID49IHRvdGFsLzIpIHtcclxuICAgIHJlc3VsdE1vZGFsLmFkZENsYXNzKCdtZWRpdW0nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0TW9kYWwuYWRkQ2xhc3MoJ2xvdycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNDb3JyZWN0KGVsKSB7XHJcbiAgbGV0IGFuc3dlciA9IHBhcnNlSW50KCQoZWwpLmNsb3Nlc3QoJy50ZXN0JykuYXR0cignZGF0YS12YWx1ZScpKTtcclxuICBsZXQgdmFsdWUgPSBwYXJzZUludCgkKGVsKS5maW5kKCcudGVzdC1jdHJsX19pbnB1dDpjaGVja2VkJykuYXR0cigndmFsdWUnKSk7XHJcbiAgcmV0dXJuIGFuc3dlciA9PT0gdmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc1Rlc3QoZWwpIHtcclxuICBsZXQgdGVzdENvbnRhaW5lciA9ICQoZWwpLmNsb3Nlc3QoJy50ZXN0Jyk7XHJcbiAgbGV0IHRlc3RJbmRleCA9IHRlc3RDb250YWluZXIuaW5kZXgoKTtcclxuICBsZXQgYW5zd2VyID0gaXNDb3JyZWN0KGVsKTtcclxuICBpZiAoYW5zd2VyKSB7XHJcbiAgICBzdW0gKz0gMTtcclxuICB9XHJcbiAgbGV0IG1vZGFsID0gZ2V0TW9kYWwoYW5zd2VyKTtcclxuICBsZXQgbW9kYWxBbnN3ZXIgPSB0ZXN0Q29udGFpbmVyLmZpbmQoJy50ZXN0X19hbnN3ZXIubW9kYWwnKTtcclxuICBsZXQgbW9kYWxBbmltYXRpb24gPSB0ZXN0Q29udGFpbmVyLmZpbmQoJy50ZXN0X19hbmltYXRpb24ubW9kYWwnKTtcclxuICBpZiAoIXNraXBBbmltYXRpb24pIHtcclxuICAgIE1haW4uTW9kYWwub3Blbk1vZGFsKG1vZGFsKTtcclxuICAgIG1vZGFsLm9uKCdvcGVuZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBmaW5nZXJBbmltYXRpb24gPSBuZXcgTWFpbi5BbmltYXRpb24udGVzdEFuaW1hdGlvbihtb2RhbCk7XHJcbiAgICAgICAgZmluZ2VyQW5pbWF0aW9uWydmaW5nZXInXSgpO1xyXG4gICAgICAgIHRlc3RDb250YWluZXIuZmluZCgnLnRlc3RfX2ltZycpLmFkZENsYXNzKCdmYWRlbicpO1xyXG4gICAgICB9LCA1MDAsIG1vZGFsLCB0ZXN0Q29udGFpbmVyKTtcclxuICAgIH0pO1xyXG4gICAgbW9kYWwub24oJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgTWFpbi5Nb2RhbC5jbG9zZU1vZGFsKG1vZGFsLCB0cnVlKTtcclxuICAgICAgICBtb2RhbC5vbignY2xvc2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBNYWluLk1vZGFsLm9wZW5Nb2RhbChtb2RhbEFuaW1hdGlvbik7XHJcbiAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gbmV3IE1haW4uQW5pbWF0aW9uLnRlc3RBbmltYXRpb24obW9kYWxBbmltYXRpb24sIGFuc3dlcik7XHJcbiAgICAgICAgICBhbmltYXRpb25bdGVzdEluZGV4XSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1vZGFsQW5pbWF0aW9uLm9uKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIE1haW4uTW9kYWwuY2xvc2VNb2RhbChtb2RhbEFuaW1hdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMCwgbW9kYWwsIGFuc3dlciwgbW9kYWxBbmltYXRpb24sIHRlc3RJbmRleCk7XHJcbiAgICB9KTtcclxuICAgIG1vZGFsQW5pbWF0aW9uLm9uKCdjbG9zZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgc2V0VGltZW91dChNYWluLk1vZGFsLm9wZW5Nb2RhbCwgNTAwLCBtb2RhbEFuc3dlcik7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBNYWluLk1vZGFsLm9wZW5Nb2RhbChtb2RhbEFuc3dlcik7XHJcbiAgICB9LCA1MDAsIG1vZGFsQW5zd2VyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dOZXh0KGVsKSB7XHJcbiAgJChlbCkuY2xvc2VzdCgnLnRlc3QnKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgJChlbCkuY2xvc2VzdCgnLnRlc3QnKS5uZXh0KCkuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICQoZWwpLmNsb3Nlc3QoJy50ZXN0JykubmV4dCgpLnRyaWdnZXIoJ2FjdGl2ZScpO1xyXG59XHJcbmZ1bmN0aW9uIHNob3dSZXN1bHQoKSB7XHJcbiAgbGV0IHRvdGFsID0gdGVzdC5maW5kKCcudGVzdCcpLmxlbmd0aDtcclxuICBwcmVwYXJlUmVzdWx0TW9kYWwoc3VtLCB0b3RhbCk7XHJcbiAgTWFpbi5Nb2RhbC5vcGVuTW9kYWwocmVzdWx0TW9kYWwpO1xyXG59XHJcbmZ1bmN0aW9uIHJlc2V0VGVzdCgpIHtcclxuICBzdW0gPSAwO1xyXG4gIHRlc3RDdHJsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICB9KTtcclxuICB0ZXN0U3RhcnQoKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBNYWluLk1vZGFsLmNsb3NlTW9kYWwocmVzdWx0TW9kYWwpO1xyXG4gIH0sIDMwMCwgcmVzdWx0TW9kYWwpO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YLQtdGB0YLQsFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIHNraXBBbmltYXRpb24gPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZVZlcnNpb24oKTtcclxuICB0ZXN0U3RhcnQoKTtcclxuICBcclxuICB0ZXN0Q3RybC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHNldFRpbWVvdXQocHJvY2Vzc1Rlc3QsIDQwMCwgdGhpcyk7XHJcbiAgfSk7XHJcbiAgdGVzdE5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBpZighaXNMYXN0U2xpZGUoKSkge1xyXG4gICAgICBzaG93TmV4dCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNob3dSZXN1bHQoKTtcclxuICAgIH1cclxuICB9KTtcclxuICB0ZXN0UmVzZXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXNldFRlc3QoKTtcclxuICB9KTtcclxuICBcclxuICByZXN1bHRNb2RhbC5vbignb3BlbmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3Jlc3VsdC1vcGVuZWQnKTtcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3Rlc3QuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzdEQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakRBOzs7OztBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTs7Ozs7Ozs7O0FDcENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzVFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbkNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN6UEE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==