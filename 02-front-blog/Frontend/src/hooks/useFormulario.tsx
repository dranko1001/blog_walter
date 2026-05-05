import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

type FormState = Record<string, unknown>;

const UseFormulario = (objetoDatos: FormState = {}) => {
  const [formulario, setFormulario] = useState<FormState>({ objetoDatos });

  const serealizarFormulario = (form: HTMLFormElement): FormState => {
    const formData = new FormData(form);
    const out: FormState = {};
    for (const [name, value] of formData) {
      out[name] = value;
    }
    return out;
  };

  const obtenerDatos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = serealizarFormulario(e.currentTarget);
    console.log(datos);
    setFormulario(datos);
  };

  const cambiado = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return { formulario, obtenerDatos, cambiado };
};

export default UseFormulario;
