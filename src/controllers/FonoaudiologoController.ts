import { Request, Response } from "express";
import { FonoaudiologoRepository } from "../repositories/fonoaudiologoRepository";
import { ObjectId } from "mongodb";
import { Fonoaudiologo } from "../types";
import { PersonaRepository } from "../repositories/personaRepository";

export class FonoaudiologoController {
  constructor(
    private fonoaudiologoRepository: FonoaudiologoRepository,
    private personaRepository: PersonaRepository
  ) {}

  async getFonoaudiologo(req: Request, res: Response) {
    try {
      const { fonoaudiologo_id } = req.query;

      if (fonoaudiologo_id && typeof fonoaudiologo_id == "string") {
        const fonoaudiologoObjectId =
          ObjectId.createFromHexString(fonoaudiologo_id);
        const result = await this.fonoaudiologoRepository.getOne({
          _id: fonoaudiologoObjectId,
        });
        if (result) res.status(200).json(result);
        else res.status(404).json({ error: "No se encontró el fonoaudiologo" });
      } else {
        const result = await this.fonoaudiologoRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  async updateFonoaudiologo(req: Request, res: Response) {
    try {
      const { fonoaudiologoData } = req.body;
      await this.fonoaudiologoRepository.updateOne(
        { _id: fonoaudiologoData._id },
        fonoaudiologoData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {}
  }

  async deleteFonoaudiologo(req: Request, res: Response) {
    try {
      const { fonoauiologo_id } = req.params;
      if (fonoauiologo_id && typeof fonoauiologo_id == "string") {
        const fonoauiologoObjectId =
          ObjectId.createFromHexString(fonoauiologo_id);
        await this.fonoaudiologoRepository.deleteOne({
          _id: fonoauiologoObjectId,
        });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.fonoaudiologoRepository.getAll();
      const result = await Promise.all(
        data.map(async (fono) => {
          const persona = await this.personaRepository.getOne({
            identificacion: fono.identificacion,
          });

          return {
            ...fono,
            ...persona,
          };
        })
      );

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async saveFonoaudiologo(req: Request, res: Response) {
    try {
      const fonoaudiologo: Fonoaudiologo = req.body.fonoaudiologoData;

      const fonoaudiologoExist = await this.fonoaudiologoRepository.getOne({
        identificacion: fonoaudiologo.identificacion,
      });
      if (!fonoaudiologoExist) {
        res.status(400).json({ error: "fonoaudiologo ya existe" });
      } else {
        await this.fonoaudiologoRepository.insertOne(fonoaudiologo);
        res.status(201).json(fonoaudiologo);
      }
    } catch (error) {}
  }
}
