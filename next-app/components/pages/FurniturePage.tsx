import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import FirstCollaborationOffer from "@/components/FirstCollaborationOffer";
import SocialContacts from "@/components/SocialContacts";
import PhoneContacts from "@/components/PhoneContacts";
import { contactInfo } from "@/lib/contact";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
import { pageMetadata, siteUrl } from "@/lib/site";

export function getMetadata(locale: Locale) {
  const t = translator(locale);
  return pageMetadata(
    t(
      "Furniture Sales & Rentals in Toronto & GTA",
      "多伦多 GTA 高端家具出售与租赁",
      "多倫多 GTA 高端傢俱出售與租賃",
    ),
    t(
      "Explore Oaktime’s high-end furniture and accessories for sale or rent across Toronto and the GTA. New arrivals every month, with complete collections and individual pieces. English and Mandarin service.",
      "Oaktime 提供多伦多及 GTA 高端家具与软装租售，每月持续上新，支持整套搭配与单品选择。中文服务（普通话／国语）及英语咨询，联系团队了解现货与报价。",
      "Oaktime 提供多倫多及 GTA 高端傢俱與軟裝租售，每月持續上新，支援整套搭配與單品選擇。中文服務（普通話／國語）及英語諮詢，聯繫團隊瞭解現貨與報價。",
    ),
    localizedPath("/furniture", locale),
    "/images/house36/img1.jpg",
    locale,
  );
}

