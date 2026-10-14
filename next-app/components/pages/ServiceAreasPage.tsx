import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectSummaries } from "@/lib/projects";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
import { pageMetadata, siteUrl } from "@/lib/site";
import { areaText, gtaPath, serviceAreas } from "@/lib/service-areas";

export function getMetadata(locale: Locale) {
  const t = translator(locale);
  return pageMetadata(
    t(
      "GTA Home Staging Services & Areas",
      "大多伦多 GTA 房屋布置服务与地区",
      "大多倫多 GTA 房屋佈置服務與地區",
    ),
    t(
      "Home staging across Toronto, Stouffville, Markham, Richmond Hill and the GTA. Explore local projects, service areas and answers before requesting a quote.",
      "Oaktime Staging 服务多伦多、史托维尔、万锦、列治文山及 GTA 周边城镇。浏览当地案例、服务区域和布置须知，联系设计师获取报价。",
      "Oaktime Staging 服務多倫多、史托維爾、萬錦、列治文山及 GTA 周邊城鎮。瀏覽當地案例、服務區域和佈置須知，聯繫設計師獲取報價。",
    ),
    localizedPath(gtaPath, locale),
    "/images/house62/img1.jpg",
    locale,
  );
}

export default function ServiceAreasPage({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = translator(locale);
  const href = (path: string) => localizedPath(path, locale);
  const pageTitle = t(
    "Home staging across",
    "售前房屋布置，覆盖",
    "售前房屋佈置，覆蓋",
  );
  const schema = siteUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${siteUrl}${href(gtaPath)}#service`,
            name: t(
              "Home staging in Toronto and the Greater Toronto Area",
              "多伦多及大多地区房屋布置",
              "多倫多及大多地區房屋佈置",
            ),
            serviceType: "Home staging",
            url: `${siteUrl}${href(gtaPath)}`,
            provider: { "@id": `${siteUrl}/#business` },
            areaServed: serviceAreas.map((area) => ({
              "@type": "AdministrativeArea",
              name: area.name[0],
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("Home", "首页", "首頁"),
                item: `${siteUrl}${href("/")}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t("GTA service areas", "GTA 服务区域", "GTA 服務區域"),
                item: `${siteUrl}${href(gtaPath)}`,
              },
            ],
          },
        ],
      }
    : null;
  return (
    <main id="main" className="wrap section area-page">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <nav
        className="breadcrumbs"
        aria-label={t("Breadcrumb", "页面位置", "頁面位置")}
      >
        <Link href={href("/")}>{t("Home", "首页", "首頁")}</Link>
        <span>/</span>
        <span>{t("GTA service areas", "GTA 服务区域", "GTA 服務區域")}</span>
      </nav>
      <div className="page-heading">
        <p className="eyebrow">
          {t(
            "BASED IN STOUFFVILLE · SERVING THE GTA",
            "位于史托维尔 · 服务大多地区",
            "位於史托維爾 · 服務大多地區",
          )}
        </p>
        <h1>
          {pageTitle}
          <br />
          <em>
            {t(
              "Toronto & the GTA.",
              "多伦多及周边城镇。",
              "多倫多及周邊城鎮。",
            )}
          </em>
        </h1>
        <p>
          {t(
            "Oaktime Staging helps homeowners and real estate agents prepare homes for listing photos and viewings. From our Stouffville base, we plan furniture, layout and finishing details for properties across the Greater Toronto Area, with support in English and Mandarin.",
            "Oaktime Staging 为屋主及地产经纪布置即将拍摄和展示的房屋。团队位于史托维尔，为大多伦多地区规划家具、布局与软装细节，提供英语及普通话服务。",
            "Oaktime Staging 為屋主及地產經紀佈置即將拍攝和展示的房屋。團隊位於史托維爾，為大多倫多地區規劃傢俱、布局與軟裝細節，提供英語及普通話服務。",
          )}
        </p>
        <Link href={href("/contact")} className="button button-dark">
          {t("Request a staging quote", "获取布置报价", "獲取佈置報價")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <nav
        className="area-navigation"
        aria-label={t("Browse GTA regions", "浏览 GTA 区域", "瀏覽 GTA 區域")}
      >
        {serviceAreas.map((area) => (
          <a key={area.id} href={`#${area.id}`}>
            {areaText(locale, area.name)}
            <ArrowUpRight size={15} />
          </a>
        ))}
      </nav>
      <p className="area-note">
        {t(
          "The GTA includes Toronto and the regions of York, Peel, Durham and Halton. Availability and travel are confirmed for your property address and intended staging date.",
          "GTA 包括多伦多及约克、皮尔、杜兰和荷顿四个区域。具体服务及交通安排会根据房屋地址与预期布置日期确认。",
          "GTA 包括多倫多及約克、皮爾、杜蘭和荷頓四個區域。具體服務及交通安排會根據房屋地址與預期佈置日期確認。",
        )}
      </p>
      {serviceAreas.map((area) => (
        <section
          id={area.id}
          key={area.id}
          className="area-region"
          aria-labelledby={`${area.id}-heading`}
        >
          <div className="section-top">
            <div>
              <p className="eyebrow">
                {t("HOME STAGING", "售前房屋布置", "售前房屋佈置")}
              </p>
              <h2 id={`${area.id}-heading`}>{areaText(locale, area.name)}</h2>
            </div>
            <p className="section-description">
              {areaText(locale, area.description)}
            </p>
          </div>
          <p className="area-cities">{area.cities.join(" · ")}</p>
          {area.projects.length > 0 ? (
            <div className="projects-grid">
              {area.projects.map((id) => {
                const project = projectSummaries.find((item) => item.id === id);
                return project ? (
                  <ProjectCard key={id} project={project} locale={locale} />
                ) : null;
              })}
            </div>
          ) : (
            <Link href={href("/contact")} className="text-link">
              {t(
                "Ask about your location",
                "咨询您的房屋位置",
                "諮詢您的房屋位置",
              )}
              <ArrowUpRight size={17} />
            </Link>
          )}
        </section>
      ))}
      <section className="area-region">
        <p className="eyebrow">
          {t("BEYOND THE GTA", "GTA 以外地区", "GTA 以外地區")}
        </p>
        <h2>
          {t(
            "A little further afield.",
            "更远一些，也可以聊聊。",
            "更遠一些，也可以聊聊。",
          )}
        </h2>
        <p className="area-note">
          {t(
            "Our portfolio also includes projects in Barrie, outside the GTA. For locations beyond our main service area, contact us to discuss availability.",
            "我们的案例也包括 GTA 以外的巴里。其他服务区域以外的房屋，请联系我们确认是否可以安排。",
            "我們的案例也包括 GTA 以外的巴里。其他服務區域以外的房屋，請聯繫我們確認是否可以安排。",
          )}
        </p>
        <Link href={href("/house59")} className="text-link">
          {t(
            "View a Barrie staging project",
            "查看巴里布置案例",
            "查看巴里佈置案例",
          )}
          <ArrowUpRight size={17} />
        </Link>
      </section>
      <section className="area-region faq-section">
        <div>
          <p className="eyebrow">
            {t("PLANNING YOUR STAGING", "布置前的准备", "佈置前的準備")}
          </p>
          <h2>{t("What to expect.", "您可能想了解。", "您可能想瞭解。")}</h2>
        </div>
        <div>
          {[
            [
              t(
                "How much does home staging in the GTA cost?",
                "GTA 房屋布置如何收费？",
                "GTA 房屋佈置如何收費？",
              ),
              t(
                "Your quote depends on the property size, rooms to be staged, existing furnishings, access and staging scope. Share your address first; an approximate size and budget are helpful if you know them. A designer will review the details and prepare a quote for your property.",
                "报价取决于面积、需要布置的房间、现有家具、搬运条件及布置范围。先提供地址即可；如果知道大致面积及预算，也可以一并告知。设计师会查看资料，为您的房屋准备报价。",
                "報價取決於面積、需要佈置的房間、現有傢俱、搬運條件及佈置範圍。先提供地址即可；如果知道大致面積及預算，也可以一併告知。設計師會查看資料，為您的房屋準備報價。",
              ),
            ],
            [
              t(
                "Can I inquire about a condo, townhouse or detached home?",
                "公寓、镇屋和独立屋都可以询价吗？",
                "公寓、鎮屋和獨立屋都可以詢價嗎？",
              ),
              t(
                "Yes. Tell us the property type if you know it. We discuss the rooms, furniture scale and layout for your space. For condos, building rules, loading access and elevator bookings may affect the plan.",
                "可以。您可以选择房屋类型，我们会根据空间讨论房间、家具尺寸及布局。公寓的大楼规定、装卸通道及电梯预约也可能影响安排。",
                "可以。您可以選擇房屋類型，我們會根據空間討論房間、傢俱尺寸及布局。公寓的大樓規定、裝卸通道及電梯預約也可能影響安排。",
              ),
            ],
            [
              t(
                "What if I still live in the property?",
                "房屋仍有人居住怎么办？",
                "房屋仍有人居住怎麼辦？",
              ),
              t(
                "Let us know whether the home is vacant, partly furnished or occupied. Empty rooms and rooms with existing furniture need different plans. We can discuss what stays, what may need to move and which spaces to focus on before agreeing the scope.",
                "请告诉我们是空房、部分家具还是有人居住。空房与有家具的空间需要不同方案；确认范围前，我们会讨论保留哪些家具、哪些可能需要移动，以及优先布置哪些空间。",
                "請告訴我們是空房、部分傢俱還是有人居住。空房與有傢俱的空間需要不同方案；確認範圍前，我們會討論保留哪些傢俱、哪些可能需要移動，以及優先佈置哪些空間。",
              ),
            ],
            [
              t(
                "When should I contact you before listing?",
                "挂牌前什么时候联系？",
                "掛牌前甚麼時候聯繫？",
              ),
              t(
                "Contact us once you have an intended photography or listing date. Include it in the optional notes, or discuss it with the designer afterwards. We confirm scheduling and the agreed staging plan before work begins.",
                "确定大致拍摄或挂牌日期后就可以联系。您可以填写在选填备注里，或之后与设计师沟通。开始前会共同确认档期及布置方案。",
                "確定大致拍攝或掛牌日期後就可以聯繫。您可以填寫在選填備註裡，或之後與設計師溝通。開始前會共同確認檔期及佈置方案。",
              ),
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="project-cta">
        <div>
          <h2>
            {t("Let’s talk about", "聊聊您的", "聊聊您的")}{" "}
            <em>{t("your home.", "房屋。", "房屋。")}</em>
          </h2>
          <p>
            {t(
              "Start with your address, email and phone. We’ll discuss the details with you.",
              "先提供地址、邮箱和电话，细节之后一起讨论。",
              "先提供地址、電郵和電話，細節之後一起討論。",
            )}
          </p>
        </div>
        <Link href={href("/contact")} className="button button-dark">
          {t("Request a quote", "获取报价", "獲取報價")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
