import { Router } from "express";
import { FonoaudiologoController } from "../controllers/FonoaudiologoController";
import { FonoaudiologoRepository } from "../repositories/fonoaudiologoRepository";

const router = Router();

export default (FonoaudiologoRepository: FonoaudiologoRepository) => {
  const fonoaudiologoController = new FonoaudiologoController(
    FonoaudiologoRepository
  );
  router.delete(
    "/eliminar-Fonoaudiologo",
    fonoaudiologoController.deleteFonoaudiologo.bind(
      fonoaudiologoController
    )
  );
  router.get(
    "/registrar-Fonoaudiologo",
    fonoaudiologoController.getFonoaudiologo.bind(fonoaudiologoController)
  );
  router.put(
    "/actualizar-Fonoaudiologo",
    fonoaudiologoController.updateFonoaudiologo.bind(
      fonoaudiologoController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
