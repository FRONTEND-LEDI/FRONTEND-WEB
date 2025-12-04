import { useState, useEffect } from "react";
import {
  getAllYears,
  getAllGenres,
  getAllSubgenres,
  getAllFormats,
  getAllAuthorsFilter,
  type Author,
} from "../../db/services/catalog";
import type { FormatType } from "../../types/filters";

export function useCatalogOptions(token: string | null) {
  const [years, setYears] = useState<(number | string)[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [subgenres, setSubgenres] = useState<string[]>([]);
  const [formats, setFormats] = useState<FormatType[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const [yearsData, genresData, subgenresData, formatsData, authorsData] =
          await Promise.all([
            getAllYears(token),
            getAllGenres(token),
            getAllSubgenres(token),
            getAllFormats(token),
            getAllAuthorsFilter(token),
          ]);

        setYears(yearsData);
        setGenres(genresData);
        setSubgenres(subgenresData);
        setFormats(formatsData as FormatType[]);
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error al obtener filtros: :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [token]);

  return { years, genres, subgenres, formats, authors, loading };
}
