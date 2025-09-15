export type FormatType = "ebook" | "audiobook" | "videobook";

export interface FilterState {
  years: (number | string)[];
  genres: string[];
  subgenres: string[];
  formats: FormatType[];
}

export const emptyFilters: FilterState = { years: [], genres: [], subgenres: [], formats: [] };

export function hasActiveFilters(f: FilterState): boolean {
  return f.years.length > 0 || f.genres.length > 0 || f.subgenres.length > 0 || f.formats.length > 0;
}
