import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
import { pageMetadata, siteUrl } from "@/lib/site";
import { areaText, gtaPath, serviceAreas } from "@/lib/service-areas";

export function getMetadata(locale: Locale) {
  const t = translator(locale);
  return pageMetadata(
    t(
      "GTA Home Staging Services & Areas",
      "GTA 华人 Home Staging 服务区域 · 中文咨询",
      "GTA 華人 Home Staging 服務區域 · 中文諮詢",
    ),
    t(
      "Home staging across Toronto, Stouffville, Markham, Richmond Hill and the GTA. Explore local projects, service areas and answers before requesting a quote.",
      "寻找多伦多、万锦、列治文山、史托维尔及 GTA 周边的华人 Home Staging 服务？Oaktime Staging 提供中文服务（普通话／国语），浏览当地案例、确认服务区域并咨询报价。",
      "尋找多倫多、萬錦、列治文山、史托維爾及 GTA 周邊的華人 Home Staging 服務？Oaktime Staging 提供中文服務（普通話／國語），瀏覽當地案例、確認服務區域並諮詢報價。",
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
            "寻找多伦多及 GTA 的华人 Home Staging 服务？Oaktime Staging 位于史托维尔，为屋主及地产经纪规划家具、布局与软装细节，为房屋拍摄和看房做好准备。我们提供中文服务（普通话／国语）及英文服务，方便您沟通布置需求与报价。",
            "尋找多倫多及 GTA 的華人 Home Staging 服務？Oaktime Staging 位於史托維爾，為屋主及地產經紀規劃傢俱、布局與軟裝細節，為房屋拍攝和看房做好準備。我們提供中文服務（普通話／國語）及英文服務，方便您溝通佈置需求與報價。",
          )}
        </p>
        <Link href={href("/contact")} className="button button-dark">
          {t("Request a staging quote", "获取布置报价", "獲取佈置報價")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <section
        id="service-coverage"
        className="area-region service-coverage"
        aria-labelledby="coverage-heading"
      >
        <p className="eyebrow">
          {t("OUR SERVICE AREA", "服务区域", "服務區域")}
        </p>
        <h2 id="coverage-heading">
          {t(
            "Across the GTA & nearby.",
            "覆盖 GTA 及周边地区。",
            "覆蓋 GTA 及周邊地區。",
          )}
        </h2>
        <p className="area-note">
          {t(
            "We serve Toronto and communities across the GTA and surrounding areas, including:",
            "我们为多伦多及大多地区、周边城镇提供服务，包括：",
            "我們為多倫多及大多地區、周邊城鎮提供服務，包括：",
          )}
        </p>
        <ul className="coverage-list">
          {serviceAreas.map((area) => (
            <li id={area.id} key={area.id}>
              <h3>{areaText(locale, area.name)}</h3>
              <p>{area.cities.join(" · ")}</p>
            </li>
          ))}
          <li>
            <h3>{t("Nearby communities", "周边地区", "周邊地區")}</h3>
            <p>Barrie · Innisfil · Bradford</p>
          </li>
        </ul>
        <p className="coverage-further">
          {t(
            "Further away? We can help there too. Send an inquiry with your property address and we’ll work with you on travel, scheduling and the right staging plan.",
            "更远的地区也可以安排服务。欢迎发 inquiry 告诉我们您的房屋地址，我们会与您沟通交通、档期及合适的布置方案。",
            "更遠的地區也可以安排服務。歡迎發 inquiry 告訴我們您的房屋地址，我們會與您溝通交通、檔期及合適的佈置方案。",
          )}
        </p>
        <Link href={href("/contact")} className="text-link">
          {t(
            "Inquire about your location",
            "联系我们咨询服务",
            "聯繫我們諮詢服務",
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
