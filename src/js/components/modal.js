/**
 * Всплывающие окна
 * @module Modal
 */

let layout = $('.layout');
let modalWrapperClass = '.modal__wrapper';
//let modalWrapper = $('.modal__wrapper');
 
function openModal(modal, isFullscreen = false) {
  let modalWrapper = modal.closest(modalWrapperClass);
  modalWrapper.removeClass('invisible');
  modal.removeClass('invisible');
  let wrapperClasses = 'is-opened';
  if (isFullscreen) {
    wrapperClasses += ' is-fullscreen';
  }
  layout.addClass('modal-open');
  modalWrapper.addClass(wrapperClasses);
  modal.addClass('is-opened');
  modal.trigger('opened');
  $('html, body').css('overflow-y', 'hidden');
}

function closeModal(modal, openNext = false) {
  let modalWrapper = modal.closest(modalWrapperClass);
  modal.removeClass('is-opened');
  modal.trigger('closed');
  if (!openNext) {
    layout.removeClass('modal-open');
    modalWrapper.removeClass('is-opened is-fullscreen');
    $('html, body').css('overflow-y', '');
  }
  setTimeout(function(){
    modal.addClass('invisible');
    modalWrapper.addClass('invisible');
  }, 300);
}

/**
 * инициализация событий для всплывающих окон
 * @example
 * Modal.init();
 */
function init(){
    
  $('.js-modal').click(function(e){
      e.preventDefault();
      let target = $(this).attr('data-target');
      let modal = $(target);
      let isFullscreen = modal.attr('data-fullscreen') !== undefined;
      if (!modal.hasClass('is-opened')) {
        openModal(modal, isFullscreen);
      } else {
        closeModal(modal);
      }
  });

    function openModalHash() {
        let hash = ['competition'],
            isFullscreen,
            modal,
            i;

        for (i = 0;i < hash.length; i++) {
            if ( '#'+hash[i] == window.location.hash && $('#'+hash[i]).length) {
                modal = $('#'+hash[i]);
                isFullscreen = modal.attr('data-fullscreen') !== undefined;

                openModal(modal, isFullscreen);
            }
        }
    }

    openModalHash();
}

module.exports = {init, openModal, closeModal};