"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { translator, type Locale } from "@/lib/i18n";

export default function CopyContact({
  label,
  value,
  locale,
}: {
  label: string;
  value: string;
  locale: Locale;
}) {
  const t = translator(locale);
  const [status, setStatus] = useState<"idle" | "copied" | "unavailable">(
    "idle",
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("unavailable");
    }
  }
  return (
    <div className="social-handle">
      <p className="social-label">{label}</p>
      <div className="social-handle-value">
        <strong>{value}</strong>
        <button
          type="button"
          onClick={copy}
          aria-label={t(`Copy ${label}`, `复制${label}`, `複製${label}`)}
        >
          {status === "copied" ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <span className="copy-feedback" role="status">
        {status === "copied"
          ? t("Copied", "已复制", "已複製")
          : status === "unavailable"
            ? t(
                "Select and copy the ID above.",
                "请选中上方账号复制。",
                "請選取上方帳號複製。",
              )
            : ""}
      </span>
    </div>
  );
}
