// Theme Preview

function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}
  return false;
}

function checkThemeForum(theme) {
  if (
    typeof theme.themeName !== "string" ||
    typeof theme.colorBg !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorBg) ||
    typeof theme.colorFg !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorFg) ||
    typeof theme.colorHi !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorHi) ||
    typeof theme.colorAc !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorAc) ||
    typeof theme.colorLi !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorLi) ||
    typeof theme.colorCo !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorCo) ||
    typeof theme.colorDd !== "string" ||
    !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorDd)
  ) {
    return false;
  } else {
    return true;
  }
}

function shadeHexColor(color, percent) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

function htmlToElement(html) {
  var template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

function createThemeForumImage(theme) {
  var themeForumImage = htmlToElement(
    '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="var(--colorAc)" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDd)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorCo)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="47.5" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="62.5" cy="60" r="5"></circle></svg>'
  );
  themeForumImage.style.setProperty("--colorBg", theme.colorBg);
  themeForumImage.style.setProperty("--colorFg", theme.colorFg);
  themeForumImage.style.setProperty("--colorHi", theme.colorHi);
  themeForumImage.style.setProperty("--colorAc", theme.colorAc);
  themeForumImage.style.setProperty("--colorLi", theme.colorLi);
  themeForumImage.style.setProperty("--colorCo", theme.colorCo);
  themeForumImage.style.setProperty("--colorDd", theme.colorDd);
  return themeForumImage;
}

function createThemeBox(theme) {
  var themeboxImage = document.createElement("div");
  themeboxImage.className = "themebox-image";
  themeboxImage.appendChild(createThemeForumImage(theme));
  var themeboxTitle = document.createElement("div");
  themeboxTitle.className = "themebox-title";
  themeboxTitle.innerHTML = theme.themeName;
  var themebox = document.createElement("div");
  themebox.className = "themebox";
  themebox.appendChild(themeboxImage);
  themebox.appendChild(themeboxTitle);
  return themebox;
}

function importForumTheme(e) {
  var target = e.target;
  while (!target.classList.contains("theme-preview")) {
    target = target.parentNode;
  }
  console.log(target.parentNode.firstChild.innerText);
  var code = JSON.parse(target.parentNode.firstChild.innerText.trim());
  chrome.runtime.sendMessage({ theme: code });
}

function createThemeForumPreview(theme, code) {
  var themePreview = document.createElement("div");
  themePreview.className = "theme-preview";
  themePreview.appendChild(createThemeBox(theme));
  code.parentNode.insertBefore(themePreview, code.nextSibling);
  themePreview.previousSibling.style.display = "none";
  var themebox = themePreview.firstChild;
  themebox.style.cursor = "pointer";
  themebox.addEventListener("click", importForumTheme);
}

function themePreview(content) {
  var codes = content.querySelectorAll(
    'p:not([data-theme-preview-checked="true"]), code:not([data-theme-preview-checked="true"])'
  );
  var theme;
  codes.forEach(function (code) {
    code.dataset.themePreviewChecked = true;
    if (!code.querySelector("code")) {
      if ((theme = tryParseJSON(code.innerText.trim()))) {
        if (checkThemeForum(theme)) {
          createThemeForumPreview(theme, code);
        }
      }
    }
  });
}
