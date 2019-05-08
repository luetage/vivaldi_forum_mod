/* Activate Theme */

function _activateTheme() {
    chrome.storage.sync.get({'VFM_CURRENT_THEME': ''}, function(get) {
        var vct = get.VFM_CURRENT_THEME;
        var co = vct.colors;
        var colorBg = _colorBg.value;
        var colorFg = _colorFg.value;
        var colorHi = _colorHi.value;
        var colorBtn = _colorBtn.value;
        var colorDrop = _colorDrop.value;
        var colorLi = _colorLi.value;
        var colorLi2 = _colorLi2.value;
        co.colorBg = colorBg;
        co.colorFg = colorFg;
        co.colorHi = colorHi;
        co.colorBtn = colorBtn;
        co.colorDrop = colorDrop;
        co.colorLi = colorLi;
        co.colorLi2 = colorLi2;
        // calculate automatic colors
        function lum(color) {
            var colorL = color.substring(1);
            var rgb = parseInt(colorL, 16);
            var r = (rgb >> 16) & 0xff;
            var g = (rgb >>  8) & 0xff;
            var b = (rgb >>  0) & 0xff;
            return Math.round(0.2126*r+0.7152*g+0.0722*b);
        };
        function gray(color) {
            var colorG = color.substring(1);
            var rgb = parseInt(colorG, 16);
            var r = (rgb >> 16) & 0xff;
            var g = (rgb >>  8) & 0xff;
            var b = (rgb >>  0) & 0xff;
            var c = Math.round(0.30*r+0.59*g+0.11*b);
            return "#"+(0x1000000+c*0x10000+c*0x100+c).toString(16).slice(1);
        };
        function shade(color, percent) {
            var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
            return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
        };
        // dropdown
        var drop = lum(colorDrop);
        if (drop < 130) {
            co.colorDropFg = '#fbfbfb';
            var colorDropHi = shade(colorDrop, 0.2);
            co.colorDropHi = colorDropHi;
            co.colorDropHi2 = shade(colorDrop, 0.3);
            co.colorDropHi3 = shade(colorDrop, 0.5);
        }
        else {
            co.colorDropFg = '#121212';
            var colorDropHi = shade(colorDrop, -0.1);
            co.colorDropHi = colorDropHi;
            co.colorDropHi2 = shade(colorDrop, -0.2);
            co.colorDropHi3 = shade(colorDrop, -0.3);
        }
        co.colorDropHiG = gray(colorDropHi);
        // background
        var bg = lum(colorBg);
        var bg2 = gray(colorBg);
        if (bg < 130) {
            co.colorBgHiG = shade(bg2, 0.2);
            co.colorBgHiG2 = shade(bg2, 0.4);
            co.colorBgHi = shade(colorBg, 0.2);
            co.colorBgHiC = shade(colorBg, 0.1);
            co.colorBgHiCG = shade(bg2, 0.1);
            vct.logoWhite = true;
        }
        else {
            co.colorBgHiG = shade(bg2, -0.1);
            co.colorBgHiG2 = shade(bg2, -0.22);
            co.colorBgHi = shade(colorBg, -0.1);
            co.colorBgHiC = shade(colorBg, -0.05);
            co.colorBgHiCG = shade(bg2, -0.05);
            vct.logoWhite = false;
        }
        // foreground
        var fg = lum(colorFg);
        var fg2 = gray(colorFg);
        if (fg < 130) {
            co.colorFg2 = shade(fg2, 0.25);
        }
        else {
            co.colorFg2 = shade(fg2, -0.1);
        }
        // highlight
        var hi = lum(colorHi);
        if (hi < 130) {
            co.colorHiFg = '#fbfbfb';
        }
        else {
            co.colorHiFg = '#121212';
        }
        // link
        var link = lum(colorLi);
        var linkR = gray(colorLi);
        if (link < 130) {
            co.colorLiHi = shade(colorLi, 0.25);
            co.colorLiR = shade(linkR, 0.25);
        }
        else {
            co.colorLiHi = shade(colorLi, -0.12);
            co.colorLiR = shade(linkR, -0.07);
        }
        // link2
        var link2 = lum(colorLi2);
        if (link2 < 130) {
            co.colorLi2Hi = shade(colorLi2, 0.25);
        }
        else {
            co.colorLi2Hi = shade(colorLi2, -0.12);
        }
        // button
        var btn = lum(colorBtn);
        if (btn < 130) {
            co.colorBtnHi = shade(colorBtn, 0.1);
            co.colorBtnFg = '#fbfbfb';
        }
        else {
            co.colorBtnHi = shade(colorBtn, -0.07);
            co.colorBtnFg = '#121212';
        }
        // store custom theme
        chrome.storage.sync.set({'VFM_CURRENT_THEME': vct });
    });
};


