import { Router } from "express";
import { RepresentanteController } from "../controllers/RepresentanteController";
import { RepresentanteRepository } from "../repositories/representanteRepository";

const router = Router();

export default (representanteRepository: RepresentanteRepository) => {
  const representanteController = new RepresentanteController(
    representanteRepository
  );
  router.delete(
    "/eliminar-Representante",
    representanteController.deleteRepresentante.bind(
      representanteController
    )
  );
  router.get(
    "/registrar-Representante",
    representanteController.getRepresentante.bind(
      representanteController
    )
  );
  router.put(
    "/actualizar-Representante",
    representanteController.updateRepresentante.bind(
      representanteController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
