/* Auto-hide header on scroll */

var scp = 0;
window.addEventListener('scroll', function(){
    if (scp > window.scrollY) {
		document.getElementById("header-menu").style.top = "0px";
		}
    else if (window.scrollY <= 71) {
    	document.getElementById("header-menu").style.top = "0px";
    }
    else if (window.scrollY > 71) {
 		document.getElementById("header-menu").style.top = "-71px";
	}
	scp = window.scrollY;
});