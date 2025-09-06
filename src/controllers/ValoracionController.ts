import { Request, Response } from "express";
import { ValoracionRepository } from "../repositories/valoracionRepository";
import { ObjectId } from "mongodb";
import { Valoracion } from "../types/valoracion";
import { PersonaRepository } from "../repositories/personaRepository";

export class ValoracionController {
  constructor(
    private valoracionRepository: ValoracionRepository,
    private personaRepository: PersonaRepository
  ) {}

  async getValoracion(req: Request, res: Response) {
    try {
      const filter: Partial<Valoracion> = req.body;
      const result = await this.valoracionRepository.getAll(filter);

      const data = await Promise.all(
        result.map(async (val) => {
          const paciente = await this.personaRepository.getOne({
            identificacion: parseInt(val.idPaciente_FK),
          });

          return {
            ...val,
            paciente,
          };
        })
      );
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getValoracionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let _id = ObjectId.createFromHexString(id);
      const valoracion = await this.valoracionRepository.getOne({ _id });

      if (!valoracion) {
        return res.status(404).json({ message: "No encontrado" });
      }

      const paciente = await this.personaRepository.getOne({
        identificacion: parseInt(valoracion.idPaciente_FK),
      });

      return res.status(200).json({ ...valoracion, paciente });
    } catch (error) {
      console.log(error);
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
      const valoracion: Valoracion = req.body;

      await this.valoracionRepository.insertOne(valoracion);
      res.status(201).json(valoracion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
