/**
 * Карусель
 * @module Carousel
 */


/**
 * Инициализация карусели
 */
function init(){
  let carouselHome = $(".owl-carousel.carousel--home");
  let carouselDefault = $(".owl-carousel.carousel--default");

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

module.exports = {init};