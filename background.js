// Default Setup

function defaultSetup() {
    chrome.storage.sync.set ({
        'VFM_CURRENT_THEME': {
            'selected': 'vfm-standard',
            'colors': {'colorBg': '', 'colorFg': '', 'colorAc': '', 'colorHi': '', 'colorLi': '', 'colorCo': '', 'colorDd': '', 'colorBgD': '', 'colorBgC': '', 'colorBgL': '', 'colorBgM': '', 'colorBgH': '', 'colorFg2': '', 'colorAcFg': '', 'colorLi2': '', 'colorCo2': '', 'colorDdFg': '', 'colorDdL': '', 'colorDdM': '', 'colorDdH': ''},
        },
        'VFM_THEMES': [
            {'themeName': 'vfm_Dracula', 'colorBg': '#282a36','colorFg': '#f8f8f2', 'colorHi': '#50fa7b', 'colorAc': '#44475a', 'colorLi': '#ff79c6', 'colorCo': '#bd93f9', 'colorDd': '#6272a4'},
            {'themeName': 'vfm_Solarized_Light', 'colorBg': '#fdf6e3','colorFg': '#586e75', 'colorHi': '#af8700', 'colorAc': '#eee8d5', 'colorLi': '#268bd2', 'colorCo': '#2aa198', 'colorDd': '#657b83'},
            {'themeName': 'vfm_Scream', 'colorBg': '#fff7fd','colorFg': '#472b15', 'colorHi': '#007681', 'colorAc': '#2f1d0e', 'colorLi': '#ff8a80', 'colorCo': '#897eff', 'colorDd': '#efe6ee'},
            {'themeName': 'vfm_Tokyo_Night', 'colorBg': '#1a1b26','colorFg': '#a9b1d6', 'colorHi': '#ff9e64', 'colorAc': '#414868', 'colorLi': '#f7768e', 'colorCo': '#7aa2f7', 'colorDd': '#24283b'},
            {'themeName': 'vfm_PaperColor_Dark', 'colorBg': '#1c1c1c','colorFg': '#d0d0d0', 'colorHi': '#afd700', 'colorAc': '#5f8787', 'colorLi': '#00afaf', 'colorCo': '#ff5faf', 'colorDd': '#5f8787'},
            {'themeName': 'vfm_PaperColor_Light', 'colorBg': '#eeeeee','colorFg': '#444444', 'colorHi': '#d75f00', 'colorAc': '#005f87', 'colorLi': '#005faf', 'colorCo': '#d70087', 'colorDd': '#005f87'},
            {'themeName': 'vfm_Rigel', 'colorBg': '#002635','colorFg': '#e6e6dc', 'colorHi': '#00cccc', 'colorAc': '#1c8db2', 'colorLi': '#1c8db2', 'colorCo': '#7eb2dd', 'colorDd': '#517f8d'},
            {'themeName': 'vfm_Fireball', 'colorBg': '#4a525a','colorFg': '#dddddd', 'colorHi': '#a8ffd2', 'colorAc': '#bcc7d2', 'colorLi': '#ffa9c0', 'colorCo': '#1fd6ff', 'colorDd': '#ffa9c0'},
        ],
        'VFM_MODS': {
            'advancedFormatting': false,
            'headerScroll': false,
            'bookmarks': false,
            'notificationIcons': false,
            'userID': false,
            'signatureMod': false,
            'square': false,
            'systemEmoji': false
        },
        'VFM_USER_CSS': false,
        'VFM_SCHEDULE': {
            'activated': false,
            'schedule': [
                {'time': '06:00', 'theme': 'vfm_PaperColor_Light'},
                {'time': '18:00', 'theme': 'vfm_PaperColor_Dark'}
            ]
        }
    }, function() {
        chrome.runtime.openOptionsPage();
    })
}


// Activate Theme

let RGB = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

