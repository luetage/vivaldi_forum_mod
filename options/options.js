/* Restore Options */

function _restore() {
    _restoreThemes();
    chrome.storage.sync.get({
        'VFM_MODS': '',
        'VFM_USER_CSS': ''
    },
    function(restore){
        var mods = restore.VFM_MODS;
        Object.keys(mods).forEach(function(mod) {
            if (mods[mod] === true) {
                document.getElementById(mod).classList.add('selected');
            }
        });
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            document.getElementById('userCSS').value = local.userCSS;
        });
        if (restore.VFM_USER_CSS === false) {
            toggleBtn.classList.add('deactivated');
            textarea.disabled = true;
            save2Btn.disabled = true;
            backupBtn.disabled = true;
        }
        if (changeMessage === false) {
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('statusThemes');
            _fade();
        }
    });
};


/* Save Modifications */

function _selectMods(event) {
    const target = event.currentTarget;
    const toggle = target.getAttribute('id');
    chrome.storage.sync.get({'VFM_MODS': ''}, function(select) {
        var mods = select.VFM_MODS;
        if (target.classList.contains('selected')) {
            target.removeAttribute('class');
            mods[toggle] = false;
        }
        else {
            target.classList.add('selected');
            mods[toggle] = true;
        }
        chrome.storage.sync.set({'VFM_MODS': mods});
    });
};


/* Use tab in textarea (tab to 4 spaces) */

function _tabSpaces(key) {
    if (key.keyCode === 9 || key.which === 9) {
        key.preventDefault();
        var select = this.selectionStart;
        this.value = this.value.substring(0,this.selectionStart) + "    " + this.value.substring(this.selectionEnd);
        this.selectionEnd = select+4;
    }
};


/* Toggle User CSS */

function _toggleUserCSS() {
    if (toggleBtn.classList.contains('deactivated')) {
        chrome.storage.sync.set({'VFM_USER_CSS': true}, function() {
            toggleBtn.classList.remove('deactivated');
            save2Btn.disabled = false;
            backupBtn.disabled = false;
            textarea.disabled = false;
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('activateUserCSS');
            _fade();
        });
    }
    else {
        chrome.storage.sync.set({'VFM_USER_CSS': false}, function() {
            toggleBtn.classList.add('deactivated');
            save2Btn.disabled = true;
            backupBtn.disabled = true;
            textarea.disabled = true;
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('deactivateUserCSS')
            _fade();
        });
    }
    chrome.runtime.sendMessage({message: 'trigger usercss'});
};


/* Save User CSS */

function _saveUserCSS() {
    var userCSS = document.getElementById('userCSS').value;
    chrome.storage.local.set({
        'userCSS': userCSS
    },
    function() {
        chrome.runtime.sendMessage({message: 'trigger usercss'});
        status.style.opacity = '0';
        status.innerText = chrome.i18n.getMessage('saveUserCSS');
        _fade();
    });
};


/* Backup User CSS */

function _backupUserCSS() {
    var userCSS = document.getElementById('userCSS').value;
    const url = 'data:text/css;base64,' + btoa(userCSS);
    chrome.downloads.download({
        url: url,
        saveAs: true,
        filename: 'backup.css'
    });
};


/* Reset Extension */

function _resetOptions() {
    if (!resetBtn.classList.contains('confirm')) {
        resetBtn.classList.add('confirm');
        status.style.opacity = '0';
        status.innerText = chrome.i18n.getMessage('confirmReset');
        _fade();
        setTimeout(function() {
            if (status.innerText === chrome.i18n.getMessage('confirmReset')) {
                status.style.opacity = '0';
                status.innerText = chrome.i18n.getMessage('cancelReset');
                _fade();
            }
            resetBtn.removeAttribute('class');
        }, 8000);
    }
    else {
        resetBtn.removeAttribute('class');
        chrome.storage.sync.clear(function() {
            chrome.storage.local.clear(function() {
                selectMods.forEach(function(mod) {
                    if (mod.classList.contains('selected')) {
                        mod.removeAttribute('class');
                    }
                });
                var i, ct = document.querySelectorAll('#themeMachine button.themebox');
                for (i=ct.length; i--;) {
                    ct[i].parentNode.removeChild(ct[i]);
                }
                chrome.runtime.sendMessage({message: 'reset'}, function() {
                    _restore();
                    _showThemes();
                    changeMessage = true;
                    status.style.opacity = '0';
                    status.innerText = chrome.i18n.getMessage('optionsReset');
                    _fade();
                });
            });
        });
    }
};


/* Navigation */

function _showThemes() {
    document.querySelector('.view').removeAttribute('class');
    btnThemes.classList.add('view');
    navThemes.style.display = 'block';
    navModifications.style.display = 'none';
    navInfo.style.display = 'none';
    status.style.opacity = '0';
    status.innerText = chrome.i18n.getMessage('statusThemes');
    _fade();
};
function _showModifications() {
    document.querySelector('.view').removeAttribute('class');
    btnModifications.classList.add('view');
    navThemes.style.display = 'none';
    navModifications.style.display = 'block';
    navInfo.style.display = 'none';
    status.style.opacity = '0';
    status.innerText = chrome.i18n.getMessage('statusModifications');
    _fade();
};
function _showInfo() {
    document.querySelector('.view').removeAttribute('class');
    btnInfo.classList.add('view');
    navThemes.style.display = 'none';
    navModifications.style.display = 'none';
    navInfo.style.display = 'block';
    status.style.opacity = '0';
    status.innerText = chrome.i18n.getMessage('statusInfo');
    _fade();
};


const navThemes = document.getElementById('themes');
const navModifications = document.getElementById('modifications');
const navInfo = document.getElementById('info');
const btnThemes = document.getElementById('themes-btn');
const btnModifications = document.getElementById('modifications-btn');
const btnInfo = document.getElementById('info-btn');
const selectMods = document.querySelectorAll('#selectMods > p > span');
const textarea = document.querySelector('textarea');
const toggleBtn = document.getElementById('css-toggle');
const save2Btn = document.getElementById('css-save');
const backupBtn = document.getElementById('css-backup');
const resetBtn = document.getElementById('reset-btn');
var changeMessage = false;

btnThemes.addEventListener('click', _showThemes);
btnModifications.addEventListener('click', _showModifications);
btnInfo.addEventListener('click', _showInfo);
selectMods.forEach(function(mod) {
    mod.addEventListener('click', _selectMods);
});
textarea.addEventListener('keydown', _tabSpaces);
toggleBtn.addEventListener('click', _toggleUserCSS);
save2Btn.addEventListener('click', _saveUserCSS);
backupBtn.addEventListener('click', _backupUserCSS);
resetBtn.addEventListener('click', _resetOptions);

_restore();
