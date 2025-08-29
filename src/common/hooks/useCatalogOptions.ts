import { useQuery } from "@tanstack/react-query";
import { getAllYears, getAllSubgenres, getAllFormats } from "../../db/services/catalog";

export function useCatalogOptions(token: string | null) {
  const yearsQ = useQuery({ queryKey: ["years", token], queryFn: () => getAllYears(token), enabled: !!token, placeholderData: (p) => p });
  const subgenresQ = useQuery({ queryKey: ["subgenres", token], queryFn: () => getAllSubgenres(token), enabled: !!token, placeholderData: (p) => p });
  const formatsQ = useQuery({ queryKey: ["formats", token], queryFn: () => getAllFormats(token), enabled: !!token, placeholderData: (p) => p });

  return {
    years: yearsQ.data ?? [],
    subgenres: subgenresQ.data ?? [],
    formats: (formatsQ.data ?? []) as ("ebook" | "audiolibro" | "video")[],
    isLoading: yearsQ.isLoading || subgenresQ.isLoading || formatsQ.isLoading,
    error: yearsQ.error || subgenresQ.error || formatsQ.error,
  };
}
