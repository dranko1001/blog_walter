import { Router } from "express";
import * as articulosController from "../controllers/articulos.controller.js";

const router = Router();

//* Creacion de rutas para api
//? listar todos
router.get("/articulos/listarTodos", articulosController.getArticulos);
//? listar por id
router.get("/articulos/listarPorId/:id", articulosController.getArticulosById);
//? Crear
router.post("/articulos/crear", articulosController.postArticulos);
//? Actualizar
router.put("/articulos/editar/:id", articulosController.putArticulos);
//? Eliminar (logico)
router.put("/articulos/activar/:id", articulosController.activateArticulos);
//? Restaurar eliminado (logico)
router.put("/articulos/desactivar/:id", articulosController.inactivateArticulos);

export default router;
