import { API_BASE_URL } from "../config";
import type { MetricItem, MetricPeriod, TopUser } from "../../types/metrics";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = {
    "Content-Type": "application/json",
    "x-client": "web",
  };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

// Usuarios más activos
export async function getTopUsers(token: string | null): Promise<TopUser[]> {
  const res = await fetch(`${API_BASE_URL}/MetricUsers/top`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Error al obtener top usuarios");
  const data = await res.json();
  return data.map((user: any) => ({
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    userName: user.userName,
    point: user.point,
    level: user.level,
    imgLevel: user.imgLevel,
    avatar: user.avatar,
  }));
}

// Ayudante: comprueba si una fecha pertenece al periodo actual
/* const isCurrentPeriod = (dateStr: string, period: MetricPeriod): boolean => {
  const now = new Date();

  const nYear = now.getFullYear();
  const nMonth = now.getMonth();

  if (period === "day") {
    const todayStr = now.toISOString().split("T")[0];
    return dateStr === todayStr;
  }

  if (period === "month") {
    const itemYear = parseInt(dateStr.substring(0, 4));
    const itemMonth = parseInt(dateStr.substring(5, 7)) - 1; // 0-indexed
    return itemYear === nYear && itemMonth === nMonth;
  }

  if (period === "year") {
    const itemYear = parseInt(dateStr.substring(0, 4));
    return itemYear === nYear;
  }

  return true;
}; */

// Fetch genérico para métricas por periodo
async function fetchMetric(
  endpoint: string,
  period: MetricPeriod,
  token: string | null,
  transform: (item: any) => MetricItem
): Promise<MetricItem[]> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}/${period}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Error al obtener métricas de ${endpoint}`);
  const data = await res.json();

  if (!data || data.length === 0) return [];

  // Busca el último valor de segmento de tiempo para filtrar por el periodo 'actual' (el último disponible).
  const latestDate = data.reduce((max: string, item: any) => {
    return !max || item.timeSegmentValue > max ? item.timeSegmentValue : max;
  }, "");

  // Filtrar por la fecha más reciente encontrada
  const filteredData = data.filter(
    (item: any) => item.timeSegmentValue === latestDate
  );

  return filteredData.map(transform);
}

// Libros
export const getBookMetrics = (period: MetricPeriod, token: string | null) =>
  fetchMetric("MetricBook", period, token, (item) => ({
    label: item.idBook?.title || "Desconocido",
    value: item.count,
  }));

// Autores
export const getAuthorMetrics = async (
  period: MetricPeriod,
  token: string | null
) => {
  const data = await fetchMetric("MetricAuthor", period, token, (item) => ({
    label: item.idAuthor?.fullName || "Desconocido",
    value: item.count,
  }));
  // Filtrar autores desconocidos o nulos
  return data.filter(
    (item) =>
      item.label && item.label !== "Desconocido" && item.label.trim() !== ""
  );
};

// Formatos
export const getFormatMetrics = (period: MetricPeriod, token: string | null) =>
  fetchMetric("MetricFormat", period, token, (item) => ({
    label: item.format || "Desconocido",
    value: item.count,
  }));

// Subgéneros
export const getSubgenreMetrics = (
  period: MetricPeriod,
  token: string | null
) =>
  fetchMetric("MetricSubgenre", period, token, (item) => ({
    label: item.subgenre || "Desconocido",
    value: item.count,
  }));
