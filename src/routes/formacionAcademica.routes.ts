import { Router } from "express";
import { FormacionAcademicaController } from "../controllers/FomacionAcademicaController";
import { FormacionAcademicaRepository } from "../repositories/formacionAcademicaRespository";

const router = Router();

export default (formacionAcademicaRepository: FormacionAcademicaRepository) => {
  const formacionAcademicaController = new FormacionAcademicaController(
    formacionAcademicaRepository
  );
  router.delete(
    "/eliminar-FormacionAcademica",
    formacionAcademicaController.deleteFormacionAcademica.bind(
      formacionAcademicaController
    )
  );
  router.get(
    "/registrar-FormacionAcademica",
    formacionAcademicaController.getFormacionAcademica.bind(
      formacionAcademicaController
    )
  );
  router.put(
    "/actualizar-FormacionAcademica",
    formacionAcademicaController.updateFormacionAcademica.bind(
      formacionAcademicaController
    )
  );

  router.post("", (req, res) => {});

  return router;
};
