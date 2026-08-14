import "server-only";

import { getStrapiMediaUrl, strapiRequest } from "@/lib/strapi";

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mapMedia(media) {
  const url = getStrapiMediaUrl(media);
  if (!url) return null;

  return {
    id: media.id,
    documentId: media.documentId,
    url,
    width: media.width ?? null,
    height: media.height ?? null,
    alternativeText: media.alternativeText || null,
  };
}

function mapRoom(room) {
  return {
    ...room,
    id: room.legacyId,
    price: number(room.price),
    rating: number(room.rating),
    reviews: room.reviewCount || 0,
    images: (room.images || []).map(mapMedia).filter(Boolean),
  };
}

function mapActivity(activity) {
  return {
    ...activity,
    id: activity.legacyId,
    price: number(activity.price),
    image: mapMedia(activity.image),
  };
}

function mapMenuItem(item) {
  return {
    ...item,
    id: item.legacyId,
    price: number(item.price),
    image: mapMedia(item.image),
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
    image: mapMedia(item.image),
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

export async function getHeroSlides(placement = "home") {
  const slides = await strapiRequest(
    `/hero-slides?populate[image]=true&filters[placement][$eq]=${placement}&sort=legacyId:asc&pagination[pageSize]=10`,
  );
  return slides.map(mapGalleryItem);
}

export async function getRestaurantGalleryItems() {
  const items = await strapiRequest(
    "/restaurant-gallery-items?populate[image]=true&sort=legacyId:asc&pagination[pageSize]=100",
  );
  return items.map(mapGalleryItem);
}

export async function getResortContent() {
  const [rooms, activities, dining, gallery, heroSlides, roomHeroSlides, restaurantHeroSlides, restaurantGallery] = await Promise.all([
    getRooms(),
    getActivities(),
    getMenuItems(),
    getGalleryItems(),
    getHeroSlides(),
    getHeroSlides("rooms"),
    getHeroSlides("restaurant"),
    getRestaurantGalleryItems(),
  ]);

  return {
    rooms,
    activities,
    dining,
    gallery,
    heroSlides,
    roomHero: roomHeroSlides[0] || null,
    restaurantHero: restaurantHeroSlides[0] || null,
    restaurantGallery,
  };
}
