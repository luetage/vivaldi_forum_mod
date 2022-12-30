// Header

function header() {
  document.getElementById("vlogo").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" version="1.1">
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <path d="M16,32.0001433 C23.0111818,32.0001433 26.909069,32.0001433 29.4542934,29.4544367 C32,26.90873 32,23.0108428 32,16.0001433 C32,8.98896151 32,5.09107429 29.4542934,2.54584991 C26.909069,0.000143283582 23.0111818,0.000143283582 16,0.000143283582 C8.98881823,0.000143283582 5.09141324,0.000143283582 2.54570662,2.54584991 C0,5.09107429 0,8.98896151 0,16.0001433 C0,23.0108428 0,26.90873 2.54570662,29.4544367 C5.09141324,32.0001433 8.98881823,32.0001433 16,32.0001433 M23.5468657,12.9424478 C21.5896119,16.3482985 19.6304478,19.7517612 17.6760597,23.1590448 C17.3130746,23.7918806 16.7853134,24.1749254 16.0612537,24.2274627 C15.249791,24.286209 14.6126567,23.9437612 14.2038209,23.2397612 C12.9653731,21.1053134 11.7407761,18.9622687 10.5109254,16.8230448 C9.76298507,15.5210746 9.0121791,14.2210149 8.26758209,12.9176119 C7.51629851,11.6027463 8.36358209,10.0046567 9.87092537,9.92728358 C10.6671045,9.88620896 11.2808358,10.2534925 11.6848955,10.9460299 C12.2370149,11.8931343 12.7791045,12.8459701 13.3254925,13.7959403 C13.7195224,14.4803582 14.1054328,15.1695522 14.5109254,15.846806 C15.0974328,16.8297313 15.96,17.3842388 17.1077015,17.4530149 C18.7325373,17.5499701 20.2413134,16.3717015 20.4357015,14.6408358 C20.4505075,14.5109254 20.4600597,14.3819701 20.465791,14.3155821 C20.457194,13.7553433 20.352597,13.2834627 20.1305075,12.8383284 C19.5239403,11.6208955 20.1701493,10.2568358 21.4893134,9.9640597 C22.5634627,9.72620896 23.6748657,10.5171343 23.817194,11.6094328 C23.8792836,12.0894328 23.7847164,12.5293134 23.5468657,12.9424478 M24.2575522,7.47856716 C19.6232836,2.84047761 12.1099701,2.84047761 7.47570149,7.47856716 C2.84143284,12.1166567 2.84143284,19.6366567 7.47570149,24.2742687 C12.1099701,28.9123582 19.6232836,28.9123582 24.2575522,24.2742687 C28.8918209,19.6366567 28.8918209,12.1166567 24.2575522,7.47856716"/>
      </g>
      <style xmlns="">
        body {cursor: default;}
        [contenteditable] {cursor: text;}
      </style>
    </svg>
  `;
  document.getElementById("vivaldimenu").innerHTML = `
    <li> <a href="https://vivaldi.com/blog/">News</a></li>
    <li> <a href="https://vivaldi.net/">Community</a></li>
    <li> <a href="https://forum.vivaldi.net" class="current">Forum</a></li>
    <li> <a href="https://help.vivaldi.com">Help</a></li>
    <li> <a href="https://themes.vivaldi.net">Themes</a></li>
    <li> <a href="https://webmail.vivaldi.net">Webmail</a></li>
  `;
}

// Get the username

function username() {
  const user = document
    .querySelector('#user-control-list [component="header/username"]')
    .innerHTML.toLowerCase()
    .replace(/\./g, "-");
  return user;
}

// Menu entry for options page

function userMenu() {
  const dropdown = document.querySelector("#user-control-list.dropdown-menu");
  if (dropdown) {
    const options = document.createElement("li");
    options.classList.add("optionsLink");
    options.style = "cursor: pointer";
    options.innerHTML = `<a><i class="fa fa-fw fa-dot-circle-o"></i><span> ${chrome.i18n.getMessage(
      "optionsLink"
    )} </span></a>`;
    dropdown.insertBefore(options, dropdown.childNodes[20]);
    document.querySelector(".optionsLink").addEventListener("click", () => {
      chrome.runtime.sendMessage({ message: "options pls" });
    });
  }
}

// Copy all code button

function make_copy_button() {
  const new_button = document.createElement("button");
  new_button.textContent = chrome.i18n.getMessage("copyCode");
  new_button.className = "copy-all-code-button";
  new_button.addEventListener("click", copy_all);
  return new_button;
}

function copy_all(event) {
  const code_node = event.currentTarget.parentElement.querySelector("code");
  const window_selection = window.getSelection();
  const code_range = document.createRange();
  code_range.selectNodeContents(code_node);
  window_selection.removeAllRanges();
  window_selection.addRange(code_range);
  document.execCommand("copy");
}

function add_copy_code() {
  setTimeout(() => {
    const topic = document.querySelector(".topic");
    if (topic) {
      const codeblocks = document.querySelectorAll("pre.markdown-highlight");
      codeblocks.forEach((codeblock) => {
        if (
          codeblock.classList.contains("copy") === false &&
          codeblock.firstChild.classList.contains("hljs") === true
        ) {
          codeblock.style.position = "relative";
          codeblock.classList.add("copy");
          codeblock.insertBefore(make_copy_button(), codeblock.lastChild);
        }
      });
    }
  }, 2000);
}

// Link and signature button for post tools

function toolaction(e, o) {
  if (e.target.classList.contains("vfm-link")) {
    const pid = o.getAttribute("data-pid");
    const copy = `https://forum.vivaldi.net/post/${pid}`;
    navigator.clipboard.writeText(copy);
    e.target.classList.add("vfm-highlight");
    setTimeout(() => e.target.classList.remove("vfm-highlight"), 3333);
  } else {
    o.style.display = "block";
    e.target.style.textDecoration = "none";
    e.target.style.cursor = "default";
  }
}

