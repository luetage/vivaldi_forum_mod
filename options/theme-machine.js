/* Activate Theme */

function _activateTheme(){
    var colorBg = _colorBg.value;
    var colorFg = _colorFg.value;
    var colorHi = _colorHi.value;
    var colorBtn = _colorBtn.value;
    var colorDrop = _colorDrop.value;
    var colorLi = _colorLi.value;
    var colorLi2 = _colorLi2.value;

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
        var colorDropFg = '#fbfbfb';
        var colorDropHi = shade(colorDrop, 0.2);
        var colorDropHi2 = shade(colorDrop, 0.3);
        var colorDropHi3 = shade(colorDrop, 0.5);
    }
    else {
        var colorDropFg = '#121212';
        var colorDropHi = shade(colorDrop, -0.1);
        var colorDropHi2 = shade(colorDrop, -0.2);
        var colorDropHi3 = shade(colorDrop, -0.3);
    }
    var colorDropHiG = gray(colorDropHi);
    // background
    var bg = lum(colorBg);
    var bg2 = gray(colorBg);
    if (bg < 130) {
        var colorBgHiG = shade(bg2, 0.2);
        var colorBgHiG2 = shade(bg2, 0.4);
        var colorBgHi = shade(colorBg, 0.2);
        var colorBgHiC = shade(colorBg, 0.1);
        var colorBgHiCG = shade(bg2, 0.1);
        var logoWhite = '1';
    }
    else {
        var colorBgHiG = shade(bg2, -0.1);
        var colorBgHiG2 = shade(bg2, -0.22);
        var colorBgHi = shade(colorBg, -0.1);
        var colorBgHiC = shade(colorBg, -0.05);
        var colorBgHiCG = shade(bg2, -0.05);
        var logoWhite = '0';
    }
    // foreground
    var fg = lum(colorFg);
    var fg2 = gray(colorFg);
    if (fg < 130) {
        var colorFg2 = shade(fg2, 0.25);
    }
    else {
        var colorFg2 = shade(fg2, -0.1);
    }
    // highlight
    var hi = lum(colorHi);
    if (hi < 130) {
        var colorHiFg = '#fbfbfb';
    }
    else {
        var colorHiFg = '#121212';
    }
    // link
    var link = lum(colorLi);
    var linkR = gray(colorLi);
    if (link < 130) {
        var colorLiHi = shade(colorLi, 0.25);
        var colorLiR = shade(linkR, 0.25);
    }
    else {
        var colorLiHi = shade(colorLi, -0.12);
        var colorLiR = shade(linkR, -0.07);
    }
    // link2
    var link2 = lum(colorLi2);
    if (link2 < 130) {
        var colorLi2Hi = shade(colorLi2, 0.25);
    }
    else {
        var colorLi2Hi = shade(colorLi2, -0.12);
    }
    // button
    var btn = lum(colorBtn);
    if (btn < 130) {
        var colorBtnHi = shade(colorBtn, 0.1);
        var colorBtnFg = '#fbfbfb';
    }
    else {
        var colorBtnHi = shade(colorBtn, -0.07);
        var colorBtnFg = '#121212';
    }
    // store custom theme
    chrome.storage.sync.set({
        'logoWhite': logoWhite,
        'colorBg': colorBg,
        'colorFg': colorFg,
        'colorHi': colorHi,
        'colorBtn': colorBtn,
        'colorDrop': colorDrop,
        'colorLi': colorLi,
        'colorLi2': colorLi2,
        'colorDropFg': colorDropFg,
        'colorDropHi': colorDropHi,
        'colorDropHi2': colorDropHi2,
        'colorDropHi3': colorDropHi3,
        'colorDropHiG': colorDropHiG,
        'colorBgHi': colorBgHi,
        'colorBgHiC': colorBgHiC,
        'colorBgHiCG': colorBgHiCG,
        'colorBgHiG': colorBgHiG,
        'colorBgHiG2': colorBgHiG2,
        'colorFg2': colorFg2,
        'colorHiFg': colorHiFg,
        'colorLiHi': colorLiHi,
        'colorLiR': colorLiR,
        'colorLi2Hi': colorLi2Hi,
        'colorBtnHi': colorBtnHi,
        'colorBtnFg': colorBtnFg
    });
};


