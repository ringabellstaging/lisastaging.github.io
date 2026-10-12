"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { contactInfo } from "@/lib/contact";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
import { inquiryError } from "@/lib/inquiry-messages";

export default function InquiryForm({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    id: string;
    confirmationSent: boolean;
  } | null>(null);
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const fingerprint = JSON.stringify(values);
    if (requestRef.current?.fingerprint !== fingerprint)
      requestRef.current = { fingerprint, id: crypto.randomUUID() };
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          consent: form.get("consent") === "on",
          requestId: requestRef.current.id,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(inquiryError(result.error, locale));
      setSuccess({
        id: result.reference,
        confirmationSent: result.confirmationSent,
      });
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err instanceof TypeError
            ? inquiryError(undefined, locale)
            : err.message
          : t(
              "Your connection timed out. Please try again; we’ll avoid creating a duplicate inquiry.",
              "连接超时，请重试。相同内容重复提交不会创建重复询价。",
              "連接超時，請重試。相同內容重複提交不會創建重複詢價。",
            ),
      );
    } finally {
      setPending(false);
    }
  }
  if (success)
    return (
      <div
        className="form-success"
        role="status"
        tabIndex={-1}
        ref={(element) => element?.focus()}
      >
        <Check size={27} />
        <h3>
          {t("Thank you.", "谢谢您。", "謝謝您。")}
          <br />
          {t(
            "We have your inquiry.",
            "我们已收到您的询价。",
            "我們已收到您的詢價。",
          )}
        </h3>
        <p>
          {t(
            "A designer will review your property details and contact you as soon as possible to discuss your staging needs and prepare a quote.",
            "设计师会查看您的房屋信息，并尽快与您联系，沟通布置需求和准备报价。",
            "設計師會查看您的房屋信息，並儘快與您聯繫，溝通佈置需求和準備報價。",
          )}
        </p>
        <p>
          {success.confirmationSent
            ? t(
                "Your confirmation email is on its way. Please check your spam folder if it doesn’t arrive.",
                "确认邮件已发送。如未收到，请查看垃圾邮件文件夹。",
                "確認郵件已發送。如未收到，請查看垃圾郵件文件夾。",
              )
            : t(
                "Your inquiry is safely recorded. Your email confirmation is still being processed.",
                "您的询价已保存，确认邮件仍在处理中。",
                "您的詢價已保存，確認郵件仍在處理中。",
              )}
        </p>
        <small>
          {t("Reference:", "询价编号：", "詢價編號：")} {success.id}
        </small>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="inquiry-form"
      aria-label={t(
        "Request a staging quote",
        "房屋布置询价表单",
        "房屋佈置詢價表單",
      )}
    >
      <label className="form-field span-full">
        <span>{t("Property address *", "房屋地址 *", "房屋地址 *")}</span>
        <input
          required
          name="address"
          autoComplete="street-address"
          maxLength={300}
          placeholder={t(
            "Street address, city and postal code",
            "门牌地址、城市及邮编",
            "門牌地址、城市及郵編",
          )}
        />
      </label>
      <label className="form-field mobile-full">
        <span>
          {t("Your name", "您的姓名", "您的姓名")}{" "}
          <small>{t("optional", "选填", "選填")}</small>
        </span>
        <input
          name="name"
          autoComplete="name"
          maxLength={100}
          placeholder={t("Full name", "姓名", "姓名")}
        />
      </label>
      <label className="form-field mobile-full">
        <span>
          {t(
            "Staging budget (CAD) *",
            "布置预算（加元）*",
            "佈置預算（加元）*",
          )}
        </span>
        <select required name="budget" defaultValue="">
          <option value="" disabled>
            {t("Select a range", "请选择预算范围", "請選擇預算範圍")}
          </option>
          <option value="under-2000">
            {t("Under $2,000", "$2,000 以下", "$2,000 以下")}
          </option>
          <option value="2000-4000">$2,000–$4,000</option>
          <option value="4000-7000">$4,000–$7,000</option>
          <option value="7000-plus">
            {t("$7,000+", "$7,000 以上", "$7,000 以上")}
          </option>
          <option value="unsure">
            {t("Not sure yet", "暂不确定", "暫不確定")}
          </option>
        </select>
      </label>
      <label className="form-field mobile-full">
        <span>{t("Email address *", "电子邮箱 *", "電子郵箱 *")}</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
        />
      </label>
      <label className="form-field mobile-full">
        <span>{t("Phone number *", "电话号码 *", "電話號碼 *")}</span>
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          minLength={7}
          placeholder="(416) 555-0123"
        />
      </label>
      <label className="form-field span-full">
        <span>
          {t(
            "Anything else we should know?",
            "还有什么想告诉我们？",
            "還有什麼想告訴我們？",
          )}{" "}
          <small>{t("optional", "选填", "選填")}</small>
        </span>
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          placeholder={t(
            "Your timeline, the rooms you’d like staged, or any questions…",
            "您的时间安排、需要布置的房间，或其他问题……",
            "您的時間安排、需要佈置的房間，或其他問題……",
          )}
        />
      </label>
      <label className="honey-field" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent span-full">
        <input required type="checkbox" name="consent" />
        <span>
          {t(
            "I agree that Oaktime Staging may use these details to respond to my inquiry.",
            "我同意 Oaktime Staging 使用以上信息回复本次询价。",
            "我同意 Oaktime Staging 使用以上信息回覆本次詢價。",
          )}{" "}
          <Link href={localizedPath("/privacy", locale)}>
            {t("Privacy notice", "隐私说明", "隱私說明")}
          </Link>
          {t(".", "。", "。")}
        </span>
      </label>
      {error && (
        <p className="form-error span-full" role="alert">
          {error}{" "}
          {t("You can also email", "您也可以发送邮件至", "您也可以發送郵件至")}{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
        </p>
      )}
      <div className="form-bottom span-full">
        <small>
          {t(
            "* Required fields · No commitment to book",
            "* 必填项 · 询价无需承诺预订",
            "* 必填項 · 詢價無需承諾預訂",
          )}
        </small>
        <button type="submit" className="button button-dark" disabled={pending}>
          {pending
            ? t("Sending your inquiry…", "正在提交……", "正在提交……")
            : t("Request a quote", "获取报价", "獲取報價")}
          <ArrowUpRight size={17} />
        </button>
      </div>
    </form>
  );
}
