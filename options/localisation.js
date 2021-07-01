function localisation() {

    //navigation

    document.getElementById('themes-btn').innerText = chrome.i18n.getMessage('themes');
    document.getElementById('modifications-btn').innerText = chrome.i18n.getMessage('modifications');
    document.getElementById('info-btn').innerText = chrome.i18n.getMessage('info');
    document.getElementById('feedback-btn').innerText = chrome.i18n.getMessage('feedback');
    document.getElementById('reset-btn').innerText = chrome.i18n.getMessage('reset');

    //themes
    document.querySelector('.schedule').innerText = chrome.i18n.getMessage('schedule');
    document.querySelector('.themeMachine').innerText = chrome.i18n.getMessage('themeMachine');
    document.querySelector('.theme-edit').innerText = chrome.i18n.getMessage('edit');
    document.querySelector('.theme-save').innerText = chrome.i18n.getMessage('save');
    document.querySelector('.theme-import').innerText = chrome.i18n.getMessage('import');
    document.querySelector('.theme-export').innerText = chrome.i18n.getMessage('export');
    document.querySelector('.background').innerText = chrome.i18n.getMessage('background');
    document.querySelector('.foreground').innerText = chrome.i18n.getMessage('foreground');
    document.querySelector('.highlight').innerText = chrome.i18n.getMessage('highlight');
    document.querySelector('.accent').innerText = chrome.i18n.getMessage('accent');
    document.querySelector('.link').innerText = chrome.i18n.getMessage('link');
    document.querySelector('.code').innerText = chrome.i18n.getMessage('code');
    document.querySelector('.dropdown').innerText = chrome.i18n.getMessage('dropdown');

    //modifications
    document.querySelector('.selectModifications').innerText = chrome.i18n.getMessage('selectModifications');
    document.getElementById('advancedFormatting').innerText = chrome.i18n.getMessage('advancedFormatting');
    document.getElementById('advancedFormatting').title = chrome.i18n.getMessage('advancedFormattingDesc');
    document.getElementById('headerScroll').innerText = chrome.i18n.getMessage('hideHeader');
    document.getElementById('headerScroll').title = chrome.i18n.getMessage('hideHeaderDesc');
    document.getElementById('bookmarks').innerText = chrome.i18n.getMessage('navBookmarks');
    document.getElementById('bookmarks').title = chrome.i18n.getMessage('navBookmarksDesc');
    document.getElementById('notificationIcons').innerText = chrome.i18n.getMessage('customNotification');
    document.getElementById('notificationIcons').title = chrome.i18n.getMessage('customNotificationDesc');
    document.getElementById('systemEmoji').innerText = chrome.i18n.getMessage('systemEmoji');
    document.getElementById('systemEmoji').title = chrome.i18n.getMessage('systemEmojiDesc');
    document.getElementById('userID').innerText = chrome.i18n.getMessage('showUID');
    document.getElementById('userID').title = chrome.i18n.getMessage('showUIDDesc');
    document.getElementById('signatureMod').innerText = chrome.i18n.getMessage('signatureMod');
    document.getElementById('signatureMod').title = chrome.i18n.getMessage('signatureModDesc');
    document.getElementById('square').innerText = chrome.i18n.getMessage('squareAvatars');
    document.getElementById('square').title = chrome.i18n.getMessage('squareAvatarsDesc');
    document.getElementById('lessHistory').innerText = chrome.i18n.getMessage('lessHistory');
    document.getElementById('lessHistory').title = chrome.i18n.getMessage('lessHistoryDesc');
    document.querySelector('.userCSS').innerText = chrome.i18n.getMessage('userCSS');
    document.getElementById('css-save').innerText = chrome.i18n.getMessage('save');
    document.getElementById('css-backup').innerText = chrome.i18n.getMessage('backup');
    document.getElementById('userCSS').placeholder = chrome.i18n.getMessage('userCSSDesc');



    //info
    document.querySelector('.changelog').innerText = chrome.i18n.getMessage('changelog');
    document.querySelector('.credits').innerText = chrome.i18n.getMessage('credits');
};

localisation();
