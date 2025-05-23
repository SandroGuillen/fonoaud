import { Router } from "express";
import { AgendarCitaController } from "../controllers/AgendarCitaController";
import { AgendarCitaRepository } from "../repositories/agendarCitaRepository";

const router = Router();

export default (AgendarCitaRepository: AgendarCitaRepository) => {
  const agendarCitaController = new AgendarCitaController(
    AgendarCitaRepository
  );
  router.delete(
    "/",
    agendarCitaController.deleteAgendarCita.bind(AgendarCitaController)
  );
  router.get(
    "/",
    agendarCitaController.getAgendarCita.bind(AgendarCitaController)
  );
  router.put(
    "/",
    agendarCitaController.updateAgendarCita.bind(AgendarCitaController)
  );

  router.post(
    "/",
    agendarCitaController.saveAgendarCita.bind(AgendarCitaController)
  );

  return router;
};
