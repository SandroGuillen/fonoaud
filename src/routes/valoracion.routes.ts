import { Router } from "express";
import { ValoracionController } from "../controllers/ValoracionController";
import { ValoracionRepository } from "../repositories/valoracionRepository";

const router = Router();

export default (valoracionRepository: ValoracionRepository) => {
  const valoracionController = new ValoracionController(valoracionRepository);
  router.delete(
    "/eliminar-valoracion",
    valoracionController.deleteValoracion.bind(valoracionController)
  );
  router.post(
    "/registrar-valoracion",
    valoracionController.saveValoracion.bind(valoracionController)
  );
  router.put(
    "/actualizar-valoracion",
    valoracionController.updateValoracion.bind(valoracionController)
  );

  router.post("", (req, res) => {});

  return router;
};
