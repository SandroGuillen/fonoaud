import { Request, Response } from "express";
import { ValoracionRepository } from "../repositories/valoracionRepository";
import { ObjectId } from "mongodb";
import { Valoracion } from "../types/valoracion";

export class ValoracionController {
  constructor(private valoracionRepository: ValoracionRepository) {}

  async getValoracion(req: Request, res: Response) {
    try {
      const { valoracion_id } = req.query;

      if (valoracion_id && typeof valoracion_id == "string") {
        const valoracionObjectId = ObjectId.createFromHexString(valoracion_id);
        const result = await this.valoracionRepository.getOne({
          _id: valoracionObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el valoracion" });
      } else {
        const result = await this.valoracionRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateValoracion(req: Request, res: Response) {
    try {
      const { valoracionData } = req.body;
      await this.valoracionRepository.updateOne(
        { _id: valoracionData._id },
        valoracionData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteValoracion(req: Request, res: Response) {
    try {
      const { valoracion_id } = req.params;
      if (valoracion_id && typeof valoracion_id == "string") {
        const valoracionObjectId = ObjectId.createFromHexString(valoracion_id);
        await this.valoracionRepository.deleteOne({ _id: valoracionObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async saveValoracion(req: Request, res: Response) {
    try {
      const valoracion: Valoracion = req.body.valoracionData;

      const valoracionExist = await this.valoracionRepository.getOne({
        // identificacion: valoracion.identificacion, verificar
      });
      if (!valoracionExist) {
        res.status(400).json({ error: "valoracion ya existe" });
      } else {
        await this.valoracionRepository.insertOne(valoracion);
        res.status(201).json(valoracion);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
