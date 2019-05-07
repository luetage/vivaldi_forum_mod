/* Theme */

function _async() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
};
async function _wait() {
    while (!document.body) {
        await _async()
    }
    return true;
};


/* Load stylesheets */

function loadFile(filename){
    var style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    style.setAttribute("href", chrome.extension.getURL(filename));
    document.getElementsByTagName('head')[0].appendChild(style);
};


chrome.storage.sync.get({
    'VFM_MODS': '',
    'VFM_CURRENT_THEME': '',
    'VFM_USER_CSS': ''
},
function(get) {
    var theme = get.VFM_CURRENT_THEME.selected;
    //header
    if (theme === 'vfm-darkGrey' || theme === 'vfm-lightGrey' || theme === 'vfm-mod' || theme === 'vfm-sprucey') {
        if (get.VFM_MODS.compact === true || theme === 'vfm-darkGrey' || theme === 'vfm-lightGrey') {
            loadFile('mods/compact-header-alt.css');
        }
        else {
            loadFile('mods/standard-header-alt.css');
        }
    }
    else {
        if (get.VFM_MODS.compact === true) {
            loadFile('mods/compact-header.css');
        }
        else {
            loadFile('mods/standard-header.css');
        }
    }
    //logo
    if (theme === 'vfm-sprucey' || theme === 'vfm-lightGrey' || theme === 'vfm-darkGrey' || (theme.startsWith('vfm_') && get.VFM_CURRENT_THEME.logoWhite === true)) {
        loadFile('themes/logo-white.css')
    }
    else {
        loadFile('themes/logo-black.css')
    }
    //themes
    if (theme.startsWith('vfm_')) {
        _wait().then(() => {
            var colors = get.VFM_CURRENT_THEME.colors;
            for (const [key, value] of Object.entries(colors)) {
                document.body.style.setProperty('--' + key, value);
            }
        });
        loadFile('themes/custom.css');
    }
    else if (theme === 'vfm-darkGrey') {
        loadFile('themes/dark-grey.css');
    }
    else if (theme === 'vfm-lightGrey') {
        loadFile('themes/light-grey.css');
    }
    else if (theme === 'vfm-mod') {
        loadFile('themes/mod.css');
    }
    else if (theme === 'vfm-sprucey') {
        loadFile('themes/sprucey-bonus-dark.css');
    }
    else {
        loadFile('themes/standard.css');
    }
    // user css
    if (get.VFM_USER_CSS === true) {
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            if (local.userCSS !== '') {
                var activateUserCSS = document.createElement('style');
                activateUserCSS.type = 'text/css';
                activateUserCSS.innerHTML = local.userCSS;
                document.getElementsByTagName('head')[0].appendChild(activateUserCSS);
            }
        });
    }
    // introduce theme name as class in body
    _wait().then(() => {
        document.body.classList.add(theme);
    });
});
