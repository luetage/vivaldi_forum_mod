// Restore Themes

function _restoreThemes() {
  chrome.storage.sync.get(
    {
      VFM_CURRENT_THEME: { selected: "vfm-standard" },
      VFM_THEMES: [],
    },
    function (get) {
      var vct = get.VFM_CURRENT_THEME;
      var vt = get.VFM_THEMES;
      vt.forEach(function (theme) {
        const btn = document.createElement("button");
        const name = theme.themeName;
        btn.id = name;
        btn.classList.add("themebox");
        btn.innerHTML =
          '<div class="themebox-image"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="var(--colorAc)" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDd)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorCo)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="47.5" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="62.5" cy="60" r="5"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" class="themebox-o_mark" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4"></circle></svg></div><div class="themebox-title"></div>';
        document
          .getElementById("themeMachine")
          .insertBefore(btn, document.querySelector(".editTheme"));
        const ses = document.querySelector("#" + name + " .themebox-image");
        for (const [key, value] of Object.entries(theme)) {
          if (key !== "themeName") {
            ses.style.setProperty("--" + key, value);
          }
        }
        const themeBox = document.querySelector(
          "#" + name + " .themebox-title"
        );
        themeBox.title = "." + name;
        themeBox.innerText = name.substring(4).replace(/_/g, " ");
      });
      //setup
      toggleEdit.style.display = "none";
      toggleEdit.style.opacity = 1;
      const select = vct.selected;
      document.getElementById(select).classList.add("active");
      if (select.startsWith("vfm_")) {
        addTheme.disabled = false;
        removeTheme.disabled = false;
        editBtn.disabled = false;
        moveLeft.disabled = false;
        moveRight.disabled = false;
        var index = vt.findIndex((x) => x.themeName === select);
        _themeName.value = vt[index].themeName.substring(4).replace(/_/g, " ");
        _colorBg.value = vt[index].colorBg;
        _colorFg.value = vt[index].colorFg;
        _colorHi.value = vt[index].colorHi;
        _colorCo.value = vt[index].colorCo;
        _colorDd.value = vt[index].colorDd;
        _colorLi.value = vt[index].colorLi;
        _colorAc.value = vt[index].colorAc;
      } else {
        addTheme.disabled = true;
        removeTheme.disabled = true;
        editBtn.disabled = true;
        moveLeft.disabled = true;
        moveRight.disabled = true;
      }
      document.querySelectorAll("button.themebox").forEach(function (item) {
        item.addEventListener("click", _selectTheme);
      });
    }
  );
}

// Select Theme

function _selectTheme(event) {
  const theme = event.currentTarget;
  const name = theme.getAttribute("id");
  if (!theme.classList.contains("active")) {
    _cancelImport();
    const old = document.querySelector(".active");
    old.classList.remove("active");
    theme.classList.add("active");
    chrome.storage.sync.get(
      {
        VFM_CURRENT_THEME: "",
        VFM_THEMES: "",
      },
      function (get) {
        var vct = get.VFM_CURRENT_THEME;
        vct.selected = name;
        if (!name.startsWith("vfm_")) {
          chrome.storage.sync.set({ VFM_CURRENT_THEME: vct });
          toggleEdit.style.display = "none";
          addTheme.disabled = true;
          removeTheme.disabled = true;
          editBtn.disabled = true;
          moveLeft.disabled = true;
          moveRight.disabled = true;
          sendToBackground();
        } else {
          var vt = get.VFM_THEMES;
          var index = vt.findIndex((x) => x.themeName === name);
          _themeName.value = vt[index].themeName
            .substring(4)
            .replace(/_/g, " ");
          _colorBg.value = vt[index].colorBg;
          _colorFg.value = vt[index].colorFg;
          _colorHi.value = vt[index].colorHi;
          _colorCo.value = vt[index].colorCo;
          _colorDd.value = vt[index].colorDd;
          _colorLi.value = vt[index].colorLi;
          _colorAc.value = vt[index].colorAc;
          chrome.storage.sync.set({ VFM_CURRENT_THEME: vct }, function () {
            addTheme.disabled = false;
            removeTheme.disabled = false;
            editBtn.disabled = false;
            moveLeft.disabled = false;
            moveRight.disabled = false;
            sendToBackground();
          });
        }
      }
    );
  }
}

