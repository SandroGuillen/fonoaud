import { Router } from "express";
import { FonoaudiologoController } from "../controllers/FonoaudiologoController";
import { FonoaudiologoRepository } from "../repositories/fonoaudiologoRepository";

const router = Router();

export default (FonoaudiologoRepository: FonoaudiologoRepository) => {
  const fonoaudiologoController = new FonoaudiologoController(
    FonoaudiologoRepository
  );
  router.delete(
    "/",
    fonoaudiologoController.deleteFonoaudiologo.bind(fonoaudiologoController)
  );
  router.get(
    "/",
    fonoaudiologoController.getFonoaudiologo.bind(fonoaudiologoController)
  );
  router.put(
    "/",
    fonoaudiologoController.updateFonoaudiologo.bind(fonoaudiologoController)
  );

  router.post(
    "/",
    fonoaudiologoController.updateFonoaudiologo.bind(fonoaudiologoController)
  );

  return router;
};
