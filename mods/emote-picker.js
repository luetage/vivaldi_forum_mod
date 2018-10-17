"use strict";

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

/**
 * Get the style info dynamically so you don't need to add separate entries in each theme
 * @returns Dictionary of theme vars
 */
function getTheme(){
    return {
        border: window.getComputedStyle(document.querySelector(".preview.well")).backgroundColor,
        background: window.getComputedStyle(document.querySelector("textarea")).backgroundColor,
        foreground: window.getComputedStyle(document.querySelector(".fa.fa-bold")).color
    };
}

/**
 * User clicked on an emote
 * @param {MouseEvent} event mouse click
 */
function emotePicked(event){
    const textarea = document.querySelector(".composer .write");
    if(!textarea){
        hideEmotePicker();
    }
    const newtext = `![${event.target.alt}](${event.target.src} "${event.target.alt}") `;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const replacement = textarea.value.substring(0, start) + newtext + textarea.value.substring(end);
    textarea.value = replacement;
    textarea.focus();
    hideEmotePicker();
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
    emoteButton.style.cursor = "pointer";
    emoteButton.style.placeSelf = "center";
    return emoteButton;
}

/**
 * Creates the emote picker and appends it to the body
 */
function createEmotePicker(){
    const theme = getTheme();
    const box = document.createElement("div");
    box.style.position = "fixed";
    box.style.zIndex = "9999999999";
    box.style.top = event.clientY + 20 + "px";
    box.style.left = "10px";
    box.style.width = "250px";
    box.style.padding = "5px";
    box.id = "emote-picker";
    box.style.gridTemplateColumns = "20fr 20fr 20fr 20fr 20fr";
    box.style.gridRowGap = "5px";
    box.style.background = theme.background;
    box.style.border = "5px solid "+theme.border;
    for (const emoteName in EMOTES) {
        const emoteUrl = EMOTES[emoteName];
        box.appendChild(makeEmoteButton(emoteName, emoteUrl));
    }
    document.body.appendChild(box);
}

/**
 * Show the emote picker. Use the mouse position to align it with the button
 *   in case the user resizes the message composer
 * @param {int} yPos of the mouse click
 */
function showEmotePicker(yPos){
    const picker = document.querySelector("#emote-picker");
    if(picker){
        picker.style.display = "grid";
        picker.style.top = yPos + 10 + "px";
        picker.style.left = "5px";
    }
    const button = document.querySelector("#emote-picker-button");
    if(button){
        button.title = "Close Emote Picker";
    }
}

/**
 * Hide the emote picker
 */
function hideEmotePicker(){
    const picker = document.querySelector("#emote-picker");
    if(picker){
        picker.style.display = "none";
    }
    const button = document.querySelector("#emote-picker-button");
    if(button){
        button.title = "Open Emote Picker";
    }
}

/**
 * The user pressed the emote picker button, so show or hide as needed
 * @param {MouseEvent} event click event
 */
function toggleEmotePicker(event){
    const picker = document.querySelector("#emote-picker");
    if(picker){
        if(picker.style.display === "grid"){
            hideEmotePicker()
        } else {
            showEmotePicker(event.clientY);
        }
    } else {
        createEmotePicker();
        showEmotePicker();
    }
}

/**
 * Creates and adds the emote picker button to the message composer's formatting strip
 */
function addEmotePickerButton(){
    const alreadyAdded = document.querySelector("#emote-picker-button");
    if(alreadyAdded){
        return;
    }
    const theme = getTheme();
    const composerFormatters = document.querySelector(".composer .formatting-group");
    const bold = composerFormatters.querySelector("li:nth-of-type(1)");
    const emotePickerButton = document.createElement("li");
    emotePickerButton.setAttribute("tabindex", "-1");
    emotePickerButton.setAttribute("data-format", "emotePicker");
    emotePickerButton.title = "Open Emote Picker";
    emotePickerButton.innerHTML = `<span style="color:${theme.foreground}">:)</span>`;
    emotePickerButton.addEventListener("click", toggleEmotePicker);
    emotePickerButton.id = "emote-picker-button";
    composerFormatters.insertBefore(emotePickerButton, bold);
}

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
            }
        });
        mutation.removedNodes.forEach(element => {
            if(element.classList.contains("composer")){
                hideEmotePicker();
            }
        })
    });
}

/**
 * Init the mod
 */
const composerObserver = new MutationObserver(pageMutated);
composerObserver.observe(document.body, {childList: true});
