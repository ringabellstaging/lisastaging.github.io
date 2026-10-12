import type { Locale } from "./i18n";
const chineseErrors: Record<string, string> = {
  "Please submit the form from this website.": "请通过本网站提交询价表单。",
  "Unsupported form submission.": "无法处理这次提交，请刷新页面重试。",
  "The form was empty.": "请填写询价表单。",
  "Please shorten your message.": "备注内容过长，请适当缩短。",
  "Unable to read the form.": "无法读取表单，请重试。",
  "Please check your form details.": "请检查填写的信息。",
  "Please reload the page and try again.": "请刷新页面后重试。",
  "Unable to accept this inquiry.": "暂时无法接受这次询价，请直接联系团队。",
  "Please enter your property address.": "请填写房屋地址。",
  "Please select a staging budget.": "请选择布置预算。",
  "Please enter a valid email address.": "请填写有效的电子邮箱。",
  "Please enter a valid phone number.": "请填写有效的电话号码。",
  "Please check the name and notes fields.": "请检查姓名和备注内容。",
  "Please agree to be contacted about this inquiry.":
    "请确认同意我们就本次询价与您联系。",
  "Online inquiries are temporarily unavailable. Please contact our team directly.":
    "在线询价暂时不可用，请直接联系团队。",
  "Too many requests. Please try again later.": "提交次数过多，请稍后再试。",
  "These details changed. Please reload the page and submit again.":
    "提交信息已改变，请刷新页面后重新提交。",
  "Online inquiries have reached today’s limit. Please contact our team directly.":
    "今日在线询价已达到上限，请直接联系团队。",
  "We have received several inquiries from this email today. Please contact us directly.":
    "今天已收到该邮箱的多次询价，请直接联系团队。",
  "Please reload the page and submit again.": "请刷新页面后重新提交。",
  "We couldn’t safely save your inquiry. Please try again.":
    "未能保存您的询价，请重试。",
};

const traditionalErrors: Record<string, string> = {
  "Please submit the form from this website.": "請通過本網站提交詢價表單。",
  "Unsupported form submission.": "無法處理這次提交，請刷新頁面重試。",
  "The form was empty.": "請填寫詢價表單。",
  "Please shorten your message.": "備註內容過長，請適當縮短。",
  "Unable to read the form.": "無法讀取表單，請重試。",
  "Please check your form details.": "請檢查填寫的信息。",
  "Please reload the page and try again.": "請刷新頁面後重試。",
  "Unable to accept this inquiry.": "暫時無法接受這次詢價，請直接聯繫團隊。",
  "Please enter your property address.": "請填寫房屋地址。",
  "Please select a staging budget.": "請選擇佈置預算。",
  "Please enter a valid email address.": "請填寫有效的電子郵箱。",
  "Please enter a valid phone number.": "請填寫有效的電話號碼。",
  "Please check the name and notes fields.": "請檢查姓名和備註內容。",
  "Please agree to be contacted about this inquiry.":
    "請確認同意我們就本次詢價與您聯繫。",
  "Online inquiries are temporarily unavailable. Please contact our team directly.":
    "在線詢價暫時不可用，請直接聯繫團隊。",
  "Too many requests. Please try again later.": "提交次數過多，請稍後再試。",
  "These details changed. Please reload the page and submit again.":
    "提交信息已改變，請刷新頁面後重新提交。",
  "Online inquiries have reached today’s limit. Please contact our team directly.":
    "今日在線詢價已達到上限，請直接聯繫團隊。",
  "We have received several inquiries from this email today. Please contact us directly.":
    "今天已收到該郵箱的多次詢價，請直接聯繫團隊。",
  "Please reload the page and submit again.": "請刷新頁面後重新提交。",
  "We couldn’t safely save your inquiry. Please try again.":
    "未能保存您的詢價，請重試。",
};

export function inquiryError(message: string | undefined, locale: Locale) {
  if (locale !== "en")
    return (
      (message &&
        (locale === "zh-hant" ? traditionalErrors : chineseErrors)[message]) ||
      (locale === "zh-hant"
        ? "未能提交詢價，請檢查網絡連接後重試。"
        : "未能提交询价，请检查网络连接后重试。")
    );
  return message || "We couldn’t send your inquiry. Please try again.";
}
