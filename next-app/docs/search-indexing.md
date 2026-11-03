# 搜索收录维护

核对日期：2026-11-03（多伦多时间）。正式域名：`https://www.oaktime.ca`。

## 哪些页面需要收录

只收录网站主要页面。按网站所有者确认，所有案例详情都是站内浏览页面，不应出现在搜索结果中；该政策适用于现有及以后新增案例的全部语言版本。

| 页面                           | 英文／简体／繁体合计 |
| ------------------------------ | -------------------: |
| 首页                           |                    3 |
| 案例列表 `/projects`           |                    3 |
| GTA 服务页 `/home-staging-gta` |                    3 |
| 关于 `/about`                  |                    3 |
| 联系 `/contact`                |                    3 |
| 隐私说明 `/privacy`            |                    3 |
| 家具租售 `/furniture`          |                    3 |
| 可收录合计                     |                   21 |

不同语言主要页面各自有规范网址，并以 hreflang 相互关联，不能把所有中文页面的 canonical 都改到英文首页。案例列表 `/projects` 仍是公开、可收录的作品入口；案例详情的收录政策单独处理。

## 所有案例详情禁止收录

当前 `data/projects.json` 有 67 个有效案例，共 201 个详情网址：`/houseN`、`/zh/houseN`、`/zh-hant/houseN`。这些网址：

- 返回 200，保留列表、地图、图片、普通链接及语言切换，方便网站访客浏览和分享。
- 在 HTML 的 `robots` 和 `googlebot` 元标签中输出 `noindex, follow`，覆盖根布局原本的 index 设置。
- 在 HTTP 响应头中输出 `X-Robots-Tag: noindex, follow`；`next.config.ts` 的规则覆盖三个语言路径，也覆盖以后新增的数字案例 ID。
- 不写入站点地图，也不向 Google 请求编入索引。

不要在 robots.txt 中 Disallow 案例路径。搜索引擎必须能抓取页面才能读取 noindex 并将已收录的页面移除。已有搜索结果需要等待重新抓取后消失，删除 sitemap 条目本身不是移除指令。

这里的“站内页面”是公开可访问但不参加搜索收录，不是登录保护。noindex 不会隐藏链接、原始图片或阻止别人分享网址。客户完整地址仍按既有方式保密。

## 哪些案例保持排除

旧站以下文件本来已经标记 `disabled: true`。它们没有迁入当前 67 个案例，详情继续返回 404，不应恢复为公开页面：

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

## 维护顺序

站点地图被成功读取，只说明 Google 已获得主要页面的网址列表，不等于全部抓取或收录。索引汇总报告有更新时间，单个页面的最新状态优先通过“网址检查”核对。案例详情显示“被 noindex 排除”是预期结果，不应当作待修复的 SEO 错误。

1. 对 21 个主要页面检查 200、index、canonical、hreflang 和站点地图覆盖；不要让案例的 noindex 响应头误伤首页、服务页或案例列表。
2. 对全部案例检查 200、HTML 与 HTTP 两处 noindex，以及 sitemap 中没有案例网址。确认 `/projects` 初始 HTML 仍有所有普通案例链接，地图和语言切换仍可浏览详情。
3. 发布后向 Search Console 重新提交 `/sitemap.xml`，确认读取成功且只发现 21 个主要网址。Google 的历史报告可能暂时仍列出旧案例网址。
4. 如需检查案例是否移除，使用网址检查查看抓取后是否识别 noindex；不要对案例点击“请求编入索引”。只有主要页面才需要提交收录请求。
5. 持续补充真实业务资料并复查主要页面的收录变化。不得编造房间数、成交数据、评价或客户完整地址来增加文字。

## 历史记录

2026-11-02 的旧配置曾将全部 219 页提交到站点地图，Google 显示成功读取。旧索引汇总当时更新至 2026-10-22，显示 4 页收录、215 页已发现但未收录；该数字不是实时值。随后单页检查确认简体 GTA 服务页已收录，繁体 GTA 服务页通过实际抓取但尚未收录。

2026-11-03 网站所有者明确要求所有案例详情不参加搜索收录，政策因此改为 18 个主要页面可收录、201 个案例语言页面 noindex。旧的“全部 219 页需要收录”不再适用。

随后新增家具租售宣传页 `/furniture` 的三个语言版本；当前站点地图共 21 个主要网址，所有案例详情继续 noindex。

## 代码与发布检查

案例来源是 `lib/projects.ts` 与 `data/projects.json`；`components/pages/ProjectPage.tsx` 为三个语言版本共用的详情页提供 noindex，`next.config.ts` 提供对应 HTTP 响应头。`app/sitemap.ts` 只生成七类主要页面的三个语言版本。不要直接编辑生产 sitemap.xml，也不要删除 Google 所有权验证文件。

```powershell
# 在 next-app 目录，完成正式模式构建后运行
$env:SITE_URL = 'https://www.oaktime.ca'
$env:VERCEL_ENV = 'production'
npm run build
node scripts/check-seo.mjs
```

`check-seo.mjs` 检查 21 个可收录主要页面，以及全部案例详情的 canonical、noindex、Googlebot 指令、HTTP 响应头规则、语言关联和页面结构；确认所有案例从站点地图排除，但在服务器渲染的案例列表中仍有链接，停用案例没有重新出现。检查通过表示网站提供了正确指令，不表示 Google 已经完成收录或移除。

官方参考：[noindex 阻止收录](https://developers.google.com/search/docs/crawling-indexing/block-indexing)、[robots.txt 的用途与限制](https://developers.google.com/search/docs/crawling-indexing/robots/intro)、[索引报告](https://support.google.com/webmasters/answer/7440203)、[本地化版本](https://developers.google.com/search/docs/specialty/international/localized-versions)。
