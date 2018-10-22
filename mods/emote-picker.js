"use strict";

/* ==========Globals=============*/
const EMOTES = {
    alien:"1539692482285-alien.gif",
    angel:"1539692493644-angel.gif",
    awww:"1539692536730-awww.gif",
    banana:"1539692630638-banana.gif",
    beer:"1539692709259-beer.gif",
    bigeyes:"1539692683566-bigeyes.gif",
    bigsmile:"1539687021352-bigsmile.gif",
    blush:"1539687052167-blush.gif",
    bomb:"1539692948902-bomb.gif",
    bug:"1539685604359-bug.gif",
    bye:"1539692998605-bye.gif",
    cat:"1539693028753-cat.gif",
    cheers:"1539698180973-cheers.gif",
    chef:"1539692893638-chef.gif",
    coffee:"1539685551254-coffee.gif",
    confused:"1539685266409-confused.gif",
    cool:"1539693137735-cool.gif",
    detective:"1539693179226-detective.gif",
    devil:"1539693232474-devil.gif",
    doh:"1539685506587-doh.gif",
    drunk:"1539693282716-drunk.gif",
    eek:"1539693323529-eek.gif",
    faint:"1539693390072-faint.gif",
    flirt:"1539685662035-flirt.gif",
    frown:"1539685209586-frown.gif",
    furious:"1539685719517-furious.gif",
    haha:"1539685426101-haha.gif",
    headbang:"1539686921747-headbang.gif",
    idea:"1539686816525-idea.gif",
    irked:"1539698254681-irked.gif",
    jester:"1539685753306-jester.gif",
    lookleft:"1539698335612-left.gif",
    lookright:"1539698359299-right.gif",
    mad:"1539698407597-mad.gif",
    no:"1539686722752-no.gif",
    party:"1539698651945-party.gif",
    pingu:"1539685811063-pingu.gif",
    rip:"1539693574973-rip.gif",
    rolleyes:"1539693612367-rolleyes.gif",
    smile:"1539685039446-smile.gif",
    spock:"1539685852804-spock.gif",
    thumbsdown:"1539693743513-thumbsdown.gif",
    thumbsup:"1539693760607-thumbsup.gif",
    troll:"1539685894751-troll.gif",
    waiting:"1539685920932-waiting.gif",
    weeping:"1539685954572-weeping.gif",
    whistle:"1539698509979-whistle.gif",
    wink:"1539698493281-wink.gif",
    wizard:"1539685980783-wizard.gif",
    worried:"1539698551154-worried.gif",
    yes:"1539686029165-yes.gif",
    zipped:"1539685367819-zipped.gif",
    zzz:"1539685301665-zzz.gif"
};
const STATIC_URL = "https://lonm.vivaldi.net/wp-content/uploads/sites/1533/2018/10/";
let DRAG_START_POS = {x:0, y:0};
const STRINGS = {
    emoteTitle: "Emote Picker",
    emoteOpen: "Open Emote Picker",
    close: "Close",
    closeButton: "x",
    toolbarChooseTitle: "Custom Toolbar",
    saveToolbar: "Save custom toolbar",
    saveButton: "save",
    drag: "Click and Drag to move",
    h1: "Header 1",
    hr: "Horizontal Rule",
    qb: "Quote Block",
    ic: "Inline Code",
    cb: "Code Block",
    it: "Insert table",
    spoiler: "Insert spoiler block",
    ol: "Numbered List"
};
const FORMATTERS = [
    [STRINGS.h1, "header", "# ", ""],
    [STRINGS.hr, "window-minimize", "", `
***
`],
    [STRINGS.qb, "quote-right", "> ", ""],
    [STRINGS.ic, "code", "`", "`"],
    [STRINGS.cb, "file-code-o", "```\n", "\n```"],
    [STRINGS.it, "th-large", `a | a
---|---
x | x
y | y
`, ""],
    [STRINGS.spoiler, "shield", `> Spoiler
>> `, ""],
    [STRINGS.ol, "list-ol", "1. ", ""]
];
let FORMATTING_BAR_CUSTOM_ORDER = {
    bold: 2,
    italic: 1,
    list: 3,
    strikethrough: 4,
    link: 5,
    "picture-o": 6,
    zen: 7,
    picture: 8,
    emotePicker: 9,
    header: -1,
    "window-minimize": -1,
    "quote-right": -1,
    code: -1,
    "file-code-o": -1,
    "th-large": -1,
    "list-ol": -1,
    "shield": 1
};

