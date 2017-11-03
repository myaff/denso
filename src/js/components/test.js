/**
 * Тест
 * @module Test
 */

let sum = 0;
let test = $(".test__wrapper");
let testCtrl = $('.test-ctrl');
let testNext = $('.test-next');
let testReset = $('.js-test-reset');
let resultModal = $('#test-result');
let activeClass = 'is-active';
let skipAnimation;

function testStart() {
  test.children('.' + activeClass).removeClass(activeClass);
  let firstTest = test.children('.test').eq(0);
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
  if (sum/2 === total) {
    resultModal.addClass('high');
  } else if (sum/2 < total && sum/2 >= total/2) {
    resultModal.addClass('medium');
  } else {
    resultModal.addClass('low');
  }
}

function isCorrect(el) {
  let answer = parseInt($(el).closest('.test').attr('data-value'));
  let value = parseInt($(el).find('.test-ctrl__input:checked').attr('value'));
  return answer === value;
}
function processTest(el) {
  let testContainer = $(el).closest('.test');
  let testIndex = testContainer.index();
  let answer = isCorrect(el);
  if (answer) {
    sum += 1;
  }
  let modal = getModal(answer);
  let modalAnswer = testContainer.find('.test__answer.modal');
  let modalAnimation = testContainer.find('.test__animation.modal');
  if (!skipAnimation) {
    Main.Modal.openModal(modal);
    modal.on('opened', function() {
      setTimeout(function(){
        let fingerAnimation = new Main.Animation.testAnimation(modal);
        fingerAnimation['finger']();
        testContainer.find('.test__img').addClass('faden');
      }, 500, modal, testContainer);
    });
    modal.on('animationend', function() {
      setTimeout(function(){
        Main.Modal.closeModal(modal, true);
        modal.on('closed', function() {
          Main.Modal.openModal(modalAnimation);
          let animation = new Main.Animation.testAnimation(modalAnimation, answer);
          animation[testIndex]();
        });
        modalAnimation.on('animationend', function() {
          Main.Modal.closeModal(modalAnimation, true);
        });
      }, 300, modal, answer, modalAnimation, testIndex);
    });
    modalAnimation.on('closed', function() {
      setTimeout(Main.Modal.openModal, 500, modalAnswer);
    });
  } else {
    setTimeout(function(){
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
  let total = test.find('.test').length;
  prepareResultModal(sum, total);
  Main.Modal.openModal(resultModal);
}
function resetTest() {
  sum = 0;
  testCtrl.each(function(){
    $(this).prop('checked', false);
  });
  testStart();
  setTimeout(function(){
    Main.Modal.closeModal(resultModal);
  }, 300, resultModal);
}

/**
 * Инициализация теста
 */
function init(){
  skipAnimation = Main.DeviceDetection.isMobileVersion();
  testStart();
  
  testCtrl.on('click', function() {
    setTimeout(processTest, 400, this);
  });
  testNext.on('click', function() {
    if(!isLastSlide()) {
      showNext(this);
    } else {
      showResult();
    }
  });
  testReset.on('click', function() {
    resetTest();
  });
  
  resultModal.on('opened', function() {
    $('body').addClass('result-opened');
  });
}

module.exports = {init};