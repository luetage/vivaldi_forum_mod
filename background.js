/* Migrate custom themes and modification settings */

function migrateData(){chrome.storage.sync.get({},function(o){var c=[];if("1"===o.advancedFormatting)var e=true;else e=false;if("1"===o.bookmarks)var r=true;else r=false;if("1"===o.compact)var a=true;else a=false;if("1"===o.headerScroll)var l=true;else l=false;if("1"===o.notificationIcons)var i=true;else i=false;if("1"===o.signatureMod)var t=true;else t=false;if("1"===o.square)var f=true;else f=false;if("1"===o.timestamp)var m=true;else m=false;if("1"===o.tooltips)var s=true;else s=false;if("1"===o.unread)var n=true;else n=false;if("1"===o.userID)var g=true;else g=false;var p=[];if(o.c1Bg){var B=/^[a-zA-Z0-9- ]*$/.test(o.c1Name);c1Name=true===B?"vfm_"+o.c1Name.replace(/ /g,"_").trim()+"-c1":"vfm_"+Date.now(),c1={colorBg:o.c1Bg,colorFg:o.c1Fg,colorHi:o.c1Hi,colorDrop:o.c1Drop,colorBtn:o.c1Btn,colorLi:o.c1Li,colorLi2:o.c1Li2,themeName:c1Name},p.push(c1)}if(o.c2Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c2Name);c2Name=true===B?"vfm_"+o.c2Name.replace(/ /g,"_").trim()+"-c2":"vfm_"+Date.now(),c2={colorBg:o.c2Bg,colorFg:o.c2Fg,colorHi:o.c2Hi,colorDrop:o.c2Drop,colorBtn:o.c2Btn,colorLi:o.c2Li,colorLi2:o.c2Li2,themeName:c2Name},p.push(c2)}if(o.c3Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c3Name);c3Name=true===B?"vfm_"+o.c3Name.replace(/ /g,"_").trim()+"-c3":"vfm_"+Date.now(),c3={colorBg:o.c3Bg,colorFg:o.c3Fg,colorHi:o.c3Hi,colorDrop:o.c3Drop,colorBtn:o.c3Btn,colorLi:o.c3Li,colorLi2:o.c3Li2,themeName:c3Name},p.push(c3)}if(o.c4Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c4Name);c4Name=true===B?"vfm_"+o.c4Name.replace(/ /g,"_").trim()+"-c4":"vfm_"+Date.now(),c4={colorBg:o.c4Bg,colorFg:o.c4Fg,colorHi:o.c4Hi,colorDrop:o.c4Drop,colorBtn:o.c4Btn,colorLi:o.c4Li,colorLi2:o.c4Li2,themeName:c4Name},p.push(c4)}if(c5={themeName:"Dracula",colorBg:"#282a36",colorFg:"#f8f8f2",colorHi:"#e2d774",colorBtn:"#6176a5",colorDrop:"#455182",colorLi:"#f279d0",colorLi2:"#8ce2f6"},p.push(c5),c6={themeName:"Neon",colorBg:"#f6f6f6",colorFg:"#2f3136",colorHi:"#fd3563",colorBtn:"#e3ff00",colorDrop:"#2f3136",colorLi:"#128e9d",colorLi2:"#0062ff"},p.push(c6),c7={themeName:"Solarized Light",colorBg:"#fdf6e3",colorFg:"#586e75",colorHi:"#d33682",colorBtn:"#6c71c4",colorDrop:"#eee8d5",colorLi:"#b58900",colorLi2:"#2aa198"},p.push(c7),c8={themeName:"Blau",colorBg:"#23273b",colorFg:"#d4efff",colorHi:"#ffffff",colorBtn:"#68a2f2",colorDrop:"#d4efff",colorLi:"#96ffe0",colorLi2:"#d5d0fc"},p.push(c8),"1"===o.cssToggle)var v=true;else v=false;if(""!==o.formattingToolbar)var h=o.formattingToolbar;else h="";o.forEach(function(o){c.push(o)}),chrome.storage.sync.remove(c,function(){chrome.storage.sync.set({VFM_MODS:{advancedFormatting:e,headerScroll:l,bookmarks:r,notificationIcons:i,tooltips:s,unread:n,timestamp:m,compact:a,userID:g,signatureMod:t,square:f},VFM_THEMES:p,VFM_USER_CSS:v,VFM_FORMAT:h},function(){chrome.runtime.openOptionsPage()})})})}


/* Activate Theme */

function activateTheme() {
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        if (vct.selected.startsWith('vfm_')) {
            var co = vct.colors;
            var index = vt.findIndex(x => x.themeName === vct.selected);
            var colorBg = vt[index].colorBg;
            var colorFg = vt[index].colorFg;
            var colorHi = vt[index].colorHi;
            var colorBtn = vt[index].colorBtn;
            var colorDrop = vt[index].colorDrop;
            var colorLi = vt[index].colorLi;
            var colorLi2 = vt[index].colorLi2;
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
            chrome.storage.sync.set({'VFM_CURRENT_THEME': vct}, function() {
                sendToTabs('update theme');
            });
        }
        else {
            sendToTabs('update theme');
        }
    });
};


/* Import from theme preview */

function importFromForum() {
    var code = arguments[0].theme;
    chrome.storage.sync.get({
        'VFM_THEMES': '',
        'VFM_CURRENT_THEME': ''
    }, function(get) {
        var vt = get.VFM_THEMES;
        var vct = get.VFM_CURRENT_THEME;
        var nameCheck = /^[a-zA-Z0-9- ]*$/.test(code.themeName);
        if (nameCheck === true && code.themeName.length < 26) {
            code.themeName = 'vfm_' + code.themeName.replace(/ /g,'_').trim();
            var index = vt.findIndex(x => x.themeName.toLowerCase() === code.themeName.toLowerCase());
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
            chrome.runtime.sendMessage({message: 'reload options'});
        });
    });
};


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


/* Update tabs */

function sendToTabs(reason) {
    tabIDs.forEach(function(id) {
        chrome.tabs.sendMessage(id, {message: reason}, function() {
            if (chrome.runtime.lastError) {
                var del = tabIDs.indexOf(id);
                tabIDs.splice(del, 1);
            }
        });
    });
};


var tabIDs = [];

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "update") {
        normaliseFormattingToolbarOrders();
        if (details.previousVersion * 1 < 3) {
            migrateData();
        }
    }
    if (details.reason ==='install') {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.message === 'options pls') {
        chrome.runtime.openOptionsPage();
    }
    if (request.message === 'whoami') {
        var index = tabIDs.findIndex(x => x === sender.tab.id);
        if (index === -1) {
            tabIDs.push(sender.tab.id);
        }
    }
    if (request.message === 'trigger theme') {
        activateTheme();
    }
    if (request.message === 'trigger usercss') {
        sendToTabs('change usercss');
    }
    if (request.message === 'trigger mod') {
        sendToTabs('reload forum');
    }
    if (request.theme) {
        importFromForum.apply(this, arguments);
    }
});
