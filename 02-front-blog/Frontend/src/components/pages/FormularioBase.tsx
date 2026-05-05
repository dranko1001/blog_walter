import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/api";

const FormularioBase = () => {
  const navigate = useNavigate();

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      titulo: String(fd.get("titulo") ?? "").trim(),
      descripcion: String(fd.get("descripcion") ?? "").trim(),
      imagen: String(fd.get("imagen") ?? "").trim(),
    };

    const res = await fetch(apiUrl("/api/articulos/crear"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(typeof err.error === "string" ? err.error : "No se pudo crear el artículo");
      return;
    }

    navigate("/");
  }

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-4xl border p-4 mt-40 mb-40">
        <form onSubmit={enviar}>
          <legend className="fieldset-legend text-4xl mb-3 flex justify-center">Crear un articulo</legend>
          <label className="label text-lg" htmlFor="titulo">
            Titulo
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Titulo"
            id="titulo"
            name="titulo"
            required
          />
          <label className="label text-lg" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            className="textarea w-full"
            placeholder="Descripción"
            id="descripcion"
            name="descripcion"
            required
          ></textarea>
          <label className="label text-lg mt-2" htmlFor="imagen">
            URL de la imagen
          </label>
          <input
            type="url"
            className="input w-full"
            placeholder="https://ejemplo.com/foto.jpg"
            id="imagen"
            name="imagen"
          />
          <button type="submit" className="btn btn-neutral mt-4 w-40 flex justify-center">
            Crear
          </button>
        </form>
      </fieldset>
    </>
  );
};

export default FormularioBase;
