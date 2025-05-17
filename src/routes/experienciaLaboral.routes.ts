import { Router } from "express";
import { ExperienciaLaboralController } from "../controllers/ExperienciaLaboralController";
import { ExperienciaLaboralRepository } from "../repositories/experienciaLaboralRepository";

const router = Router();

export default (experienciaLaboralRepository: ExperienciaLaboralRepository) => {
  const experienciaLaboralController = new ExperienciaLaboralController(
    experienciaLaboralRepository
  );
  router.delete(
    "/eliminar-ExperienciaLaboral",
    experienciaLaboralController.deleteExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );
  router.get(
    "/registrar-ExperienciaLaboral",
    experienciaLaboralController.getExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );
  router.put(
    "/actualizar-ExperienciaLaboral",
    experienciaLaboralController.updateExperienciaLaboral.bind(
      experienciaLaboralController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
