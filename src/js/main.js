let DeviceDetection = require("./components/device-detection");
let Togglers = require("./components/togglers");
let Carousel = require("./components/carousel");
let Modal = require("./components/modal");
let Anchor = require("./components/anchor");
//let Input = require("./components/input");
//let Select = require("./components/select");
let Animation = require("./components/animation");
let Test = require('./components/test');

$(document).ready(function(){
  
  DeviceDetection.run();
  Togglers.init();
  //Carousel.init();
  Modal.init();
  //Anchor.init();
  //Input.init();
  //Select.init();
  
  $('.water-back, .water-front').each(function(){
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
   DeviceDetection,
   Togglers,
   //Carousel,
   Modal,
   //Anchor,
   Animation,
   Test
   //Input,
   //Select
};