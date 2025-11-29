// Utilidad para formatear fechas evitando cambios por zona horaria.
export function formatDateAvoidTimezone(dateString?: string, locale = "es-AR") {
  if (!dateString) return "";

  // Intentar extraer YYYY-MM-DD para evitar efectos de zona horaria
  const m = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const [, year, month, day] = m;
    const date = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Fallback: parseo general y normalización a fecha local sin tiempo
  const parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) return "";
  const normalized = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate()
  );
  return normalized.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default formatDateAvoidTimezone;

// Devuelve un valor seguro `YYYY-MM-DD` para usar en `<input type="date" />`.
export function toDateInputValue(dateString?: string): string {
  if (!dateString) return "";

  const m = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const [, year, month, day] = m;
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) return "";
  const normalized = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate()
  );
  const y = normalized.getFullYear();
  const mo = String(normalized.getMonth() + 1).padStart(2, "0");
  const d = String(normalized.getDate()).padStart(2, "0");
  return `${y}-${mo}-${d}`;
}
