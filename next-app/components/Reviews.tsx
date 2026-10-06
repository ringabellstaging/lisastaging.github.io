import { reviews } from "@/data/reviews";
import { translator, type Locale } from "@/lib/i18n";
export default function Reviews({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const verified = reviews.filter(
    (review) =>
      review.verified &&
      review.quote &&
      review.name &&
      /^https:\/\//.test(review.sourceUrl),
  );
  if (!verified.length) return null;
  return (
    <section className="section wrap" aria-labelledby="reviews-heading">
      <p className="eyebrow">{t("In their words", "客户评价")}</p>
      <h2 id="reviews-heading">
        {t("A thoughtful experience.", "用心服务的体验。")}
      </h2>
      <div className="reviews-grid">
        {verified.map((review) => (
          <figure key={review.sourceUrl}>
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              {review.name} ·{" "}
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {review.source}
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
