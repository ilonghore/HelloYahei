HelloYahei
==========

这是一个 Chrome 浏览器插件，用于将页面中文字体替换为微软雅黑（英文使用 Segoe UI），
并且**不会破坏 IconFont 等图标字体**。

This is a Chrome extension that changes webpage Chinese fonts to Microsoft YaHei
(and Latin text to Segoe UI) without breaking icon fonts.

## 工作原理

架构不变式：**绝不覆盖页面显式声明的 `font-family`**。图标字体（FontAwesome、
iconfont.cn 等）都是页面自行加载的自定义 family 名，只要不去覆盖元素字体、
不去别名这些名字，图标就从机制上不可能损坏。分三层实现：

1. **`font.css` 别名区**：用 `@font-face { src: local(...) }` 把常见正文字体名
   （宋体、黑体、PingFang SC、Arial 等）在字体解析层映射到本机雅黑，
   `unicode-range` 限定中文区、排除图标所在的私有区（PUA）。
2. **`font.css` 兜底规则**：零优先级 `:where()`、无 `!important`，只接管没有任何
   显式字体声明的元素；图标元素的类规则优先级更高，必然获胜。
3. **`font-fix.js`**：处理页面通过 `url()` 加载的正文 webfont。只枚举
   `document.fonts`，经名字关键词 + Canvas 字形探测（私有区/常用文字）判定为
   "文字字体"后，才动态注入别名 `@font-face`。判定从严：宁可漏换，绝不错杀图标。

## 安装

1. 下载或 `git clone` 本仓库；
2. 打开 `chrome://extensions`，开启右上角"开发者模式"；
3. 点击"加载已解压的扩展程序"，选择本仓库目录。

## 已知限制

- 站点直接写 `font-family: sans-serif` 这类**泛型字体**无法被 CSS 别名拦截，
  它们由浏览器默认字体决定。建议在 `chrome://settings/fonts` 中把"简体中文"的
  标准字体/无衬线字体设置为"Microsoft YaHei"，即可覆盖这类页面。
- 本机需要安装微软雅黑（Windows 自带）；未安装时按 苹方 → 思源黑体 → 文泉驿微米黑
  顺序回退，全部缺失则保持页面原样（安全退化）。
