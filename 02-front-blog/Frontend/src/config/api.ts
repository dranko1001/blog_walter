/** En desarrollo, Vite reenvía /api al backend. En preview/producción usa VITE_API_BASE si hace falta. */
export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_BASE ?? (import.meta.env.DEV ? "" : "http://localhost:3000");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
