/* Load stylesheets */

function loadFile(filename, id){
    var style = document.createElement('link');
    if (id) {
        style.setAttribute('id', id);
    }
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', chrome.extension.getURL(filename));
    document.getElementsByTagName('head')[0].appendChild(style);
};


/* Theme */

function loadTheme() {

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
        // user css
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
        // introduce theme name as class in body
        _wait().then(() => {
            document.body.classList.add(theme);
        });
    });
};

loadTheme();

chrome.runtime.sendMessage({message: 'whoami'});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'update theme') {
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
        loadTheme();
        sendResponse({message: 'iam'});
    }
});
