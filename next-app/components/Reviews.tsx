import { reviews } from "@/data/reviews";
export default function Reviews() {
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
      <p className="eyebrow">In their words</p>
      <h2 id="reviews-heading">A thoughtful experience.</h2>
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
