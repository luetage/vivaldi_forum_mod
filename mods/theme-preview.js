function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
}

function compMode(theme) {
    if (theme.themePage == 0) {
        theme.themePage = false;
    } else {
        theme.themePage = true;
    }
    if (theme.themeWin == 0) {
        theme.themeWin = false;
    } else {
        theme.themeWin = true;
    }
    if (theme.themeTabs == 0) {
        theme.themeTabs = false;
    } else {
        theme.themeTabs = true;
    }
    return {
        colors: {
            accentBg: '#' + theme.themeAc,
            baseBg: '#' + theme.themeBg,
            baseFg: '#' + theme.themeFg,
            highlightBg: '#' + theme.themeHi
        },
        name: theme.themeName,
        settings: {
            accentFromPage: theme.themePage,
            accentOnWindow: theme.themeWin,
            borderRadius: theme.themeRound,
            tabsTransparent: theme.themeTabs
        },
        version: 0.1
    };
}

function checkTheme(theme) {
    if (
        typeof theme.colors !== 'object' ||
        typeof theme.colors.accentBg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colors.accentBg) ||
        typeof theme.colors.baseBg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colors.baseBg) ||
        typeof theme.colors.baseFg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colors.baseFg) ||
        typeof theme.colors.highlightBg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colors.highlightBg) ||
        typeof theme.name !== 'string' ||
        typeof theme.settings !== 'object' ||
        typeof theme.settings.accentFromPage !== 'boolean' ||
        typeof theme.settings.accentOnWindow !== 'boolean' ||
        (typeof theme.settings.borderRadius !== 'number' && typeof theme.settings.borderRadius !== 'string') ||
        typeof theme.settings.tabsTransparent !== 'boolean' ||
        typeof theme.version !== 'number'
    ) {
        return false;
    } else {
        return true;
    }
}

function checkThemeForum(theme) {
    if (
        typeof theme.themeName !== 'string' ||
        typeof theme.colorBg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorBg) ||
        typeof theme.colorFg !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorFg) ||
        typeof theme.colorHi !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorHi) ||
        typeof theme.colorAc !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorAc) ||
        typeof theme.colorLi !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorLi) ||
        typeof theme.colorCo !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorCo) ||
        typeof theme.colorDd !== 'string' ||
        !/^#(?:[0-9a-f]{3}){1,2}$/i.test(theme.colorDd)
    ) {
        return false;
    } else {
        return true;
    }
}

