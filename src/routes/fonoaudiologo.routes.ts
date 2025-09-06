import { Router } from "express";
import { FonoaudiologoController } from "../controllers/FonoaudiologoController";
import { FonoaudiologoRepository } from "../repositories/fonoaudiologoRepository";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (
  FonoaudiologoRepository: FonoaudiologoRepository,
  personaRepository: PersonaRepository
) => {
  const fonoaudiologoController = new FonoaudiologoController(
    FonoaudiologoRepository,
    personaRepository
  );
  router.delete(
    "/",
    fonoaudiologoController.deleteFonoaudiologo.bind(fonoaudiologoController)
  );

  router.get(
    "/all",
    fonoaudiologoController.getAll.bind(fonoaudiologoController)
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
