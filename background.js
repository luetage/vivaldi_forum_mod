chrome.runtime.onMessage.addListener(function(message) {
    if ( message === 'options pls' ) {
        chrome.runtime.openOptionsPage();
    }
});