import { propertyListings, type PropertyListing, type PropertyTransaction, type PropertyType } from "./site-content";

export type FilterState = {
  query: string;
  transaction: "all" | PropertyTransaction;
  type: "all" | PropertyType;
  location: "all" | string;
  size: "all" | "compact" | "mid" | "wide";
  bedrooms: "all" | string;
};

export const initialFilters: FilterState = { query: "", transaction: "all", type: "all", location: "all", size: "all", bedrooms: "all" };

const propertyTypes: PropertyType[] = ["residential", "commercial", "administrative", "villa", "townhouse"];
const transactions: PropertyTransaction[] = ["sale", "rent"];
const sizes: FilterState["size"][] = ["all", "compact", "mid", "wide"];

export function filterListings(listings: readonly PropertyListing[], filters: FilterState) {
  return listings.filter((listing) => {
    const query = filters.query.trim().toLocaleLowerCase("ar");
    const matchesQuery = !query || `${listing.title} ${listing.location} ${listing.details.join(" ")} ${listing.reference ?? ""}`.toLocaleLowerCase("ar").includes(query);
    const matchesTransaction = filters.transaction === "all" || listing.transaction === filters.transaction;
    const matchesType = filters.type === "all" || listing.type === filters.type;
    const matchesLocation = filters.location === "all" || listing.location === filters.location;
    const matchesSize = filters.size === "all" || (listing.size !== undefined && (filters.size === "compact" ? listing.size <= 160 : filters.size === "mid" ? listing.size > 160 && listing.size < 300 : listing.size >= 300));
    const matchesBedrooms = filters.bedrooms === "all" || listing.bedrooms === Number(filters.bedrooms);
    return matchesQuery && matchesTransaction && matchesType && matchesLocation && matchesSize && matchesBedrooms;
  });
}

export function parsePropertyQuery(params: URLSearchParams): FilterState {
  const transaction = params.get("transaction");
  const type = params.get("type");
  const location = params.get("location");
  const size = params.get("size");
  const bedrooms = params.get("bedrooms");
  const locations = new Set(propertyListings.map((listing) => listing.location));
  const bedroomOptions = new Set(propertyListings.flatMap((listing) => listing.bedrooms ? [String(listing.bedrooms)] : []));

  return {
    query: params.get("q")?.trim() ?? "",
    transaction: transactions.includes(transaction as PropertyTransaction) ? transaction as PropertyTransaction : "all",
    type: propertyTypes.includes(type as PropertyType) ? type as PropertyType : "all",
    location: location && locations.has(location) ? location : "all",
    size: sizes.includes(size as FilterState["size"]) ? size as FilterState["size"] : "all",
    bedrooms: bedrooms && bedroomOptions.has(bedrooms) ? bedrooms : "all",
  };
}

export function serializePropertyQuery(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.transaction !== "all") params.set("transaction", filters.transaction);
  if (filters.type !== "all") params.set("type", filters.type);
  if (filters.location !== "all") params.set("location", filters.location);
  if (filters.size !== "all") params.set("size", filters.size);
  if (filters.bedrooms !== "all") params.set("bedrooms", filters.bedrooms);
  return params.toString();
}

export function getAvailablePropertyTypes(listings: readonly PropertyListing[]) {
  return [...new Set(listings.map((listing) => listing.type))];
}

export function getListingLocations(listings: readonly PropertyListing[]) {
  const counts = new Map<string, number>();
  listings.forEach((listing) => counts.set(listing.location, (counts.get(listing.location) ?? 0) + 1));
  return [...counts].map(([name, count]) => ({ name, count }));
}

export function formatListingCount(count: number) {
  return count === 1 ? "وحدة واحدة" : `${count} وحدات`;
}
