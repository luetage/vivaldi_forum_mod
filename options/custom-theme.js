/* Activate theme */

function activate_theme(){
    var colorBg = document.getElementById('colorBg').value;
    var colorFg = document.getElementById('colorFg').value;
    var colorHi = document.getElementById('colorHi').value;
    var colorBtn = document.getElementById('colorBtn').value;
    var colorDrop = document.getElementById('colorDrop').value;
    var colorLi = document.getElementById('colorLi').value;
    var colorLi2 = document.getElementById('colorLi2').value;

    // calculate automatic colors
    function lum(color) {
        var colorL = color.substring(1);
        var rgb = parseInt(colorL, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;
        return Math.round(0.2126*r+0.7152*g+0.0722*b);
    };
    function gray(color) {
        var colorG = color.substring(1);
        var rgb = parseInt(colorG, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;
        var c = Math.round(0.30*r+0.59*g+0.11*b);
        return "#"+(0x1000000+c*0x10000+c*0x100+c).toString(16).slice(1);
    };
    function shade(color, percent) {
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    };
    // dropdown
    var drop = lum(colorDrop);
    if (drop < 130) {
        var colorDropFg = '#fbfbfb';
        var colorDropHi = shade(colorDrop, 0.2);
        var colorDropHi2 = shade(colorDrop, 0.3);
        var colorDropHi3 = shade(colorDrop, 0.5);
    }
    else {
        var colorDropFg = '#121212';
        var colorDropHi = shade(colorDrop, -0.1);
        var colorDropHi2 = shade(colorDrop, -0.2);
        var colorDropHi3 = shade(colorDrop, -0.3);
    }
    var colorDropHiG = gray(colorDropHi);
    // background
    var bg = lum(colorBg);
    var bg2 = gray(colorBg);
    if (bg < 130) {
        var colorBgHiG = shade(bg2, 0.2);
        var colorBgHiG2 = shade(bg2, 0.4);
        var colorBgHi = shade(colorBg, 0.2);
        var colorBgHiC = shade(colorBg, 0.1);
        var colorBgHiCG = shade(bg2, 0.1);
        var logoWhite = 1;
    }
    else {
        var colorBgHiG = shade(bg2, -0.1);
        var colorBgHiG2 = shade(bg2, -0.22);
        var colorBgHi = shade(colorBg, -0.1);
        var colorBgHiC = shade(colorBg, -0.05);
        var colorBgHiCG = shade(bg2, -0.05);
        var logoWhite = 0;
    }
    // foreground
    var fg = lum(colorFg);
    var fg2 = gray(colorFg);
    if (fg < 130) {
        var colorFg2 = shade(fg2, 0.25);
    }
    else {
        var colorFg2 = shade(fg2, -0.1);
    }
    // highlight
    var hi = lum(colorHi);
    if (hi < 130) {
        var colorHiFg = '#fbfbfb';
    }
    else {
        var colorHiFg = '#121212';
    }
    // link
    var link = lum(colorLi);
    var linkR = gray(colorLi);
    if (link < 130) {
        var colorLiHi = shade(colorLi, 0.25);
        var colorLiR = shade(linkR, 0.25);
    }
    else {
        var colorLiHi = shade(colorLi, -0.12);
        var colorLiR = shade(linkR, -0.07);
    }
    // link2
    var link2 = lum(colorLi2);
    if (link2 < 130) {
        var colorLi2Hi = shade(colorLi2, 0.25);
    }
    else {
        var colorLi2Hi = shade(colorLi2, -0.12);
    }
    // button
    var btn = lum(colorBtn);
    if (btn < 130) {
        var colorBtnHi = shade(colorBtn, 0.1);
        var colorBtnFg = '#fbfbfb';
    }
    else {
        var colorBtnHi = shade(colorBtn, -0.07);
        var colorBtnFg = '#121212';
    }
    // theme to custom
    document.getElementById('custom').checked = true;
    chrome.storage.sync.set({
        'standard': 0,
        'darkGrey': 0,
        'lightGrey': 0,
        'grayPink': 0,
        'mod': 0,
        'sprucey': 0,
        'custom': 1,
        'logoWhite': logoWhite,
        'colorBg': colorBg,
        'colorFg': colorFg,
        'colorHi': colorHi,
        'colorBtn': colorBtn,
        'colorDrop': colorDrop,
        'colorLi': colorLi,
        'colorLi2': colorLi2,
        'colorDropFg': colorDropFg,
        'colorDropHi': colorDropHi,
        'colorDropHi2': colorDropHi2,
        'colorDropHi3': colorDropHi3,
        'colorDropHiG': colorDropHiG,
        'colorBgHi': colorBgHi,
        'colorBgHiC': colorBgHiC,
        'colorBgHiCG': colorBgHiCG,
        'colorBgHiG': colorBgHiG,
        'colorBgHiG2': colorBgHiG2,
        'colorFg2': colorFg2,
        'colorHiFg': colorHiFg,
        'colorLiHi': colorLiHi,
        'colorLiR': colorLiR,
        'colorLi2Hi': colorLi2Hi,
        'colorBtnHi': colorBtnHi,
        'colorBtnFg': colorBtnFg
    },
      function(){
        var editStatus = document.getElementById('edit-status');
        editStatus.innerHTML = 'Theme activated!';
        editStatus.style = "text-align: left;"
        setTimeout(function() {
            if (editStatus.innerHTML === 'Theme activated!') {
                  editStatus.innerHTML = 'Reload tab/s.';
              }
              setTimeout(function() {
                editStatus.innerHTML = '';
              }, 4000);
        }, 2500);
    });
};


/* Restore theme */

function restore_theme(){
    var colorBgR = document.getElementById('colorBg');
    var colorFgR = document.getElementById('colorFg');
    var colorHiR = document.getElementById('colorHi');
    var colorBtnR = document.getElementById('colorBtn');
    var colorDropR = document.getElementById('colorDrop');
    var colorLiR = document.getElementById('colorLi');
    var colorLi2R = document.getElementById('colorLi2');

    chrome.storage.sync.get({
        'colorBg': '#fdf6e3',
        'colorFg': '#586e75',
        'colorHi': '#d33682',
        'colorBtn': '#6c71c4',
        'colorDrop': '#eee8d5',
        'colorLi': '#b58900',
        'colorLi2': '#2aa198'
    },
    function(restore){
        colorBgR.value = restore.colorBg;
        colorFgR.value = restore.colorFg;
        colorHiR.value = restore.colorHi;
        colorBtnR.value = restore.colorBtn;
        colorDropR.value = restore.colorDrop;
        colorLiR.value = restore.colorLi;
        colorLi2R.value = restore.colorLi2;
    });
};


/* Export theme */

function export_theme() {
    chrome.storage.sync.get({
        'colorBg': '#fdf6e3',
        'colorFg': '#586e75',
        'colorHi': '#d33682',
        'colorBtn': '#6c71c4',
        'colorDrop': '#eee8d5',
        'colorLi': '#b58900',
        'colorLi2': '#2aa198'
    },
    function(items){
        var result = JSON.stringify(items);
        var url = 'data:application/json;base64,' + btoa(result);
        chrome.downloads.download({
            url: url,
            saveAs: true
        });
    });
};


/* Import theme */

function import_theme(e) {
    var files = e.target.files, reader = new FileReader();
    reader.onload = _imp;
    reader.readAsText(files[0]);
};
function _imp() {
    var colors = JSON.parse(this.result);
    chrome.storage.sync.set(
        colors,
      function(){
        var editStatus = document.getElementById('edit-status');
        editStatus.innerHTML = 'Importing theme...';
        setTimeout(function() {
            restore_theme();
              setTimeout(function() {
                  activate_theme();
              }, 2500);
        }, 500);
    });
    document.getElementById('import').value = '';
};


document.addEventListener('DOMContentLoaded', restore_theme);
document.getElementById('edit-activate').addEventListener('click', activate_theme);
document.getElementById('edit-export').addEventListener('click', export_theme);
document.getElementById('edit-import').onclick = function() {
    document.getElementById('import').click()
};
document.getElementById('import').addEventListener("change", import_theme, false);
