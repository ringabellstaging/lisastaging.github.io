import SiteDocument from "@/components/SiteDocument";
import Link from "next/link";
import NotFound from "@/components/NotFound";
export const metadata = {
  title: "Page not found · 页面不存在 | Oaktime Staging",
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en">
      <NotFound />
      <div className="wrap not-found-language" lang="zh-Hans">
        <p>页面不存在。您可以继续浏览我们的房屋布置案例。</p>
        <Link href="/zh/projects" className="text-link">
          浏览中文案例 ↗
        </Link>
      </div>
      <div className="wrap not-found-language" lang="zh-Hant">
        <p>頁面不存在。您可以繼續瀏覽我們的房屋布置案例。</p>
        <Link href="/zh-hant/projects" className="text-link">
          瀏覽繁體中文案例 ↗
        </Link>
      </div>
    </SiteDocument>
  );
}
