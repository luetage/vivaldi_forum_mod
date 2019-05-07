/* Modifications */

/* Auto-hide header on scroll */

function autoScroll() {
    if (_scp > window.scrollY) {
        _vivaldiHeader.style.top = '0px';
        _subMenu.style.top = _top + 'px';
    }
    else if (window.scrollY <= _top) {
        _vivaldiHeader.style.top = '0px';
        _subMenu.style.top = _top + 'px';
    }
    else if (window.scrollY > _top) {
        _vivaldiHeader.style = __top;
        _subMenu.style = 'top: 0px !important';
    }
    _scp = window.scrollY;
};


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


chrome.storage.sync.get({
    'VFM_MODS': '',
    'VFM_CURRENT_THEME': ''
}, function(get) {
    var mods = get.VFM_MODS;
    if (mods.headerScroll === true) {
        const theme = get.VFM_CURRENT_THEME.selected;
        if (theme === 'vfm-darkgrey' || theme === 'vfm-lightgrey' || mods.compact === true) {
            _top = 50;
            __top = 'top: -50px !important';
        }
        else {
            _top = 64;
            __top = 'top: -64px !important';
        }
        _scp = 0;
        _vivaldiHeader = document.getElementById('header-menu');
        _subMenu = document.getElementById('submenu');
        window.addEventListener('scroll', autoScroll);
    }
    if (mods.notificationIcons === true) {
        loadFile('mods/notification-icons.css');
    }
    if (mods.tooltips === true) {
        loadFile('mods/tooltips.css');
    }
    if (mods.unread === true) {
        loadFile('mods/unread.css');
    }
    if (mods.timestamp === true) {
        loadFile('mods/timestamp.css');
    }
    if (mods.userID === true) {
        loadFile('mods/userID.css');
    }
    if (mods.signatureMod === true) {
        loadFile('mods/signature-mod.css');
    }
    if (mods.square === true) {
        loadFile('mods/square-avatars.css');
    }
    if (mods.advancedFormatting === true) {
        loadFile('mods/advanced-formatting.css');
    }
    userMenu();
    add_copy_code();
    discord();
    if (mods.bookmarks === true) {
        _bookmarks();
    }
    if (mods.signatureMod === true) {
        _smod();
    }
    if (mods.timestamp === true) {
        _lastedit();
    }
    document.addEventListener('click', function() {
        add_copy_code();
        if (mods.signatureMod === true) {
            w_smod();
        }
        if (mods.timestamp === true) {
            w_lastedit();
        }
    });
    window.addEventListener('popstate', function() {
        add_copy_code();
        if (mods.signatureMod === true) {
            w_smod();
        }
        if (mods.timestamp === true) {
            w_lastedit();
        }
    });
    setTimeout(function() {
        notificationCheck();
    }, 700);
});