function shadeHexColor(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

function createThemeImage(theme) {
    var colorBgDarker = shadeHexColor(theme.colors.baseBg, -0.2);
    var colorBgDark = shadeHexColor(theme.colors.baseBg, -0.1);
    var colorBgLightIntense = shadeHexColor(theme.colors.baseBg, 0.1);
    var colorBgLight = theme.settings.accentOnWindow ? shadeHexColor(theme.colors.accentBg, 0.08) : shadeHexColor(theme.colors.baseBg, 0.08);

    var themeImage = htmlToElement('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="76" viewBox="0 0 96 76"><rect fill="var(--colorBgDarker)" x="0" y="16" width="96" height="57"></rect><rect fill="var(--colorBg)" width="96" height="10"></rect><path fill="var(--colorAccentBg)" d="M0 10h96v6H0v-6zm0-6h30v6H0V4z"></path><rect fill="var(--colorBgDark)" y="16" width="6" height="57"></rect><rect fill="var(--colorBgLightIntense)" x="6" y="16" width="18" height="57"></rect><rect fill="var(--colorBgLight)" x="31" y="4" width="30" height="6"></rect><rect fill="var(--colorBg)" y="73" width="96" height="3"></rect><rect fill="var(--colorFg)" x="8" y="69" width="6" height="2"></rect><rect fill="var(--colorHighlightBg)" x="16" y="69" width="6" height="2"></rect></svg>');
    themeImage.style.setProperty('--colorBgDarker', colorBgDarker);
    themeImage.style.setProperty('--colorBg', theme.settings.accentOnWindow ? theme.colors.accentBg : theme.colors.baseBg);
    themeImage.style.setProperty('--colorAccentBg', theme.settings.accentOnWindow ? theme.colors.baseBg : theme.colors.accentBg);
    themeImage.style.setProperty('--colorBgDark', colorBgDark);
    themeImage.style.setProperty('--colorBgLightIntense', colorBgLightIntense);
    themeImage.style.setProperty('--colorBgLight', colorBgLight);
    themeImage.style.setProperty('--colorFg', theme.colors.baseFg);
    themeImage.style.setProperty('--colorHighlightBg', theme.colors.highlightBg);
    return themeImage;
}

function createThemeForumImage(theme) {
    var themeForumImage = htmlToElement('<svg xmlns="http://www.w3.org/2000/svg" width="110" height="76" viewBox="0 0 110 76"><rect fill="var(--colorBg)" x="0" y="0" width="110" height="76"></rect><rect fill="var(--colorAc)" x="0" y="14" width="110" height="12"></rect><rect fill="var(--colorDd)" x="85" y="26" width="25" height="50"></rect><rect fill="var(--colorCo)" x="6" y="32" width="15" height="5"></rect><rect fill="var(--colorHi)" x="23" y="32" width="15" height="5"></rect><circle fill="var(--colorFg)" cx="47.5" cy="60" r="5"></circle><circle fill="var(--colorLi)" cx="62.5" cy="60" r="5"></circle></svg>');
    themeForumImage.style.setProperty('--colorBg', theme.colorBg);
    themeForumImage.style.setProperty('--colorFg', theme.colorFg);
    themeForumImage.style.setProperty('--colorHi', theme.colorHi);
    themeForumImage.style.setProperty('--colorAc', theme.colorAc);
    themeForumImage.style.setProperty('--colorLi', theme.colorLi);
    themeForumImage.style.setProperty('--colorCo', theme.colorCo);
    themeForumImage.style.setProperty('--colorDd', theme.colorDd);
    return themeForumImage;
}

function createThemeBox(theme, isForum) {
    var themeboxImage = document.createElement('div');
    themeboxImage.className = 'themebox-image';
    if (isForum) {
        themeboxImage.appendChild(createThemeForumImage(theme));
    } else {
        themeboxImage.appendChild(createThemeImage(theme));
    }
    var themeboxTitle = document.createElement('div');
    themeboxTitle.className = 'themebox-title';
    themeboxTitle.innerHTML = theme.name || theme.themeName;
    var themebox = document.createElement('div');
    themebox.className = 'themebox';
    themebox.appendChild(themeboxImage);
    themebox.appendChild(themeboxTitle);
    return themebox;
}

function createThemePreview(theme, code) {
    if (theme.themeName) {
        theme = compMode(theme);
    }
    if (checkTheme(theme)) {
        var themePreview = document.createElement('div');
        themePreview.className = 'theme-preview';
        themePreview.appendChild(createThemeBox(theme));
        code.parentNode.insertBefore(themePreview, code.nextSibling);
    }
}

function createThemeCollectionPreview(themes, code) {
    var themePreview = document.createElement('div');
    themePreview.className = 'theme-preview';
    themes.forEach(function (theme) {
        if (theme.themeName) {
            theme = compMode(theme);
        }
        if (checkTheme(theme)) {
            themePreview.appendChild(createThemeBox(theme));
        }
    });
    if (themePreview.childElementCount > 0) {
        code.parentNode.insertBefore(themePreview, code.nextSibling);
    }
}

function importForumTheme(e) {
    var target = e.target;
    while (!target.classList.contains('theme-preview')) {
        target = target.parentNode;
    }
    console.log(target.parentNode.firstChild.innerText);
    var code = JSON.parse(target.parentNode.firstChild.innerText.trim());
    chrome.runtime.sendMessage({theme: code});
};

function createThemeForumPreview(theme, code) {
    var themePreview = document.createElement('div');
    themePreview.className = 'theme-preview';
    themePreview.appendChild(createThemeBox(theme, true));
    code.parentNode.insertBefore(themePreview, code.nextSibling);
    themePreview.previousSibling.style.display = 'none';
    var themebox = themePreview.firstChild;
    themebox.style.cursor = 'pointer';
    themebox.addEventListener('click', importForumTheme);
}

function themePreview(content) {
    var codes = content.querySelectorAll('p:not([data-theme-preview-checked="true"]), code:not([data-theme-preview-checked="true"])');
    var theme;
    codes.forEach(function (code) {
        code.dataset.themePreviewChecked = true;
        if (!code.querySelector('code')) {
            if ((theme = tryParseJSON(code.innerText.trim()))) {
                if (checkThemeForum(theme)) {
                    createThemeForumPreview(theme, code);
                } else if (Array.isArray(theme)) {
                    createThemeCollectionPreview(theme, code);
                } else {
                    createThemePreview(theme, code);
                }
            }
        }
    });
}

