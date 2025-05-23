import { Request, Response } from "express";
import { RepresentanteRepository } from "../repositories/representanteRepository";
import { ObjectId } from "mongodb";
import { Representante } from "../types";

export class RepresentanteController {
  constructor(private representanteRepository: RepresentanteRepository) {}

  async getRepresentante(req: Request, res: Response) {
    try {
      const { representante_id } = req.query;

      if (representante_id && typeof representante_id == "string") {
        const representanteObjectId =
          ObjectId.createFromHexString(representante_id);
        const result = await this.representanteRepository.getOne({
          _id: representanteObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el representante" });
      } else {
        const result = await this.representanteRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  async updateRepresentante(req: Request, res: Response) {
    try {
      const { representanteData } = req.body;
      await this.representanteRepository.updateOne(
        { _id: representanteData._id },
        representanteData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {}
  }

  async deleteRepresentante(req: Request, res: Response) {
    try {
      const { representante_id } = req.params;
      if (representante_id && typeof representante_id == "string") {
        const representanteObjectId =
          ObjectId.createFromHexString(representante_id);
        await this.representanteRepository.deleteOne({
          _id: representanteObjectId,
        });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async saveRepresentante(req: Request, res: Response) {
    try {
      const representante: Representante = req.body.representanteData;

      const representanteExist = await this.representanteRepository.getOne({
        identificacion: representante.identificacion,
      });
      if (!representanteExist) {
        res.status(400).json({ error: "representante ya existe" });
      } else {
        await this.representanteRepository.insertOne(representante);
        res.status(201).json(representante);
      }
    } catch (error) {}
  }
}
