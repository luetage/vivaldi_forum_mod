chrome.runtime.onMessage.addListener(function(message) {
    if ( message === 'options pls' ) {
        chrome.runtime.openOptionsPage();
    }
});

/**
 * In case item orders change from one instance to next
 * Put them all in order
 * And re-number any not hidden starting from 1
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
        chrome.storage.sync.set({formattingToolbar: settings.formattingToolbar});
    });
}

chrome.runtime.onInstalled.addListener(updateInfo => {
    if(updateInfo.reason==="update"){
        normaliseFormattingToolbarOrders();
    }
});