/* Restore Themes */

function _restoreThemes() {
    chrome.storage.sync.get({
       'VFM_CURRENT_THEME': {
           'selected': 'vfm-standard',
           'colors': {'colorBg': '', 'colorFg': '', 'colorHi': '', 'colorBtn': '', 'colorDrop': '', 'colorLi': '', 'colorLi2': '', 'colorDropFg': '', 'colorDropHi': '', 'colorDropHi2': '', 'colorDropHi3': '', 'colorDropHiG': '', 'colorBgHi': '', 'colorBgHiC': '', 'colorBgHiCG': '', 'colorBgHiG': '', 'colorBgHiG2': '', 'colorFg2': '', 'colorHiFg': '', 'colorLiHi': '', 'colorLiR': '', 'colorLi2Hi': '', 'colorBtnHi': '', 'colorBtnFg': ''},
           'logoWhite': ''
       },
       'VFM_THEMES': [
           {'themeName': 'vfm_Dracula', 'colorBg': '#282a36','colorFg': '#f8f8f2', 'colorHi': '#e2d774', 'colorBtn': '#6176a5', 'colorDrop': '#455182', 'colorLi': '#f279d0', 'colorLi2': '#8ce2f6'},
           {'themeName': 'vfm_Neon', 'colorBg': '#f6f6f6', 'colorFg': '#2f3136', 'colorHi': '#fd3563', 'colorBtn': '#e3ff00', 'colorDrop': '#2f3136', 'colorLi': '#128e9d', 'colorLi2': '#0062ff'},
           {'themeName': 'vfm_Solarized_Light', 'colorBg': '#fdf6e3', 'colorFg': '#586e75', 'colorHi': '#d33682', 'colorBtn': '#6c71c4', 'colorDrop': '#eee8d5', 'colorLi': '#b58900', 'colorLi2': '#2aa198'},
           {'themeName': 'vfm_Blau', 'colorBg': '#23273b', 'colorFg': '#d4efff', 'colorHi': '#ffffff', 'colorBtn': '#68a2f2', 'colorDrop': '#d4efff', 'colorLi': '#96ffe0', 'colorLi2': '#d5d0fc'}
       ]
    },
    function(get) {
        var vct = get.VFM_CURRENT_THEME;
        var vt = get.VFM_THEMES;
        chrome.storage.sync.set({
            'VFM_CURRENT_THEME': vct,
            'VFM_THEMES': vt
        });
        vt.forEach(function(theme) {
            const btn = document.createElement('button');
            const name = theme.themeName;
            btn.id = name;
            btn.classList.add('themebox');
            btn.innerHTML = '<div class="themebox-image"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="#121212" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDrop)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorBtn)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="40" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="55" cy="60" r="5"></circle><circle fill="var(--colorLi2)" cx="70" cy="60" r="5"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" class="themebox-o_mark" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4"></circle></svg></div><div class="themebox-title"></div>';
            document.getElementById('themeMachine').insertBefore(btn, document.querySelector('.editTheme'));
            const ses = document.querySelector('#' + name + ' .themebox-image');
            for (const [key, value] of Object.entries(theme)) {
                if (key !== 'themeName') {
                    ses.style.setProperty('--' + key, value);
                }
            }
            const themeBox = document.querySelector('#' + name + ' .themebox-title');
            themeBox.title = '.' + name;
            themeBox.innerText = name.substring(4).replace(/_/g, ' ');
        });
        //setup
        toggleEdit.style.display = 'none';
        toggleEdit.style.opacity = 1;
        const select = vct.selected;
        document.getElementById(select).classList.add('active');
        if (select.startsWith('vfm_')) {
            addTheme.disabled = false;
            removeTheme.disabled = false;
            editBtn.disabled = false;
            moveLeft.disabled = false;
            moveRight.disabled = false;
            var index = vt.findIndex(x => x.themeName === select);
            _themeName.value = vt[index].themeName.substring(4).replace(/_/g, ' ');
            _colorBg.value = vt[index].colorBg;
            _colorFg.value = vt[index].colorFg;
            _colorHi.value = vt[index].colorHi;
            _colorBtn.value = vt[index].colorBtn;
            _colorDrop.value = vt[index].colorDrop;
            _colorLi.value = vt[index].colorLi;
            _colorLi2.value = vt[index].colorLi2;
        }
        else {
            addTheme.disabled = true;
            removeTheme.disabled = true;
            editBtn.disabled = true;
            moveLeft.disabled = true;
            moveRight.disabled = true;
        }
        document.querySelectorAll('button.themebox').forEach(function(item) {
            item.addEventListener('click', _selectTheme);
        });
    });
};


