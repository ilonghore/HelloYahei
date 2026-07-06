(function () {
  const knownIconFonts = [
    "FontAwesome",
    "Material Icons",
    "Material Symbols",
    "Ionicons",
    "Feather Icons",
    "Bootstrap Icons",
    "Remix Icon",
    "Heroicons",
    "Lineicons",
    "Boxicons",
    "Tabler Icons",
    "css.gg",
    "Pictos",
    "Glyphish",
    "Symbolset",
    "IcoMoon",
    "Webdings",
    "Wingdings",
    "iconfont",
    "Glyphicons",
    "Elusive-Icons",
    "Octicons",
    "feather-icons",
    "themify",
    "simple-line-icons",
    "eva-icons",
    "remixicon",
    "line-awesome",
    "bootstrap-icons",
    "fontello",
    "Google Symbols",
    "SF Pro Icons",
    "SSSymbolicons",
    "wbicons",
    "wb-iconfont",
    "mui-iconfont",
    "uxiconfont",
    "tb-toolbar-iconfont",
    "fp-iconfont",
    "dashicons"
  ];

  function isIconFontFamily(fontFamily) {
    return knownIconFonts.some(font => fontFamily.toLowerCase().includes(font.toLowerCase()));
  }

  function containsPUA(text) {
    return /[\uE000-\uF8FF]/.test(text);
  }

  function isProbablyIcon(el) {
    const text = el.textContent.trim();
    if (!text) return true;

    const style = window.getComputedStyle(el);
    const fontFamily = style.fontFamily || '';
    return containsPUA(text) || isIconFontFamily(fontFamily);
  }

  function processFonts() {
    const all = document.querySelectorAll('body *');
    all.forEach(el => {
      if (!isProbablyIcon(el)) {
        el.classList.add('fontfix-apply');
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processFonts);
  } else {
    processFonts();
  }
})();
