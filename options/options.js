/* Restore Options */

function _restore() {
    _restoreThemes();
    chrome.storage.sync.get({
        'advancedFormatting': '',
        'headerScroll': '',
        'bookmarks': '',
        'notificationIcons': '',
        'tooltips': '',
        'unread': '',
        'timestamp': '',
        'compact': '',
        'userID': '',
        'signatureMod': '',
        'square': ''
    },
    function(restore){
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            document.getElementById('userCSS').value = local.userCSS;
        });
        if (restore.advancedFormatting === '1') {
            document.getElementById('advancedFormatting').classList.add('selected');
        }
        if (restore.headerScroll === '1') {
            document.getElementById('headerScroll').classList.add('selected');
        }
        if (restore.bookmarks === '1') {
            document.getElementById('bookmarks').classList.add('selected');
        }
        if (restore.notificationIcons === '1') {
            document.getElementById('notificationIcons').classList.add('selected');
        }
        if (restore.tooltips === '1') {
            document.getElementById('tooltips').classList.add('selected');
        }
        if (restore.unread === '1') {
            document.getElementById('unread').classList.add('selected');
        }
        if (restore.timestamp === '1') {
            document.getElementById('timestamp').classList.add('selected');
        }
        if (restore.compact === '1') {
            document.getElementById('compact').classList.add('selected');
        }
        if (restore.userID === '1') {
            document.getElementById('userID').classList.add('selected');
        }
        if (restore.signatureMod === '1') {
            document.getElementById('signatureMod').classList.add('selected');
        }
        if (restore.square === '1') {
            document.getElementById('square').classList.add('selected');
        }
        if (changeMessage === false) {
            status.innerText = chrome.i18n.getMessage('statusThemes');
        }
    });
};


/* Save Modifications */

function _selectMods(event) {
    const mod = event.currentTarget;
    const name = mod.getAttribute('id');
    if (mod.classList.contains('selected')) {
        mod.removeAttribute('class');
        chrome.storage.sync.set({[name]: '0'});
    }
    else {
        mod.classList.add('selected');
        chrome.storage.sync.set({[name]: '1'});
    }
};


/* Save User CSS */

function _saveUserCSS() {
    var userCSS = document.getElementById('userCSS').value;
    chrome.storage.local.set({
        'userCSS': userCSS
    },
    function() {
        status.innerText = chrome.i18n.getMessage('saveUserCSS');
        setTimeout(function() {
            if (status.innerText === chrome.i18n.getMessage('saveUserCSS')) {
                status.innerText = '';
            }
        }, 8000);
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
        status.innerText = chrome.i18n.getMessage('confirmReset');
        setTimeout(function() {
            if (status.innerText === chrome.i18n.getMessage('confirmReset')) {
                status.innerText = '';
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
                document.querySelectorAll('button.themebox').forEach(function(theme) {
                    if (theme.classList.contains('active')) {
                        theme.classList.remove('active');
                    }
                });
                _restore();
                _showThemes();
                changeMessage = true;
                status.innerText = chrome.i18n.getMessage('optionsReset');
                setTimeout(function() {
                    if (status.innerText === chrome.i18n.getMessage('optionsReset')) {
                        status.innerText = '';
                    }
                }, 8000);
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
    status.innerText = chrome.i18n.getMessage('statusThemes');
};
function _showModifications() {
    document.querySelector('.view').removeAttribute('class');
    btnModifications.classList.add('view');
    navThemes.style.display = 'none';
    navModifications.style.display = 'block';
    navInfo.style.display = 'none';
    status.innerText = chrome.i18n.getMessage('statusModifications');
};
function _showInfo() {
    document.querySelector('.view').removeAttribute('class');
    btnInfo.classList.add('view');
    navThemes.style.display = 'none';
    navModifications.style.display = 'none';
    navInfo.style.display = 'block';
    status.innerText = chrome.i18n.getMessage('statusInfo');
};
function _feedback() {
    window.open('https://forum.vivaldi.net/topic/19728/vivaldi-forum-mod', '_blank');
}


const navThemes = document.getElementById('themes');
const navModifications = document.getElementById('modifications');
const navInfo = document.getElementById('info');
const btnThemes = document.getElementById('themes-btn');
const btnModifications = document.getElementById('modifications-btn');
const btnInfo = document.getElementById('info-btn');
const selectMods = document.querySelectorAll('#selectMods > p > span');
const resetBtn = document.getElementById('reset-btn');
var changeMessage = false;

btnThemes.addEventListener('click', _showThemes);
btnModifications.addEventListener('click', _showModifications);
btnInfo.addEventListener('click', _showInfo);
document.getElementById('feedback-btn').addEventListener('click', _feedback);
selectMods.forEach(function(mod) {
    mod.addEventListener('click', _selectMods);
});
document.getElementById('css-save').addEventListener('click', _saveUserCSS);
document.getElementById('css-backup').addEventListener('click', _backupUserCSS);
resetBtn.addEventListener('click', _resetOptions);

_restore();
