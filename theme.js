/* Theme */

function _async() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
};
async function wait() {
    while (!document.body) {
        await _async()
    }
    return true;
};
function _logoWhite() {
    var getLogoWhite = document.createElement('link');
    getLogoWhite.href = chrome.extension.getURL('themes/logo-white.css');
    getLogoWhite.type = 'text/css';
    getLogoWhite.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(getLogoWhite);
};
function _logoBlack() {
    var getLogoBlack = document.createElement('link');
    getLogoBlack.href = chrome.extension.getURL('themes/logo-black.css');
    getLogoBlack.type = 'text/css';
    getLogoBlack.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(getLogoBlack);
};

chrome.storage.sync.get({
    'darkGrey': '',
    'lightGrey': '',
    'mod': '',
    'sprucey': '',
    'custom': '',
    'cssToggle': '',
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
    //header
    if (theme.darkGrey === '1' || theme.lightGrey === '1' || theme.mod === '1' || theme.sprucey === '1') {
        if (theme.compact === '1' || theme.darkGrey === '1' || theme.lightGrey === '1') {
            var compactHeaderAlt = document.createElement('link');
            compactHeaderAlt.href = chrome.extension.getURL('mods/compact-header-alt.css');
            compactHeaderAlt.type = 'text/css';
            compactHeaderAlt.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(compactHeaderAlt);
        }
        else {
            var standardHeaderAlt = document.createElement('link');
            standardHeaderAlt.href = chrome.extension.getURL('mods/standard-header-alt.css');
            standardHeaderAlt.type = 'text/css';
            standardHeaderAlt.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(standardHeaderAlt);
        }
    }
    else {
        if (theme.compact === '1') {
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
    }
    //logo
    if (theme.sprucey === '1' || theme.lightGrey === '1' || theme.darkGrey === '1') {
        _logoWhite();
    }
    if (theme.custom === '1' ) {
        if (theme.logoWhite === '1') {
            _logoWhite();
        }
        else {
            _logoBlack();
        }
    }
    //themes
    if (theme.darkGrey === '1') {
        var themeDarkGrey = document.createElement('link');
        themeDarkGrey.href = chrome.extension.getURL('themes/dark-grey.css');
        themeDarkGrey.type = 'text/css';
        themeDarkGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeDarkGrey);
    }
    else if (theme.lightGrey === '1') {
        var themeLightGrey = document.createElement('link');
        themeLightGrey.href = chrome.extension.getURL('themes/light-grey.css');
        themeLightGrey.type = 'text/css';
        themeLightGrey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeLightGrey);
    }
    else if (theme.mod === '1') {
        var themeMod = document.createElement('link');
        themeMod.href = chrome.extension.getURL('themes/mod.css');
        themeMod.type = 'text/css';
        themeMod.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeMod);
    }
    else if (theme.sprucey === '1') {
        var themeSprucey = document.createElement('link');
        themeSprucey.href = chrome.extension.getURL('themes/sprucey-bonus-dark.css');
        themeSprucey.type = 'text/css';
        themeSprucey.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(themeSprucey);
    }
    else if (theme.custom === '1') {
        wait().then(() => {
            document.body.style.setProperty('--colorBg', theme.colorBg);
            document.body.style.setProperty('--colorFg', theme.colorFg);
            document.body.style.setProperty('--colorHi', theme.colorHi);
            document.body.style.setProperty('--colorBtn', theme.colorBtn);
            document.body.style.setProperty('--colorDrop', theme.colorDrop);
            document.body.style.setProperty('--colorLi', theme.colorLi);
            document.body.style.setProperty('--colorLi2', theme.colorLi2);
            document.body.style.setProperty('--colorDropFg', theme. colorDropFg);
            document.body.style.setProperty('--colorDropHi', theme. colorDropHi);
            document.body.style.setProperty('--colorDropHi2', theme. colorDropHi2);
            document.body.style.setProperty('--colorDropHi3', theme. colorDropHi3);
            document.body.style.setProperty('--colorDropHiG', theme. colorDropHiG);
            document.body.style.setProperty('--colorBgHi', theme.colorBgHi);
            document.body.style.setProperty('--colorBgHiC', theme.colorBgHiC);
            document.body.style.setProperty('--colorBgHiCG', theme. colorBgHiCG);
            document.body.style.setProperty('--colorBgHiG', theme.colorBgHiG);
            document.body.style.setProperty('--colorBgHiG2', theme. colorBgHiG2);
            document.body.style.setProperty('--colorFg2', theme.colorFg2);
            document.body.style.setProperty('--colorHiFg', theme.colorHiFg);
            document.body.style.setProperty('--colorLiHi', theme.colorLiHi);
            document.body.style.setProperty('--colorLiR', theme.colorLiR);
            document.body.style.setProperty('--colorLi2Hi', theme.colorLi2Hi);
            document.body.style.setProperty('--colorBtnHi', theme.colorBtnHi);
            document.body.style.setProperty('--colorBtnFg', theme.colorBtnFg);
        });
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
    // user css
    if (theme.cssToggle === '1') {
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            if (local.userCSS !== '') {
                var activateUserCSS = document.createElement('style');
                activateUserCSS.type = 'text/css';
                activateUserCSS.innerHTML = local.userCSS;
                document.getElementsByTagName('head')[0].appendChild(activateUserCSS);
            }
        });
    }
});