// Add Theme

function _addTheme() {
  chrome.storage.sync.get(
    {
      VFM_THEMES: "",
      VFM_CURRENT_THEME: "",
    },
    function (get) {
      var vt = get.VFM_THEMES;
      var vct = get.VFM_CURRENT_THEME;
      const epoch = "vfm_" + Date.now();
      vt.push({
        themeName: epoch,
        colorBg: vct.colors.colorBg,
        colorFg: vct.colors.colorFg,
        colorHi: vct.colors.colorHi,
        colorCo: vct.colors.colorCo,
        colorDd: vct.colors.colorDd,
        colorLi: vct.colors.colorLi,
        colorAc: vct.colors.colorAc,
      });
      chrome.storage.sync.set({ VFM_THEMES: vt }, function () {
        const btn = document.createElement("button");
        btn.id = epoch;
        btn.classList.add("themebox");
        btn.innerHTML =
          '<div class="themebox-image"><svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="var(--colorAc)" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDd)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorCo)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="47.5" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="62.5" cy="60" r="5"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" class="themebox-o_mark" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4"></circle></svg></div><div class="themebox-title"></div>';
        document
          .getElementById("themeMachine")
          .insertBefore(btn, document.querySelector(".editTheme"));
        const newTheme = document.getElementById(epoch);
        newTheme.addEventListener("click", _selectTheme);
        const ses = document.querySelector("#" + epoch + " .themebox-image");
        for (const [key, value] of Object.entries(vt[vt.length - 1])) {
          if (key !== "themeName") {
            ses.style.setProperty("--" + key, value);
          }
        }
        const themeBox = document.querySelector(
          "#" + epoch + " .themebox-title"
        );
        themeBox.title = "." + epoch;
        themeBox.innerText = epoch.substring(4).replace(/_/g, " ");
        newTheme.click();
        toggleEdit.style.display = "block";
        _themeName.focus();
        _restoreSchedule();
      });
    }
  );
}

// Remove Theme

function _removeTheme() {
  chrome.storage.sync.get(
    {
      VFM_THEMES: "",
      VFM_CURRENT_THEME: "",
      VFM_SCHEDULE: "",
    },
    function (get) {
      let vt = get.VFM_THEMES;
      let vct = get.VFM_CURRENT_THEME;
      let sc = get.VFM_SCHEDULE;
      if (vt.length > 1) {
        sc.schedule.forEach((item) => {
          if (item.theme === vct.selected) {
            item.theme = "vfm-standard";
          }
        });
        const index = vt.findIndex((x) => x.themeName === vct.selected);
        if (index > 0) {
          var newSelect = vt[index - 1].themeName;
        } else {
          var newSelect = vt[index + 1].themeName;
        }
        document.getElementById(newSelect).click();
        const remove = document.getElementById(vt[index].themeName);
        remove.removeEventListener("click", _selectTheme);
        remove.parentNode.removeChild(remove);
        vt.splice(index, 1);
        chrome.storage.sync.set(
          {
            VFM_THEMES: vt,
            VFM_SCHEDULE: sc,
          },
          () => _restoreSchedule()
        );
      }
    }
  );
}

// Move Theme

function _moveTheme() {
  chrome.storage.sync.get(
    {
      VFM_THEMES: "",
      VFM_CURRENT_THEME: "",
    },
    function (get) {
      var vt = get.VFM_THEMES;
      var vct = get.VFM_CURRENT_THEME;
      var index = vt.findIndex((x) => x.themeName === vct.selected);
      if (_toMove === "left") {
        if (index !== 0) {
          var moveThis = document.getElementById(vct.selected);
          moveThis.parentNode.insertBefore(
            moveThis,
            document.getElementById(vt[index - 1].themeName)
          );
          var fromI = vt[index];
          var toI = vt[index - 1];
          vt[index - 1] = fromI;
          vt[index] = toI;
        } else {
          return;
        }
      } else {
        if (index < vt.length - 1) {
          var moveThis = document.getElementById(vt[index + 1].themeName);
          moveThis.parentNode.insertBefore(
            moveThis,
            document.getElementById(vct.selected)
          );
          var fromI = vt[index];
          var toI = vt[index + 1];
          vt[index + 1] = fromI;
          vt[index] = toI;
        } else {
          return;
        }
      }
      chrome.storage.sync.set({ VFM_THEMES: vt });
    }
  );
}