/* Restore Themes */

function _restoreThemes() {
    chrome.storage.sync.get({
        'darkGrey': '',
        'lightGrey': '',
        'mod': '',
        'sprucey': '',
        'custom1': '',
        'c1Name': 'Dracula',
        'c1Bg': '#282a36',
        'c1Fg': '#f8f8f2',
        'c1Hi': '#e2d774',
        'c1Btn': '#6176A5',
        'c1Drop': '#455182',
        'c1Li': '#f279d0',
        'c1Li2': '#8ce2f6',
        'custom2': '',
        'c2Name': 'Neon',
        'c2Bg': '#f6f6f6',
        'c2Fg': '#2f3136',
        'c2Hi': '#fd3563',
        'c2Btn': '#e3ff00',
        'c2Drop': '#2f3136',
        'c2Li': '#128e9d',
        'c2Li2': '#0062ff',
        'custom3': '',
        'c3Name': 'Solarized Light',
        'c3Bg': '#fdf6e3',
        'c3Fg': '#586e75',
        'c3Hi': '#d33682',
        'c3Btn': '#6c71c4',
        'c3Drop': '#eee8d5',
        'c3Li': '#b58900',
        'c3Li2': '#2aa198',
        'custom4': '',
        'c4Name': 'Blau',
        'c4Bg': '#23273b',
        'c4Fg': '#d4efff',
        'c4Hi': '#ffffff',
        'c4Btn': '#68a2f2',
        'c4Drop': '#d4efff',
        'c4Li': '#96ffe0',
        'c4Li2': '#d5d0fc',
    },
    function(restore) {
        c1Name = restore.c1Name;
        c1Bg = restore.c1Bg;
        c1Fg = restore.c1Fg;
        c1Hi = restore.c1Hi;
        c1Btn = restore.c1Btn;
        c1Drop = restore.c1Drop;
        c1Li = restore.c1Li;
        c1Li2 = restore.c1Li2;
        c2Name = restore.c2Name;
        c2Bg = restore.c2Bg;
        c2Fg = restore.c2Fg;
        c2Hi = restore.c2Hi;
        c2Btn = restore.c2Btn;
        c2Drop = restore.c2Drop;
        c2Li = restore.c2Li;
        c2Li2 = restore.c2Li2;
        c3Name = restore.c3Name;
        c3Bg = restore.c3Bg;
        c3Fg = restore.c3Fg;
        c3Hi = restore.c3Hi;
        c3Btn = restore.c3Btn;
        c3Drop = restore.c3Drop;
        c3Li = restore.c3Li;
        c3Li2 = restore.c3Li2;
        c4Name = restore.c4Name;
        c4Bg = restore.c4Bg;
        c4Fg = restore.c4Fg;
        c4Hi = restore.c4Hi;
        c4Btn = restore.c4Btn;
        c4Drop = restore.c4Drop;
        c4Li = restore.c4Li;
        c4Li2 = restore.c4Li2;
        //setup
        toggleEdit.style.display = 'none';
        toggleEdit.style.opacity = 1;
        editBtn.disabled = true;
        saveBtn.disabled = true;
        importBtn.disabled = true;
        exportBtn.disabled = true;
        //custom1
        document.getElementById('c1Name').innerText = c1Name;
        document.body.style.setProperty('--c1Bg', c1Bg);
        document.body.style.setProperty('--c1Fg', c1Fg);
        document.body.style.setProperty('--c1Hi', c1Hi);
        document.body.style.setProperty('--c1Btn', c1Btn);
        document.body.style.setProperty('--c1Drop', c1Drop);
        document.body.style.setProperty('--c1Li', c1Li);
        document.body.style.setProperty('--c1Li2', c1Li2);
        //custom2
        document.getElementById('c2Name').innerText = c2Name;
        document.body.style.setProperty('--c2Bg', c2Bg);
        document.body.style.setProperty('--c2Fg', c2Fg);
        document.body.style.setProperty('--c2Hi', c2Hi);
        document.body.style.setProperty('--c2Btn', c2Btn);
        document.body.style.setProperty('--c2Drop', c2Drop);
        document.body.style.setProperty('--c2Li', c2Li);
        document.body.style.setProperty('--c2Li2', c2Li2);
        //custom3
        document.getElementById('c3Name').innerText = c3Name;
        document.body.style.setProperty('--c3Bg', c3Bg);
        document.body.style.setProperty('--c3Fg', c3Fg);
        document.body.style.setProperty('--c3Hi', c3Hi);
        document.body.style.setProperty('--c3Btn', c3Btn);
        document.body.style.setProperty('--c3Drop', c3Drop);
        document.body.style.setProperty('--c3Li', c3Li);
        document.body.style.setProperty('--c3Li2', c3Li2);
        //custom4
        document.getElementById('c4Name').innerText = c4Name;
        document.body.style.setProperty('--c4Bg', c4Bg);
        document.body.style.setProperty('--c4Fg', c4Fg);
        document.body.style.setProperty('--c4Hi', c4Hi);
        document.body.style.setProperty('--c4Btn', c4Btn);
        document.body.style.setProperty('--c4Drop', c4Drop);
        document.body.style.setProperty('--c4Li', c4Li);
        document.body.style.setProperty('--c4Li2', c4Li2);
        //selected theme
        if (restore.darkGrey === '1') {
            document.getElementById('darkGrey').classList.add('active');
        }
        else if (restore.lightGrey === '1') {
            document.getElementById('lightGrey').classList.add('active');
        }
        else if (restore.mod === '1') {
            document.getElementById('mod').classList.add('active');
        }
        else if (restore.sprucey === '1') {
            document.getElementById('sprucey').classList.add('active');
        }
        else if (restore.custom1 === '1') {
            document.getElementById('custom1').classList.add('active');
            editBtn.disabled = false;
            _themeName.value = c1Name;
            _colorBg.value = c1Bg;
            _colorFg.value = c1Fg;
            _colorHi.value = c1Hi;
            _colorBtn.value = c1Btn;
            _colorDrop.value = c1Drop;
            _colorLi.value = c1Li;
            _colorLi2.value = c1Li2;
        }
        else if (restore.custom2 === '1') {
            document.getElementById('custom2').classList.add('active');
            editBtn.disabled = false;
            _themeName.value = c2Name;
            _colorBg.value = c2Bg;
            _colorFg.value = c2Fg;
            _colorHi.value = c2Hi;
            _colorBtn.value = c2Btn;
            _colorDrop.value = c2Drop;
            _colorLi.value = c2Li;
            _colorLi2.value = c2Li2;
        }
        else if (restore.custom3 === '1') {
            document.getElementById('custom3').classList.add('active');
            editBtn.disabled = false;
            _themeName.value = c3Name;
            _colorBg.value = c3Bg;
            _colorFg.value = c3Fg;
            _colorHi.value = c3Hi;
            _colorBtn.value = c3Btn;
            _colorDrop.value = c3Drop;
            _colorLi.value = c3Li;
            _colorLi2.value = c3Li2;
        }
        else if (restore.custom4 === '1') {
            document.getElementById('custom4').classList.add('active');
            editBtn.disabled = false;
            _themeName.value = c4Name;
            _colorBg.value = c4Bg;
            _colorFg.value = c4Fg;
            _colorHi.value = c4Hi;
            _colorBtn.value = c4Btn;
            _colorDrop.value = c4Drop;
            _colorLi.value = c4Li;
            _colorLi2.value = c4Li2;
        }
        else {
            document.getElementById('standard').classList.add('active');
        }
    });
}


