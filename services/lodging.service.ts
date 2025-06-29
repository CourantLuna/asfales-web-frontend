// lodging.service.ts
import { Lodging } from "../types/lodging.types";

const API_URL = "https://sheet2api.com/v1/1K0sbyOSyghO/medellin-hotel-result";

/**
 * Devuelve el listado de alojamientos de la API fake.
 */
export async function fetchLodgings(): Promise<Lodging[]> {
  const res = await fetch(API_URL, {
    headers: { "Accept": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener datos de hoteles");
  const data = await res.json();
  const rows = Array.isArray(data) ? data : data?.data || [];
  // Formatea a camelCase
  return rows.map(toCamelCaseLodging);
}

function toCamelCaseLodging(apiLodging: any): Lodging {
  return {
    hotelName: apiLodging["hotel_name"] ?? "",
    hotelImage1: apiLodging["hotel_image_1"],
    hotelImage2: apiLodging["hotel_image_2"],
    hotelImage3: apiLodging["hotel_image_3"],
    hotelImage4: apiLodging["hotel_image_4"],
    location: apiLodging["location"],
    feature1: apiLodging["feature_1"],
    feature2: apiLodging["feature_2"],
    rating: (apiLodging["rating"]) || undefined,
    ratingLabel: apiLodging["rating-label"],
    ratingCount: apiLodging["rating-count"] ?? apiLodging["ratingCount"] ?? apiLodging["ratingcount"],
    nightlyPrice: (apiLodging["nightly-price"]) || undefined,
    priceTotal: (apiLodging["price_total"]) || undefined,
    badge1: apiLodging["badge-1"],
    refundable: apiLodging["refundable"],
    reserveNow: apiLodging["reserve-now"],
    availableBadge: apiLodging["available-badge"],
    beforePrice: (apiLodging["before-price"]) || undefined,
  };
}
