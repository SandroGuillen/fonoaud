import { Router } from "express";
import { PersonaController } from "../controllers/PersonaController";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (personaRepository: PersonaRepository) => {
  const personaController = new PersonaController(personaRepository);
  router.delete("/", personaController.deletePersona.bind(personaController));
  router.post("/", personaController.savePersona.bind(personaController));
  router.put("/", personaController.updatePersona.bind(personaController));

  router.get("/", personaController.getPersona.bind(personaController));

  return router;
};
