/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let endEvent = 'animationend';
let isClipPathSupport;
/*
function test1Animation (el, isCorrect = true) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let gazStation = el.find('.gaz-station');
  let smokeBack = el.find('.smoke-back');
  let smokeFront = el.find('.smoke-front');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(smokeBack, 2, {scale: 0}, {scale: 1}, 2.75);
  tl.fromTo(smokeFront, 2, {scale: 0}, {scale: 1}, '-=1.5');
};
function test2Animation (el, isCorrect = true) {
  let tl = new TimelineMax();
  let tlFlippers = new TimelineMax({delay: 3.15, repeat: 8, yoyo: true});
  let tlSparks = new TimelineMax({
    delay: 4.9, 
    repeat: 17, 
    yoyo: true,
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let waterBack = el.find('.water-back img');
  let waterFront = el.find('.water-front img');
  let flipperLeft = el.find('.flipper-left');
  let flipperRight = el.find('.flipper-right');
  let bubbles = el.find('.bubbles');
  let tube = el.find('.tube');
  let smoke = el.find('.smoke');
  let sparks = el.find('.sparks');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(waterBack, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
  tl.fromTo(waterFront, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
  tl.fromTo(bubbles, 1, {scale: 0, x: 50, y: 200}, {scale: 1, x: 0, y: 0}, 1.5);
  tl.fromTo(tube, 0.3, {scale: 0}, {scale: 1}, 2.6);
  tl.fromTo(flipperLeft, 0.25, {scale: 0}, {scale: 1}, 2.9);
  tl.fromTo(flipperRight, 0.25, {scale: 0}, {scale: 1}, 3.15);
  tl.fromTo(sparks, 0.2, {opacity: 0}, {opacity: 1}, 4.9);
  tl.fromTo(smoke, 1.66, {scale: 0}, {scale: 1}, 4.9);
  tlFlippers.fromTo(flipperLeft, 0.2, {skewX: '-5deg', skewY: '-5deg', transformOrigin: 'top center'}, {skewX: '10deg', skewY: '-5deg', transformOrigin: 'top center'});
  tlFlippers.fromTo(flipperRight, 0.2, {skewX: '-10deg', skewY: '5deg', transformOrigin: 'top left'}, {skewX: '5deg', skewY: '5deg', transformOrigin: 'top left'}, 0.19);
  tlSparks.fromTo(sparks, 0.05, {x: 0, y: 0}, {x: 20, y: 20}).to(sparks, 0.05, {x: 20, y: 0});
};
function test3Animation (el, isCorrect = true) {
  let tl = new TimelineMax();
  let tlSpark = new TimelineMax({
    delay: 3.7, 
    repeat: 50, 
    yoyo: true,
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let bubbleBig = el.find('.bubble-big');
  let bubbleMedium = el.find('.bubble-medium');
  let bubbleSmall = el.find('.bubble-small');
  let plug = el.find('.plug');
  let spark = el.find('.spark');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(bubbleBig, 0.9, {scale: 0}, {scale: 1}, 1.5);
  tl.fromTo(bubbleMedium, 0.6, {scale: 0}, {scale: 1}, '-=0.8');
  tl.fromTo(bubbleSmall, 0.3, {scale: 0}, {scale: 1}, '-=0.4');
  tl.fromTo(plug, 1, {scale: 0, rotation: 315}, {scale: 1, rotation: 360}, 2.5);
  tl.fromTo(spark, 1, {scale: 0, rotation: 345}, {scale: 1, rotation: 360});
  tlSpark.fromTo(spark, 0.07, {skewY: "-5deg", skewX: "-5deg"}, {skewY: "5deg", skewX: "5deg"});
};
function test4Animation (el, isCorrect = true) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let tank = el.find('.tank');
  let barrels = el.find('.barrels');
  let pipe = el.find('.pipe');
  let puddle = el.find('.puddle');
  let drops = el.find('.drops');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(barrels, 0.01, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(tank, 0.8, {scale: 0}, {scale: 1}, 1.7);
  tl.fromTo(pipe, 0.75, {opacity: 0}, {opacity: 1}, 2.75);
  tl.fromTo(drops, 0.2, {opacity: 0}, {opacity: 1}, 4);
  tl.fromTo(drops, 2.4, {scale: 0.7}, {scale: 1}, '-=0.2');
  tl.fromTo(puddle, 2.2, {scale: 0}, {scale: 1}, 4.2);
};
function test5Animation (el, isCorrect = false) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let tube = el.find('.tube');
  let temp = el.find('.temp');
  let arrow = el.find('.arrow');
  let colorBack = el.find('.color-back');
  let colorFront = el.find('.color-front');
  let smokeTop = el.find('.smoke-top');
  let smokeLeft = el.find('.smoke-left');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(tube, 0.37, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(temp, 0.5, {scale: 0}, {scale: 1}, 1.8);
  tl.fromTo(arrow, 0.5, {scale: 0, rotation: -66}, {scale: 1, rotation: -66}, 1.8);
  if (isCorrect) {
    tl.fromTo(arrow, 0.5, {rotation: -66}, {rotation: 0}, 2.9);
  } else {
    tl.fromTo(arrow, 1, {rotation: -66}, {rotation: 58}, 2.9);
    tl.fromTo(colorBack, 0.5, {opacity: 0}, {opacity: 1}, 4);
    tl.fromTo(colorFront, 0.5, {opacity: 0}, {opacity: 1}, 4);
    tl.fromTo(smokeTop, 1, {scale: 0}, {scale: 1}, 4.5);
    tl.fromTo(smokeLeft, 1, {scale: 0}, {scale: 1}, 4.5);
  }
};
function test6Animation (el, isCorrect = true) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let funnel = el.find('.funnel');
  let bang = el.find('.bang');
  let flaskGreenEmpty = el.find('.flask-green-empty');
  let flaskGreenFull = el.find('.flask-green-full');
  let flaskBlueEmpty = el.find('.flask-blue-empty');
  let flaskBlueFull = el.find('.flask-blue-full');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(funnel, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(bang, 1.66, {scale: 0}, {scale: 1}, 3.83);
  tl.fromTo(flaskGreenFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(flaskBlueFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(flaskGreenFull, 0.8, {rotation: 0}, {rotation: 125}, 1.75);
  tl.fromTo(flaskBlueFull, 0.8, {rotation: 0}, {rotation: -125}, 1.75);
  tl.fromTo(flaskGreenFull, 0.25, {opacity: 1}, {opacity: 0});
  tl.fromTo(flaskBlueFull, 0.25, {opacity: 1}, {opacity: 0});
  tl.fromTo(flaskGreenEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
  tl.fromTo(flaskBlueEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
};
function test7Animation (el, isCorrect = true) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let ice = el.find('.ice');
  let smoke = el.find('.smoke');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(ice, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(smoke, 3, {scale: 0}, {scale: 1}, 2.83);
};
function test8Animation (el, isCorrect = true) {
  let tl = new TimelineMax({
    onComplete: function () {
      el.trigger(endEvent);
    }
  });
  let bg = el.find('.bg');
  let car = el.find('.car');
  let gazStation = el.find('.gaz-station');
  let hosepipe = el.find('.hosepipe');
  let smokeLeft = el.find('.smoke-left');
  let smokeRight = el.find('.smoke-right');
  
  tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
  tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
  tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
  tl.fromTo(hosepipe, 1, {opacity: 0}, {opacity: 1}, 2.83);
  tl.fromTo(smokeLeft, 2, {scale: 0}, {scale: 1}, 3.83);
  tl.fromTo(smokeRight, 2, {scale: 0}, {scale: 1}, 3.83);
};
*/
/*
function testAnimation (el, isCorrect = true) {
  this.a0 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let gazStation = el.find('.gaz-station');
    let smokeBack = el.find('.smoke-back');
    let smokeFront = el.find('.smoke-front');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(smokeBack, 2, {scale: 0}, {scale: 1}, 2.75);
    tl.fromTo(smokeFront, 2, {scale: 0}, {scale: 1}, '-=1.5');
  };
  this.a1 = function() {
    let tl = new TimelineMax();
    let tlFlippers = new TimelineMax({delay: 3.15, repeat: 8, yoyo: true});
    let tlSparks = new TimelineMax({
      delay: 4.9, 
      repeat: 17, 
      yoyo: true,
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let waterBack = el.find('.water-back img');
    let waterFront = el.find('.water-front img');
    let flipperLeft = el.find('.flipper-left');
    let flipperRight = el.find('.flipper-right');
    let bubbles = el.find('.bubbles');
    let tube = el.find('.tube');
    let smoke = el.find('.smoke');
    let sparks = el.find('.sparks');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(waterBack, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
    tl.fromTo(waterFront, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
    tl.fromTo(bubbles, 1, {scale: 0, x: 50, y: 200}, {scale: 1, x: 0, y: 0}, 1.5);
    tl.fromTo(tube, 0.3, {scale: 0}, {scale: 1}, 2.6);
    tl.fromTo(flipperLeft, 0.25, {scale: 0}, {scale: 1}, 2.9);
    tl.fromTo(flipperRight, 0.25, {scale: 0}, {scale: 1}, 3.15);
    tl.fromTo(sparks, 0.2, {opacity: 0}, {opacity: 1}, 4.9);
    tl.fromTo(smoke, 1.66, {scale: 0}, {scale: 1}, 4.9);
    tlFlippers.fromTo(flipperLeft, 0.2, {skewX: '-5deg', skewY: '-5deg', transformOrigin: 'top center'}, {skewX: '10deg', skewY: '-5deg', transformOrigin: 'top center'});
    tlFlippers.fromTo(flipperRight, 0.2, {skewX: '-10deg', skewY: '5deg', transformOrigin: 'top left'}, {skewX: '5deg', skewY: '5deg', transformOrigin: 'top left'}, 0.19);
    tlSparks.fromTo(sparks, 0.05, {x: 0, y: 0}, {x: 20, y: 20}).to(sparks, 0.05, {x: 20, y: 0});
  };
  this.a2 = function() {
    let tl = new TimelineMax();
    let tlSpark = new TimelineMax({
      delay: 3.7, 
      repeat: 50, 
      yoyo: true,
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let bubbleBig = el.find('.bubble-big');
    let bubbleMedium = el.find('.bubble-medium');
    let bubbleSmall = el.find('.bubble-small');
    let plug = el.find('.plug');
    let spark = el.find('.spark');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(bubbleBig, 0.9, {scale: 0}, {scale: 1}, 1.5);
    tl.fromTo(bubbleMedium, 0.6, {scale: 0}, {scale: 1}, '-=0.8');
    tl.fromTo(bubbleSmall, 0.3, {scale: 0}, {scale: 1}, '-=0.4');
    tl.fromTo(plug, 1, {scale: 0, rotation: 315}, {scale: 1, rotation: 360}, 2.5);
    tl.fromTo(spark, 1, {scale: 0, rotation: 345}, {scale: 1, rotation: 360});
    tlSpark.fromTo(spark, 0.07, {skewY: "-5deg", skewX: "-5deg"}, {skewY: "5deg", skewX: "5deg"});
  };
  this.a3 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let tank = el.find('.tank');
    let barrels = el.find('.barrels');
    let pipe = el.find('.pipe');
    let puddle = el.find('.puddle');
    let drops = el.find('.drops');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(barrels, 0.01, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(tank, 0.8, {scale: 0}, {scale: 1}, 1.7);
    tl.fromTo(pipe, 0.75, {opacity: 0}, {opacity: 1}, 2.75);
    tl.fromTo(drops, 0.2, {opacity: 0}, {opacity: 1}, 4);
    tl.fromTo(drops, 2.4, {scale: 0.7}, {scale: 1}, '-=0.2');
    tl.fromTo(puddle, 2.2, {scale: 0}, {scale: 1}, 4.2);
  };
  this.a4 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let tube = el.find('.tube');
    let temp = el.find('.temp');
    let arrow = el.find('.arrow');
    let colorBack = el.find('.color-back');
    let colorFront = el.find('.color-front');
    let smokeTop = el.find('.smoke-top');
    let smokeLeft = el.find('.smoke-left');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(tube, 0.37, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(temp, 0.5, {scale: 0}, {scale: 1}, 1.8);
    tl.fromTo(arrow, 0.5, {scale: 0, rotation: -66}, {scale: 1, rotation: -66}, 1.8);
    if (isCorrect) {
      tl.fromTo(arrow, 0.5, {rotation: -66}, {rotation: 0}, 2.9);
    } else {
      tl.fromTo(arrow, 1, {rotation: -66}, {rotation: 58}, 2.9);
      tl.fromTo(colorBack, 0.5, {opacity: 0}, {opacity: 1}, 4);
      tl.fromTo(colorFront, 0.5, {opacity: 0}, {opacity: 1}, 4);
      tl.fromTo(smokeTop, 1, {scale: 0}, {scale: 1}, 4.5);
      tl.fromTo(smokeLeft, 1, {scale: 0}, {scale: 1}, 4.5);
    }
  };
  this.a5 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let funnel = el.find('.funnel');
    let bang = el.find('.bang');
    let flaskGreenEmpty = el.find('.flask-green-empty');
    let flaskGreenFull = el.find('.flask-green-full');
    let flaskBlueEmpty = el.find('.flask-blue-empty');
    let flaskBlueFull = el.find('.flask-blue-full');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(funnel, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(bang, 1.66, {scale: 0}, {scale: 1}, 3.83);
    tl.fromTo(flaskGreenFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(flaskBlueFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(flaskGreenFull, 0.8, {rotation: 0}, {rotation: 125}, 1.75);
    tl.fromTo(flaskBlueFull, 0.8, {rotation: 0}, {rotation: -125}, 1.75);
    tl.fromTo(flaskGreenFull, 0.25, {opacity: 1}, {opacity: 0});
    tl.fromTo(flaskBlueFull, 0.25, {opacity: 1}, {opacity: 0});
    tl.fromTo(flaskGreenEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
    tl.fromTo(flaskBlueEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
  };
  this.a6 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let ice = el.find('.ice');
    let smoke = el.find('.smoke');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(ice, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(smoke, 3, {scale: 0}, {scale: 1}, 2.83);
  };
  this.a7 = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let gazStation = el.find('.gaz-station');
    let hosepipe = el.find('.hosepipe');
    let smokeLeft = el.find('.smoke-left');
    let smokeRight = el.find('.smoke-right');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(hosepipe, 1, {opacity: 0}, {opacity: 1}, 2.83);
    tl.fromTo(smokeLeft, 2, {scale: 0}, {scale: 1}, 3.83);
    tl.fromTo(smokeRight, 2, {scale: 0}, {scale: 1}, 3.83);
  };
};
*/
function testAnimation (el, isCorrect = true) {
  this[0] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let gazStation = el.find('.gaz-station');
    let smokeBack = el.find('.smoke-back');
    let smokeFront = el.find('.smoke-front');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(smokeBack, 2, {scale: 0}, {scale: 1}, 2.75);
    tl.fromTo(smokeFront, 2, {scale: 0}, {scale: 1}, '-=1.5');
  };
  this[1] = function() {
    let tl = new TimelineMax();
    let tlFlippers = new TimelineMax({delay: 3.15, repeat: 8, yoyo: true});
    let tlSparks = new TimelineMax({
      delay: 4.9, 
      repeat: 17, 
      yoyo: true,
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let waterBack = el.find('.water-back img');
    let waterFront = el.find('.water-front img');
    let flipperLeft = el.find('.flipper-left');
    let flipperRight = el.find('.flipper-right');
    let bubbles = el.find('.bubbles');
    let tube = el.find('.tube');
    let smoke = el.find('.smoke');
    let sparks = el.find('.sparks');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    if (isClipPathSupport) {
      tl.fromTo(waterBack, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
      tl.fromTo(waterFront, 0.9, {x: 100, y: 500}, {x: 0, y: 0}, 1.5);
    } else {
      tl.fromTo(waterBack, 1, {scale: 0}, {scale: 1});
      tl.fromTo(waterFront, 1, {scale: 0}, {scale: 1});
    }
    tl.fromTo(bubbles, 1, {scale: 0, x: 50, y: 200}, {scale: 1, x: 0, y: 0}, 1.5);
    tl.fromTo(tube, 0.3, {scale: 0}, {scale: 1}, 2.6);
    tl.fromTo(flipperLeft, 0.25, {scale: 0}, {scale: 1}, 2.9);
    tl.fromTo(flipperRight, 0.25, {scale: 0}, {scale: 1}, 3.15);
    tl.fromTo(sparks, 0.2, {opacity: 0}, {opacity: 1}, 4.9);
    tl.fromTo(smoke, 1.66, {scale: 0}, {scale: 1}, 4.9);
    tlFlippers.fromTo(flipperLeft, 0.2, {skewX: '-5deg', skewY: '-5deg', transformOrigin: 'top center'}, {skewX: '10deg', skewY: '-5deg', transformOrigin: 'top center'});
    tlFlippers.fromTo(flipperRight, 0.2, {skewX: '-10deg', skewY: '5deg', transformOrigin: 'top left'}, {skewX: '5deg', skewY: '5deg', transformOrigin: 'top left'}, 0.19);
    tlSparks.fromTo(sparks, 0.05, {x: 0, y: 0}, {x: 20, y: 20}).to(sparks, 0.05, {x: 20, y: 0});
  };
  this[2] = function() {
    let tl = new TimelineMax();
    let tlSpark = new TimelineMax({
      delay: 3.7, 
      repeat: 50, 
      yoyo: true,
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let bubbleBig = el.find('.bubble-big');
    let bubbleMedium = el.find('.bubble-medium');
    let bubbleSmall = el.find('.bubble-small');
    let plug = el.find('.plug');
    let spark = el.find('.spark');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(bubbleBig, 0.9, {scale: 0}, {scale: 1}, 1.5);
    tl.fromTo(bubbleMedium, 0.6, {scale: 0}, {scale: 1}, '-=0.8');
    tl.fromTo(bubbleSmall, 0.3, {scale: 0}, {scale: 1}, '-=0.4');
    tl.fromTo(plug, 1, {scale: 0, rotation: 315}, {scale: 1, rotation: 360}, 2.5);
    tl.fromTo(spark, 1, {scale: 0, rotation: 345}, {scale: 1, rotation: 360});
    tlSpark.fromTo(spark, 0.07, {skewY: "-5deg", skewX: "-5deg"}, {skewY: "5deg", skewX: "5deg"});
  };
  this[3] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let tank = el.find('.tank');
    let barrels = el.find('.barrels');
    let pipe = el.find('.pipe');
    let puddle = el.find('.puddle');
    let drops = el.find('.drops');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(barrels, 0.01, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(tank, 0.8, {scale: 0}, {scale: 1}, 1.7);
    tl.fromTo(pipe, 0.75, {opacity: 0}, {opacity: 1}, 2.75);
    tl.fromTo(drops, 0.2, {opacity: 0}, {opacity: 1}, 4);
    tl.fromTo(drops, 2.4, {scale: 0.7}, {scale: 1}, '-=0.2');
    tl.fromTo(puddle, 2.2, {scale: 0}, {scale: 1}, 4.2);
  };
  this[4] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let tube = el.find('.tube');
    let temp = el.find('.temp');
    let arrow = el.find('.arrow');
    let colorBack = el.find('.color-back');
    let colorFront = el.find('.color-front');
    let smokeTop = el.find('.smoke-top');
    let smokeLeft = el.find('.smoke-left');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(tube, 0.37, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(temp, 0.5, {scale: 0}, {scale: 1}, 1.8);
    tl.fromTo(arrow, 0.5, {scale: 0, rotation: -66}, {scale: 1, rotation: -66}, 1.8);
    if (isCorrect) {
      tl.fromTo(arrow, 0.5, {rotation: -66}, {rotation: 0}, 2.9);
    } else {
      tl.fromTo(arrow, 1, {rotation: -66}, {rotation: 58}, 2.9);
      tl.fromTo(colorBack, 0.5, {opacity: 0}, {opacity: 1}, 4);
      tl.fromTo(colorFront, 0.5, {opacity: 0}, {opacity: 1}, 4);
      tl.fromTo(smokeTop, 1, {scale: 0}, {scale: 1}, 4.5);
      tl.fromTo(smokeLeft, 1, {scale: 0}, {scale: 1}, 4.5);
    }
  };
  this[5] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let funnel = el.find('.funnel');
    let bang = el.find('.bang');
    let flaskGreenEmpty = el.find('.flask-green-empty');
    let flaskGreenFull = el.find('.flask-green-full');
    let flaskBlueEmpty = el.find('.flask-blue-empty');
    let flaskBlueFull = el.find('.flask-blue-full');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(funnel, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(bang, 1.66, {scale: 0}, {scale: 1}, 3.83);
    tl.fromTo(flaskGreenFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(flaskBlueFull, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(flaskGreenFull, 0.8, {rotation: 0}, {rotation: 125}, 1.75);
    tl.fromTo(flaskBlueFull, 0.8, {rotation: 0}, {rotation: -125}, 1.75);
    tl.fromTo(flaskGreenFull, 0.25, {opacity: 1}, {opacity: 0});
    tl.fromTo(flaskBlueFull, 0.25, {opacity: 1}, {opacity: 0});
    tl.fromTo(flaskGreenEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
    tl.fromTo(flaskBlueEmpty, 0.25, {opacity: 0}, {opacity: 1}, 3.5);
  };
  this[6] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let ice = el.find('.ice');
    let smoke = el.find('.smoke');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(ice, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(smoke, 3, {scale: 0}, {scale: 1}, 2.83);
  };
  this[7] = function() {
    let tl = new TimelineMax({
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.bg');
    let car = el.find('.car');
    let gazStation = el.find('.gaz-station');
    let hosepipe = el.find('.hosepipe');
    let smokeLeft = el.find('.smoke-left');
    let smokeRight = el.find('.smoke-right');
    
    tl.fromTo(bg, 1, {scale: 0}, {scale: 1});
    tl.fromTo(car, 1, {scale: 0}, {scale: 1}, '-=0.5');
    tl.fromTo(gazStation, 1, {opacity: 0}, {opacity: 1}, 1.5);
    tl.fromTo(hosepipe, 1, {opacity: 0}, {opacity: 1}, 2.83);
    tl.fromTo(smokeLeft, 2, {scale: 0}, {scale: 1}, 3.83);
    tl.fromTo(smokeRight, 2, {scale: 0}, {scale: 1}, 3.83);
  };
  this['finger'] = function() {
    let tl = new TimelineMax({
      delay: 0.3,
      onComplete: function () {
        el.trigger(endEvent);
      }
    });
    let bg = el.find('.romb');
    let finger = el.find('.finger');
    
    tl.fromTo(bg, 0.41, {scale: 0}, {scale: 1});
    tl.fromTo(finger, 0.41, {scale: 0}, {scale: 1}, 0.4);
    tl.to(finger, 0.6, {scale: 1.2}, 1.33);
    tl.to(finger, 0.6, {scale: 1});
    tl.to(bg, 0.45, {scale: 0}, 3.1);
    tl.to(finger, 0.45, {scale: 0}, 3.4);
  };
};

function init () {
  /*$('#test-2-animation').on('click', function(){
    test2Animation($(this));
  });
  var animation = new testAnimation($('#test-2-animation'));
  animation[1]();
  var animation = new testAnimation($('#test-correct'));
  animation['finger']();*/
  isClipPathSupport = Main.DeviceDetection.isClipPathSupport();
}

module.exports = {init, testAnimation};