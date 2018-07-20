/* Theme */

chrome.storage.sync.get({
    'standard': '',
    'darkGrey': '',
    'lightGrey': '',
    'grayPink': '',
    'mod': '',
    'sprucey': '',
    'custom': '',
    'csscheck': '',
    'compact': '',
    'logoWhite': '',
    'colorBg': '#fdf6e3',
    'colorFg': '#586e75',
    'colorHi': '#d33682',
    'colorBtn': '#6c71c4',
    'colorDrop': '#eee8d5',
    'colorLi': '#b58900',
    'colorLi2': '#2aa198',
    'colorDropFg': '#121212',
    'colorDropHi': '#d6d1c0',
    'colorDropHi2': '#bebaaa',
    'colorDropHi3': '#a7a295',
    'colorDropHiG': '#d1d1d1',
    'colorBgHi': '#e4ddcc',
    'colorBgHiC': '#f0ead8',
    'colorBgHiCG': '#eaeaea',
    'colorBgHiG': '#dddddd',
    'colorBgHiG2': '#c0c0c0',
    'colorFg2': '#8e8e8e',
    'colorHiFg': '#fbfbfb',
    'colorLiHi': '#9f7900',
    'colorLiR': '#7e7e7e',
    'colorLi2Hi': '#258e86',
    'colorBtnHi': '#7b7fca',
    'colorBtnFg': '#fbfbfb'
},
function(theme) {
    var standard = theme.standard;
    var darkGrey = theme.darkGrey;
    var lightGrey = theme.lightGrey;
    var grayPink = theme.grayPink;
    var mod = theme.mod;
    var sprucey = theme.sprucey;
    var custom = theme.custom;
    var csscheck = theme.csscheck;
    var compact = theme.compact;
    var logoWhite = theme.logoWhite;
    var colorBg = theme.colorBg;
    var colorFg = theme.colorFg;
    var colorHi = theme.colorHi;
    var colorBtn = theme.colorBtn;
    var colorDrop = theme.colorDrop;
    var colorLi = theme.colorLi;
    var colorLi2 = theme.colorLi2;
    var colorDropFg = theme.colorDropFg;
    var colorDropHi = theme.colorDropHi;
    var colorDropHi2 = theme.colorDropHi2;
    var colorDropHi3 = theme.colorDropHi3;
    var colorDropHiG = theme.colorDropHiG;
    var colorBgHi = theme.colorBgHi;
    var colorBgHiC = theme.colorBgHiC;
    var colorBgHiCG = theme.colorBgHiCG;
    var colorBgHiG = theme.colorBgHiG;
    var colorBgHiG2 = theme.colorBgHiG2;
    var colorFg2 = theme.colorFg2;
    var colorHiFg = theme.colorHiFg;
    var colorLiHi = theme.colorLiHi;
    var colorLiR = theme.colorLiR;
    var colorLi2Hi = theme.colorLi2Hi;
    var colorBtnHi = theme.colorBtnHi;
    var colorBtnFg = theme.colorBtnFg;

    //header
    if (compact == 1) {
        var Tcompact = document.createElement('link');
        Tcompact.href = chrome.extension.getURL('mods/compact-header.css');
        Tcompact.type = 'text/css';
        Tcompact.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tcompact);
    }
    else {
        var Tstandard = document.createElement('link');
        Tstandard.href = chrome.extension.getURL('mods/standard-header.css');
        Tstandard.type = 'text/css';
        Tstandard.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tstandard);
    }

    //themes
    if (darkGrey == 1) {
        var TdarkGrey = document.createElement('link');
        TdarkGrey.href = chrome.extension.getURL('themes/dark-grey.css');
        TdarkGrey.type = 'text/css';
        TdarkGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(TdarkGrey);
    }
    else if (lightGrey == 1) {
        var TlightGrey = document.createElement('link');
        TlightGrey.href = chrome.extension.getURL('themes/light-grey.css');
        TlightGrey.type = 'text/css';
        TlightGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(TlightGrey);
    }
    else if (grayPink == 1) {
        var TgrayPink = document.createElement('link');
        TgrayPink.href = chrome.extension.getURL('themes/gray-pink.css');
        TgrayPink.type = 'text/css';
        TgrayPink.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(TgrayPink);
    }
    else if (mod == 1) {
        var Tmod = document.createElement('link');
        Tmod.href = chrome.extension.getURL('themes/mod.css');
        Tmod.type = 'text/css';
        Tmod.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tmod);
    }
    else if (sprucey == 1) {
        var Tsprucey = document.createElement('link');
        Tsprucey.href = chrome.extension.getURL('themes/sprucey-bonus-dark.css');
        Tsprucey.type = 'text/css';
        Tsprucey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tsprucey);
    }
    else if (custom == 1) {
        setTimeout(function wait() {
            if (document.body != null) {
                document.body.style.setProperty('--colorBg', colorBg);
                document.body.style.setProperty('--colorFg', colorFg);
                document.body.style.setProperty('--colorHi', colorHi);
                document.body.style.setProperty('--colorBtn', colorBtn);
                document.body.style.setProperty('--colorDrop', colorDrop);
                document.body.style.setProperty('--colorLi', colorLi);
                document.body.style.setProperty('--colorLi2', colorLi2);
                document.body.style.setProperty('--colorDropFg', colorDropFg);
                document.body.style.setProperty('--colorDropHi', colorDropHi);
                document.body.style.setProperty('--colorDropHi2', colorDropHi2);
                document.body.style.setProperty('--colorDropHi3', colorDropHi3);
                document.body.style.setProperty('--colorDropHiG', colorDropHiG);
                document.body.style.setProperty('--colorBgHi', colorBgHi);
                document.body.style.setProperty('--colorBgHiC', colorBgHiC);
                document.body.style.setProperty('--colorBgHiCG', colorBgHiCG);
                document.body.style.setProperty('--colorBgHiG', colorBgHiG);
                document.body.style.setProperty('--colorBgHiG2', colorBgHiG2);
                document.body.style.setProperty('--colorFg2', colorFg2);
                document.body.style.setProperty('--colorHiFg', colorHiFg);
                document.body.style.setProperty('--colorLiHi', colorLiHi);
                document.body.style.setProperty('--colorLiR', colorLiR);
                document.body.style.setProperty('--colorLi2Hi', colorLi2Hi);
                document.body.style.setProperty('--colorBtnHi', colorBtnHi);
                document.body.style.setProperty('--colorBtnFg', colorBtnFg);
            }
            else {
                setTimeout(wait, 300);
            }
        }, 300);
        if (logoWhite == 1) {
            var TlogoWhite = document.createElement('link');
            TlogoWhite.href = chrome.extension.getURL('themes/logo-white.css');
            TlogoWhite.type = 'text/css';
            TlogoWhite.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(TlogoWhite);
        }
        var Tcustom = document.createElement('link');
        Tcustom.href = chrome.extension.getURL('themes/custom.css');
        Tcustom.type = 'text/css';
        Tcustom.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tcustom);
    }
    else {
        var Tstandard = document.createElement('link');
        Tstandard.href = chrome.extension.getURL('themes/standard.css');
        Tstandard.type = 'text/css';
        Tstandard.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Tstandard);
    }

    // User CSS
    if (csscheck == 1) {
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            var userCSS = local.userCSS;
            var LuserCSS = document.createElement('style');
            LuserCSS.type = 'text/css';
            LuserCSS.innerHTML = userCSS;
            document.getElementsByTagName('head')[0].appendChild(LuserCSS);
        });
    }
});