export default function FurniturePage({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const href = (path: string) => localizedPath(path, locale);
  const schema = siteUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${siteUrl}${href("/furniture")}#service`,
            name: t(
              "Furniture sales, rentals and styling",
              "家具出售、租赁与软装搭配",
              "傢俱出售、租賃與軟裝搭配",
            ),
            serviceType: [
              "Furniture sales",
              "Furniture rental",
              "Furniture styling",
            ],
            url: `${siteUrl}${href("/furniture")}`,
            provider: { "@id": `${siteUrl}/#business` },
            areaServed: {
              "@type": "Place",
              name: "Toronto and the Greater Toronto Area",
            },
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
                name: t("Furniture", "家具租售", "傢俱租售"),
                item: `${siteUrl}${href("/furniture")}`,
              },
            ],
          },
        ],
      }
    : null;
  const collections = [
    {
      src: "/images/house36/img1.jpg",
      title: t("A complete look.", "整套搭配", "整套搭配"),
      text: t(
        "Furniture and accessories selected together for a cohesive space.",
        "根据户型结构、色彩搭配与整体风格，提供定制化设计与搭配。",
        "根據戶型結構、色彩搭配與整體風格，提供客製化設計與搭配。",
      ),
    },
    {
      src: "/images/house68/img1.jpg",
      title: t("A piece you love.", "单品选择", "單品選擇"),
      text: t(
        "Choose individual pieces to suit your room and the way you live.",
        "支持整套搭配或单品选择，满足不同空间与需求。",
        "支援整套搭配或單品選擇，滿足不同空間與需求。",
      ),
    },
    {
      src: "/images/house38/img1.jpg",
      title: t("The finishing touches.", "软装细节", "軟裝細節"),
      text: t(
        "Layer texture, proportion and thoughtful details for warmth and depth.",
        "注重比例、材质与细节呈现，让空间自然、有层次，保留家的温度与生活感。",
        "注重比例、材質與細節呈現，讓空間自然、有層次，保留家的溫度與生活感。",
      ),
    },
  ];
  return (
    <main id="main" className="furniture-page">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <section
        className="furniture-hero wrap"
        aria-labelledby="furniture-heading"
      >
        <div className="furniture-hero-copy">
          <p className="eyebrow">
            {t(
              "FURNITURE FOR SALE & RENT · TORONTO & THE GTA",
              "高端家具租售 · 服务大多伦多地区",
              "高端傢俱租售 · 服務大多倫多地區",
            )}
          </p>
          <h1 id="furniture-heading">
            {t("Furniture.", "高端家具，", "高端傢俱，")}
            <br />
            <em>{t("For your space.", "可租可售。", "可租可售。")}</em>
          </h1>
          <p>
            {t(
              "New containers arrive every month, bringing new high-end furniture and accessories. Buy or rent a complete collection or choose individual pieces to suit your space.",
              "每月均有新货柜到港，持续更新高端全新家具与软装系列。同时提供家具租赁与出售服务，支持整套搭配或单品选择，满足不同空间与需求。",
              "每月均有新貨櫃到港，持續更新高端全新傢俱與軟裝系列。同時提供傢俱租賃與出售服務，支援整套搭配或單品選擇，滿足不同空間與需求。",
            )}
          </p>
          <div className="furniture-actions">
            <a href="#furniture-inquiry" className="button button-dark">
              {t("Inquire about furniture", "咨询家具租售", "諮詢傢俱租售")}
              <ArrowUpRight size={17} />
            </a>
            <a href="#collections" className="text-link">
              {t("Explore the possibilities", "浏览搭配灵感", "瀏覽搭配靈感")}
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <figure className="furniture-hero-image">
          <Image
            src="/images/house36/img1.jpg"
            alt={t(
              "Furniture and accessories styled by Oaktime in a light-filled home",
              "Oaktime 真实案例：明亮客厅中的高端家具与软装搭配",
              "Oaktime 真實案例：明亮客廳中的高端傢俱與軟裝搭配",
            )}
            fill
            sizes="(max-width: 800px) 92vw, 52vw"
            priority
          />
          <figcaption>
            {t(
              "REAL PROJECTS · FINISHED SPACES",
              "真实案例 · 成品预览",
              "真實案例 · 成品預覽",
            )}
          </figcaption>
        </figure>
      </section>
      <div className="wrap furniture-highlights">
        {[
          [
            t("100+", "上百套", "上百套"),
            t(
              "High-end furniture and accessories in stock",
              "高端家具与软装现货",
              "高端傢俱與軟裝現貨",
            ),
          ],
          [
            t("Every month", "每月上新", "每月上新"),
            t(
              "New collections, more choice",
              "新款不断，选择更多",
              "新款不斷，選擇更多",
            ),
          ],
          [
            t("Your choice", "自由选择", "自由選擇"),
            t(
              "Complete collections or individual pieces",
              "整套搭配或单品选择",
              "整套搭配或單品選擇",
            ),
          ],
        ].map(([title, text]) => (
          <div key={title}>
            <p className="furniture-highlight-title">{title}</p>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <section id="collections" className="section furniture-collections">
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="eyebrow">
                {t(
                  "FURNITURE · ACCESSORIES · STYLING",
                  "家具 · 软装 · 搭配",
                  "傢俱 · 軟裝 · 搭配",
                )}
              </p>
              <h2>
                {t("A space that", "让空间，", "讓空間，")}
                <br />
                <em>
                  {t("feels like you.", "自然、有层次。", "自然、有層次。")}
                </em>
              </h2>
            </div>
            <p className="section-description">
              {t(
                "Explore real Oaktime styling projects, then tell us the pieces or look you love. We’ll help with current selections, stock and a quote.",
                "浏览真实搭配案例，与我们确认您喜欢的款式、现货与报价。可提供整套搭配或局部软装搭配，满足不同空间与需求。",
                "瀏覽真實搭配案例，與我們確認您喜歡的款式、現貨與報價。可提供整套搭配或局部軟裝搭配，滿足不同空間與需求。",
              )}
            </p>
          </div>
          <div className="furniture-collection-grid">
            {collections.map((item) => (
              <article key={item.src}>
                <div className="furniture-collection-image">
                  <Image
                    src={item.src}
                    alt={
                      item.title +
                      " · " +
                      t(
                        "Oaktime styling project",
                        "Oaktime 真实搭配案例",
                        "Oaktime 真實搭配案例",
                      )
                    }
                    fill
                    sizes="(max-width: 520px) 92vw, (max-width: 800px) 44vw, 30vw"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FirstCollaborationOffer
        locale={locale}
        inquiryPath="/furniture#furniture-inquiry"
      />
      <section
        id="furniture-inquiry"
        className="section wrap furniture-contact"
      >
        <div>
          <p className="eyebrow">
            {t(
              "LET’S FIND YOUR NEXT PIECE",
              "找到适合您的家具",
              "找到適合您的傢俱",
            )}
          </p>
          <h2>
            {t("Something in mind?", "有喜欢的款式？", "有喜歡的款式？")}
            <br />
            <em>{t("Let’s talk.", "和我们聊聊。", "和我們聊聊。")}</em>
          </h2>
          <p>
            {t(
              "Send us a photo or tell us what you want to buy or rent, your preferred style and whether you need individual pieces or a complete set. Our team can help in English and Mandarin.",
              "欢迎通过微信发送图片，或告诉我们想购买、租赁的家具与风格，以及需要整套搭配还是单品选择。我们提供中文服务（普通话／国语）及英文咨询。",
              "歡迎透過微信傳送圖片，或告訴我們想購買、租賃的傢俱與風格，以及需要整套搭配還是單品選擇。我們提供中文服務（普通話／國語）及英文諮詢。",
            )}
          </p>
          <div className="inquiry-contact">
            <PhoneContacts />
            <a
              href={`mailto:${contactInfo.email}?subject=Furniture%20sales%20and%20rental%20inquiry`}
            >
              {contactInfo.email}
            </a>
          </div>
          <p className="furniture-payment-note">
            {t(
              "WeChat Pay and Alipay accepted. Contact our team to arrange your purchase or rental.",
              "支持微信／支付宝收款。租售事宜请联系团队沟通。",
              "支援微信／支付寶收款。租售事宜請聯繫團隊溝通。",
            )}
          </p>
          <Link href={href("/contact")} className="text-link">
            {t(
              "Company address & contact details",
              "公司地址与联系方式",
              "公司地址與聯繫方式",
            )}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <SocialContacts locale={locale} />
      </section>
    </main>
  );
}
