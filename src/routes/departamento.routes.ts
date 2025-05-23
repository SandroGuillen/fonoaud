import { Router } from "express";
import { DepartamentoController } from "../controllers/DepartamentoController";
import { DepartamentoRepository } from "../repositories/departamentoRepository";

const router = Router();

export default (departamentoRepository: DepartamentoRepository) => {
  const departamentoController = new DepartamentoController(
    departamentoRepository
  );
  router.delete(
    "/",
    departamentoController.deleteDepartamento.bind(departamentoController)
  );
  router.get(
    "/",
    departamentoController.getDepartamento.bind(departamentoController)
  );
  router.put(
    "/",
    departamentoController.updateDepartamento.bind(departamentoController)
  );

  router.post("", (req, res) => {});

  return router;
};
