import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { PacienteRepository } from "../repositories/pacienteRepository";

const router = Router();

export default (pacienteRepository: PacienteRepository) => {
  const pacienteController = new PacienteController(pacienteRepository);
  router.delete(
    "/",
    pacienteController.deletePaciente.bind(pacienteController)
  );
  router.post("/", pacienteController.savePaciente.bind(pacienteController));
  router.put("/", pacienteController.updatePaciente.bind(pacienteController));

  router.get("/", pacienteController.getPacientes.bind(pacienteController));

  return router;
};
