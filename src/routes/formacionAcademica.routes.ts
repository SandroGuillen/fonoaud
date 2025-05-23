import { Router } from "express";
import { FormacionAcademicaController } from "../controllers/FomacionAcademicaController";
import { FormacionAcademicaRepository } from "../repositories/formacionAcademicaRespository";

const router = Router();

export default (formacionAcademicaRepository: FormacionAcademicaRepository) => {
  const formacionAcademicaController = new FormacionAcademicaController(
    formacionAcademicaRepository
  );
  router.delete(
    "/",
    formacionAcademicaController.deleteFormacionAcademica.bind(
      formacionAcademicaController
    )
  );
  router.get(
    "/",
    formacionAcademicaController.getFormacionAcademica.bind(
      formacionAcademicaController
    )
  );
  router.put(
    "/",
    formacionAcademicaController.updateFormacionAcademica.bind(
      formacionAcademicaController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