/* Select Theme */

function _selectTheme(event) {
    const theme = event.currentTarget;
    const name = theme.getAttribute('id');
    if (!theme.classList.contains('active')) {
        const current = document.querySelector('.active')
        const currentName = current.getAttribute('id');
        current.classList.remove('active');
        theme.classList.add('active');
        if (name !== 'custom1' && name !== 'custom2' && name !== 'custom3' && name !== 'custom4') {
            chrome.storage.sync.set({
                [currentName]: '0',
                [name]: '1',
                'custom': '0'
            });
            toggleEdit.style.display = 'none';
            editBtn.disabled = true;
            saveBtn.disabled = true;
            importBtn.disabled = true;
            exportBtn.disabled = true;
        }
        else {
            chrome.storage.sync.set({
                [currentName]: '0',
                [name]: '1',
                'custom': '1'
            });
            editBtn.disabled = false;
            if (name === 'custom1') {
                _themeName.value = c1Name;
                _colorBg.value = c1Bg;
                _colorFg.value = c1Fg;
                _colorHi.value = c1Hi;
                _colorBtn.value = c1Btn;
                _colorDrop.value = c1Drop;
                _colorLi.value = c1Li;
                _colorLi2.value = c1Li2;
            }
            else if (name === 'custom2') {
                _themeName.value = c2Name;
                _colorBg.value = c2Bg;
                _colorFg.value = c2Fg;
                _colorHi.value = c2Hi;
                _colorBtn.value = c2Btn;
                _colorDrop.value = c2Drop;
                _colorLi.value = c2Li;
                _colorLi2.value = c2Li2;
            }
            else if (name === 'custom3') {
                _themeName.value = c3Name;
                _colorBg.value = c3Bg;
                _colorFg.value = c3Fg;
                _colorHi.value = c3Hi;
                _colorBtn.value = c3Btn;
                _colorDrop.value = c3Drop;
                _colorLi.value = c3Li;
                _colorLi2.value = c3Li2;
            }
            else {
                _themeName.value = c4Name;
                _colorBg.value = c4Bg;
                _colorFg.value = c4Fg;
                _colorHi.value = c4Hi;
                _colorBtn.value = c4Btn;
                _colorDrop.value = c4Drop;
                _colorLi.value = c4Li;
                _colorLi2.value = c4Li2;
            }
            _activateTheme();
        }
    }
};


