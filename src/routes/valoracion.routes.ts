import { Router } from "express";
import { ValoracionController } from "../controllers/ValoracionController";
import { ValoracionRepository } from "../repositories/valoracionRepository";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (
  valoracionRepository: ValoracionRepository,
  personaRepository: PersonaRepository
) => {
  const valoracionController = new ValoracionController(
    valoracionRepository,
    personaRepository
  );

  router.get(
    "/:id",
    valoracionController.getValoracionById.bind(valoracionController)
  );
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

  router.post(
    "/search",
    valoracionController.getValoracion.bind(valoracionController)
  );

  return router;
};
