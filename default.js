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
            favourites.innerHTML = 'Bookmarked';
            favourites.href = '/user/' + username() + '/bookmarks';
        }
    }
};


/* Links to options and hidden edit page  */

document.getElementById('logged-in-menu').addEventListener('click', function() {
    if (document.getElementById('optionsLink') === null) {
        var dropdown = document.querySelector('#user-control-list.dropdown-menu');
        var editC = document.querySelector('#user-control-list.dropdown-menu .user-edit-profile span');
        editC.innerHTML = ' Edit community';
        var options = document.createElement('li');
        options.id = 'optionsLink';
        options.style = 'cursor: pointer';
        options.innerHTML = '<a><i class="fa fa-fw fa-cog"></i><span> Forum mod</span></a>';
        dropdown.insertBefore(options, dropdown.childNodes[18]);
        var li = document.createElement('li');
        var editF = document.createElement('a');
        editF.href = '/user/' + username() + '/edit';
        editF.innerHTML = '<i class="fa fa-fw fa-user-circle"></i><span> Edit forum</span>';
        dropdown.insertBefore(li, dropdown.childNodes[17]);
        li.appendChild(editF);
    }
   document.getElementById('optionsLink').addEventListener('click', function() {
        chrome.runtime.sendMessage('options pls');
    });
});


/* Copy all code button */

function make_copy_button(){
    const new_button = document.createElement('button');
    new_button.textContent = 'copy_code';
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
