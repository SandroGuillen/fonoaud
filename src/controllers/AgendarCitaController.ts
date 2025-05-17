import { Request, Response } from "express";
import { AgendarCitaRepository } from "../repositories/agendarCitaRepository";
import { ObjectId } from "mongodb";
import { AgendarCita } from "../types";

export class AgendarCitaController {
  constructor(private agendarCitaRepository: AgendarCitaRepository) {}

  async getAgendarCita(req: Request, res: Response) {
    try {
      const { agendarCita_id } = req.query;

      if (agendarCita_id && typeof agendarCita_id == "string") {
        const agendarCitaObjectId =
          ObjectId.createFromHexString(agendarCita_id);
        const result = await this.agendarCitaRepository.getOne({
          _id: agendarCitaObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el agendarCita" });
      } else {
        const result = await this.agendarCitaRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  async updateAgendarCita(req: Request, res: Response) {
    try {
      const { agendarCitaData } = req.body;
      await this.agendarCitaRepository.updateOne(
        { _id: agendarCitaData._id },
        agendarCitaData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {}
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
    } catch (error) {}
  }

  async saveAgendarCita(req: Request, res: Response) {
    try {
      const agendarCita: AgendarCita = req.body.agendarCitaData;

      const agendarCitaExist = await this.agendarCitaRepository.getOne({
        idPaciente_FK: agendarCita.idPaciente_FK,
        idFonoaudiologo_FK: agendarCita.idFonoaudiologo_FK,
        fechaCita: agendarCita.fechaCita,
      });
      if (!agendarCitaExist) {
        res.status(400).json({ error: "La cita agendada ya existe" });
      } else {
        await this.agendarCitaRepository.insertOne(agendarCita);
        res.status(201).json(agendarCita);
      }
    } catch (error) {}
  }
}
