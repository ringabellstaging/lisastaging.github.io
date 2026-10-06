"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = translator(locale);
  const href = (path: string) => localizedPath(path, locale);
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link
          href={href("/")}
          className="wordmark"
          aria-label={t("Oaktime Staging home", "Oaktime Staging 首页")}
          onClick={() => setOpen(false)}
        >
          oaktime<span>STAGING & STYLING</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={
            open ? t("Close menu", "关闭菜单") : t("Open menu", "打开菜单")
          }
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          id="main-navigation"
          aria-label={t("Main navigation", "主导航")}
          className={open ? "navigation is-open" : "navigation"}
          onClick={() => setOpen(false)}
        >
          <Link href={href("/#services")}>
            {t("Our services", "我们的服务")}
          </Link>
          <Link href={href("/projects")}>{t("Our work", "案例作品")}</Link>
          <Link href={href("/#project-map")}>
            {t("Project map", "案例地图")}
          </Link>
          <Link href={href("/about")}>{t("About us", "关于我们")}</Link>
          <Link
            href={href("/#inquiry")}
            className="button button-dark nav-quote"
          >
            {t("Request a quote", "获取报价")} <ArrowUpRight size={16} />
          </Link>
        </nav>
        <nav
          className="language-switch"
          aria-label={t("Website language", "网站语言")}
        >
          {(["zh", "en"] as const).map((target, index) => (
            <span key={target}>
              {index > 0 && (
                <span className="language-divider" aria-hidden="true">
                  /
                </span>
              )}
              <a
                href={localizedPath(pathname, target)}
                hrefLang={target === "zh" ? "zh-Hans" : "en-CA"}
                lang={target === "zh" ? "zh-Hans" : "en"}
                aria-label={
                  target === "zh" ? "切换到中文" : "Switch to English"
                }
                aria-current={locale === target ? "true" : undefined}
                onClick={(event) => {
                  // The URL is the language preference; ordinary links remain usable without JS.
                  event.currentTarget.href = localizedPath(
                    window.location.pathname +
                      window.location.search +
                      window.location.hash,
                    target,
                  );
                  setOpen(false);
                }}
              >
                {target === "zh" ? "中" : "EN"}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
