/* Auto-hide header on scroll */

function autoScroll() {
    if (scp > window.scrollY) {
        vivaldiHeader.style.top = '0px';
        subMenu.style = 'top: 64px !important';
    }
    else if (window.scrollY <= 65) {
        vivaldiHeader.style.top = '0px';
        subMenu.style = 'top: 64px !important';
    }
    else if (window.scrollY > 65) {
        vivaldiHeader.style.top = '-64px';
        subMenu.style = 'top: 0px !important';
    }
    scp = window.scrollY;
};

var scp = 0;
const vivaldiHeader = document.getElementById('header-menu');
const subMenu = document.getElementById('submenu');
window.addEventListener('scroll', autoScroll);
