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