/* Save options */

var standardS = document.getElementById('standard');
var darkGreyS = document.getElementById('darkGrey');
var lightGreyS = document.getElementById('lightGrey');
var modS = document.getElementById('mod');
var spruceyS = document.getElementById('sprucey');
var customS = document.getElementById('custom');
var csscheckS = document.getElementById('csscheck');
var userCSSS = document.getElementById('userCSS');
var headerScrollS = document.getElementById('headerScroll');
var bookmarksS = document.getElementById('bookmarks');
var notificationIconsS = document.getElementById('notificationIcons');
var tooltipsS = document.getElementById('tooltips');
var unreadS = document.getElementById('unread');
var timestampS = document.getElementById('timestamp');
var compactS = document.getElementById('compact');
var userIDS = document.getElementById('userID');
var signatureModS = document.getElementById('signatureMod');
var squareS = document.getElementById('square');
var advancedFormattingS = document.getElementById('advancedFormatting');

function save_options(){

    if (standardS.checked == true) {
        standardS.value = '1';
    } else {
        standardS.value = '0';
    }
    if (darkGreyS.checked == true) {
        darkGreyS.value = '1';
    } else {
        darkGreyS.value = '0';
    }
    if (lightGreyS.checked == true) {
        lightGreyS.value = '1';
    } else {
        lightGreyS.value = '0';
    }
    if (modS.checked == true) {
        modS.value = '1';
    } else {
        modS.value = '0';
    }
    if (spruceyS.checked == true) {
        spruceyS.value = '1';
    } else {
        spruceyS.value = '0';
    }
    if (customS.checked == true) {
        customS.value = '1';
    } else {
        customS.value = '0';
    }
    if (csscheckS.checked == true) {
        csscheckS.value = '1';
    } else {
        csscheckS.value = '0';
    }
    if (headerScrollS.checked == true) {
        headerScrollS.value = '1';
    } else {
        headerScrollS.value = '0';
    }
    if (bookmarksS.checked == true) {
        bookmarksS.value = '1';
    } else {
        bookmarksS.value = '0';
    }
    if (notificationIconsS.checked == true) {
        notificationIconsS.value = '1';
    } else {
        notificationIconsS.value = '0';
    }
    if (tooltipsS.checked == true) {
        tooltipsS.value = '1';
    } else {
        tooltipsS.value = '0';
    }
    if (unreadS.checked == true) {
        unreadS.value = '1';
    } else {
        unreadS.value = '0';
    }
    if (timestampS.checked == true) {
        timestampS.value = '1';
    } else {
        timestampS.value = '0';
    }
    if (compactS.checked == true) {
        compactS.value = '1';
    } else {
        compactS.value = '0';
    }
    if (userIDS.checked == true) {
        userIDS.value = '1';
    } else {
        userIDS.value = '0';
    }
    if (signatureModS.checked == true) {
        signatureModS.value = '1';
    } else {
        signatureModS.value = '0';
    }
    if (squareS.checked == true) {
        squareS.value = '1';
    } else {
        squareS.value = '0';
    }
    if (advancedFormattingS.checked == true) {
        advancedFormattingS.value = '1';
    } else {
        advancedFormattingS.value = '0';
    }

    var standard = standardS.value;
    var darkGrey = darkGreyS.value;
    var lightGrey = lightGreyS.value;
    var mod = modS.value;
    var sprucey = spruceyS.value;
    var custom = customS.value;
    var csscheck = csscheckS.value;
    var userCSS = userCSSS.value;
    var headerScroll = headerScrollS.value;
    var bookmarks = bookmarksS.value;
    var notificationIcons = notificationIconsS.value;
    var tooltips = tooltipsS.value;
    var unread = unreadS.value;
    var timestamp = timestampS.value;
    var compact = compactS.value;
    var userID = userIDS.value;
    var signatureMod = signatureModS.value;
    var square = squareS.value;
    var advancedFormatting = advancedFormattingS.value;

    chrome.storage.sync.set({
        'standard': standard,
        'darkGrey': darkGrey,
        'lightGrey': lightGrey,
        'mod': mod,
        'sprucey': sprucey,
        'custom': custom,
        'csscheck': csscheck,
        'headerScroll': headerScroll,
        'bookmarks': bookmarks,
        'notificationIcons': notificationIcons,
        'tooltips': tooltips,
        'unread': unread,
        'timestamp': timestamp,
        'compact': compact,
        'userID': userID,
        'signatureMod': signatureMod,
        'square': square,
        'advancedFormatting': advancedFormatting
      },
      function(){
          chrome.storage.local.set({'userCSS': userCSS});
        var status = document.getElementById('status');
        var reset = document.getElementById('reset-button');
         status.innerHTML = 'Options saved!';
         reset.innerHTML = 'Reset';
           setTimeout(function() {
               if (status.innerHTML === 'Options saved!') {
                  status.innerHTML = 'Reload Vivaldi Forum tab/s.';
              }
              setTimeout(function() {
                  if (status.innerHTML === 'Reload Vivaldi Forum tab/s.') {
                    status.innerHTML = '';
                }
              }, 5000);
        }, 2500);
    });
};


/* Restore options */

