// Restore Options

function _restore() {
  _restoreThemes();
  _restoreSchedule();
  _loadTheme();
  chrome.storage.sync.get(
    {
      VFM_MODS: "",
      VFM_USER_CSS: "",
      VFM_SCHEDULE: "",
    },
    function (restore) {
      let mods = restore.VFM_MODS;
      Object.keys(mods).forEach(function (mod) {
        if (mods[mod] === true) {
          document.getElementById(mod).classList.add("selected");
        }
      });
      chrome.storage.local.get({ userCSS: "" }, function (local) {
        document.getElementById("userCSS").value = local.userCSS;
      });
      if (restore.VFM_USER_CSS === true) {
        toggleBtn.setAttribute("checked", true);
        textarea.disabled = false;
        save2Btn.disabled = false;
      } else {
        toggleBtn.removeAttribute("checked");
        textarea.disabled = true;
        save2Btn.disabled = true;
      }
      if (restore.VFM_SCHEDULE.activated === true)
        toggleSchedule.setAttribute("checked", true);
      else toggleSchedule.removeAttribute("checked");
      if (changeMessage === false) {
        _status.style.opacity = "0";
        _status.innerText = chrome.i18n.getMessage("statusThemes");
        _fade();
      }
    }
  );
}

// Set page theme

function _loadTheme() {
  chrome.storage.sync.get({ VFM_CURRENT_THEME: "" }, function (get) {
    let theme = get.VFM_CURRENT_THEME.selected;
    if (theme.startsWith("vfm_")) {
      document.body.classList.remove("vfm-vivaldi_light", "vfm-vivaldi_dark");
      let colors = get.VFM_CURRENT_THEME.colors;
      for (const [key, value] of Object.entries(colors)) {
        document.body.style.setProperty("--" + key, value);
      }
    } else {
      document.body.removeAttribute("style");
      document.body.classList.remove("vfm-vivaldi_light", "vfm-vivaldi_dark");
      if (theme === "vfm-vivaldi_light")
        document.body.classList.add("vfm-vivaldi_light");
      else document.body.classList.add("vfm-vivaldi_dark");
    }
  });
}

// Save Modifications

function _selectMods(event) {
  const target = event.currentTarget;
  const toggle = target.getAttribute("id");
  chrome.storage.sync.get({ VFM_MODS: "" }, function (select) {
    let mods = select.VFM_MODS;
    if (target.classList.contains("selected")) {
      target.removeAttribute("class");
      mods[toggle] = false;
    } else {
      target.classList.add("selected");
      mods[toggle] = true;
    }
    chrome.storage.sync.set({ VFM_MODS: mods });
  });
}

// Use tab in textarea (tab to 4 spaces)

function _tabSpaces(key) {
  if (key.keyCode === 9 || key.which === 9) {
    key.preventDefault();
    let select = this.selectionStart;
    this.value =
      this.value.substring(0, this.selectionStart) +
      "    " +
      this.value.substring(this.selectionEnd);
    this.selectionEnd = select + 4;
  }
}

// Toggle User CSS

function _toggleUserCSS() {
  chrome.storage.sync.get({ VFM_USER_CSS: "" }, function (get) {
    let css = get.VFM_USER_CSS;
    if (css === true) {
      css = false;
      save2Btn.disabled = true;
      textarea.disabled = true;
      toggleBtn.removeAttribute("checked");
      var text = chrome.i18n.getMessage("deactivateUserCSS");
    } else {
      css = true;
      toggleBtn.setAttribute("checked", true);
      save2Btn.disabled = false;
      textarea.disabled = false;
      var text = chrome.i18n.getMessage("activateUserCSS");
    }
    chrome.storage.sync.set({ VFM_USER_CSS: css }, function () {
      chrome.runtime.sendMessage({ message: "trigger usercss" });
      _status.style.opacity = "0";
      _status.innerText = text;
      _fade();
    });
  });
}

// Save User CSS

function _saveUserCSS() {
  let userCSS = document.getElementById("userCSS").value;
  chrome.storage.local.set(
    {
      userCSS: userCSS,
    },
    function () {
      chrome.runtime.sendMessage({ message: "trigger usercss" });
      _status.style.opacity = "0";
      _status.innerText = chrome.i18n.getMessage("saveUserCSS");
      _fade();
    }
  );
}

// Toggle Schedule

