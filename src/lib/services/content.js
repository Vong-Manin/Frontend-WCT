import { getStrapiMediaUrl, strapiRequest } from "@/lib/strapi";

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mapRoom(room) {
  return {
    ...room,
    id: room.legacyId,
    price: number(room.price),
    rating: number(room.rating),
    reviews: room.reviewCount || 0,
    images: room.images?.length
      ? room.images.map(getStrapiMediaUrl)
      : ["/image/placeholder.jpg"],
  };
}

function mapActivity(activity) {
  return {
    ...activity,
    id: activity.legacyId,
    price: number(activity.price),
    image: getStrapiMediaUrl(activity.image),
  };
}

function mapMenuItem(item) {
  return {
    ...item,
    id: item.legacyId,
    price: number(item.price),
    image: getStrapiMediaUrl(item.image),
    operatingHours: {
      open: item.openingTime?.slice(0, 5) || "06:00",
      close: item.closingTime?.slice(0, 5) || "22:00",
    },
  };
}

function mapGalleryItem(item) {
  return {
    ...item,
    id: item.legacyId,
    image: getStrapiMediaUrl(item.image),
  };
}

export async function getRooms() {
  const rooms = await strapiRequest("/rooms?populate[images]=true&sort=legacyId:asc&pagination[pageSize]=100");
  return rooms.map(mapRoom);
}

export async function getActivities() {
  const activities = await strapiRequest(
    "/activities?populate[image]=true&sort=legacyId:asc&pagination[pageSize]=100",
  );
  return activities.map(mapActivity);
}

export async function getMenuItems() {
  const items = await strapiRequest(
    "/menu-items?populate[image]=true&sort=legacyId:asc&pagination[pageSize]=100",
  );
  return items.map(mapMenuItem);
}

export async function getGalleryItems() {
  const items = await strapiRequest(
    "/gallery-items?populate[image]=true&sort=legacyId:asc&pagination[pageSize]=100",
  );
  return items.map(mapGalleryItem);
}
