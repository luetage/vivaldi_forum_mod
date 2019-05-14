/* Load stylesheets */

function loadFile(filename, id) {
    var head = document.getElementsByTagName('head')[0];
    var check = document.getElementById('vfmUSERCSS');
    var style = document.createElement('link');
    if (id) {
        style.setAttribute('id', id);
    }
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', chrome.extension.getURL(filename));
    if (check) {
        head.insertBefore(style, check);
    }
    else {
        head.appendChild(style);
    }
};


/* Wait function */

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


/* Load Theme */

function loadTheme() {
    chrome.storage.sync.get({
        'VFM_MODS': '',
        'VFM_CURRENT_THEME': '',
    },
    function(get) {
        var theme = get.VFM_CURRENT_THEME.selected;
        //header
        if (theme === 'vfm-darkGrey' || theme === 'vfm-lightGrey' || theme === 'vfm-mod' || theme === 'vfm-sprucey') {
            if (get.VFM_MODS.compact === true || theme === 'vfm-darkGrey' || theme === 'vfm-lightGrey') {
                loadFile('mods/compact-header-alt.css', 'vfmHeader');
            }
            else {
                loadFile('mods/standard-header-alt.css', 'vfmHeader');
            }
        }
        else {
            if (get.VFM_MODS.compact === true) {
                loadFile('mods/compact-header.css', 'vfmHeader');
            }
            else {
                loadFile('mods/standard-header.css', 'vfmHeader');
            }
        }
        //logo
        if (theme === 'vfm-sprucey' || theme === 'vfm-lightGrey' || theme === 'vfm-darkGrey' || (theme.startsWith('vfm_') && get.VFM_CURRENT_THEME.logoWhite === true)) {
            loadFile('themes/logo-white.css', 'vfmLogo')
        }
        else {
            loadFile('themes/logo-black.css', 'vfmLogo')
        }
        //themes
        if (theme.startsWith('vfm_')) {
            _wait().then(() => {
                var colors = get.VFM_CURRENT_THEME.colors;
                for (const [key, value] of Object.entries(colors)) {
                    document.body.style.setProperty('--' + key, value);
                }
            });
            loadFile('themes/custom.css', 'vfmTheme');
        }
        else if (theme === 'vfm-darkGrey') {
            loadFile('themes/dark-grey.css', 'vfmTheme');
        }
        else if (theme === 'vfm-lightGrey') {
            loadFile('themes/light-grey.css', 'vfmTheme');
        }
        else if (theme === 'vfm-mod') {
            loadFile('themes/mod.css', 'vfmTheme');
        }
        else if (theme === 'vfm-sprucey') {
            loadFile('themes/sprucey-bonus-dark.css', 'vfmTheme');
        }
        else {
            loadFile('themes/standard.css', 'vfmTheme');
        }
        // introduce theme name as class in body
        _wait().then(() => {
            document.body.classList.add(theme);
        });
    });
};


/* Load User CSS */

function loadUserCSS() {
    chrome.storage.sync.get({'VFM_USER_CSS': ''}, function(get) {
        if (get.VFM_USER_CSS === true) {
            chrome.storage.local.get({'userCSS': ''}, function(local) {
                if (local.userCSS !== '') {
                    var activateUserCSS = document.createElement('style');
                    activateUserCSS.id = 'vfmUSERCSS';
                    activateUserCSS.type = 'text/css';
                    activateUserCSS.innerHTML = local.userCSS;
                    document.getElementsByTagName('head')[0].appendChild(activateUserCSS);
                }
            });
        }
    });
};


/* Update Tab */

function updateTheme() {
    var header = document.getElementById('vfmHeader');
    var logo = document.getElementById('vfmLogo');
    var theme = document.getElementById('vfmTheme');
    if (header && logo && theme) {
        header.disabled = true;
        logo.disabled = true;
        theme.disabled = true;
        header.parentNode.removeChild(header);
        logo.parentNode.removeChild(logo);
        theme.parentNode.removeChild(theme);
    }
    document.body.className = document.body.className.replace(/(^|\s)vfm\S+/g,'');
    loadTheme();
}


function updateUserCSS() {
    var del = document.getElementById('vfmUSERCSS');
    if (del) {
        del.disabled = true;
        del.parentNode.removeChild(del);
    }
    loadUserCSS();
};


loadTheme();
loadUserCSS();
chrome.runtime.sendMessage({message: 'whoami'});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'update theme') {
        sendResponse({message: 'iam'});
        updateTheme();
    }
    if (request.message === 'change usercss') {
        sendResponse({message: 'iam'});
        updateUserCSS();
    }
});