function tools(s) {
  const topic = document.querySelector(".topic");
  if (topic) {
    const tools = Array.from(topic.getElementsByClassName("post-tools"));
    const transLink = chrome.i18n.getMessage("link");
    const transSign = chrome.i18n.getMessage("signature");
    tools.forEach((tool) => {
      const post = tool.parentNode.parentNode.parentNode.parentNode;
      if (
        !tool.classList.contains("vfm-tools") &&
        !post.classList.contains("deleted")
      ) {
        const link = document.createElement("a");
        link.innerHTML = transLink;
        link.classList.add("no-select", "vfm-link");
        tool.appendChild(link);
        const hlp1 = (event) => toolaction(event, post);
        link.addEventListener("click", hlp1);
        if (s === "on") {
          const sig = tool.parentNode.parentNode.previousElementSibling;
          if (sig !== null && sig.classList.contains("post-signature")) {
            const sign = document.createElement("a");
            sign.innerHTML = transSign;
            sign.classList.add("no-select", "vfm-sign");
            tool.appendChild(sign);
            const hlp2 = (event) => toolaction(event, sig);
            sign.addEventListener("click", hlp2);
          }
        }
        tool.classList.add("vfm-tools");
      }
    });
  }
}

// Unofficial Discord and Contribute link in footer

function discord() {
  document.querySelector(".footerlinks").innerHTML +=
    ' | <a href="https://vivaldi.com/contribute/" target="_blank" rel="noreferrer noopener">Contribute</a> | <a href="https://discord.gg/cs6bTDU" target="_blank" rel="noreferrer noopener">Discord</a>';
}

// Easter egg

// https://stackoverflow.com/a/45736131/12275656
function genRand(min, max, decimalPlaces) {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

function genSnowFlake() {
  const size = genRand(4, 8, 0);
  const flake = `
    <div class="flake" style="
      width: ${size}px;
      height: ${size}px;
      left: ${genRand(-10, 110, 0)}%;
      top: ${genRand(0, 100, 0)}px;
      animation-delay: ${genRand(-12, 0, 1)}s, ${genRand(-4, 0, 1)}s;
      filter: blur(${genRand(0.8, 3, 1)}px);
    "></div>
  `;
  return flake;
}

function loadEasterEgg(numFlakes) {
  const del = document.querySelector(".snow");
  if (del) del.parentNode.removeChild(del);
  const snow = document.createElement("div");
  snow.setAttribute("class", "snow");
  let flakes = "";
  for (let i = 0; i < numFlakes; i++) {
    flakes += genSnowFlake();
  }
  snow.innerHTML = flakes;
  document.body.prepend(snow);
}

function checkInput(e, el) {
  if (e.key === "Enter") {
    const input = el.value.replace(/\s+/g, "").toLowerCase();
    if (input.includes("letitsnow")) {
      let num;
      try {
        num = parseInt(input.match(/\d/g).join(""));
      } catch (e) {
        num = 90;
      }
      if (num > 0 && num < 1000) loadEasterEgg(num);
      else loadEasterEgg(90);
    }
  }
}

function easterEgg() {
  const input = document.querySelector("#search-form .form-control");
  const bunny = (event) => checkInput(event, input);
  input.addEventListener("keydown", bunny);
}