function _toggleSchedule() {
  chrome.storage.sync.get({ VFM_SCHEDULE: "" }, function (get) {
    let schedule = get.VFM_SCHEDULE;
    if (schedule.activated === false) {
      schedule.activated = true;
      var systemMessage = "trigger schedule";
      var text = chrome.i18n.getMessage("activateSchedule");
      toggleSchedule.setAttribute("checked", true);
    } else {
      schedule.activated = false;
      var systemMessage = "clear alarm";
      var text = chrome.i18n.getMessage("deactivateSchedule");
      toggleSchedule.removeAttribute("checked");
    }
    chrome.storage.sync.set({ VFM_SCHEDULE: schedule }, function () {
      chrome.runtime.sendMessage({ message: systemMessage });
      _status.style.opacity = "0";
      _status.innerText = text;
      _fade();
    });
  });
}

// Restore Schedule

function _restoreSchedule() {
  chrome.storage.sync.get(
    {
      VFM_SCHEDULE: { schedule: {} },
      VFM_THEMES: "",
    },
    function (restore) {
      listSchedule.innerHTML = "";
      let themes = restore.VFM_THEMES;
      let schedule = restore.VFM_SCHEDULE;
      let entries = schedule.schedule;
      Object.keys(entries).forEach((entry) => {
        let vivaldiTheme = true;
        const scheduleEntry = document.createElement("div");
        scheduleEntry.id = `schedule-${entry}`;
        scheduleEntry.innerHTML = `<select class="sc-hours"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select><select class="sc-minutes"><option value="00">00</option><option value="05">05</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option></select><select class="sc-themes"><option class="vivaldi_light" value="vfm-vivaldi_light">Vivaldi Light</option><option class="vivaldi_dark" value="vfm-vivaldi_dark">Vivaldi Dark</option></select>`;
        listSchedule.appendChild(scheduleEntry);
        const hours = entries[entry].time.substring(0, 2);
        const minutes = entries[entry].time.substring(3, 5);
        document
          .querySelector(
            `#schedule-${entry} .sc-hours option[value="${hours}"]`
          )
          .setAttribute("selected", true);
        document
          .querySelector(
            `#schedule-${entry} .sc-minutes option[value="${minutes}"]`
          )
          .setAttribute("selected", true);
        Object.keys(themes).forEach((theme) => {
          const name = themes[theme].themeName;
          const option = document.createElement("option");
          option.value = name;
          if (name === entries[entry].theme) {
            option.setAttribute("selected", true);
            vivaldiTheme = false;
          }
          option.text = name.substring(4).replace(/_/g, " ");
          document
            .querySelector(`#schedule-${entry} .sc-themes`)
            .appendChild(option);
        });
        if (vivaldiTheme === true) {
          if (entries[entry].theme === "vfm-vivaldi_light") {
            document.querySelector(`#schedule-${entry} .vivaldi_light`).setAttribute("selected", true);
          }
          else {
            document.querySelector(`#schedule-${entry} .vivaldi_dark`).setAttribute("selected", true);
          }
        }
      });
      const select = document.querySelectorAll("select");
      select.forEach((selected) => {
        selected.addEventListener("change", function () {
          _editSchedule(selected);
        });
      });
    }
  );
}

// Edit Schedule

function _editSchedule(el) {
  chrome.storage.sync.get({ VFM_SCHEDULE: "" }, function (get) {
    let schedule = get.VFM_SCHEDULE;
    const saveValue = el.options[el.selectedIndex].value;
    const index = Number(el.parentNode.id.replace(/^\D+/g, ""));
    if (el.classList.contains("sc-themes")) {
      schedule.schedule[index].theme = saveValue;
    } else if (el.classList.contains("sc-hours")) {
      schedule.schedule[index].time =
        saveValue + schedule.schedule[index].time.substring(2, 5);
    } else {
      schedule.schedule[index].time =
        schedule.schedule[index].time.substring(0, 3) + saveValue;
    }
    schedule.schedule.sort((a, b) => {
      if (b.time > a.time) return -1;
      if (a.time > b.time) return 1;
      return 0;
    });
    chrome.storage.sync.set({ VFM_SCHEDULE: schedule }, function () {
      _restoreSchedule();
      chrome.runtime.sendMessage({ message: "trigger schedule" });
    });
  });
}

// Add/Remove Schedule

function _addremoveSchedule(choice) {
  chrome.storage.sync.get({ VFM_SCHEDULE: "" }, function (get) {
    let schedule = get.VFM_SCHEDULE;
    if (choice === 1) {
      const as = { theme: "vfm-vivaldi_light", time: "00:00" };
      schedule.schedule.unshift(as);
    } else {
      if (schedule.schedule.length > 2) schedule.schedule.shift();
      else return;
    }
    chrome.storage.sync.set({ VFM_SCHEDULE: schedule }, function () {
      _restoreSchedule();
      chrome.runtime.sendMessage({ message: "trigger schedule" });
    });
  });
}

