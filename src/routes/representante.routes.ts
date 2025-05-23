import { Router } from "express";
import { RepresentanteController } from "../controllers/RepresentanteController";
import { RepresentanteRepository } from "../repositories/representanteRepository";

const router = Router();

export default (representanteRepository: RepresentanteRepository) => {
  const representanteController = new RepresentanteController(
    representanteRepository
  );
  router.delete(
    "/",
    representanteController.deleteRepresentante.bind(representanteController)
  );
  router.get(
    "/",
    representanteController.getRepresentante.bind(representanteController)
  );
  router.put(
    "/",
    representanteController.updateRepresentante.bind(representanteController)
  );

  router.post(
    "/",
    representanteController.updateRepresentante.bind(representanteController)
  );

  return router;
};
