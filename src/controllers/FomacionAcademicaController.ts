import { Request, Response } from "express";
import { FormacionAcademicaRepository } from "../repositories/formacionAcademicaRespository";
import { ObjectId } from "mongodb";

export class FormacionAcademicaController {
  constructor(
    private FormacionAcademicaRepository: FormacionAcademicaRepository
  ) {}

  async getFormacionAcademica(req: Request, res: Response) {
    try {
      const { formacionAcademica_id } = req.query;

      if (formacionAcademica_id && typeof formacionAcademica_id == "string") {
        const formacionAcademicaObjectId = ObjectId.createFromHexString(
          formacionAcademica_id
        );
        const result = await this.FormacionAcademicaRepository.getOne({
          _id: formacionAcademicaObjectId,
        });
        if (result) res.status(200).json(result);
        else
          res
            .status(404)
            .json({ error: "No se encontró el formacionAcademica" });
      } else {
        const result = await this.FormacionAcademicaRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  async updateFormacionAcademica(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async deleteFormacionAcademica(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async saveFormacionAcademica(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}
