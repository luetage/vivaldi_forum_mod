/* Auto-hide header on scroll for compact header */

var scp = 0;
window.addEventListener('scroll', function(){
    if (scp > window.scrollY) {
        document.getElementById('header-menu').style.top = '0px';
    }
    else if (window.scrollY <= 51) {
        document.getElementById('header-menu').style.top = '0px';
    }
    else if (window.scrollY > 51) {
        document.getElementById('header-menu').style.top = '-51px';
    }
    scp = window.scrollY;
});
