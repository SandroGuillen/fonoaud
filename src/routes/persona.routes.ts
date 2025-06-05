import { Router } from "express";
import { PersonaController } from "../controllers/PersonaController";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (personaRepository: PersonaRepository) => {
  const personaController = new PersonaController(personaRepository);
  router.delete(
    "/:persona_id",
    personaController.deletePersona.bind(personaController)
  );
  router.post("/", personaController.savePersona.bind(personaController));
  router.put("/", personaController.updatePersona.bind(personaController));

  router.get(
    "/:persona_id",
    personaController.getPersonaById.bind(personaController)
  );
  router.get("/", personaController.getPersona.bind(personaController));

  return router;
};
