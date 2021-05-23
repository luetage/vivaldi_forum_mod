/* Load stylesheets */

function loadFile(filename, id) {
    let head = document.getElementsByTagName('head')[0];
    let check = document.getElementById('vfmUSERCSS');
    let style = document.createElement('link');
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
    chrome.storage.sync.get({'VFM_CURRENT_THEME': ''}, function(get) {
        let theme = get.VFM_CURRENT_THEME.selected;
        if (theme.startsWith('vfm_')) {
            _wait().then(() => {
                let colors = get.VFM_CURRENT_THEME.colors;
                for (const [key, value] of Object.entries(colors)) {
                    document.body.style.setProperty('--' + key, value);
                }
            });
            loadFile('themes/custom.css', 'vfmTheme');
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
                    let activateUserCSS = document.createElement('style');
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
    let theme = document.getElementById('vfmTheme');
    if (theme) {
        theme.disabled = true;
        theme.parentNode.removeChild(theme);
    }
    document.body.className = document.body.className.replace(/(^|\s)vfm\S+/g,'');
    loadTheme();
}

function updateUserCSS() {
    let del = document.getElementById('vfmUSERCSS');
    if (del) {
        del.disabled = true;
        del.parentNode.removeChild(del);
    }
    loadUserCSS();
};

loadTheme();
loadUserCSS();
chrome.runtime.sendMessage({message: 'whoami'}, function() {
    if (chrome.runtime.lastError) {
        setTimeout(function() {
            chrome.runtime.sendMessage({message: 'whoami'});
        }, 3000);
    }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'update theme') {
        updateTheme();
        sendResponse({message: 'akn'});
    }
    if (request.message === 'change usercss') {
        updateUserCSS();
        sendResponse({message: 'akn'});
    }
});
