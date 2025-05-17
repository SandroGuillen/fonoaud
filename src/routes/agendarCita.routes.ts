import { Router } from "express";
import { AgendarCitaController } from "../controllers/AgendarCitaController";
import { AgendarCitaRepository } from "../repositories/agendarCitaRepository";

const router = Router();

export default (AgendarCitaRepository: AgendarCitaRepository) => {
  const agendarCitaController = new AgendarCitaController(
    AgendarCitaRepository
  );
  router.delete(
    "/eliminar-cita",
    agendarCitaController.deleteAgendarCita.bind(AgendarCitaController)
  );
  router.get(
    "/registrar-cita",
    agendarCitaController.getAgendarCita.bind(AgendarCitaController)
  );
  router.put(
    "/actualizar-cita",
    agendarCitaController.updateAgendarCita.bind(AgendarCitaController)
  );

  router.post("", (req, res) => {});

  return router;
};