let lum = (r, g, b) => {
    let a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

let contrast = (lum1, lum2) => {
    const bright = Math.max(lum1, lum2);
    const dark = Math.min(lum1, lum2);
    return (bright + 0.05) / (dark + 0.05);
}

let shade = (color, percent) => {
    let f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function activateTheme() {
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, get => {
        const vt = get.VFM_THEMES;
        const vct = get.VFM_CURRENT_THEME;
        if (vct.selected.startsWith('vfm_')) {
            let co = vct.colors;
            const index = vt.findIndex(x => x.themeName === vct.selected);
            co.colorBg = vt[index].colorBg;
            co.colorFg = vt[index].colorFg;
            co.colorHi = vt[index].colorHi;
            co.colorCo = vt[index].colorCo;
            co.colorDd = vt[index].colorDd;
            co.colorLi = vt[index].colorLi;
            co.colorAc = vt[index].colorAc;
            // background
            const rgbBg = RGB(co.colorBg);
            const lumBg = lum(rgbBg[0], rgbBg[1], rgbBg[2]);
            if (lumBg <= 0.5) {
                if (lumBg < 0.01) co.colorBgC = shade(co.colorBg, 0.1);
                else co.colorBgC = shade(co.colorBg, -0.2);
                co.colorBgD = shade(co.colorBg, 0.05);
                co.colorBgL = shade(co.colorBg, 0.1);
                co.colorBgM = shade(co.colorBg, 0.2);
                co.colorBgH = shade(co.colorBg, 0.4);
            }
            else {
                co.colorBgC = shade(co.colorBg, -0.05);
                co.colorBgD = shade(co.colorBg, -0.025);
                co.colorBgL = shade(co.colorBg, -0.05);
                co.colorBgM = shade(co.colorBg, -0.1);
                co.colorBgH = shade(co.colorBg, -0.2);
            }
            // foreground
            const rgbFg = RGB(co.colorFg);
            const lumFg = lum(rgbFg[0], rgbFg[1], rgbFg[2]);
            if (lumBg > 0.5) co.colorFg2 = shade(co.colorFg, 0.25);
            else co.colorFg2 = shade(co.colorFg, -0.12);
            // accent
            const rgbAc = RGB(co.colorAc);
            const lumAc = lum(rgbAc[0], rgbAc[1], rgbAc[2]);
            const conAc1 = contrast(lumAc, lumBg);
            const conAc2 = contrast(lumAc, lumFg);
            if (conAc1 >= conAc2) co.colorAcFg = co.colorBg;
            else co.colorAcFg = co.colorFg;
            // link
            if (lumBg > 0.5) co.colorLi2 = shade(co.colorLi, 0.25);
            else co.colorLi2 = shade(co.colorLi, -0.12);
            // code
            if (lumBg > 0.5) co.colorCo2 = shade(co.colorCo, 0.1);
            else co.colorCo2 = shade(co.colorCo, -0.05);
            // dropdown
            const rgbDd = RGB(co.colorDd);
            const lumDd = lum(rgbDd[0], rgbDd[1], rgbDd[2]);
            const conDd1 = contrast(lumDd, lumBg);
            const conDd2 = contrast(lumDd, lumFg);
            if (conDd1 >= conDd2) co.colorDdFg = co.colorBg;
            else co.colorDdFg = co.colorFg;
            if (lumDd <= 0.5) {
                co.colorDdL = shade(co.colorDd, 0.1);
                co.colorDdM = shade(co.colorDd, 0.2);
                co.colorDdH = shade(co.colorDd, 0.4);
            }
            else {
                co.colorDdL = shade(co.colorDd, -0.05);
                co.colorDdM = shade(co.colorDd, -0.1);
                co.colorDdH = shade(co.colorDd, -0.2);
            }
            // store custom theme
            chrome.storage.sync.set({'VFM_CURRENT_THEME': vct}, () => {
                sendToTabs('update theme');
                chrome.runtime.sendMessage({message: 'options apply theme'});
            })
        }
        else {
            sendToTabs('update theme');
            chrome.runtime.sendMessage({message: 'options apply theme'});
        }
    })
}


/* Import from theme preview */

function importFromForum() {
    let code = arguments[0].theme;
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        let vt = get.VFM_THEMES;
        let vct = get.VFM_CURRENT_THEME;
        let nameCheck = /^[a-zA-Z0-9- ]*$/.test(code.themeName);
        if (nameCheck === true && code.themeName.length < 26) {
            code.themeName = 'vfm_' + code.themeName.replace(/ /g,'_').trim();
            let index = vt.findIndex(x => x.themeName.toLowerCase() === code.themeName.toLowerCase());
            if (index !== -1) {
                code.themeName = 'vfm_' + Date.now();
            }
        }
        else {
            code.themeName = 'vfm_' + Date.now();
        }
        vct.selected = code.themeName;
        vt.push(code);
        chrome.storage.sync.set({
            'VFM_THEMES': vt,
            'VFM_CURRENT_THEME': vct
        }, function() {
            activateTheme();
            chrome.runtime.sendMessage({message: 'options update theme'});
        })
    })
}


/* Update Tabs */

function sendToTabs(reason) {
    chrome.storage.local.get({tabIDs: []}, function(get) {
        let tabIDs = get.tabIDs;
        tabIDs.forEach(function(id) {
            chrome.tabs.sendMessage(id, {message: reason}, function() {
                if (chrome.runtime.lastError) {
                    let del = tabIDs.indexOf(id);
                    tabIDs.splice(del, 1);
                    chrome.storage.local.set({tabIDs: tabIDs});
                }
            })
        })
    })
}


/* Scheduled Theming */