// Save Theme

function _saveTheme() {
  _safeValueSwitch = 0;
  _cancelImport();
  chrome.storage.sync.get(
    {
      VFM_THEMES: "",
      VFM_CURRENT_THEME: "",
      VFM_SCHEDULE: "",
    },
    function (get) {
      let vt = get.VFM_THEMES;
      let vct = get.VFM_CURRENT_THEME;
      let sc = get.VFM_SCHEDULE;
      var dupe = false;
      const active = document.querySelector(".active");
      const update = active.getAttribute("id");
      var nameCheck = /^[a-zA-Z0-9- ]*$/.test(_themeName.value);
      var name = _themeName.value.replace(/ /g, "_").trim();
      for (i = 0; i < vt.length; i++) {
        if (
          name.toLowerCase() === vt[i].themeName.substring(4).toLowerCase() &&
          name.toLowerCase() !== vct.selected.substring(4).toLowerCase()
        ) {
          dupe = true;
          break;
        }
      }
      if (
        nameCheck === true &&
        name.length > 0 &&
        name.length < 26 &&
        dupe === false
      ) {
        var trueName = "vfm_" + name;
        var displayName = name.replace(/_/g, " ");
      } else {
        var epoch = Date.now();
        var trueName = "vfm_" + epoch;
        var displayName = epoch;
        _themeName.value = epoch;
      }
      var index = vt.findIndex((x) => x.themeName === update);
      vt[index].themeName = trueName;
      vt[index].colorBg = _colorBg.value;
      vt[index].colorFg = _colorFg.value;
      vt[index].colorHi = _colorHi.value;
      vt[index].colorCo = _colorCo.value;
      vt[index].colorDd = _colorDd.value;
      vt[index].colorLi = _colorLi.value;
      vt[index].colorAc = _colorAc.value;
      active.id = trueName;
      const ses = document.querySelector(".active .themebox-image");
      for (const [key, value] of Object.entries(vt[index])) {
        if (key !== "themeName") {
          ses.style.setProperty("--" + key, value);
        }
      }
      const themeBox = document.querySelector(".active .themebox-title");
      themeBox.title = "." + trueName;
      themeBox.innerText = displayName;
      sc.schedule.forEach((item) => {
        if (item.theme === vct.selected) {
          item.theme = trueName;
        }
      });
      vct.selected = trueName;
      chrome.storage.sync.set(
        {
          VFM_THEMES: vt,
          VFM_CURRENT_THEME: vct,
          VFM_SCHEDULE: sc,
        },
        function () {
          sendToBackground();
          _restoreSchedule();
          status.style.opacity = "0";
          status.innerText = chrome.i18n.getMessage("saveTheme");
          _fade();
        }
      );
    }
  );
}

// Export Theme

function _exportTheme() {
  const share = {
    themeName: _themeName.value,
    colorBg: _colorBg.value,
    colorFg: _colorFg.value,
    colorHi: _colorHi.value,
    colorAc: _colorAc.value,
    colorLi: _colorLi.value,
    colorCo: _colorCo.value,
    colorDd: _colorDd.value,
  };
  const themeCode = JSON.stringify(share);
  navigator.clipboard.writeText(themeCode);
  status.style.opacity = "0";
  status.innerText = chrome.i18n.getMessage("exportTheme");
  _fade();
}

// Import theme

function _cancelImport() {
  if (importBtn.classList.contains("cancel")) {
    importBtn.classList.remove("cancel");
    importBtn.innerText = chrome.i18n.getMessage("import");
    _themeName.classList.remove("import");
    if (_safeValueSwitch === 1) {
      _safeValueSwitch = 0;
      _themeName.value = _safeName;
      _colorBg.value = _safeBg;
      _colorFg.value = _safeFg;
      _colorHi.value = _safeHi;
      _colorCo.value = _safeCo;
      _colorDd.value = _safeDd;
      _colorLi.value = _safeLi;
      _colorAc.value = _safeAc;
    }
    _themeName.placeholder = "";
    _themeName.setAttribute("maxlength", "25");
    saveBtn.disabled = false;
    exportBtn.disabled = false;
    status.style.opacity = "0";
    status.innerText = chrome.i18n.getMessage("cancelImport");
    _fade();
  }
}

