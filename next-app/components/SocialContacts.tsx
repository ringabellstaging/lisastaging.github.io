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
        <p className="social-qr-instruction">
          {t("Scan to add us on WeChat", "扫码添加微信", "掃碼加入微信")}
        </p>
        <CopyContact
          label={t("Xiaohongshu / REDnote", "小红书 ID", "小紅書 ID")}
          value={contactInfo.xiaohongshuId}
          locale={locale}
        />
        {!compact && (
          <p className="social-help">
            {t(
              "Scan the QR code, or save it on your phone and open it in WeChat to add us. Search Oaktime on Xiaohongshu for more inspiration.",
              "扫码添加微信。手机浏览时，可长按保存二维码，再在微信中识别。小红书搜索 Oaktime，获取更多搭配灵感。",
              "掃碼加入微信。手機瀏覽時，可長按儲存二維碼，再於微信中辨識。小紅書搜尋 Oaktime，獲取更多搭配靈感。",
            )}
          </p>
        )}
      </div>
    </div>
  );
}
