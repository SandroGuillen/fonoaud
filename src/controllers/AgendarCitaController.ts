import { Request, Response } from "express";
import { AgendarCitaRepository } from "../repositories/agendarCitaRepository";
import { ObjectId } from "mongodb";
import { AgendarCita } from "../types";

export class AgendarCitaController {
  constructor(private agendarCitaRepository: AgendarCitaRepository) {}

  async getAgendarCita(req: Request, res: Response) {
    try {
      const filter: Partial<AgendarCita> = req.query;

      const result = await this.agendarCitaRepository.getOne(filter);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateAgendarCita(req: Request, res: Response) {
    try {
      const { agendarCitaData } = req.body;
      await this.agendarCitaRepository.updateOne(
        { _id: agendarCitaData._id },
        agendarCitaData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteAgendarCita(req: Request, res: Response) {
    try {
      const { agendarCita_id } = req.params;
      if (agendarCita_id && typeof agendarCita_id == "string") {
        const agendarCitaObjectId =
          ObjectId.createFromHexString(agendarCita_id);
        await this.agendarCitaRepository.deleteOne({
          _id: agendarCitaObjectId,
        });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async saveAgendarCita(req: Request, res: Response) {
    try {
      const agendarCita: AgendarCita = req.body;

      console.log(agendarCita);
      const agendarCitaExist = await this.agendarCitaRepository.getOne({
        idPaciente_FK: agendarCita.idPaciente_FK,
        idFonoaudiologo_FK: agendarCita.idFonoaudiologo_FK,
        fechaCita: agendarCita.fechaCita,
      });
      if (agendarCitaExist) {
        res.status(400).json({ error: "La cita agendada ya existe" });
      } else {
        await this.agendarCitaRepository.insertOne(agendarCita);
        res.status(201).json(agendarCita);
      }
    } catch (error) {
      console.log("error guardando cita", error);

      res.status(500).json({
        error: "Error al guardar la cita agendada",
        details: error instanceof Error ? error.message : error,
      });
    }
  }

  async getAgendarCitasPaginadas(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { page: _, limit: __, ...queryParams } = req.query;
      const filter: Partial<AgendarCita> = queryParams;

      if (filter.idFonoaudiologo_FK) {
        filter.idFonoaudiologo_FK = parseInt(
          filter.idFonoaudiologo_FK.toString()
        );
      }

      const result =
        await this.agendarCitaRepository.getAllPaginatedWithPaciente(
          filter,
          page,
          limit
        );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las citas",
        details: error instanceof Error ? error.message : error,
      });
    }
  }
}
