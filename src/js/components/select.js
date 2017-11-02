/**
 * инициализация событий для кастомного селекта
 * @example
 * Select.init();
 */
function init(){
    
  $('.js-select2').select2({
    minimumResultsForSearch: Infinity
  });
  
}

module.exports = {init};