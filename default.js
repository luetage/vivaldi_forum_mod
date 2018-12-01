/* Get the username */

function username() {
    var user = document.querySelector('#user-control-list [component="header/username"]').innerHTML.toLowerCase().replace(/\./g, '-');
    return user;
}


/* Links to options and hidden edit page */

function _options() {
    const addLink = document.querySelectorAll('.optionsLink');
    for (var i=0; i < addLink.length; i++) {
        addLink[i].addEventListener('click', function() {
            chrome.runtime.sendMessage('options pls');
        });
    }
};

function userMenu() {
    var dropdown = document.querySelector('#user-control-list.dropdown-menu');

    // community profile
    var editC = document.querySelector
    ('#user-control-list.dropdown-menu .user-edit-profile span');
    editC.innerHTML = ' ' + chrome.i18n.getMessage('editCommunity');

    // forum profile
    var li = document.createElement('li');
    var editF = document.createElement('a');
    editF.href = '/user/' + username() + '/edit';
    editF.innerHTML = '<i class="fa fa-fw fa-user-circle"></i><span>' + ' ' + chrome.i18n.getMessage('editForum') + '</span>';
    dropdown.insertBefore(li, dropdown.childNodes[19]);
    li.appendChild(editF);

    // forum mod
    var options = document.createElement('li');
    options.classList.add('optionsLink');
    options.style = 'cursor: pointer';
    options.innerHTML = '<a><i class="fa fa-fw fa-dot-circle-o"></i><span>' + ' ' + chrome.i18n.getMessage('optionsLink') + '</span></a>';
    dropdown.insertBefore(options, dropdown.childNodes[21]);

    setTimeout(function() {
        _options();
    }, 700);
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


/* Unofficial discord link in community header dropdown */

function discord() {
    const vivMenu = document.querySelector('#vivaldimenu > li:nth-child(5) ul');
    const addLink = document.createElement('li');
    addLink.innerHTML = '<a href="https://discord.gg/cs6bTDU" target="_blank" rel="noreferrer noopener">Discord</a>';
    vivMenu.appendChild(addLink);
};


/* Option to dismiss community notifications */

function dismiss() {
    chrome.storage.sync.set({
        'notifOld': notifNew,
        'notifState': 'off'
    }, function() {
        notif.style = 'display: none !important';
    });
};

function showNotification() {
    notif.style = 'display: block !important';
    const content = document.querySelector('.shadow-box3 .notification');
    const dis = document.createElement('a');
    dis.style.cursor = 'pointer';
    dis.innerHTML = ' ' + chrome.i18n.getMessage('dismiss');
    content.appendChild(dis);
    dis.addEventListener('click', dismiss);
};

function notificationCheck() {
    notif = document.querySelector('.shadow-box3');
    if (notif) {
        notifNew = document.querySelector('.shadow-box3 .notification').textContent;
        chrome.storage.sync.get({
            'notifState': 'on',
            'notifOld': ''
        }, function(check) {
            const notifState = check.notifState;
            const notifOld = check.notifOld;
            if (notifState === 'on') {
                showNotification();
            }
            else if (notifState === 'off' && notifOld !== notifNew) {
                chrome.storage.sync.set({'notifState': 'on'});
                showNotification();
            }
            else {
                console.log('Community Notification: ' + notifNew);
            }
        });
    }
};
