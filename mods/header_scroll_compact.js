/* Auto-hide header on scroll for compact header */

function autoScroll() {
    if (scp > window.scrollY) {
        vivaldiHeader.style.top = '0px';
        subMenu.style = 'top: 50px !important';
    }
    else if (window.scrollY <= 65) {
        vivaldiHeader.style.top = '0px';
        subMenu.style = 'top: 50px !important';
    }
    else if (window.scrollY > 65) {
        vivaldiHeader.style.top = ' 50px';
        subMenu.style = 'top: 0px !important';
    }
    scp = window.scrollY;
};

var scp = 0;
const vivaldiHeader = document.getElementById('header-menu');
const subMenu = document.getElementById('submenu');
window.addEventListener('scroll', autoScroll);
