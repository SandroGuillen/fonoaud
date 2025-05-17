import { Router } from "express";
import { PaisController } from "../controllers/PaisController";
import { PaisRepository } from "../repositories/paisRepository";

const router = Router();

export default (paisRepository: PaisRepository) => {
  const paisController = new PaisController(
    paisRepository
  );
  router.delete(
    "/eliminar-Pais",
    paisController.deletePais.bind(
      paisController
    )
  );
  router.get(
    "/registrar-Pais",
    paisController.getPais.bind(
      paisController
    )
  );
  router.put(
    "/actualizar-Pais",
    paisController.updatePais.bind(
      paisController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
