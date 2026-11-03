# 搜索收录维护

核对日期：2026-11-02（多伦多时间）。正式域名：`https://www.oaktime.ca`。

## 哪些页面需要收录

所有已发布的有效案例都保留索引资格，不因流量少、项目较旧或 Google 尚未抓取而隐藏。当前 `data/projects.json` 有 67 个公开案例，图片引用有效，没有重复 ID、空图库或完全相同的图库（按图片文件内容比对）。

| 页面                           | 英文／简体／繁体合计 |
| ------------------------------ | -------------------: |
| 67 个案例详情                  |                  201 |
| 首页                           |                    3 |
| 案例列表 `/projects`           |                    3 |
| GTA 服务页 `/home-staging-gta` |                    3 |
| 关于 `/about`                  |                    3 |
| 联系 `/contact`                |                    3 |
| 隐私说明 `/privacy`            |                    3 |
| 合计                           |                  219 |

不同语言页面各自有规范网址，并以 hreflang 相互关联，不能把所有中文页面的 canonical 都改到英文首页。虽然隐私页不是获客重点，仍保持公开且可索引，不为凑数字增删页面。

## 哪些案例保持排除

旧站以下文件本来已经标记 `disabled: true`。它们没有迁入公开案例数据，详情返回 404，不在上述 219 个网址中：

| ID        | 旧文件中的城市   |
| --------- | ---------------- |
| `house6`  | Whitby           |
| `house8`  | Georgina         |
| `house10` | East Gwillimbury |
| `house33` | North York       |
| `house34` | Scarborough      |
| `house37` | Toronto          |

旧文件没有完整记录停用原因，不能自行解释为客户撤回或图片不合格，也不应为增加收录量而直接恢复。`house37` 的旧内容还引用了 `house36` 的图片，恢复前需要人工核实。旧版 `_posts` 保留作备份，不是目前公开页面的数据源。

API、错误页和 Vercel Preview 不作为搜索页面；不要向 Google 提交这些网址。Preview 的 noindex 应继续保留。

## 为什么发现了网址仍未收录

站点地图被成功读取，只说明 Google 已获得网址列表，不等于全部抓取或收录。索引汇总报告也有更新时间，单个页面的最新状态优先通过“网址检查”核对。

维护顺序：

1. 确认正式网址返回 200，页面 HTML 有内容、普通链接和正确的 canonical，且没有 noindex 或 robots 阻挡。
2. 确认站点地图仍包含所有有效页面；确认 `/projects` 的初始 HTML 已有全部 67 个案例链接，而非只把链接放在地图交互或按钮后面。
3. 对少量重要的新页面使用网址检查和“请求编入索引”，记录 Google 接受请求的结果；不要把“可编入索引”当作“已收录”。
4. 其余有效页面由站点地图和内部链接发现。Google 没有为普通案例网页提供可强制批量收录的提交方式，不使用只适用于特定内容的 Indexing API 来提交案例，也不反复提交同一网址。
5. 持续补充真实案例信息和有来源的业务资料，复查收录变化。不得编造房间数、成交数据、评价或客户完整地址来增加文字。

2026-11-02 的站点地图核对：Google 后台显示 `/sitemap.xml` 成功读取了 219 个网址，上次读取为 2026-10-26。索引汇总当时更新至 2026-10-22，显示 4 页收录、215 页已发现但未收录；该数字不是实时值。随后逐页检查中，简体 GTA 服务页已经显示“网址已收录到 Google”，因此不能继续用旧汇总认定它未收录。

同日重新提交站点地图后，Google 显示“已成功提交站点地图”，提交和读取日期均更新为 2026-11-02，状态成功，发现 219 页。繁体 GTA 服务页当时仍未收录，单页手动请求因 Google 无法连接 reCAPTCHA 服务而失败，不能记为已接受请求；该页已包含在成功读取的站点地图中。没有发现网站禁止该页抓取或收录，最终抓取与收录仍由 Google 决定。

## 代码与发布检查

来源是 `lib/projects.ts` 与 `data/projects.json`；`app/sitemap.ts` 为每个公开页面生成三个语言版本。不要直接编辑生产 sitemap.xml，也不要删除 Google 所有权验证文件。

```powershell
# 在 next-app 目录，完成正式模式构建后运行
$env:SITE_URL = 'https://www.oaktime.ca'
$env:VERCEL_ENV = 'production'
npm run build
node scripts/check-seo.mjs
```

`check-seo.mjs` 检查所有公开页面的 canonical、index、语言关联和页面结构，并确认所有案例在站点地图及服务器渲染的案例列表中都有链接，停用案例没有重新出现。检查通过表示网站提供了正确的索引条件，不是 Google 的收录保证。

官方参考：[索引报告](https://support.google.com/webmasters/answer/7440203)、[请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)、[本地化版本](https://developers.google.com/search/docs/specialty/international/localized-versions)。
