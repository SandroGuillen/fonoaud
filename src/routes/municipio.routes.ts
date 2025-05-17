import { Router } from "express";
import { MunicipioController } from "../controllers/MunicipioController";
import { MunicipioRepository } from "../repositories/municipioRepository";

const router = Router();

export default (municipioRepository: MunicipioRepository) => {
  const municipioController = new MunicipioController(
    municipioRepository
  );
  router.delete(
    "/eliminar-Municipio",
    municipioController.deleteMunicipio.bind(
      municipioController
    )
  );
  router.get(
    "/registrar-Municipio",
    municipioController.getMunicipio.bind(
      municipioController
    )
  );
  router.put(
    "/actualizar-Municipio",
    municipioController.updateMunicipio.bind(
      municipioController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
