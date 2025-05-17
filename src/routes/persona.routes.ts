import { Router } from "express";
import { PersonaController } from "../controllers/PersonaController";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (personaRepository: PersonaRepository) => {
  const personaController = new PersonaController(personaRepository);
  router.delete(
    "/eliminar-persona",
    personaController.deletePersona.bind(personaController)
  );
  router.post(
    "/registrar-persona",
    personaController.savePersona.bind(personaController)
  );
  router.put(
    "/actualizar-persona",
    personaController.updatePersona.bind(personaController)
  );

  router.post("", (req, res) => {});

  return router;
};