function _imp() {
  event.stopPropagation();
  event.preventDefault();
  if (eventType === "paste") {
    const clipboardData = event.clipboardData || window.clipboardData;
    var themeCode = clipboardData.getData("text");
  } else {
    var themeCode = event.dataTransfer.getData("text");
  }
  const shared = JSON.parse(themeCode);
  _themeName.value = shared.themeName;
  if (_themeName.value === "undefined") {
    _themeName.value = Date.now();
  }
  _colorBg.value = shared.colorBg;
  _colorFg.value = shared.colorFg;
  _colorHi.value = shared.colorHi;
  _colorCo.value = shared.colorCo;
  _colorDd.value = shared.colorDd;
  _colorLi.value = shared.colorLi;
  _colorAc.value = shared.colorAc;
  _themeName.classList.remove("import");
  _themeName.placeholder = "";
  saveBtn.disabled = false;
  exportBtn.disabled = true;
  importBtn.disabled = false;
  status.style.opacity = "0";
  status.innerText = chrome.i18n.getMessage("importTheme");
  _fade();
}

function _importTheme() {
  if (!importBtn.classList.contains("cancel")) {
    importBtn.classList.add("cancel");
    importBtn.innerText = chrome.i18n.getMessage("cancel");
    _themeName.classList.add("import");
    _safeValueSwitch = 1;
    _safeName = _themeName.value;
    _safeBg = _colorBg.value;
    _safeFg = _colorFg.value;
    _safeHi = _colorHi.value;
    _safeCo = _colorCo.value;
    _safeDd = _colorDd.value;
    _safeLi = _colorLi.value;
    _safeAc = _colorAc.value;
    _themeName.value = "";
    _themeName.placeholder = chrome.i18n.getMessage("import");
    status.style.opacity = "0";
    status.innerText = chrome.i18n.getMessage("importThemeDesc");
    _fade();
    if (toggleEdit.style.display === "none") {
      toggleEdit.style.display = "block";
    }
    saveBtn.disabled = true;
    exportBtn.disabled = true;
    _themeName.focus();
    _themeName.addEventListener("paste", function () {
      eventType = "paste";
      _imp(event);
    });
    _themeName.addEventListener("drop", function () {
      eventType = "drop";
      _imp(event);
    });
  } else {
    _cancelImport();
  }
}

// Toggle Edit

function _editTheme() {
  if (toggleEdit.style.display === "none") {
    toggleEdit.style.display = "block";
  } else {
    toggleEdit.style.display = "none";
  }
}

// Animate Status

function _fade() {
  var op = 0.1;
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    status.style.opacity = op;
    status.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 20);
}

// Activate Theme

function sendToBackground() {
  chrome.runtime.sendMessage({ message: "trigger theme" });
}

const addTheme = document.getElementById("addTheme");
const removeTheme = document.getElementById("removeTheme");
const editBtn = document.querySelector(".theme-edit");
const moveLeft = document.getElementById("moveLeft");
const moveRight = document.getElementById("moveRight");
const saveBtn = document.querySelector(".theme-save");
const importBtn = document.querySelector(".theme-import");
const exportBtn = document.querySelector(".theme-export");
const toggleEdit = document.querySelector(".toggleEdit");
const _themeName = document.getElementById("themeName");
const _colorBg = document.getElementById("colorBg");
const _colorFg = document.getElementById("colorFg");
const _colorHi = document.getElementById("colorHi");
const _colorAc = document.getElementById("colorAc");
const _colorLi = document.getElementById("colorLi");
const _colorCo = document.getElementById("colorCo");
const _colorDd = document.getElementById("colorDd");
const status = document.getElementById("status");

addTheme.addEventListener("click", _addTheme);
removeTheme.addEventListener("click", _removeTheme);
editBtn.addEventListener("click", _editTheme);
moveLeft.addEventListener("click", function () {
  _toMove = "left";
  _moveTheme();
});
moveRight.addEventListener("click", function () {
  _toMove = "right";
  _moveTheme();
});
saveBtn.addEventListener("click", _saveTheme);
importBtn.addEventListener("click", _importTheme);
exportBtn.addEventListener("click", _exportTheme);
