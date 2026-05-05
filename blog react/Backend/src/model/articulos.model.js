//! Modelo para articulos

//* Importacion de Base de datos
import cnx from "./db.model.js";
//* Activar async en consultas
const db = cnx.promise();

function pickArticuloBody(datos) {
  return {
    titulo: datos.titulo ?? "",
    descripcion: datos.descripcion ?? datos.contenido ?? "",
    imagen: datos.imagen ?? "",
  };
}

//* Modelo de articulos
export const articulosModel = {
  //? Listar articulos activos (blog público)
  findAll: async function () {
    const sql =
      "SELECT id, titulo, descripcion, imagen, estado FROM articulos WHERE estado = 'Activo' ORDER BY id ASC;";
    const [rows] = await db.query(sql);
    return rows;
  },
  //? Listar por ID
  findById: async function (id) {
    const sql = "SELECT * FROM articulos WHERE id = ? ORDER BY id ASC;";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  //? Crear
  insert: async function (datos) {
    const row = { ...pickArticuloBody(datos), estado: datos.estado ?? "Activo" };
    const sql = "INSERT INTO articulos SET ?;";
    const [rows] = await db.query(sql, row);
    return rows;
  },
  //? Modificar
  update: async function (id, datos) {
    const row = pickArticuloBody(datos);
    const sql = "UPDATE articulos SET ? WHERE id = ?";
    const [rows] = await db.query(sql, [row, id]);
    return rows;
  },
  //? Activar
  activate: async function (id) {
    const sql = "UPDATE articulos SET estado = 'Activo' WHERE id = ?;";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
  //? Desactivar
  inactivate: async function (id) {
    const sql = "UPDATE articulos SET estado = 'Inactivo' WHERE id = ?;";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
};
