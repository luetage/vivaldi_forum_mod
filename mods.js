// Modifications

// Auto-hide header on scroll

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
}


// Bookmarks in navigation

function _bookmarks() {
    const nav = document.querySelector('#submenu ul');
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.classList.add('navigation-link');
    link.href = '/user/' + username() + '/bookmarks';
    link.setAttribute('title', '');
    link.setAttribute('title', 'Bookmarks');
    link.innerHTML = `<i class="fa fa-fw fa-bookmark"></i><span class="visible-xs-inline showmenutext" style="margin-left: 2px"> ${chrome.i18n.getMessage('bookmarks')} </span>`;
    nav.insertBefore(li, nav.childNodes[15]);
    li.appendChild(link);
}


// Signature mod

function _smod() {
    const signature = document.querySelector('.post-signature');
    if (signature) {
        const trans = chrome.i18n.getMessage('signature');
        const signatures = document.getElementsByClassName('post-signature');
        const siblings = document.querySelectorAll('.post-signature + .clearfix .pull-right .post-tools');
        const prevent = document.querySelectorAll('.post-signature + .clearfix .pull-right .post-tools a:last-of-type');
        for (let i=0; i < signatures.length; i++) {
            if (prevent[i].classList.contains('sig') === false) {
                const button = document.createElement('a');
                button.innerHTML = trans;
                button.classList.add('no-select', 'sig');
                siblings[i].appendChild(button);
            }
        }
        const showsig = document.getElementsByClassName('sig');
        for (i=0; i < showsig.length; i++) {
              showsig[i].addEventListener('click', function(i) {
                signatures[i].style = 'display: block';
                showsig[i].style = 'text-decoration: none; cursor: default';
              }.bind(this, i));
        }
    }
};


chrome.storage.sync.get ({
    'VFM_MODS': '',
}, get => {
    const mods = get.VFM_MODS;
    console.log(mods);
    if (mods.notificationIcons === true) loadFile('mods/notification-icons.css');
    if (mods.userID === true) loadFile('mods/userID.css');
    if (mods.square === true) loadFile('mods/square-avatars.css');
    if (mods.signatureMod === true) loadFile('mods/signature-mod.css');
    if (mods.advancedFormatting === true) loadFile('mods/advanced-formatting.css');
    if (mods.bookmarks === true) _bookmarks();
    if (mods.headerScroll === true) {
        _top = 64;
        __top = 'top: -64px !important';
        _scp = 0;
        _vivaldiHeader = document.getElementById('header-menu');
        _subMenu = document.getElementById('submenu');
        window.addEventListener('scroll', autoScroll);
    }
    let startmods = mutations => {
        mutations.forEach(mutation => {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                add_copy_code();
                themePreview(content);
                if (mods.signatureMod === true) _smod();
                if (mods.systemEmoji === true) checkMoji();
            }
        })
    }
    new MutationObserver(startmods).observe(document.getElementById('body'), {childList: true, subtree: true});
})

logo();
userMenu();
discord();
