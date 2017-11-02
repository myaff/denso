let breakpoints = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200
};

function isMobile(){
	return ($(window).width() <= breakpoints.sm);
}
function isTablet(){
	return ($(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md)
}
function isTouch(){
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}
function isMobileVersion() {
  return !!~window.location.href.indexOf('/mobile/');
}
function isClipPathSupport() {

    var base = 'clipPath',
        prefixes = [ 'webkit', 'moz', 'ms', 'o' ],
        properties = [ base ],
        testElement = document.createElement( 'testelement' ),
        attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

    // Push the prefixed properties into the array of properties.
    for ( var i = 0, l = prefixes.length; i < l; i++ ) {
        var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 ); // remember to capitalize!
        properties.push( prefixedProperty );
    }

    // Interate over the properties and see if they pass two tests.
    for ( var i = 0, l = properties.length; i < l; i++ ) {
        var property = properties[i];

        // First, they need to even support clip-path (IE <= 11 does not)...
        if ( testElement.style[property] === '' ) {

            // Second, we need to see what happens when we try to create a CSS shape...
            testElement.style[property] = attribute;
            if ( testElement.style[property] !== '' ) {
                return true;
            }
        }
    }

    return false;
};

function run(){
	if(isTouch()){
		$('html').removeClass('no-touch').addClass('touch');
	} else {
		$('html').removeClass('touch').addClass('no-touch');
	}
  if(!isClipPathSupport()) {
    $('html').addClass('no-clip-path');
  }
}

module.exports = {run, isTouch, isMobile, isTablet, isMobileVersion, isClipPathSupport};