import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { PacienteRepository } from "../repositories/pacienteRepository";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (
  pacienteRepository: PacienteRepository,
  personaRepository: PersonaRepository
) => {
  const pacienteController = new PacienteController(
    pacienteRepository,
    personaRepository
  );
  router.delete(
    "/",
    pacienteController.deletePaciente.bind(pacienteController)
  );
  router.post("/", pacienteController.savePaciente.bind(pacienteController));
  router.put("/", pacienteController.updatePaciente.bind(pacienteController));

  router.get("/", pacienteController.getPacienteById.bind(pacienteController));

  router.get("/all", pacienteController.getPacientes.bind(pacienteController));

  return router;
};
