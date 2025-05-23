import { Router } from "express";
import { ValoracionController } from "../controllers/ValoracionController";
import { ValoracionRepository } from "../repositories/valoracionRepository";

const router = Router();

export default (valoracionRepository: ValoracionRepository) => {
  const valoracionController = new ValoracionController(valoracionRepository);
  router.delete(
    "/",
    valoracionController.deleteValoracion.bind(valoracionController)
  );
  router.post(
    "/",
    valoracionController.saveValoracion.bind(valoracionController)
  );
  router.put(
    "/",
    valoracionController.updateValoracion.bind(valoracionController)
  );

  router.get(
    "/",
    valoracionController.getValoracion.bind(valoracionController)
  );

  return router;
};
