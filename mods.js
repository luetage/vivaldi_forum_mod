// Modifications
// Use system emoji

function undoMoji(img) {
  var emojidom = document.createElement("span");
  emojidom.className = "vm-emoji";
  emojidom.title = img.title;
  emojidom.innerText = img.alt;
  img.insertAdjacentElement("beforebegin", emojidom);
  var post = img.parentElement;
  post.removeChild(img);
}

function checkMoji() {
  let allEmoji = Array.from(
    document.querySelectorAll("img.emoji:not(#emoji-dialog img.emoji)")
  )
  // emoji indicating sex are always separated into independant img from the base emoji in a sequence
  // this adds the sex indicator emoji to the previous img's alt text and adjusts the title to match
  let last = null;
  allEmoji = allEmoji.reduce((prev, curr) => {
    let next = last ? last.nextSibling ? last.nextSibling : {textContent: "false"} : {textContent: "false"};
    if (last == null || next.textContent !== "\u200d") {
      prev.push(curr);
    } else {
      let previousEmoji = prev[prev.length - 1]
      let sex = curr.title.includes("female") ? "woman" : "man";
      previousEmoji.alt = previousEmoji.alt + curr.alt
      previousEmoji.title = previousEmoji.title.replace("person", sex)
      const post = curr.parentElement;
      post.removeChild(curr);
    }
    last = curr;
    return prev;
  }, [])
  allEmoji.forEach(undoMoji);
}

// Auto-hide header on scroll

function autoScroll() {
  if (_scp > window.scrollY) {
    _vivaldiHeader.style.top = "0px";
    _subMenu.style.top = _top + "px";
  } else if (window.scrollY <= _top) {
    _vivaldiHeader.style.top = "0px";
    _subMenu.style.top = _top + "px";
  } else if (window.scrollY > _top) {
    _vivaldiHeader.style = __top;
    _subMenu.style = "top: 0px !important";
  }
  _scp = window.scrollY;
}

// Bookmarks in navigation

function _bookmarks() {
  const nav = document.querySelector("#submenu ul");
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.classList.add("navigation-link");
  link.href = "/user/" + username() + "/bookmarks";
  link.setAttribute("title", "");
  link.setAttribute("title", "Bookmarks");
  link.innerHTML = `<i class="fa fa-fw fa-bookmark"></i><span class="visible-xs-inline showmenutext" style="margin-left: 2px"> ${chrome.i18n.getMessage(
    "bookmarks"
  )} </span>`;
  nav.insertBefore(li, nav.lastChild);
  li.appendChild(link);
}

chrome.storage.sync.get({ VFM_MODS: "" }, (get) => {
  const mods = get.VFM_MODS;
  console.log(mods);
  if (mods.compactPosts === true) loadFile("mods/compact-posts.css");
  if (mods.notificationIcons === true) loadFile("mods/notification-icons.css");
  if (mods.userID === true) loadFile("mods/userID.css");
  if (mods.square === true) loadFile("mods/square-avatars.css");
  if (mods.signatureMod === true) loadFile("mods/signature-mod.css");
  if (mods.advancedFormatting === true)
    loadFile("mods/advanced-formatting.css");
  if (mods.bookmarks === true) _bookmarks();
  if (mods.headerScroll === true) {
    _top = 64;
    __top = "top: -64px !important";
    _scp = 0;
    _vivaldiHeader = document.getElementById("vivaldi-header");
    _subMenu = document.getElementById("submenu");
    window.addEventListener("scroll", autoScroll);
    loadFile("mods/header-scroll.css");
  }
  let startmods = (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length || mutation.removedNodes.length) {
        add_copy_code();
        themePreview(content);
        let signature;
        if (mods.signatureMod === true) signature = "on";
        else signature = "off";
        tools(signature);
        if (mods.systemEmoji === true) checkMoji();
      }
    });
  };
  new MutationObserver(startmods).observe(document.getElementById("body"), {
    childList: true,
    subtree: true,
  });
});

header();
userMenu();
discord();
