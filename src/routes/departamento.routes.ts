import { Router } from "express";
import { DepartamentoController } from "../controllers/DepartamentoController";
import { DepartamentoRepository } from "../repositories/departamentoRepository";

const router = Router();

export default (departamentoRepository: DepartamentoRepository) => {
  const departamentoController = new DepartamentoController(
    departamentoRepository
  );
  router.delete(
    "/eliminar-departamento",
    departamentoController.deleteDepartamento.bind(departamentoController)
  );
  router.get(
    "/registrar-departamento",
    departamentoController.getDepartamento.bind(departamentoController)
  );
  router.put(
    "/actualizar-departamento",
    departamentoController.updateDepartamento.bind(departamentoController)
  );

  router.post("", (req, res) => {});

  return router;
};
