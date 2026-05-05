/**
 * Desarrollo: proxy de Vite hacia el backend local (base vacía → /api/... al mismo origen del dev server).
 * Producción (Vercel): define VITE_API_BASE con la URL pública de tu API, sin barra final
 * (ej. https://tu-api.onrender.com).
 */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_API_BASE ?? ""}${p}`;
  }
  const base = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/, "");
  return `${base}${p}`;
}
