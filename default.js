/* Bookmarks fix */

function username() {
    var user = document.querySelector('#user-control-list [component="header/username"]').innerHTML.toLowerCase().replace(/\./g, '-');
    return user;
}

function bookmarked() {
    var favourites = document.querySelector('.btn-group.account-fab .dropdown-menu.dropdown-menu-right li:nth-of-type(12) a');
    if (favourites) {
        var favcheck = favourites.innerHTML;
        if (favcheck === 'favourites') {
            favourites.innerHTML = chrome.i18n.getMessage('bookmarked');
            favourites.href = '/user/' + username() + '/bookmarks';
        }
    }
};


/* Links to options and hidden edit page  */

function userMenu() {
    if (document.getElementById('optionsLink') === null) {
        var transOpt = chrome.i18n.getMessage('optionsLink');
        var transForum = chrome.i18n.getMessage('editForum');
        var dropdown = document.querySelector('#user-control-list.dropdown-menu');
        var editC = document.querySelector('#user-control-list.dropdown-menu .user-edit-profile span');
        editC.innerHTML = ' ' + chrome.i18n.getMessage('editCommunity');
        var options = document.createElement('li');
        options.id = 'optionsLink';
        options.style = 'cursor: pointer';
        options.innerHTML = '<a><i class="fa fa-fw fa-dot-circle-o"></i><span>' + ' ' + transOpt + '</span></a>';
        dropdown.insertBefore(options, dropdown.childNodes[18]);
        var li = document.createElement('li');
        var editF = document.createElement('a');
        editF.href = '/user/' + username() + '/edit';
        editF.innerHTML = '<i class="fa fa-fw fa-user-circle"></i><span>' + ' ' + transForum + '</span>';
        dropdown.insertBefore(li, dropdown.childNodes[17]);
        li.appendChild(editF);
    }
   document.getElementById('optionsLink').addEventListener('click', function() {
        chrome.runtime.sendMessage('options pls');
    });
};


/* Copy all code button */

function make_copy_button(){
    const new_button = document.createElement('button');
    new_button.textContent = chrome.i18n.getMessage('copyCode');
    new_button.className = 'copy-all-code-button';
    new_button.addEventListener('click', copy_all);
    return new_button;
};

function copy_all(event){
    const code_node = event.currentTarget.parentElement.querySelector('code');
    const window_selection = window.getSelection();
    const code_range = document.createRange();
    code_range.selectNodeContents(code_node);
    window_selection.removeAllRanges();
    window_selection.addRange(code_range);
    document.execCommand('copy');
};

function add_copy_code() {
    setTimeout(function() {
        const topic = document.querySelector('.topic');
        if (topic != null) {
            const codeblocks = document.querySelectorAll('pre.markdown-highlight');
            codeblocks.forEach(codeblock => {
                if (codeblock.classList.contains('copy') === false && codeblock.parentNode.tagName !== 'BLOCKQUOTE' && codeblock.firstChild.classList.contains('hljs') === true)  {
                    codeblock.classList.add('copy');
                    codeblock.appendChild(make_copy_button());
                }
            });
        }
    },2000);
};


/* Footer links to unofficial discord and store */

function discord() {
    var footerlinks = document.querySelector('.footerlinks');
    var addlinks = document.createElement('span');
    addlinks.innerHTML = ' | <a href="https://store.vivaldi.com/" target="_blank" rel="noreferrer noopener">Store</a> | <a href="https://discord.gg/cs6bTDU" target="_blank" rel="noreferrer noopener">Discord</a>';
    footerlinks.appendChild(addlinks);
};


/* Dismiss notification */

function dismiss() {
    chrome.storage.sync.set({
        'notifOld': notifNew,
        'notifState': 'off'
    }, function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.footer-notification {display: none !important}';
    document.getElementsByTagName('head')[0].appendChild(style);
    });
};

function createDis() {
    const trans = chrome.i18n.getMessage('dismiss');
    const content = document.querySelector('.footer-notification .notification');
    const dis = document.createElement('a');
    dis.style.cursor = 'pointer';
    dis.innerHTML = ' - ' + trans;
    content.appendChild(dis);
    dis.addEventListener('click', dismiss);
};

function notification() {
    const notif = document.querySelector('.footer-notification');
    notifNew = document.querySelector('.footer-notification .notification').textContent;
    if (notif) {
        chrome.storage.sync.get({
            'notifState': 'on',
            'notifOld': ''
        }, function(check) {
            const notifState = check.notifState;
            const notifOld = check.notifOld;
            if (notifState === 'on') {
                createDis();
            }
            else {
                if (notifOld === notifNew) {
                    dismiss();
                }
                else {
                    chrome.storage.sync.set({'notifState': 'on'});
                    createDis();
                }
            }
        });
    }
};
