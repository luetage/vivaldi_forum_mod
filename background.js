/* Migrate data from version 2.4 */

function migrateData(){chrome.storage.sync.get({advancedFormatting:"",bookmarks:"",c1Bg:"",c1Btn:"",c1Drop:"",c1Fg:"",c1Hi:"",c1Li:"",c1Li2:"",c1Name:"",c2Bg:"",c2Btn:"",c2Drop:"",c2Fg:"",c2Hi:"",c2Li:"",c2Li2:"",c2Name:"",c3Bg:"",c3Btn:"",c3Drop:"",c3Fg:"",c3Hi:"",c3Li:"",c3Li2:"",c3Name:"",c4Bg:"",c4Btn:"",c4Drop:"",c4Fg:"",c4Hi:"",c4Li:"",c4Li2:"",c4Name:"",colorBg:"",colorBgHi:"",colorBgHiC:"",colorBgHiCG:"",colorBgHiG:"",colorBgHiG2:"",colorBtn:"",colorBtnFg:"",colorBtnHi:"",colorDrop:"",colorDropFg:"",colorDropHi:"",colorDropHi2:"",colorDropHi3:"",colorDropHiG:"",colorFg:"",colorFg2:"",colorHi:"",colorHiFg:"",colorLi:"",colorLi2:"",colorLi2Hi:"",colorLiHi:"",colorLiR:"",compact:"",cssToggle:"",formattingToolbar:"",headerScroll:"",logoWhite:"",notificationIcons:"",signatureMod:"",square:"",standard:"",timestamp:"",tooltips:"",unread:"",userID:""},function(o){if("1"===o.advancedFormatting)var c=true;else c=false;if("1"===o.bookmarks)var r=true;else r=false;if("1"===o.compact)var e=true;else e=false;if("1"===o.headerScroll)var i=true;else i=false;if("1"===o.notificationIcons)var l=true;else l=false;if("1"===o.signatureMod)var a=true;else a=false;if("1"===o.square)var t=true;else t=false;if("1"===o.timestamp)var m=true;else m=false;if("1"===o.tooltips)var f=true;else f=false;if("1"===o.unread)var g=true;else g=false;if("1"===o.userID)var n=true;else n=false;var s=[];if(o.c1Bg){var B=/^[a-zA-Z0-9- ]*$/.test(o.c1Name);c1Name=true===B?"vfm_"+o.c1Name.replace(/ /g,"_").trim()+"-c1":"vfm_"+Date.now(),c1={colorBg:o.c1Bg,colorFg:o.c1Fg,colorHi:o.c1Hi,colorDrop:o.c1Drop,colorBtn:o.c1Btn,colorLi:o.c1Li,colorLi2:o.c1Li2,themeName:c1Name},s.push(c1)}if(o.c2Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c2Name);c2Name=true===B?"vfm_"+o.c2Name.replace(/ /g,"_").trim()+"-c2":"vfm_"+Date.now(),c2={colorBg:o.c2Bg,colorFg:o.c2Fg,colorHi:o.c2Hi,colorDrop:o.c2Drop,colorBtn:o.c2Btn,colorLi:o.c2Li,colorLi2:o.c2Li2,themeName:c2Name},s.push(c2)}if(o.c3Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c3Name);c3Name=true===B?"vfm_"+o.c3Name.replace(/ /g,"_").trim()+"-c3":"vfm_"+Date.now(),c3={colorBg:o.c3Bg,colorFg:o.c3Fg,colorHi:o.c3Hi,colorDrop:o.c3Drop,colorBtn:o.c3Btn,colorLi:o.c3Li,colorLi2:o.c3Li2,themeName:c3Name},s.push(c3)}if(o.c4Bg){B=/^[a-zA-Z0-9- ]*$/.test(o.c4Name);c4Name=true===B?"vfm_"+o.c4Name.replace(/ /g,"_").trim()+"-c4":"vfm_"+Date.now(),c4={colorBg:o.c4Bg,colorFg:o.c4Fg,colorHi:o.c4Hi,colorDrop:o.c4Drop,colorBtn:o.c4Btn,colorLi:o.c4Li,colorLi2:o.c4Li2,themeName:c4Name},s.push(c4)}if(c5={themeName:"vfm_Dracula",colorBg:"#282a36",colorFg:"#f8f8f2",colorHi:"#e2d774",colorBtn:"#6176a5",colorDrop:"#455182",colorLi:"#f279d0",colorLi2:"#8ce2f6"},s.push(c5),c6={themeName:"vfm_Neon",colorBg:"#f6f6f6",colorFg:"#2f3136",colorHi:"#fd3563",colorBtn:"#e3ff00",colorDrop:"#2f3136",colorLi:"#128e9d",colorLi2:"#0062ff"},s.push(c6),c7={themeName:"vfm_Solarized_Light",colorBg:"#fdf6e3",colorFg:"#586e75",colorHi:"#d33682",colorBtn:"#6c71c4",colorDrop:"#eee8d5",colorLi:"#b58900",colorLi2:"#2aa198"},s.push(c7),c8={themeName:"vfm_Blau",colorBg:"#23273b",colorFg:"#d4efff",colorHi:"#ffffff",colorBtn:"#68a2f2",colorDrop:"#d4efff",colorLi:"#96ffe0",colorLi2:"#d5d0fc"},s.push(c8),"1"===o.cssToggle)var p=true;else p=false;if(o.formattingToolbar)var L=o.formattingToolbar;else L="";chrome.storage.sync.clear(function(){chrome.storage.sync.set({VFM_MODS:{advancedFormatting:c,headerScroll:i,bookmarks:r,notificationIcons:l,tooltips:f,unread:g,timestamp:m,compact:e,userID:n,signatureMod:a,square:t},VFM_THEMES:s,VFM_USER_CSS:p,VFM_FORMAT:L},function(){chrome.runtime.openOptionsPage()})})})}


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
                chrome.storage.local.set({tabIDs: tabIDs});
            }
        });
    });
};


chrome.storage.local.get({tabIDs: []}, function(get) {
    tabIDs = get.tabIDs;
})

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
            chrome.storage.local.set({tabIDs: tabIDs});
        }
    }
    if (request.message === 'trigger theme') {
        activateTheme();
    }
    if (request.message === 'trigger usercss') {
        sendToTabs('change usercss');
    }
    if (request.theme) {
        importFromForum.apply(this, arguments);
    }
});
