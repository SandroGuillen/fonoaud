import { Request, Response } from "express";
import { PacienteRepository } from "../repositories/pacienteRepository";
import { ObjectId } from "mongodb";
import { Paciente } from "../types";
import { PersonaRepository } from "../repositories/personaRepository";

export class PacienteController {
  constructor(
    private pacienteRepository: PacienteRepository,
    private personaRepository: PersonaRepository
  ) {}

  async getPacientes(req: Request, res: Response) {
    try {
      const filter: any = req.query;

      if (filter.idFonoaudiologo_FK) {
        filter.idFonoaudiologo_FK = ObjectId.createFromHexString(
          filter.idFonoaudiologo_FK
        );
      }
      const result = await this.pacienteRepository.getAll(filter);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getPacienteById(req: Request, res: Response) {
    try {
      let { identificacion: id } = req.query;
      if (id && typeof id == "string") {
        const identificacion = parseInt(id);
        console.log(identificacion);

        const paciente = await this.pacienteRepository.getOne({
          identificacion,
        });
        const persona = await this.personaRepository.getOne({ identificacion });
        res.status(200).json({
          data: {
            ...paciente,
            ...persona,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatePaciente(req: Request, res: Response) {
    try {
      const { pacienteData } = req.body;
      await this.pacienteRepository.updateOne(
        { _id: pacienteData._id },
        pacienteData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePaciente(req: Request, res: Response) {
    try {
      const { paciente_id } = req.params;
      if (paciente_id && typeof paciente_id == "string") {
        const pacienteObjectId = ObjectId.createFromHexString(paciente_id);
        await this.pacienteRepository.deleteOne({ _id: pacienteObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async savePaciente(req: Request, res: Response) {
    try {
      const paciente: Paciente = req.body;

      const pacienteExist = await this.pacienteRepository.getOne({
        identificacion: paciente.identificacion,
      });
      if (pacienteExist) {
        res.status(400).json({ error: "Paciente ya existe" });
      } else {
        await this.pacienteRepository.insertOne(paciente);
        res.status(201).json(paciente);
      }
    } catch (error) {
      console.log("error en savePaciente");
      console.log(error);
    }
  }
}
