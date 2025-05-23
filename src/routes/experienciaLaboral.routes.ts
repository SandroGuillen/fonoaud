import { Router } from "express";
import { ExperienciaLaboralController } from "../controllers/ExperienciaLaboralController";
import { ExperienciaLaboralRepository } from "../repositories/experienciaLaboralRepository";

const router = Router();

export default (experienciaLaboralRepository: ExperienciaLaboralRepository) => {
  const experienciaLaboralController = new ExperienciaLaboralController(
    experienciaLaboralRepository
  );
  router.delete(
    "/",
    experienciaLaboralController.deleteExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );
  router.get(
    "/",
    experienciaLaboralController.getExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );
  router.put(
    "/",
    experienciaLaboralController.updateExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );

  router.post(
    "/",
    experienciaLaboralController.saveExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );

  return router;
};
