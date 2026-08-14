import { formatReviewDate, strapiRequest } from "@/lib/strapi";

function mapReview(review) {
  return {
    ...review,
    id: review.documentId,
    date: formatReviewDate(review.stayDate || review.createdAt),
    liked: false,
  };
}

export async function getReviews(token, roomLegacyId) {
  const suffix = roomLegacyId ? `?roomLegacyId=${encodeURIComponent(roomLegacyId)}` : "";
  const reviews = await strapiRequest(`/reviews${suffix}`, { token });
  return reviews.map(mapReview);
}

export async function createReview(data, token) {
  return mapReview(await strapiRequest("/reviews", { method: "POST", data, token }));
}

export async function updateReview(documentId, data, token) {
  return mapReview(
    await strapiRequest(`/reviews/${documentId}`, { method: "PUT", data, token }),
  );
}

export function deleteReview(documentId, token) {
  return strapiRequest(`/reviews/${documentId}`, { method: "DELETE", token });
}