function restore_options(){
    chrome.storage.sync.get({
        'standard': '1',
        'darkGrey': '',
        'lightGrey': '',
        'mod': '',
        'sprucey': '',
        'custom': '',
        'csscheck': '',
        'headerScroll': '',
        'bookmarks': '',
        'notificationIcons': '',
        'tooltips': '',
        'unread': '',
        'timestamp': '',
        'compact': '',
        'userID': '',
        'signatureMod': '',
        'square': '',
        'advancedFormatting': ''
      },
    function(restore){
        chrome.storage.local.get({'userCSS': ''}, function(local) {
            userCSSS.value = local.userCSS;
        });
        standardS.value = restore.standard;
        if (standardS.value == '1') {
            standardS.checked = true;
        }
        darkGreyS.value = restore.darkGrey;
        if (darkGreyS.value == '1') {
            darkGreyS.checked = true;
        }
        lightGreyS.value = restore.lightGrey;
        if (lightGreyS.value == '1') {
            lightGreyS.checked = true;
        }
        modS.value = restore.mod;
        if (modS.value == '1') {
            modS.checked = true;
        }
        spruceyS.value = restore.sprucey;
        if (spruceyS.value == '1') {
            spruceyS.checked = true;
        }
        customS.value = restore.custom;
        if (customS.value == '1') {
            customS.checked = true;
        }
        csscheckS.value = restore.csscheck;
        if (csscheckS.value == '1') {
            csscheckS.checked = true;
        }
        else {
            csscheckS.checked = false;
        }
        headerScrollS.value = restore.headerScroll;
        if (headerScrollS.value == '1') {
            headerScrollS.checked = true;
        } else {
            headerScrollS.checked = false;
        }
        bookmarksS.value = restore.bookmarks;
        if (bookmarksS.value == '1') {
            bookmarksS.checked = true;
        } else {
            bookmarksS.checked = false;
        }
        notificationIconsS.value = restore.notificationIcons;
        if (notificationIconsS.value == '1') {
            notificationIconsS.checked = true;
        } else {
            notificationIconsS.checked = false;
        }
        tooltipsS.value = restore.tooltips;
        if (tooltipsS.value == '1') {
            tooltipsS.checked = true;
        } else {
            tooltipsS.checked = false;
        }
        unreadS.value = restore.unread;
        if (unreadS.value == '1') {
            unreadS.checked = true;
        } else {
            unreadS.checked = false;
        }
        timestampS.value = restore.timestamp;
        if (timestampS.value == '1') {
            timestampS.checked = true;
        } else {
            timestampS.checked = false;
        }
        if (changeMessage === false) {
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('statusThemes');
            _fade();
        }
    });
};


/* Reset options */


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
        chrome.storage.sync.set({'cssToggle': '1'}, function() {
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
        chrome.storage.sync.set({'cssToggle': '0'}, function() {
            toggleBtn.classList.add('deactivated');
            save2Btn.disabled = true;
            backupBtn.disabled = true;
            textarea.disabled = true;
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('deactivateUserCSS')
            _fade();
        });
    }
};


/* Save User CSS */

function _saveUserCSS() {
    var userCSS = document.getElementById('userCSS').value;
    chrome.storage.local.set({
        'userCSS': userCSS
    },
    function() {
        status.style.opacity = '0';
        status.innerText = chrome.i18n.getMessage('saveUserCSS');
        _fade();
    });
};


/* Backup User CSS */

function back_it_up() {
    var userCSS = userCSSS.value;
    var url = 'data:text/css;base64,' + btoa(userCSS);
    chrome.downloads.download({
        url: url,
        saveAs: true
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
                document.querySelectorAll('button.themebox').forEach(function(theme) {
                    if (theme.classList.contains('active')) {
                        theme.classList.remove('active');
                    }
                });
                _restore();
                _showThemes();
                changeMessage = true;
                status.style.opacity = '0';
                status.innerText = chrome.i18n.getMessage('optionsReset');
                _fade();
            });
        });
    }
};


var back = document.getElementById('back');
var backup = document.getElementById('backup-button');
var save = document.getElementById('save');
var edit = document.getElementById('edit');
var input = document.getElementById('input');
var info = document.getElementById('info');
var credits = document.getElementById('credits');
var changelog = document.getElementById('changelog');
var select = document.getElementById('select');

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

function updateLocalisations(){
    document.querySelectorAll(".advancedFormatting").forEach(span => {span.innerText = chrome.i18n.getMessage("advancedFormatting");});
    document.querySelector(".advancedFormattingDesc").innerText = chrome.i18n.getMessage("advancedFormattingDesc");
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-button').addEventListener('click', save_options);
document.getElementById('back-button').addEventListener('click', get_back);
document.getElementById('backup-button').addEventListener('click', back_it_up);
document.getElementById('reset-button').addEventListener('click', reset_options);
document.getElementById('edit-button').addEventListener('click', show_edit);
document.getElementById('css-button').addEventListener('click', show_css);
document.getElementById('info-btn').addEventListener('click', show_info);
document.getElementById('credits-btn').addEventListener('click', show_credits);
document.getElementById('changelog-btn').addEventListener('click', show_changelog);
updateLocalisations();