/* Toggle Edit */

function _editTheme() {
    if (toggleEdit.style.display === 'none') {
        toggleEdit.style.display = 'block';
        saveBtn.disabled = false;
        importBtn.disabled = false;
        exportBtn.disabled = false;
    }
    else {
        toggleEdit.style.display = 'none';
        saveBtn.disabled = true;
        importBtn.disabled = true;
        exportBtn.disabled = true;
    }
};


/* Save Theme */

function _saveTheme() {
    const active = document.querySelector('.active');
    const newTheme = active.getAttribute('id');
    if (newTheme === 'custom1') {
        chrome.storage.sync.set({
            'c1Name': _themeName.value,
            'c1Bg': _colorBg.value,
            'c1Fg': _colorFg.value,
            'c1Hi': _colorHi.value,
            'c1Btn': _colorBtn.value,
            'c1Drop': _colorDrop.value,
            'c1Li': _colorLi.value,
            'c1Li2': _colorLi2.value
        });
    }
    if (newTheme === 'custom2') {
        chrome.storage.sync.set({
            'c2Name': _themeName.value,
            'c2Bg': _colorBg.value,
            'c2Fg': _colorFg.value,
            'c2Hi': _colorHi.value,
            'c2Btn': _colorBtn.value,
            'c2Drop': _colorDrop.value,
            'c2Li': _colorLi.value,
            'c2Li2': _colorLi2.value
        });
    }
    if (newTheme === 'custom3') {
        chrome.storage.sync.set({
            'c3Name': _themeName.value,
            'c3Bg': _colorBg.value,
            'c3Fg': _colorFg.value,
            'c3Hi': _colorHi.value,
            'c3Btn': _colorBtn.value,
            'c3Drop': _colorDrop.value,
            'c3Li': _colorLi.value,
            'c3Li2': _colorLi2.value
        });
    }
    if (newTheme === 'custom4') {
        chrome.storage.sync.set({
            'c4Name': _themeName.value,
            'c4Bg': _colorBg.value,
            'c4Fg': _colorFg.value,
            'c4Hi': _colorHi.value,
            'c4Btn': _colorBtn.value,
            'c4Drop': _colorDrop.value,
            'c4Li': _colorLi.value,
            'c4Li2': _colorLi2.value
        });
    }
    _restoreThemes();
    _activateTheme();
    status.innerText = chrome.i18n.getMessage('saveTheme');
};


