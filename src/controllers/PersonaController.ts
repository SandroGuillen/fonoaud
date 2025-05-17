import { Request, Response } from "express";
import { PersonaRepository } from "../repositories/personaRepository";
import { ObjectId } from "mongodb";
import { Persona } from "../types";

export class PersonaController {
  constructor(private personaRepository: PersonaRepository) {}

  async getPersona(req: Request, res: Response) {
    try {
      const { persona_id } = req.query;

      if (persona_id && typeof persona_id == "string") {
        const personaObjectId = ObjectId.createFromHexString(persona_id);
        const result = await this.personaRepository.getOne({
          _id: personaObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el persona" });
      } else {
        const result = await this.personaRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  async updatePersona(req: Request, res: Response) {
    try {
      const { personaData } = req.body;
      await this.personaRepository.updateOne(
        { _id: personaData._id },
        personaData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {}
  }

  async deletePersona(req: Request, res: Response) {
    try {
      const { persona_id } = req.params;
      if (persona_id && typeof persona_id == "string") {
        const personaObjectId = ObjectId.createFromHexString(persona_id);
        await this.personaRepository.deleteOne({ _id: personaObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async savePersona(req: Request, res: Response) {
    try {
      const persona: Persona = req.body;

      const personaExist = await this.personaRepository.getOne({
        identificacion: persona.identificacion,
      });
      if (personaExist) {
        res.status(400).json({ error: "persona ya existe" });
      } else {
        await this.personaRepository.insertOne(persona);
        res.status(201).json(persona);
      }
    } catch (error) {}
  }
}
