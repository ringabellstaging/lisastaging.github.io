import Image from "next/image";
import CopyContact from "./CopyContact";
import { contactInfo } from "@/lib/contact";
import { translator, type Locale } from "@/lib/i18n";

export default function SocialContacts({
  locale = "en",
  compact = false,
}: {
  locale?: Locale;
  compact?: boolean;
}) {
  const t = translator(locale);
  return (
    <div
      className={`social-contacts${compact ? " social-contacts-compact" : ""}`}
    >
      <div className="social-qr">
        <a
          href={contactInfo.wechatQr}
          target="_blank"
          rel="noopener"
          aria-label={t(
            "Open the WeChat QR code",
            "打开微信二维码大图",
            "開啟微信二維碼大圖",
          )}
        >
          <Image
            src={contactInfo.wechatQr}
            alt={t(
              "Scan to add Lisa Li on WeChat",
              "扫码添加 Lisa Li 的微信",
              "掃碼加入 Lisa Li 的微信",
            )}
            width={329}
            height={329}
            unoptimized
          />
        </a>
        <p>{t("Lisa Li · Mandarin", "Lisa Li · 国语", "Lisa Li · 國語")}</p>
      </div>
      <div className="social-accounts">
        <CopyContact
          label={t("WeChat ID", "微信号", "微信號")}
          value={contactInfo.wechatId}
          locale={locale}
        />
        <CopyContact
          label={t("Xiaohongshu / REDnote", "小红书 ID", "小紅書 ID")}
          value={contactInfo.xiaohongshuId}
          locale={locale}
        />
        {!compact && (
          <p className="social-help">
            {t(
              "On your phone, save the QR image or copy the WeChat ID to add us. Search Oaktime on Xiaohongshu for more inspiration.",
              "手机浏览时，可长按保存二维码，或复制微信号添加我们。小红书搜索 Oaktime，获取更多搭配灵感。",
              "手機瀏覽時，可長按儲存二維碼，或複製微信號加入我們。小紅書搜尋 Oaktime，獲取更多搭配靈感。",
            )}
          </p>
        )}
      </div>
    </div>
  );
}
