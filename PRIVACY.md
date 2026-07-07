# Hello YaHei 隐私政策 / Privacy Policy

**生效日期 / Effective date: 2026-07-07**

本隐私政策适用于 Chrome 浏览器扩展 "Hello YaHei"（以下简称"本扩展"）。
This privacy policy applies to the Chrome extension "Hello YaHei" (the "Extension").

## 中文版

### 1. 我们收集哪些数据

**本扩展不收集、不存储、不传输任何用户数据。** 包括但不限于：

- 不收集任何个人身份信息（姓名、邮箱、账号等）；
- 不收集浏览历史、访问的网址或网页内容；
- 不使用 Cookie、不使用任何分析或统计服务（如 Google Analytics）；
- 不向任何服务器发送任何网络请求。

### 2. 本扩展如何工作

本扩展的唯一功能是把网页上的中文字体替换为本机安装的"微软雅黑"字体
（英文替换为 Segoe UI），且不影响网页中的图标字体。全部处理均在你的
浏览器本地完成：

- 扩展向页面注入一段 CSS，将常见正文字体名映射到本机雅黑字体；
- 扩展的脚本仅读取页面已加载的字体列表（`document.fonts`）以区分
  "文字字体"与"图标字体"，判定结果只在当前页面内使用，随页面关闭而消失；
- 任何数据都不会离开你的设备，也不会被写入本地存储。

### 3. 为什么需要"访问所有网站"权限

字体替换需要在每个网页上注入样式才能生效，因此扩展声明了对
`http://*/*` 与 `https://*/*` 页面注入内容脚本的权限。该权限仅用于
上述字体替换功能，不用于读取或收集页面数据。

### 4. 数据共享与第三方

由于本扩展不收集任何数据，因此不存在向第三方出售、共享或披露数据的情形。

### 5. 隐私政策的变更

如本政策发生变更，我们会更新本页面并修改顶部的生效日期。

### 6. 联系我们

如对本隐私政策有任何疑问，请通过 GitHub Issues 联系我们：
<https://github.com/ilonghore/HelloYahei/issues>

## English Version

### 1. Data We Collect

**The Extension does not collect, store, or transmit any user data.**
Specifically, it does not collect personally identifiable information,
browsing history, visited URLs, or page content; it does not use cookies
or any analytics services; and it makes no network requests to any server.

### 2. How the Extension Works

The Extension's sole purpose is to replace Chinese text fonts on web pages
with the locally installed "Microsoft YaHei" font (and Latin text with
Segoe UI) without breaking icon fonts. All processing happens locally in
your browser: it injects CSS that maps common body-text font names to the
local YaHei font, and its script only reads the list of fonts already
loaded by the page (`document.fonts`) to tell text fonts apart from icon
fonts. The result is used only within the current page and is discarded
when the page closes. No data ever leaves your device.

### 3. Why the "Access to All Websites" Permission Is Needed

Font replacement only works if styles are injected into each page, so the
Extension declares content-script access to `http://*/*` and
`https://*/*`. This permission is used exclusively for the font
replacement described above, never to read or collect page data.

### 4. Data Sharing and Third Parties

Since no data is collected, no data is ever sold, shared, or disclosed to
third parties.

### 5. Changes to This Policy

If this policy changes, we will update this page and revise the effective
date at the top.

### 6. Contact

For any questions about this privacy policy, please contact us via GitHub
Issues: <https://github.com/ilonghore/HelloYahei/issues>
