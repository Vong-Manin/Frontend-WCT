const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(
  /\/$/,
  "",
);

export class StrapiApiError extends Error {
  constructor(message, { status = 0, details = null } = {}) {
    super(message);
    this.name = "StrapiApiError";
    this.status = status;
    this.details = details;
  }
}

export function getStrapiMediaUrl(media) {
  const url = typeof media === "string" ? media : media?.url;
  if (!url) return "/image/placeholder.jpg";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export async function strapiRequest(path, { method = "GET", data, token, signal } = {}) {
  let response;
  try {
    response = await fetch(`${STRAPI_URL}/api${path}`, {
      method,
      signal,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(data ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(data ? { body: JSON.stringify({ data }) } : {}),
    });
  } catch (error) {
    throw new StrapiApiError(
      "The resort service is temporarily unavailable. Please try again.",
      { details: error.message },
    );
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new StrapiApiError(
      payload?.error?.message || "The request could not be completed.",
      {
        status: response.status,
        details: payload?.error?.details || null,
      },
    );
  }
  return payload.data;
}

export function formatReviewDate(value) {
  if (!value) return "Recent stay";
  const date = new Date(`${value.length === 10 ? `${value}T00:00:00` : value}`);
  if (Number.isNaN(date.getTime())) return "Recent stay";
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
