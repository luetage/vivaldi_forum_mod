/* Modifications */

chrome.storage.sync.get({
    'headerScroll': '',
    'compact': '',
    'bookmarks': '',
    'notificationIcons': '',
    'tooltips': '',
    'unread': '',
    'timestamp': '',
    'userID': '',
    'signatureMod' : '',
    'square': '',
    'emotePicker': ''
},
function(mods) {
    var headerScroll = mods.headerScroll;
    var bookmarks = mods.bookmarks;
    var compact = mods.compact;
    var notificationIcons = mods.notificationIcons;
    var tooltips = mods.tooltips;
    var unread = mods.unread;
    var timestamp = mods.timestamp;
    var userID = mods.userID;
    var signatureMod = mods.signatureMod;
    var square = mods.square;
    var emotePicker = mods.emotePicker;

    if (headerScroll == 1) {
        var MheaderScroll = document.createElement('script');
        if (compact == 1) {
            MheaderScroll.src = chrome.extension.getURL('mods/header_scroll_compact.js');
        }
        else {
            MheaderScroll.src = chrome.extension.getURL('mods/header_scroll.js');
        }
        document.getElementsByTagName('body')[0].appendChild(MheaderScroll);
    }
    if (notificationIcons == 1) {
        var MnotificationIcons = document.createElement('link');
        MnotificationIcons.href = chrome.extension.getURL('mods/notification-icons.css');
        MnotificationIcons.type = 'text/css';
        MnotificationIcons.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(MnotificationIcons);
    }
    if (tooltips == 1) {
        var Mtooltips = document.createElement('link');
        Mtooltips.href = chrome.extension.getURL('mods/tooltips.css');
        Mtooltips.type = 'text/css';
        Mtooltips.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Mtooltips);
    }
    if (unread == 1) {
        var Munread = document.createElement('link');
        Munread.href = chrome.extension.getURL('mods/unread.css');
        Munread.type = 'text/css';
        Munread.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Munread);
    }
    if (timestamp == 1) {
        var Mtimestamp = document.createElement('link');
        Mtimestamp.href = chrome.extension.getURL('mods/timestamp.css');
        Mtimestamp.type = 'text/css';
        Mtimestamp.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Mtimestamp);
    }
    if (userID == 1) {
        var MuserID = document.createElement('link');
        MuserID.href = chrome.extension.getURL('mods/userID.css');
        MuserID.type = 'text/css';
        MuserID.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(MuserID);
    }
    if (signatureMod == 1) {
        var MsignatureMod = document.createElement('link');
        MsignatureMod.href = chrome.extension.getURL('mods/signature-mod.css');
        MsignatureMod.type = 'text/css';
        MsignatureMod.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(MsignatureMod);
    }
    if (square == 1) {
        var Msquare = document.createElement('link');
        Msquare.href = chrome.extension.getURL('mods/square-avatars.css');
        Msquare.type = 'text/css';
        Msquare.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(Msquare);
    }
    if (emotePicker == 1) {
        var emoteStyle = document.createElement('link');
        emoteStyle.href = chrome.extension.getURL('mods/advanced-formatting.css');
        emoteStyle.type = 'text/css';
        emoteStyle.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(emoteStyle);
    }

    add_copy_code();
    discord();
    if (bookmarks == 1) { _bookmarks() }
    if (signatureMod == 1) { _smod() }
    if (timestamp == 1) { _lastedit() }

    document.addEventListener('click', function() {
        add_copy_code();
        bookmarked();
        if (signatureMod == 1) { w_smod() }
        if (timestamp == 1) { w_lastedit() }
    });

    window.addEventListener('popstate', function() {
        add_copy_code();
        if (signatureMod == 1) { w_smod() }
        if (timestamp == 1) { w_lastedit() }
    });
});


/* Bookmarks in navigation */

function _bookmarks() {
    var nav = document.getElementById('main-nav');
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.classList.add('navigation-link');
    link.href = '/user/' + username() + '/bookmarks';
    link.setAttribute('title', '');
    link.setAttribute('data-original-title', 'Bookmarks');
    link.innerHTML = '<i class="fa fa-fw fa-bookmark"></i><span class="visible-xs-inline showmenutext" style="margin-left: 2px">Bookmarks</span>';
    nav.insertBefore(li, nav.childNodes[15]);
    li.appendChild(link);
};


/* Signature mod */

function _smod() {
    var signature = document.querySelector('.post-signature');
    if (signature != null) {
        var signatures = document.getElementsByClassName('post-signature');
        var siblings = document.querySelectorAll('.post-signature + .pull-right .post-tools');
        var prevent = document.querySelectorAll('.post-signature + .pull-right .post-tools a:nth-of-type(1)');
        for (var i=0; i < signatures.length; i++) {
            if (prevent[i].classList.contains('sig') === false) {
                var button = document.createElement('a');
                button.innerHTML = 'Signature';
                button.classList.add('no-select', 'sig');
                siblings[i].insertBefore(button, siblings[i].firstChild);
            }
        }
        var showsig = document.getElementsByClassName('sig');
        for (i=0; i < showsig.length; i++) {
              showsig[i].addEventListener('click', function(i) {
                signatures[i].style = 'display: block';
                showsig[i].style = 'text-decoration: none; cursor: default';
              }.bind(this, i));
        }
    }
};

function w_smod() {
    setTimeout(function() {
        _smod();
    }, 700);
};


/* Last edit timestamp to local */

function tolocalISO(date) {
    function pad(n) { return n < 10 ? '0' + n : n }
    var localISO = date.getFullYear() + '-'
        + pad(date.getMonth() + 1) + '-'
        + pad(date.getDate()) + ' '
        + pad(date.getHours()) + ':'
        + pad(date.getMinutes());
    return localISO;
};

function _lastedit() {
    var topic = document.querySelector('.topic');
    if (topic != null) {
        var metas = document.getElementsByTagName('meta');
        for (var i=0; i < metas.length; i++) {
            if (metas[i].getAttribute('itemprop') && metas[i].getAttribute('itemprop') === 'dateModified' && metas[i].getAttribute('content') !== '') {
                var utcDate = metas[i].getAttribute('content');
                var localDate = new Date(utcDate);
                metas[i].setAttribute('content', tolocalISO(localDate));
                metas[i].setAttribute('itemprop', 'localdateModified');
            }
        }
    }
};

function w_lastedit() {
    setTimeout(function() {
        _lastedit();
    }, 700);
};