/* Select Theme */

function _selectTheme(event) {
    const theme = event.currentTarget;
    const name = theme.getAttribute('id');
    if (!theme.classList.contains('active')) {
        _cancelImport();
        const old = document.querySelector('.active');
        old.classList.remove('active');
        theme.classList.add('active');
        chrome.storage.sync.get({
            'VFM_CURRENT_THEME': '',
            'VFM_THEMES': ''
        }, function(get) {
            var vct = get.VFM_CURRENT_THEME;
            vct.selected = name;
            if (!name.startsWith('vfm_')) {
                chrome.storage.sync.set({'VFM_CURRENT_THEME': vct});
                toggleEdit.style.display = 'none';
                addTheme.disabled = true;
                removeTheme.disabled = true;
                editBtn.disabled = true;
                moveLeft.disabled = true;
                moveRight.disabled = true;
            }
            else {
                var vt = get.VFM_THEMES;
                var index = vt.findIndex(x => x.themeName === name);
                _themeName.value = vt[index].themeName.substring(4).replace(/_/g, ' ');
                _colorBg.value = vt[index].colorBg;
                _colorFg.value = vt[index].colorFg;
                _colorHi.value = vt[index].colorHi;
                _colorBtn.value = vt[index].colorBtn;
                _colorDrop.value = vt[index].colorDrop;
                _colorLi.value = vt[index].colorLi;
                _colorLi2.value = vt[index].colorLi2;
                chrome.storage.sync.set({'VFM_CURRENT_THEME': vct}, function() {
                    addTheme.disabled = false;
                    removeTheme.disabled = false;
                    editBtn.disabled = false;
                    moveLeft.disabled = false;
                    moveRight.disabled = false;
                    _activateTheme();
                });
            }
        });
    }
};


/* Add Theme */

function _addTheme() {
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        const epoch = 'vfm_' + Date.now();
        vt.push({'themeName': epoch, 'colorBg': vct.colors.colorBg, 'colorFg': vct.colors.colorFg, 'colorHi': vct.colors.colorHi, 'colorBtn': vct.colors.colorBtn, 'colorDrop': vct.colors.colorDrop, 'colorLi': vct.colors.colorLi, 'colorLi2': vct.colors.colorLi2});
        chrome.storage.sync.set({'VFM_THEMES': vt}, function() {
            const btn = document.createElement('button');
            btn.id = epoch;
            btn.classList.add('themebox');
            btn.innerHTML = '<div class="themebox-image"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="#121212" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDrop)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorBtn)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="40" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="55" cy="60" r="5"></circle><circle fill="var(--colorLi2)" cx="70" cy="60" r="5"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" class="themebox-o_mark" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4"></circle></svg></div><div class="themebox-title"></div>';
            document.getElementById('themeMachine').insertBefore(btn, document.querySelector('.editTheme'));
            const newTheme = document.getElementById(epoch);
            newTheme.addEventListener('click', _selectTheme);
            const ses = document.querySelector('#' + epoch + ' .themebox-image');
            for (const [key, value] of Object.entries(vt[vt.length-1])) {
                if (key !== 'themeName') {
                    ses.style.setProperty('--' + key, value);
                }
            }
            const themeBox = document.querySelector('#' + epoch + ' .themebox-title');
            themeBox.title = '.' + epoch;
            themeBox.innerText = epoch.substring(4).replace(/_/g, ' ');
            newTheme.click();
            toggleEdit.style.display = 'block';
        });
    });
};


/* Remove Theme */

function _removeTheme() {
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        if (vt.length > 1) {
            var index = vt.findIndex(x => x.themeName === vct.selected);
            if (index > 0) {
                var newSelect = vt[index-1].themeName;
            }
            else {
                var newSelect = vt[index+1].themeName;
            }
            document.getElementById(newSelect).click();
            const remove = document.getElementById(vt[index].themeName);
            remove.removeEventListener('click', _selectTheme);
            remove.parentNode.removeChild(remove);
            vt.splice(index, 1);
            chrome.storage.sync.set({'VFM_THEMES': vt});
        }
    });
};


/* Move Theme */

