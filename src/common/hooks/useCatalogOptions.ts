import { useState, useEffect } from "react"
import { getAllYears, getAllGenres, getAllSubgenres, getAllFormats } from "../../db/services/catalog"
import type { FormatType } from "../../types/filters"

export function useCatalogOptions(token: string | null) {
  const [years, setYears] = useState<(number | string)[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [subgenres, setSubgenres] = useState<string[]>([])
  const [formats, setFormats] = useState<FormatType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true)
        const [yearsData, genresData, subgenresData, formatsData] = await Promise.all([
          getAllYears(token),
          getAllGenres(token),
          getAllSubgenres(token),
          getAllFormats(token),
        ])

        setYears(yearsData)
        setGenres(genresData)
        setSubgenres(subgenresData)
        setFormats(formatsData as FormatType[])
      } catch (error) {
        console.error("Error al obtener filtros: :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOptions()
  }, [token])

  return { years, genres, subgenres, formats, loading }
}