// Reset Extension

function _resetOptions() {
  if (!resetBtn.classList.contains("confirm")) {
    resetBtn.classList.add("confirm");
    _status.style.opacity = "0";
    _status.innerText = chrome.i18n.getMessage("confirmReset");
    _fade();
    setTimeout(function () {
      if (_status.innerText === chrome.i18n.getMessage("confirmReset")) {
        _status.style.opacity = "0";
        _status.innerText = chrome.i18n.getMessage("cancelReset");
        _fade();
      }
      resetBtn.removeAttribute("class");
    }, 8000);
  } else {
    resetBtn.removeAttribute("class");
    chrome.storage.sync.clear(function () {
      chrome.storage.local.clear(function () {
        selectMods.forEach(function (mod) {
          if (mod.classList.contains("selected")) {
            mod.removeAttribute("class");
          }
        });
        const ct = document.querySelectorAll(
          '#themeMachine button[id^="vfm_"]'
        );
        for (let i = 0; i < ct.length; i++) {
          ct[i].parentNode.removeChild(ct[i]);
        }
        chrome.runtime.sendMessage({ message: "reset" }, function () {
          _restore();
          _showThemes();
          changeMessage = true;
          _status.style.opacity = "0";
          _status.innerText = chrome.i18n.getMessage("optionsReset");
          _fade();
        });
      });
    });
  }
}

// Navigation

function _showThemes() {
  document.querySelector(".view").removeAttribute("class");
  btnThemes.classList.add("view");
  navThemes.style.display = "block";
  navModifications.style.display = "none";
  navInfo.style.display = "none";
  _status.style.opacity = "0";
  _status.innerText = chrome.i18n.getMessage("statusThemes");
  _fade();
}
function _showModifications() {
  document.querySelector(".view").removeAttribute("class");
  btnModifications.classList.add("view");
  navThemes.style.display = "none";
  navModifications.style.display = "block";
  navInfo.style.display = "none";
  _status.style.opacity = "0";
  _status.innerText = chrome.i18n.getMessage("statusModifications");
  _fade();
}
function _showInfo() {
  document.querySelector(".view").removeAttribute("class");
  btnInfo.classList.add("view");
  navThemes.style.display = "none";
  navModifications.style.display = "none";
  navInfo.style.display = "block";
  _status.style.opacity = "0";
  _status.innerText = chrome.i18n.getMessage("statusInfo");
  _fade();
}

const navThemes = document.getElementById("themes");
const navModifications = document.getElementById("modifications");
const navInfo = document.getElementById("info");
const btnThemes = document.getElementById("themes-btn");
const btnModifications = document.getElementById("modifications-btn");
const btnInfo = document.getElementById("info-btn");
const selectMods = document.querySelectorAll("#selectMods > p > span");
const textarea = document.querySelector("textarea");
const toggleBtn = document.getElementById("css-toggle");
const save2Btn = document.getElementById("css-save");
const resetBtn = document.getElementById("reset-btn");
const toggleSchedule = document.getElementById("schedule-toggle");
const listSchedule = document.querySelector(".listSchedule");
const addSchedule = document.getElementById("addSchedule");
const removeSchedule = document.getElementById("removeSchedule");
let changeMessage = false;

btnThemes.addEventListener("click", _showThemes);
btnModifications.addEventListener("click", _showModifications);
btnInfo.addEventListener("click", _showInfo);
selectMods.forEach(function (mod) {
  mod.addEventListener("click", _selectMods);
});
textarea.addEventListener("keydown", _tabSpaces);
toggleBtn.addEventListener("click", _toggleUserCSS);
save2Btn.addEventListener("click", _saveUserCSS);
toggleSchedule.addEventListener("click", _toggleSchedule);
addSchedule.addEventListener("click", function () {
  _addremoveSchedule(1);
});
removeSchedule.addEventListener("click", function () {
  _addremoveSchedule(0);
});
resetBtn.addEventListener("click", _resetOptions);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "options apply theme") {
    _loadTheme();
  }
  if (request.message === "options update theme") {
    document
      .querySelector("#themeMachine .themebox.active")
      .classList.remove("active");
    const ct = document.querySelectorAll('#themeMachine button[id^="vfm_"]');
    for (let i = 0; i < ct.length; i++) {
      ct[i].parentNode.removeChild(ct[i]);
    }
    _restoreThemes();
    _restoreSchedule();
  }
});

_loadTheme();
_restore();
