// types/api.ts

import { type DataTableValue } from "primereact/datatable";

export interface Artwork extends DataTableValue {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  prev_url: string | null;
  next_url: string | null;
}

export interface ApiInfo {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface ApiConfig {
  iiif_url: string;
  website_url: string;
}

// The top-level response shape
export interface ArtworksApiResponse {
  pagination: Pagination;
  data: Artwork[];
  info: ApiInfo;
  config: ApiConfig;
}