/* Export Theme */

function _exportTheme() {
    chrome.storage.local.set({
        'themeName': _themeName.value,
        'colorBg': _colorBg.value,
        'colorFg': _colorFg.value,
        'colorHi': _colorHi.value,
        'colorBtn': _colorBtn.value,
        'colorDrop': _colorDrop.value,
        'colorLi': _colorLi.value,
        'colorLi2': _colorLi2.value
    },
    function() {
        chrome.storage.local.get({
            'themeName': '',
            'colorBg': '',
            'colorFg': '',
            'colorHi': '',
            'colorBtn': '',
            'colorDrop': '',
            'colorLi': '',
            'colorLi2': ''
        },
        function(items){
            var result = JSON.stringify(items);
            var url = 'data:application/json;base64,' + btoa(result);
            const getName = items.themeName.replace(/\s+/g, '-').toLowerCase();
            if (getName !== '' && tryAgain === false) {
                var nameIt = getName + '.json';
            }
            else {
                var nameIt = 'theme.json';
            }
            chrome.downloads.download({
                url: url,
                saveAs: true,
                filename: nameIt
            },
            function(download) {
                if (download === undefined && tryAgain === false) {
                    console.log('VFM error: ' + chrome.runtime.lastError.message);
                    tryAgain = true;
                    _exportTheme();
                }
                else {
                    tryAgain = false;
                }
            });
        });
    });
};


/* Import theme */

function _importTheme(e) {
    var files = e.target.files, reader = new FileReader();
    reader.onload = _imp;
    reader.readAsText(files[0]);
};
function _imp() {
    var colors = JSON.parse(this.result);
    chrome.storage.local.set(
        colors,
    function() {
        chrome.storage.local.get({
            'themeName': '',
            'colorBg': '',
            'colorFg': '',
            'colorHi': '',
            'colorBtn': '',
            'colorDrop': '',
            'colorLi': '',
            'colorLi2': ''
        },
        function(set) {
            _themeName.value = set.themeName;
            _colorBg.value = set.colorBg;
            _colorFg.value = set.colorFg;
            _colorHi.value = set.colorHi;
            _colorBtn.value = set.colorBtn;
            _colorDrop.value = set.colorDrop;
            _colorLi.value = set.colorLi;
            _colorLi2.value = set.colorLi2;
            status.innerText = chrome.i18n.getMessage('importTheme');
        });
    });
    document.getElementById('importHidden').value = '';
};


const editBtn = document.querySelector('.theme-edit');
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
var tryAgain = false;

document.querySelectorAll('button.themebox').forEach(function(theme) {
    theme.addEventListener('click', _selectTheme);
});
editBtn.addEventListener('click', _editTheme);
saveBtn.addEventListener('click', _saveTheme);
exportBtn.addEventListener('click', _exportTheme);
importBtn.onclick = function() {
    document.getElementById('importHidden').click()
};
document.getElementById('importHidden').addEventListener("change", _importTheme, false);
