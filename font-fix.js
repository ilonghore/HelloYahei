/* Hello YaHei - font-fix.js
 *
 * 补充 font.css：font.css 的 @font-face 别名只覆盖"常见系统字体名"，
 * 管不到页面自己通过 url() 加载的正文 webfont（如思源黑体子集）。
 * 本脚本只在字体层面工作：枚举 document.fonts，把判定为"文字字体"的
 * webfont 动态别名到本机雅黑。不遍历 DOM、不修改任何元素或类名。
 *
 * 判定从严（宁可漏换，绝不错杀图标），命中任一条即跳过该字体：
 *   1. family 名含图标关键词（覆盖 FontAwesome/Material/iconfont.cn
 *      等主流命名，含连字型图标——它们用 ASCII 文本，探测不出来）；
 *   2. 字体自带私有区（PUA）字形——IconFont 图标码点所在区域；
 *   3. 字体对常用中英文字符全部没有字形（纯符号字体）。
 */
(function () {
  "use strict";

  if (!document.fonts || typeof document.fonts.forEach !== "function") {
    return;
  }

  // 关键词已涵盖旧版 V1.01 的整份已知图标字体名单（FontAwesome、
  // Material Icons/Symbols、Ionicons、Bootstrap/Remix/Tabler/Boxicons、
  // Glyphicons、IcoMoon、Octicons、Dashicons、iconfont 系等）。
  var ICON_NAME_RE = /icon|glyph|awesome|symbol|fontello|icomoon|entypo|pictos|glyphish|webdings|wingdings|themify|css\.gg/i;

  // 私有区代表码点（iconfont.cn 默认从 U+E600 起分配）。
  var PUA_PROBES = ["\uE000", "\uE001", "\uE600", "\uE601", "\uE900", "\uF101"];
  // 常用文字探针：全部缺字形则视为符号字体。
  var TEXT_PROBES = ["中", "文", "永", "a", "A", "0"];

  var SRC_REGULAR =
    'local("Microsoft YaHei"), local("MicrosoftYaHei"), local("微软雅黑"), ' +
    'local("PingFang SC"), local("Noto Sans CJK SC"), local("WenQuanYi Micro Hei")';
  var SRC_BOLD =
    'local("Microsoft YaHei Bold"), local("MicrosoftYaHei-Bold"), ' + SRC_REGULAR;
  // 全域减私有区（BMP PUA U+E000-F8FF 与 15/16 平面）：即使误判，
  // 图标码点也永远不会落到我们的别名上。
  var SAFE_RANGE = "U+0000-DFFF, U+F900-FFFD, U+10000-EFFFF";

  var SIZE = 40;
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  var ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return;
  }

  function draw(fontList, ch) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.font = "32px " + fontList;
    ctx.textBaseline = "middle";
    ctx.fillText(ch, 2, SIZE / 2);
    return ctx.getImageData(0, 0, SIZE, SIZE).data;
  }

  // 该 family 是否拥有字符 ch 的字形：与纯回退字体的渲染结果逐像素对比，
  // 不同则说明 ch 由该字体本身绘制。
  function hasGlyph(family, ch) {
    var quoted = '"' + family.replace(/"/g, "") + '"';
    var a = draw(quoted + ", serif", ch);
    var b = draw("serif", ch);
    for (var i = 3; i < a.length; i += 4) {
      if (a[i] !== b[i]) {
        return true;
      }
    }
    return false;
  }

  function isTextFont(family) {
    if (ICON_NAME_RE.test(family)) {
      return false;
    }
    try {
      var i;
      for (i = 0; i < PUA_PROBES.length; i++) {
        if (hasGlyph(family, PUA_PROBES[i])) {
          return false; // 自带私有区字形 => 图标字体
        }
      }
      for (i = 0; i < TEXT_PROBES.length; i++) {
        if (hasGlyph(family, TEXT_PROBES[i])) {
          return true; // 能画常用文字 => 文字字体
        }
      }
    } catch (e) {
      // 探测异常（如受限环境拿不到像素数据）：拿不准就不动。
    }
    return false;
  }

  var styleEl = null;
  var processed = Object.create(null);

  function aliasFamily(family) {
    var quoted = '"' + family.replace(/"/g, "") + '"';
    var css =
      "@font-face { font-family: " + quoted + "; src: " + SRC_REGULAR +
      "; unicode-range: " + SAFE_RANGE + "; }\n" +
      "@font-face { font-family: " + quoted + "; font-weight: bold; src: " +
      SRC_BOLD + "; unicode-range: " + SAFE_RANGE + "; }\n";
    if (!styleEl) {
      styleEl = document.createElement("style");
    }
    styleEl.textContent += css;
    // 追加到 documentElement 末尾，保证定义顺序晚于页面样式：
    // 同名 @font-face 逐字符按定义逆序匹配，后定义者优先被选中。
    document.documentElement.appendChild(styleEl);
  }

  function processLoadedFonts() {
    document.fonts.forEach(function (fontFace) {
      if (fontFace.status !== "loaded") {
        return;
      }
      var family = fontFace.family.replace(/^["']|["']$/g, "").trim();
      if (!family || processed[family.toLowerCase()]) {
        return;
      }
      processed[family.toLowerCase()] = true;
      if (isTextFont(family)) {
        aliasFamily(family);
      }
    });
  }

  processLoadedFonts();
  document.fonts.addEventListener("loadingdone", processLoadedFonts);
})();
