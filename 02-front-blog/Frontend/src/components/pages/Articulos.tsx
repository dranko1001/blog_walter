import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

const PLACEHOLDER_IMG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect fill="#e5e7eb" width="400" height="240"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="sans-serif" font-size="16">Sin imagen</text></svg>`
  );

const Articulos = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function consumirApi() {
    setError(null);
    try {
      const peticion = await fetch(apiUrl("/api/articulos/listarTodos"), { method: "GET" });
      const datos = await peticion.json();
      if (!peticion.ok) {
        setError(typeof datos.error === "string" ? datos.error : "Error al cargar artículos");
        return;
      }
      if (datos.status === "success" && Array.isArray(datos.results)) {
        setArticulos(datos.results);
      }
    } catch {
      setError("No se pudo conectar con el servidor. ¿Está el backend en el puerto 3000?");
    }
  }

  useEffect(() => {
    consumirApi();
  }, []);

  if (error) {
    return <p className="p-6 text-error">{error}</p>;
  }

  return (
    <>
      {articulos.length >= 1 ? (
        articulos.map((articulo) => (
          <div
            key={articulo.id}
            className="flex-col card bg-base-200 w-96 shadow-sm mb-6 p-5"
          >
            <figure>
              <img
                className="rounded-2xl w-full object-cover max-h-56"
                src={articulo.imagen?.trim() ? articulo.imagen : PLACEHOLDER_IMG}
                alt={articulo.titulo}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {articulo.titulo}
                <div className="badge badge-secondary">Blog</div>
              </h2>
              <p>{articulo.descripcion}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="p-6">No hay artículos todavía.</h1>
      )}
    </>
  );
};

export default Articulos;
