import { strapiRequest } from "@/lib/strapi";

export function createRoomBooking(data, token) {
  return strapiRequest("/room-bookings", { method: "POST", data, token });
}

export function createTableBooking(data, token) {
  return strapiRequest("/table-bookings", { method: "POST", data, token });
}

export function createActivityBooking(data, token) {
  return strapiRequest("/activity-bookings", { method: "POST", data, token });
}
