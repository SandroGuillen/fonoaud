import { Request, Response } from "express";
import { MunicipioRepository } from "../repositories/municipioRepository";
import { ObjectId } from "mongodb";
import { Municipio } from "../types";

export class MunicipioController {
  constructor(private municipioRepository: MunicipioRepository) {}

  async getMunicipio(req: Request, res: Response) {
    try {
      const { municipio_id } = req.query;
    
          if (municipio_id && typeof municipio_id == "string") {
            const municipioObjectId = ObjectId.createFromHexString(municipio_id);
            const result = await this.municipioRepository.getOne({
              _id: municipioObjectId,
            });
            if (result) res.status(200).json(result);
            else res.status(404).json({ error: "No se encontró el municipio" });
          } else {
            const result = await this.municipioRepository.getAll();
            res.status(200).json(result);
          }
    } catch (error) {}
  }

  async updateMunicipio(req: Request, res: Response) {
    try {
      const { municipioData } = req.body;
      await this.municipioRepository.updateOne(
        { _id: municipioData._id },
        municipioData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    
    } catch (error) {}
  }

  async deleteMunicipio(req: Request, res: Response) {
    try {
      const { municipio_id } = req.params;
      if (municipio_id && typeof municipio_id == "string") {
        const municipioObjectId = ObjectId.createFromHexString(municipio_id);
        await this.municipioRepository.deleteOne({ _id: municipioObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async saveMunicipio(req: Request, res: Response) {
    try {
      const municipio: Municipio = req.body.municipioData;
                  if (true) {
                    res.status(400).json({ error: "municipio ya existe" });
                  } else {
                    await this.municipioRepository.insertOne(municipio);
                    res.status(201).json(municipio);
                  }
    } catch (error) {}
  }
}
