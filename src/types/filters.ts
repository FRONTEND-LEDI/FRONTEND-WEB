export type FormatType = "ebook" | "audiolibro" | "video";

export interface FilterState {
  years: (number | string)[];
  subgenres: string[];
  formats: FormatType[];
}

export const emptyFilters: FilterState = { years: [], subgenres: [], formats: [] };

export function hasActiveFilters(f: FilterState): boolean {
  return f.years.length > 0 || f.subgenres.length > 0 || f.formats.length > 0;
}