function setSchedule() {
    chrome.storage.sync.get({
        'VFM_CURRENT_THEME': '',
        'VFM_SCHEDULE': ''
    }, function(get) {
        const sc = get.VFM_SCHEDULE;
        if (sc.activated === true) {
            const vct = get.VFM_CURRENT_THEME;
            const epoch = Date.now();
            const time = new Date(epoch);
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const clock = String(hours).padStart(2,0) + ':' + String(minutes).padStart(2,0);
            const index = sc.schedule.findIndex(x => x.time > clock);
            if (index === -1) {
                var diff = (86400-(hours*3600+minutes*60)+Number(sc.schedule[0].time.substring(0,2))*3600+Number(sc.schedule[0].time.substring(3,5))*60)*1000;
            }
            else {
                var diff = (Number(sc.schedule[index].time.substring(0,2))*3600+Number(sc.schedule[index].time.substring(3,5))*60-(hours*3600+minutes*60))*1000;
            }
            if (index === -1 || index === 0) {
                var changeTo = sc.schedule[sc.schedule.length-1].theme;
            }
            else {
                var changeTo = sc.schedule[index-1].theme;
            }
            if (vct.selected !== changeTo) {
                vct.selected = changeTo;
                chrome.storage.sync.set({VFM_CURRENT_THEME: vct}, function() {
                    activateTheme();
                    chrome.runtime.sendMessage({message: 'options update theme'});
                })
            }
            chrome.alarms.create('themeChange', {'when': Math.floor(epoch/60000)*60000+diff});
        }
    })
}


/*
 * Advanced Formatting
 * In case item orders change from one instance to next
 * Put them all in order
 * And re-number any not hidden starting from 1
 * If this update has support for new buttons, mark them as disabled
 */
function normaliseFormattingToolbarOrders(){
    chrome.storage.sync.get({
        VFM_FORMAT: ""
    }, settings => {
        if(settings.VFM_FORMAT===""){
            return;
        }
        const possibleButtons = [
            "bold",
            "italic",
            "list",
            "strikethrough",
            "link",
            "picture-o",
            "zen",
            "picture",
            "heart-o",
            "emoji-add-emoji",
            "header",
            "window-minimize",
            "quote-right",
            "code",
            "file-code-o",
            "th-large",
            "list-ol",
            "shield"
        ];
        const normalisedOrder = {};
        let outOfOrder = Object.entries(settings.VFM_FORMAT);
        outOfOrder.sort((a,b) => Number(a[1]) - Number(b[1]));
        let orderCounter = 1;
        for (let index = 0; index < outOfOrder.length; index++) {
            const key = outOfOrder[index][0];
            const order = outOfOrder[index][1];
            if(possibleButtons.indexOf(key)===-1){
                continue;
            }
            if(order === -1){
                normalisedOrder[key] = -1;
            } else {
                normalisedOrder[key] = orderCounter++;
            }
        }
        const existingButtons = Object.keys(settings.VFM_FORMAT);
        const newButtons = possibleButtons.filter(x => existingButtons.indexOf(x)===-1);
        for (let index = 0; index < newButtons.length; index++) {
            normalisedOrder[newButtons[index]] = orderCounter++;
        }
        chrome.storage.sync.set({VFM_FORMAT: normalisedOrder});
    });
}


chrome.runtime.onStartup.addListener(function() {
    setSchedule();
})
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'update') normaliseFormattingToolbarOrders();
    if (details.reason === 'install' || details.previousVersion * 1 < 3) defaultSetup();
})
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'options pls') chrome.runtime.openOptionsPage();
    if (request.message === 'whoami') {
        chrome.storage.local.get({tabIDs: []}, function(get) {
            let tabIDs = get.tabIDs;
            let index = tabIDs.findIndex(x => x === sender.tab.id);
            if (index === -1) {
                tabIDs.push(sender.tab.id);
                chrome.storage.local.set({tabIDs: tabIDs});
            }
            sendResponse({message: 'akn'});
            chrome.storage.sync.get({'VFM_SCHEDULE': ''}, get => {
                if (get.VFM_SCHEDULE.activated === true) {
                    chrome.alarms.get('themeChange', alarm => {
                        setTimeout(() => {
                            if (Date.now() > alarm.scheduledTime) setSchedule();
                        }, 3000)
                    })
                }
            })
        })
    }
    if (request.message === 'trigger theme') activateTheme();
    if (request.message === 'trigger schedule') setSchedule();
    if (request.message === 'clear alarm') chrome.alarms.clear('themeChange');
    if (request.message === 'trigger usercss') sendToTabs('change usercss');
    if (request.theme) importFromForum.apply(this, arguments);
    if (request.message === 'reset') {
        defaultSetup();
        sendResponse({message: 'akn'});
    }
})
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'themeChange') {
        setSchedule();
    }
})