/* ==========UpdateComposer============*/

/**
 * Do a format which has an open and closing tag on the selected area
 * @param openTag the Format tag at the start of selection
 * @param endTag the Format tag at the end of selection
 */
function doFormat(openTag, endTag){
    const textarea = document.querySelector("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let replacement = textarea.value.substring(0, start) + openTag + textarea.value.substring(start, end) + endTag + textarea.value.substring(end);
    textarea.value = replacement;
    forceUpdatePreview(start + openTag.length);
}

/**
 * Force update of preview box
 * @param {int} finalPos where the text caret should be placed
 */
function forceUpdatePreview(finalPos){
    const textarea = document.querySelector(".composer .write");
    if(!textarea){
        return;
    }
    const forceUpdate = new InputEvent("input", {
        bubbles: true,
        cancelable: true,
        data: ""
    });
    textarea.dispatchEvent(forceUpdate);
    textarea.setSelectionRange(finalPos, finalPos);
    textarea.focus();
}

/* ============Modals============= */

/**
 * User started to drag a modal
 * @param {DragEvent} e dragstart
 */
function modalDragStart(e){
    const box = e.target.getBoundingClientRect();
    DRAG_START_POS = {
        x: e.clientX - box.left,
        y: e.clientY - box.top
    };
}

/**
 * Move a modal to a new position as specified by user dragging it
 * @param {DragEvent} e dragend
 */
function modalDrag(e){
    const modal = e.target.parentElement;
    if(modal){
        modal.style.top = (e.clientY - DRAG_START_POS.y - 10) + "px";
        modal.style.left = (e.clientX - DRAG_START_POS.x - 10) + "px";
    }
}

/**
 * Show a modal. Use the mouse position to align it with the button
 *   in case the user resizes the message composer
 * @param {MouseEvent} pos where the mouse was when you want to show the modal
 * @param {string} modalId of the modal to show, starting with "#"
 */
function showModal(pos, modalId){
    const modal = document.querySelector(modalId);
    if(modal){
        modal.style.display = "grid";
        modal.style.top = pos.clientY + 10 + "px";
        modal.style.left = pos.clientX + 10 + "px";
    }
}

/**
 * Hide the modal
 * @param {string} identifier string of the modal id, with "#"
 * @param {MouseEvent} identifier MouseEvent of close button click
 */
function hideModal(identifier){
    const modal = identifier.target ? identifier.target.parentElement : document.querySelector(modalId);
    if(modal){
        modal.style.display = "none";
    }
}

/**
 * The user pressed a button that toggles a modal, so show or hide as needed
 * @remark Becuse it takes an additional argument this is not a listener method
 * @param {MouseEvent} event click event
 * @param {string} modalId for the modal window starting with "#"
 */
function toggleModal(event, modalId){
    const modal = document.querySelector(modalId);
    if(modal){
        if(modal.style.display === "grid"){
            hideModal(modalId);
        } else {
            showModal(event, modalId);
        }
    } else {
        switch (modalId) {
        case "#emote-picker":
            createEmotePicker();
            break;
        case "#toolbar-custom":
            createToolbarCustom();
            break;
        default:
            throw "Unknown modal ID "+modalId;
        }
        showModal(event, modalId);
    }
}

/**
 * Get the style info dynamically so you don't need to add separate entries in each theme
 * @returns Dictionary of theme vars
 */
function getTheme(){
    return {
        pickerBorder: window.getComputedStyle(document.querySelector(".preview.well")).backgroundColor,
        pickerBg: window.getComputedStyle(document.querySelector("textarea")).backgroundColor,
        controlFg: window.getComputedStyle(document.querySelector(".formatting-bar .composer-discard")).color,
        controlBg: window.getComputedStyle(document.querySelector(".formatting-bar .composer-discard")).backgroundColor,
        accentFg: window.getComputedStyle(document.querySelector(".formatting-bar .composer-submit")).color,
        accentBg: window.getComputedStyle(document.querySelector(".formatting-bar .composer-submit")).backgroundColor
    };
}

/**
 * Creates a modal box that floats on the page
 * @param {string} id of the modal, no preceding "#"
 * @param {string} titleText to show on the modal
 * @param {string} closeText to show in the close button
 * @param {string} closeTitle to show on hover of close button
 */
function makeModalBox(id, titleText, closeText, closeTitle){
    const theme = getTheme();
    const box = document.createElement("div");
    box.id = id;
    box.className = "vivaldi-mod-modal-box";
    box.style.background = theme.pickerBg;
    box.style.borderColor = theme.pickerBorder;

    const controlBar = document.createElement("div");
    controlBar.className = "vivaldi-mod-modal-box-control-bar";
    controlBar.innerText = titleText;
    controlBar.title = STRINGS.drag;
    controlBar.draggable = true;
    controlBar.style.background = theme.controlBg;
    controlBar.style.color = theme.controlFg;
    controlBar.addEventListener("dragstart", modalDragStart);
    controlBar.addEventListener("dragend", modalDrag);
    box.appendChild(controlBar);

    const closeBtn = document.createElement("button");
    closeBtn.className = "vivaldi-mod-modal-box-close";
    closeBtn.innerText = closeText;
    closeBtn.title = closeTitle;
    closeBtn.style.background = theme.accentBg;
    closeBtn.style.color = theme.accentFg;
    closeBtn.addEventListener("click", hideModal);
    box.appendChild(closeBtn);

    return box;
}

/* ==========Emote============= */

/**
 * User clicked on an emote
 * @param {MouseEvent} event mouse click
 */
function emotePicked(event){
    const textarea = document.querySelector(".composer .write");
    if(!textarea){
        hideModal("#emote-picker");
        return;
    }
    const newtext = `![${event.target.alt}](${event.target.src} "${event.target.alt}") `;
    doFormat(newtext, "");
    hideModal("#emote-picker");
}

/**
 * Create the DOM for an emote
 * @param {string} emoteName
 * @param {string} emoteUrl
 * @returns DOM element
 */
function makeEmoteButton(emoteName, emoteUrl){
    const emoteButton = document.createElement("img");
    emoteButton.alt = emoteName;
    emoteButton.title = emoteName;
    emoteButton.src = STATIC_URL + emoteUrl;
    emoteButton.addEventListener("click", emotePicked);
    return emoteButton;
}

/**
 * Creates the emote picker and appends it to the body
 */
function createEmotePicker(){
    const box = makeModalBox("emote-picker", STRINGS.emoteTitle, STRINGS.closeButton, STRINGS.close);
    for (const emoteName in EMOTES) {
        const emoteUrl = EMOTES[emoteName];
        box.appendChild(makeEmoteButton(emoteName, emoteUrl));
    }
    document.body.appendChild(box);
}

/**
 * Creates and adds the emote picker button to the message composer's formatting strip
 */
function addEmotePickerButton(){
    const composerFormatters = document.querySelector(".composer .formatting-group");
    const emotePickerButton = document.createElement("li");
    emotePickerButton.setAttribute("tabindex", "-1");
    emotePickerButton.setAttribute("data-format", "emotePicker");
    emotePickerButton.title = STRINGS.emoteOpen;
    emotePickerButton.innerHTML = "<i class='fa fa-smile-o'></i>";
    emotePickerButton.addEventListener("click", event => {toggleModal(event, "#emote-picker");});
    emotePickerButton.id = "emote-picker-button";
    composerFormatters.appendChild(emotePickerButton);
}

/* ========Formatting======= */

/**
 * Create a new formatting button
 * @param {string} buttonTitle
 * @param {string} buttonDisplayClass (for font-awesome)
 * @param {string} openTag that appears before selection
 * @param {string} endTag that appears after selection
 * @returns {DOM} list item
 */
function createSpecialFormattingbutton(buttonTitle, buttonDisplayClass, openTag, endTag){
    const li = document.createElement("li");
    li.innerHTML = `<i class='fa fa-${buttonDisplayClass}'></i>`;
    li.addEventListener("click", () => {doFormat(openTag, endTag);});
    li.title = buttonTitle;
    li.setAttribute("tabindex", "-1");
    li.setAttribute("data-format", buttonDisplayClass);
    li.id = "additional-format-"+buttonDisplayClass;
    return li;
}

/**
 * Add the special formatting buttons to the composer
 */
function addSpecialFormattingButtons(){
    const alreadyAdded = document.querySelector("#additional-format-"+"header");
    if(alreadyAdded){
        return;
    }
    const composerFormatters = document.querySelector(".composer .formatting-group");
    const endOfBar = composerFormatters.querySelector("form");
    FORMATTERS.forEach(button => {
        const madeButton = createSpecialFormattingbutton(button[0], button[1], button[2], button[3]);
        composerFormatters.insertBefore(madeButton, endOfBar);
    });
    composerFormatters.addEventListener("dblclick", e => {toggleModal(e, "#toolbar-custom");});
}

/* ===========ToolbarSettings===========*/
/**
 * Show the setting page that lets user enable/disable/reorder buttons
 */
function createToolbarCustom(){
    const box = makeModalBox("toolbar-custom", STRINGS.toolbarChooseTitle, STRINGS.saveButton, STRINGS.saveToolbar);
    const close = box.querySelector(".vivaldi-mod-modal-box-close");
    close.addEventListener("click", saveCustomToolbar);
    const setting = document.createElement("input");
    box.appendChild(setting);
    document.body.appendChild(box);
}

/**
 * Save the custom toolbar settings
 */
function saveCustomToolbar(){
    return;// LEAVE UNTIL INPUTS IMPLEMENTED
    const settingsBox = document.querySelector("#toolbar-custom");
    if(!settingsBox){
        return;
    }
    chrome.storage.sync.set({
        bold: settingsBox.querySelector("input[name='bold']").value,
        italic: settingsBox.querySelector("input[name='italic']").value,
        list: settingsBox.querySelector("input[name='list']").value,
        strikethrough: settingsBox.querySelector("input[name='strikethrough']").value,
        link: settingsBox.querySelector("input[name='link']").value,
        "picture-o": settingsBox.querySelector("input[name='picture-o']").value,
        zen: settingsBox.querySelector("input[name='zen']").value,
        picture: settingsBox.querySelector("input[name='picture']").value,
        emotePicker: settingsBox.querySelector("input[name='emotePicker']").value,
        header: settingsBox.querySelector("input[name='header']").value,
        "window-minimize": settingsBox.querySelector("input[name='window-minimize']").value,
        "quote-right": settingsBox.querySelector("input[name='quote-right']").value,
        code: settingsBox.querySelector("input[name='code']").value,
        "file-code-o": settingsBox.querySelector("input[name='file-code-o']").value,
        "th-large": settingsBox.querySelector("input[name='th-large']").value,
        "list-ol": settingsBox.querySelector("input[name='list-ol']").value,
        "shield": settingsBox.querySelector("input[name='shield']").value
    });
    reorderToolbarButtons();
}

/**
 * Re-order the toolbar buttons according to user settings
 */
function reorderToolbarButtons(){
    const composerFormatters = document.querySelector(".composer .formatting-group");
    composerFormatters.style.display = "inline-flex";
    for (const key in FORMATTING_BAR_CUSTOM_ORDER) {
        if (FORMATTING_BAR_CUSTOM_ORDER.hasOwnProperty(key)) {
            const buttonOrder = FORMATTING_BAR_CUSTOM_ORDER[key];
            const button = composerFormatters.querySelector(`li[data-format='${key}'`);
            if(buttonOrder > -1){
                button.style.order = buttonOrder;
            } else {
                button.style.display = "none";
            }
        }
    }
}

/* =============Init=============*/
/**
 * Something changed on the page.
 * If it was the composer being added, add the emote picker button.
 * @param {MutationRecord[]} mutationList
 */
function pageMutated(mutationList){
    mutationList.forEach(mutation => {
        mutation.addedNodes.forEach(element => {
            if(element.classList.contains("composer")){
                addEmotePickerButton();
                addSpecialFormattingButtons();
                reorderToolbarButtons();
            }
        });
        mutation.removedNodes.forEach(element => {
            if(element.classList.contains("composer")){
                hideModal("#emote-picker");
            }
        });
    });
}

/**
 * Init the mod
 */
chrome.storage.sync.get({
    emotePicker: "",
    formattingToolbar: FORMATTING_BAR_CUSTOM_ORDER
}, settings => {
    if(settings.emotePicker==="1"){
        const composerObserver = new MutationObserver(pageMutated);
        composerObserver.observe(document.body, {childList: true});
        FORMATTING_BAR_CUSTOM_ORDER = settings.formattingToolbar;
    }
});
