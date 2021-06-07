// Use system emoji

function undoMoji(img){
    var emojidom = document.createElement("span");
    emojidom.className = "vm-emoji";
    emojidom.title = img.title;
    emojidom.innerText = img.alt;
    img.insertAdjacentElement("beforebegin", emojidom);
    var post = img.parentElement;
    post.removeChild(img);
}

function checkMoji() {
    Array.from(document.querySelectorAll("img.emoji")).forEach(undoMoji);
}


// Logo

function logo() {
    document.getElementById('vivaldilogo').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" version="1.1">
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
    <path d="M16,32.0001433 C23.0111818,32.0001433 26.909069,32.0001433 29.4542934,29.4544367 C32,26.90873 32,23.0108428 32,16.0001433 C32,8.98896151 32,5.09107429 29.4542934,2.54584991 C26.909069,0.000143283582 23.0111818,0.000143283582 16,0.000143283582 C8.98881823,0.000143283582 5.09141324,0.000143283582 2.54570662,2.54584991 C0,5.09107429 0,8.98896151 0,16.0001433 C0,23.0108428 0,26.90873 2.54570662,29.4544367 C5.09141324,32.0001433 8.98881823,32.0001433 16,32.0001433 M23.5468657,12.9424478 C21.5896119,16.3482985 19.6304478,19.7517612 17.6760597,23.1590448 C17.3130746,23.7918806 16.7853134,24.1749254 16.0612537,24.2274627 C15.249791,24.286209 14.6126567,23.9437612 14.2038209,23.2397612 C12.9653731,21.1053134 11.7407761,18.9622687 10.5109254,16.8230448 C9.76298507,15.5210746 9.0121791,14.2210149 8.26758209,12.9176119 C7.51629851,11.6027463 8.36358209,10.0046567 9.87092537,9.92728358 C10.6671045,9.88620896 11.2808358,10.2534925 11.6848955,10.9460299 C12.2370149,11.8931343 12.7791045,12.8459701 13.3254925,13.7959403 C13.7195224,14.4803582 14.1054328,15.1695522 14.5109254,15.846806 C15.0974328,16.8297313 15.96,17.3842388 17.1077015,17.4530149 C18.7325373,17.5499701 20.2413134,16.3717015 20.4357015,14.6408358 C20.4505075,14.5109254 20.4600597,14.3819701 20.465791,14.3155821 C20.457194,13.7553433 20.352597,13.2834627 20.1305075,12.8383284 C19.5239403,11.6208955 20.1701493,10.2568358 21.4893134,9.9640597 C22.5634627,9.72620896 23.6748657,10.5171343 23.817194,11.6094328 C23.8792836,12.0894328 23.7847164,12.5293134 23.5468657,12.9424478 M24.2575522,7.47856716 C19.6232836,2.84047761 12.1099701,2.84047761 7.47570149,7.47856716 C2.84143284,12.1166567 2.84143284,19.6366567 7.47570149,24.2742687 C12.1099701,28.9123582 19.6232836,28.9123582 24.2575522,24.2742687 C28.8918209,19.6366567 28.8918209,12.1166567 24.2575522,7.47856716"/>
    </g>
    <style xmlns="">
        body {cursor: default;}
        [contenteditable] {cursor: text;}
    </style></svg>`;
}


// Get the username

function username() {
    const user = document.querySelector('#user-control-list [component="header/username"]').innerHTML.toLowerCase().replace(/\./g, '-');
    return user;
}


// Menu entry for options page

function userMenu() {
    const dropdown = document.querySelector('#user-control-list.dropdown-menu');
    if (dropdown) {
        const options = document.createElement('li');
        options.classList.add('optionsLink');
        options.style = 'cursor: pointer';
        options.innerHTML = `<a><i class="fa fa-fw fa-dot-circle-o"></i><span> ${chrome.i18n.getMessage('optionsLink')} </span></a>`;
        dropdown.insertBefore(options, dropdown.childNodes[20]);
        document.querySelector('.optionsLink').addEventListener('click', () => {
            chrome.runtime.sendMessage({message: 'options pls'});
        })
    }
}


// Copy all code button

function make_copy_button(){
    const new_button = document.createElement('button');
    new_button.textContent = chrome.i18n.getMessage('copyCode');
    new_button.className = 'copy-all-code-button';
    new_button.addEventListener('click', copy_all);
    return new_button;
}

function copy_all(event){
    const code_node = event.currentTarget.parentElement.querySelector('code');
    const window_selection = window.getSelection();
    const code_range = document.createRange();
    code_range.selectNodeContents(code_node);
    window_selection.removeAllRanges();
    window_selection.addRange(code_range);
    document.execCommand('copy');
}

function add_copy_code() {
    setTimeout(() => {
        const topic = document.querySelector('.topic');
        if (topic) {
            const codeblocks = document.querySelectorAll('pre.markdown-highlight');
            codeblocks.forEach(codeblock => {
                if (codeblock.classList.contains('copy') === false && codeblock.parentNode.tagName !== 'BLOCKQUOTE' && codeblock.firstChild.classList.contains('hljs') === true)  {
                    codeblock.classList.add('copy');
                    codeblock.insertBefore(make_copy_button(), codeblock.lastChild);
                }
            })
        }
    },2000)
}


// Unofficial Discord and Contribute link in footer

function discord() {
    document.querySelector('.footerlinks').innerHTML += ' | <a href="https://vivaldi.com/contribute/" target="_blank" rel="noreferrer noopener">Contribute</a> | <a href="https://discord.gg/cs6bTDU" target="_blank" rel="noreferrer noopener">Discord</a>';
}


// Option to dismiss community notifications

function dismiss() {
    chrome.storage.sync.get({'VFM_NOTIF': ''}, get => {
        const check = get.VFM_NOTIF;
        check.notifOld = notifNew;
        check.notifState = 'off';
        chrome.storage.sync.set({'VFM_NOTIF': check}, () => notif.style = 'display: none !important');
    })
}

function showNotification() {
    notif.style = 'display: block !important';
    const content = document.querySelector('.shadow-box3 .notification');
    const dis = document.createElement('a');
    dis.style.cursor = 'pointer';
    dis.innerHTML = ' ' + chrome.i18n.getMessage('dismiss');
    content.appendChild(dis);
    dis.addEventListener('click', dismiss);
}

function notificationCheck() {
    notif = document.querySelector('.shadow-box3');
    if (notif) {
        notifNew = document.querySelector('.shadow-box3 .notification').textContent;
        chrome.storage.sync.get({
            'VFM_NOTIF': {
                'notifState': 'on',
                'notifOld': ''
            }
        }, get => {
            const check = get.VFM_NOTIF;
            if (check.notifState === 'on') showNotification();
            else if (check.notifState === 'off' && check.notifOld !== notifNew) {
                check.notifState = 'on';
                chrome.storage.sync.set({'VFM_NOTIF': check});
                showNotification();
            }
            else console.log('Community Notification: ' + notifNew);
        })
    }
}
