chrome.runtime.onMessage.addListener(function(message) {
    if ( message === 'options pls' ) {
        chrome.runtime.openOptionsPage();
    }
});

/**
 * In case item orders change from one instance to next
 * Put them all in order
 * And re-number any not hidden starting from 1
 * If this update has support for new buttons, mark them as disabled
 */
function normaliseFormattingToolbarOrders(){
    chrome.storage.sync.get({
        formattingToolbar: ""
    }, settings => {
        if(settings.formattingToolbar===""){
            return;
        }
        let outOfOrder = Object.entries(settings.formattingToolbar);
        outOfOrder.sort((a,b) => Number(a[1]) - Number(b[1]));
        let orderCounter = 1;
        for (let index = 0; index < outOfOrder.length; index++) {
            const key = outOfOrder[index][0];
            const order = outOfOrder[index][1];
            if(order === -1){
                continue;
            }
            settings.formattingToolbar[key] = orderCounter++;
        }
        const existingButtons = Object.keys(settings.formattingToolbar);
        const newButtons = [
            "bold",
            "italic",
            "list",
            "strikethrough",
            "link",
            "picture-o",
            "zen",
            "picture",
            "smile-o",
            "header",
            "window-minimize",
            "quote-right",
            "code",
            "file-code-o",
            "th-large",
            "list-ol",
            "shield"
        ].filter(x => existingButtons.indexOf(x)===-1);
        for (let index = 0; index < newButtons.length; index++) {
            settings.formattingToolbar[newButtons[index]] = -1;
        }
        chrome.storage.sync.set({formattingToolbar: settings.formattingToolbar});
    });
}

chrome.runtime.onInstalled.addListener(updateInfo => {
    if(updateInfo.reason==="update"){
        normaliseFormattingToolbarOrders();
    }
});
