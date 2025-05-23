import { Request, Response } from "express";
import { ExperienciaLaboralRepository } from "../repositories/experienciaLaboralRepository";
import { ObjectId } from "mongodb";
import { ExperienciaLaboral } from "../types";

export class ExperienciaLaboralController {
  constructor(
    private experienciaLaboralRepository: ExperienciaLaboralRepository
  ) {}

  async getExperienciaLaboral(req: Request, res: Response) {
    try {
      const { experienciaLaboral_id } = req.query;

      if (experienciaLaboral_id && typeof experienciaLaboral_id == "string") {
        const experienciaLaboralObjectId = ObjectId.createFromHexString(
          experienciaLaboral_id
        );
        const result = await this.experienciaLaboralRepository.getOne({
          _id: experienciaLaboralObjectId,
        });
        if (result) res.status(200).json(result);
        else
          res
            .status(404)
            .json({ error: "No se encontró el experienciaLaboral" });
      } else {
        const result = await this.experienciaLaboralRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateExperienciaLaboral(req: Request, res: Response) {
    try {
      const { experienciaLaboralData } = req.body;
      await this.experienciaLaboralRepository.updateOne(
        { _id: experienciaLaboralData._id },
        experienciaLaboralData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteExperienciaLaboral(req: Request, res: Response) {
    try {
      const { experienciaLaboral_id } = req.params;
      if (experienciaLaboral_id && typeof experienciaLaboral_id == "string") {
        const experienciaLaboralObjectId = ObjectId.createFromHexString(
          experienciaLaboral_id
        );
        await this.experienciaLaboralRepository.deleteOne({
          _id: experienciaLaboralObjectId,
        });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async saveExperienciaLaboral(req: Request, res: Response) {
    try {
      const experienciaLaboral: ExperienciaLaboral =
        req.body.experienciaLaboralData;

      await this.experienciaLaboralRepository.insertOne(experienciaLaboral);
      res.status(201).json(experienciaLaboral);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