function _moveTheme() {
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        var index = vt.findIndex(x => x.themeName === vct.selected);
        if (_toMove === 'left') {
            if (index !== 0) {
                var moveThis = document.getElementById(vct.selected);
                moveThis.parentNode.insertBefore(moveThis, document.getElementById(vt[index-1].themeName));
                var fromI = vt[index];
                var toI = vt[index-1];
                vt[index-1] = fromI;
                vt[index] = toI;
            }
            else {
                return;
            }
        }
        else {
            if (index < vt.length - 1) {
                var moveThis = document.getElementById(vt[index+1].themeName);
                moveThis.parentNode.insertBefore(moveThis, document.getElementById(vct.selected));
                var fromI = vt[index];
                var toI = vt[index+1];
                vt[index+1] = fromI;
                vt[index] = toI;
            }
            else {
                return;
            }
        }
        chrome.storage.sync.set({'VFM_THEMES': vt});
    });
};


/* Save Theme */

function _saveTheme() {
    _safeValueSwitch = 0;
    _cancelImport();
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        var dupe = false;
        const active = document.querySelector('.active')
        const update = active.getAttribute('id');
        var nameCheck = /[a-zA-Z0-9- ]$/.test(_themeName.value);
        var name = _themeName.value.replace(/ /g,'_').trim();
        for (i=0; i<vt.length; i++) {
            if (name.toLowerCase() === vt[i].themeName.substring(4).toLowerCase() && name.toLowerCase() !== vct.selected.substring(4).toLowerCase()) {
                dupe = true;
                break;
            }
        }
        if (nameCheck === true && name.length > 0 && dupe === false) {
            var trueName = 'vfm_' + name;
            var displayName = name.replace(/_/g,' ');
        }
        else {
            var epoch = Date.now();
            var trueName = 'vfm_' + epoch;
            var displayName = epoch;
            _themeName.value = epoch;
        }
        var index = vt.findIndex(x => x.themeName === update);
        vt[index].themeName = trueName;
        vt[index].colorBg = _colorBg.value;
        vt[index].colorFg = _colorFg.value;
        vt[index].colorHi = _colorHi.value;
        vt[index].colorBtn = _colorBtn.value;
        vt[index].colorDrop = _colorDrop.value;
        vt[index].colorLi = _colorLi.value;
        vt[index].colorLi2 = _colorLi2.value;
        active.id = trueName;
        const ses = document.querySelector('.active .themebox-image');
        for (const [key, value] of Object.entries(vt[index])) {
            if (key !== 'themeName') {
                ses.style.setProperty('--' + key, value);
            }
        }
        const themeBox = document.querySelector('.active .themebox-title');
        themeBox.title = '.' + trueName;
        themeBox.innerText = displayName;
        vct.selected = trueName;
        chrome.storage.sync.set({
            'VFM_THEMES': vt,
            'VFM_CURRENT_THEME': vct
        }, function() {
            _activateTheme();
            status.style.opacity = '0';
            status.innerText = chrome.i18n.getMessage('saveTheme');
            _fade();
        });
    });
};


/* Export Theme */

function _exportTheme() {
    const share = {'themeName': _themeName.value, 'colorBg': _colorBg.value, 'colorFg': _colorFg.value, 'colorHi': _colorHi.value, 'colorBtn': _colorBtn.value, 'colorDrop': _colorDrop.value, 'colorLi': _colorLi.value, 'colorLi2': colorLi2.value};
    const themeCode = JSON.stringify(share);
    navigator.clipboard.writeText(themeCode);
    status.style.opacity = '0';
    status.innerText = chrome.i18n.getMessage('exportTheme');
    _fade();
};


/* Import theme */

function _cancelImport(){
    if (importBtn.classList.contains('cancel')) {
        importBtn.classList.remove('cancel');
        importBtn.innerText = chrome.i18n.getMessage('import');
        _themeName.classList.remove('import');
        if (_safeValueSwitch === 1) {
            _safeValueSwitch = 0;
            _themeName.value = _safeName;
            _colorBg.value = _safeBg;
            _colorFg.value = _safeFg;
            _colorHi.value = _safeHi;
            _colorBtn.value = _safeBtn;
            _colorDrop.value = _safeDrop;
            _colorLi.value = _safeLi;
            _colorLi2.value = _safeLi2;
        }
        _themeName.placeholder = '';
        _themeName.setAttribute('maxlength','30');
        saveBtn.disabled = false;
        exportBtn.disabled = false;
        status.style.opacity = '0';
        status.innerText = chrome.i18n.getMessage('cancelImport');
        _fade();
    }
};

