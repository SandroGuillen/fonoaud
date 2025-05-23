import { Request, Response } from "express";
import { PaisRepository } from "../repositories/paisRepository";
import { ObjectId } from "mongodb";
import { Pais } from "../types";

export class PaisController {
  constructor(private paisRepository: PaisRepository) {}

  async getPais(req: Request, res: Response) {
    try {
      const { pais_id } = req.query;

      if (pais_id && typeof pais_id == "string") {
        const paisObjectId = ObjectId.createFromHexString(pais_id);
        const result = await this.paisRepository.getOne({
          _id: paisObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el pais" });
      } else {
        const result = await this.paisRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updatePais(req: Request, res: Response) {
    try {
      const { paisData } = req.body;
      await this.paisRepository.updateOne({ _id: paisData._id }, paisData);
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deletePais(req: Request, res: Response) {
    try {
      const { pais_id } = req.params;
      if (pais_id && typeof pais_id == "string") {
        const paisObjectId = ObjectId.createFromHexString(pais_id);
        await this.paisRepository.deleteOne({ _id: paisObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async savePais(req: Request, res: Response) {
    try {
      const pais: Pais = req.body.paisData;
      if (true) {
        res.status(400).json({ error: "pais ya existe" });
      } else {
        await this.paisRepository.insertOne(pais);
        res.status(201).json(pais);
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
