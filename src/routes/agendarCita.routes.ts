import { Router } from "express";
import { AgendarCitaController } from "../controllers/AgendarCitaController";
import { AgendarCitaRepository } from "../repositories/agendarCitaRepository";

const router = Router();

export default (AgendarCitaRepository: AgendarCitaRepository) => {
  const agendarCitaController = new AgendarCitaController(
    AgendarCitaRepository
  );

  router.get(
    "/all",
    agendarCitaController.getAgendarCitasPaginadas.bind(agendarCitaController)
  );

  router.delete(
    "/:agendarCita_id",
    agendarCitaController.deleteAgendarCita.bind(agendarCitaController)
  );

  router.get(
    "/",
    agendarCitaController.getAgendarCita.bind(agendarCitaController)
  );

  router.put(
    "/",
    agendarCitaController.updateAgendarCita.bind(agendarCitaController)
  );

  router.post(
    "/",
    agendarCitaController.saveAgendarCita.bind(agendarCitaController)
  );

  return router;
};