function _imp() {
    event.stopPropagation();
    event.preventDefault();
    if (eventType === 'paste') {
        var clipboardData = event.clipboardData || window.clipboardData;
        var themeCode = clipboardData.getData('text');
    }
    else {
        var themeCode = event.dataTransfer.getData('text');
    }
    var shared = JSON.parse(themeCode);
    _themeName.value = shared.themeName;
    if (_themeName.value === 'undefined') {
        _themeName.value = Date.now();
    }
    _colorBg.value = shared.colorBg;
    _colorFg.value = shared.colorFg;
    _colorHi.value = shared.colorHi;
    _colorBtn.value = shared.colorBtn;
    _colorDrop.value = shared.colorDrop;
    _colorLi.value = shared.colorLi;
    _colorLi2.value = shared.colorLi2;
    _themeName.classList.remove('import');
    _themeName.placeholder = '';
    _themeName.setAttribute('maxlength','30');
    saveBtn.disabled = false;
    exportBtn.disabled = true;
    importBtn.disabled = false;
    status.style.opacity = '0';
    status.innerText = chrome.i18n.getMessage('importTheme');
    _fade();
};

function _importTheme() {
    if (!importBtn.classList.contains('cancel')) {
        importBtn.classList.add('cancel');
        importBtn.innerText = chrome.i18n.getMessage('cancel');
        _themeName.classList.add('import');
        _safeValueSwitch = 1;
        _safeName = _themeName.value;
        _safeBg = _colorBg.value;
        _safeFg = _colorFg.value;
        _safeHi = _colorHi.value;
        _safeBtn = _colorBtn.value;
        _safeDrop = _colorDrop.value;
        _safeLi = _colorLi.value;
        _safeLi2 = _colorLi2.value;
        _themeName.value = '';
        _themeName.placeholder = chrome.i18n.getMessage('import');
        _themeName.setAttribute('maxlength','350');
        status.style.opacity = '0';
        status.innerText = chrome.i18n.getMessage('importThemeDesc');
        _fade();
        if (toggleEdit.style.display === 'none') {
            toggleEdit.style.display = 'block';
        }
        saveBtn.disabled = true;
        exportBtn.disabled = true;
        _themeName.focus();
        _themeName.addEventListener('paste', function() {
            eventType = 'paste';
            _imp(event);
        });
        _themeName.addEventListener('drop', function() {
            eventType = 'drop';
            _imp(event);
        });
    }
    else {
        _cancelImport();
    }
};


/* Toggle Edit */

function _editTheme() {
    if (toggleEdit.style.display === 'none') {
        toggleEdit.style.display = 'block';
    }
    else {
        toggleEdit.style.display = 'none';
    }
};


/* Animate Status */

function _fade() {
    var op = 0.1;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        status.style.opacity = op;
        status.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
};


const addTheme = document.getElementById('addTheme');
const removeTheme = document.getElementById('removeTheme');
const editBtn = document.querySelector('.theme-edit');
const moveLeft = document.getElementById('moveLeft');
const moveRight = document.getElementById('moveRight');
const saveBtn = document.querySelector('.theme-save');
const importBtn = document.querySelector('.theme-import');
const exportBtn = document.querySelector('.theme-export');
const toggleEdit = document.querySelector('.toggleEdit');
const _themeName = document.getElementById('themeName');
const _colorBg = document.getElementById('colorBg');
const _colorFg = document.getElementById('colorFg');
const _colorHi = document.getElementById('colorHi');
const _colorBtn = document.getElementById('colorBtn');
const _colorDrop = document.getElementById('colorDrop');
const _colorLi = document.getElementById('colorLi');
const _colorLi2 = document.getElementById('colorLi2');
const status = document.getElementById('status');

addTheme.addEventListener('click', _addTheme);
removeTheme.addEventListener('click', _removeTheme);
editBtn.addEventListener('click', _editTheme);
moveLeft.addEventListener('click', function() {
    _toMove = 'left';
    _moveTheme();
});
moveRight.addEventListener('click', function() {
    _toMove = 'right';
    _moveTheme();
});
saveBtn.addEventListener('click', _saveTheme);
importBtn.addEventListener('click', _importTheme);
exportBtn.addEventListener('click', _exportTheme);

chrome.runtime.onMessage.addListener(function(request) {
    if (request.message === 'reload options') {
        window.location.reload(false);
    }
    if (request.selected) {
        document.getElementById(request.selected).click();
        toggleEdit.style.display = 'block';
        _themeName.focus();
    }
});
