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
    'advancedFormatting': ''
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
    var advancedFormatting = mods.advancedFormatting;

    if (headerScroll == 1) {
        var modHeaderScroll = document.createElement('script');
        if (compact == 1) {
            modHeaderScroll.src = chrome.extension.getURL('mods/header_scroll_compact.js');
        }
        else {
            modHeaderScroll.src = chrome.extension.getURL('mods/header_scroll.js');
        }
        document.getElementsByTagName('body')[0].appendChild(modHeaderScroll);
    }
    if (notificationIcons == 1) {
        var modNotificationIcons = document.createElement('link');
        modNotificationIcons.href = chrome.extension.getURL('mods/notification-icons.css');
        modNotificationIcons.type = 'text/css';
        modNotificationIcons.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modNotificationIcons);
    }
    if (tooltips == 1) {
        var modTooltips = document.createElement('link');
        modTooltips.href = chrome.extension.getURL('mods/tooltips.css');
        modTooltips.type = 'text/css';
        modTooltips.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modTooltips);
    }
    if (unread == 1) {
        var modUnread = document.createElement('link');
        modUnread.href = chrome.extension.getURL('mods/unread.css');
        modUnread.type = 'text/css';
        modUnread.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modUnread);
    }
    if (timestamp == 1) {
        var modTimestamp = document.createElement('link');
        modTimestamp.href = chrome.extension.getURL('mods/timestamp.css');
        modTimestamp.type = 'text/css';
        modTimestamp.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modTimestamp);
    }
    if (userID == 1) {
        var modUserID = document.createElement('link');
        modUserID.href = chrome.extension.getURL('mods/userID.css');
        modUserID.type = 'text/css';
        modUserID.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modUserID);
    }
    if (signatureMod == 1) {
        var modSignature = document.createElement('link');
        modSignature.href = chrome.extension.getURL('mods/signature-mod.css');
        modSignature.type = 'text/css';
        modSignature.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modSignature);
    }
    if (square == 1) {
        var modSquare = document.createElement('link');
        modSquare.href = chrome.extension.getURL('mods/square-avatars.css');
        modSquare.type = 'text/css';
        modSquare.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modSquare);
    }
    if (advancedFormatting == 1) {
        var modAdvancedFormatting = document.createElement('link');
        modAdvancedFormatting.href = chrome.extension.getURL('mods/advanced-formatting.css');
        modAdvancedFormatting.type = 'text/css';
        modAdvancedFormatting.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(modAdvancedFormatting);
    }

    userMenu();
    add_copy_code();
    discord();
    if (bookmarks == 1) { _bookmarks() }
    if (signatureMod == 1) { _smod() }
    if (timestamp == 1) { _lastedit() }

    document.addEventListener('click', function() {
        add_copy_code();
        if (signatureMod == 1) { w_smod() }
        if (timestamp == 1) { w_lastedit() }
    });

    window.addEventListener('popstate', function() {
        add_copy_code();
        if (signatureMod == 1) { w_smod() }
        if (timestamp == 1) { w_lastedit() }
    });

    setTimeout(function() {
        notificationCheck();
    }, 700);
});


/* Bookmarks in navigation */

function _bookmarks() {
    var nav = document.querySelector('#submenu ul');
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.classList.add('navigation-link');
    link.href = '/user/' + username() + '/bookmarks';
    link.setAttribute('title', '');
    link.setAttribute('title', 'Bookmarks');
    link.innerHTML = '<i class="fa fa-fw fa-bookmark"></i><span class="visible-xs-inline showmenutext" style="margin-left: 2px">' + chrome.i18n.getMessage('bookmarks') + '</span>';
    nav.insertBefore(li, nav.childNodes[15]);
    li.appendChild(link);
};


/* Signature mod */

function _smod() {
    var signature = document.querySelector('.post-signature');
    if (signature) {
        var trans = chrome.i18n.getMessage('signature');
        var signatures = document.getElementsByClassName('post-signature');
        var siblings = document.querySelectorAll('.post-signature + .pull-right .post-tools');
        var prevent = document.querySelectorAll('.post-signature + .pull-right .post-tools a:nth-of-type(1)');
        for (var i=0; i < signatures.length; i++) {
            if (prevent[i].classList.contains('sig') === false) {
                var button = document.createElement('a');
                button.innerHTML = trans;
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
