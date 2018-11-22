/* Theme */

chrome.storage.sync.get({
    'darkGrey': '',
    'lightGrey': '',
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
    var darkGrey = theme.darkGrey;
    var lightGrey = theme.lightGrey;
    var mod = theme.mod;
    var sprucey = theme.sprucey;
    var custom = theme.custom;
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
        var compactHeader = document.createElement('link');
        compactHeader.href = chrome.extension.getURL('mods/compact-header.css');
        compactHeader.type = 'text/css';
        compactHeader.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(compactHeader);
    }
    else {
        var standardHeader = document.createElement('link');
        standardHeader.href = chrome.extension.getURL('mods/standard-header.css');
        standardHeader.type = 'text/css';
        standardHeader.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(standardHeader);
    }

    //themes
    if (darkGrey == 1) {
        var themeDarkGrey = document.createElement('link');
        themeDarkGrey.href = chrome.extension.getURL('themes/dark-grey.css');
        themeDarkGrey.type = 'text/css';
        themeDarkGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeDarkGrey);
    }
    else if (lightGrey == 1) {
        var themeLightGrey = document.createElement('link');
        themeLightGrey.href = chrome.extension.getURL('themes/light-grey.css');
        themeLightGrey.type = 'text/css';
        themeLightGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeLightGrey);
    }
    else if (mod == 1) {
        var themeMod = document.createElement('link');
        themeMod.href = chrome.extension.getURL('themes/mod.css');
        themeMod.type = 'text/css';
        themeMod.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeMod);
    }
    else if (sprucey == 1) {
        var themeSprucey = document.createElement('link');
        themeSprucey.href = chrome.extension.getURL('themes/sprucey-bonus-dark.css');
        themeSprucey.type = 'text/css';
        themeSprucey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeSprucey);
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
                setTimeout(wait, 100);
            }
        }, 100);
        if (logoWhite == 1) {
            var getLogoWhite = document.createElement('link');
            getLogoWhite.href = chrome.extension.getURL('themes/logo-white.css');
            getLogoWhite.type = 'text/css';
            getLogoWhite.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(getLogoWhite);
        }
        var themeCustom = document.createElement('link');
        themeCustom.href = chrome.extension.getURL('themes/custom.css');
        themeCustom.type = 'text/css';
        themeCustom.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeCustom);
    }
    else {
        var themeStandard = document.createElement('link');
        themeStandard.href = chrome.extension.getURL('themes/standard.css');
        themeStandard.type = 'text/css';
        themeStandard.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeStandard);
    }

    // User CSS
    chrome.storage.local.get({'userCSS': ''}, function(local) {
        var userCSS = local.userCSS;
        if (userCSS !== '') {
            var activateUserCSS = document.createElement('style');
            activateUserCSS.type = 'text/css';
            activateUserCSS.innerHTML = userCSS;
            document.getElementsByTagName('head')[0].appendChild(activateUserCSS);
        }
    });
});
