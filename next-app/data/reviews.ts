export type VerifiedReview = {
  quote: string;
  name: string;
  source: string;
  sourceUrl: string;
  verified: boolean;
};
// Add only reviews checked against their original public source or supplied with permission.
// Do not populate this collection with example reviews or inferred ratings.
export const reviews: VerifiedReview[] = [];
