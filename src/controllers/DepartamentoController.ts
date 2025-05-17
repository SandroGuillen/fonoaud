import { Request, Response } from "express";
import { DepartamentoRepository } from "../repositories/departamentoRepository";
import { ObjectId } from "mongodb";
import { Departamento } from "../types";

export class DepartamentoController {
  constructor(private DepartamentoRepository: DepartamentoRepository) {}

  async getDepartamento(req: Request, res: Response) {
    try {
       const { departamento_id } = req.query;
      
            if (departamento_id && typeof departamento_id == "string") {
              const departamentoObjectId = ObjectId.createFromHexString(departamento_id);
              const result = await this.DepartamentoRepository.getOne({
                _id: departamentoObjectId,
              });
              if (result) res.status(200).json(result);
              else res.status(404).json({ error: "No se encontró el departamento" });
            } else {
              const result = await this.DepartamentoRepository.getAll();
              res.status(200).json(result);
            }
      
    } catch (error) {}
  }

  async updateDepartamento(req: Request, res: Response) {
    try {
      const { departamentoData } = req.body;
      await this.DepartamentoRepository.updateOne(
        { _id: departamentoData._id },
        departamentoData
      );
      res.status(200).json({ msg: "Actualizado con éxito" });
    } catch (error) {}
  }

  async deleteDepartamento(req: Request, res: Response) {
    try {
      const { departamento_id } = req.params;
      if (departamento_id && typeof departamento_id == "string") {
        const departamentoObjectId = ObjectId.createFromHexString(departamento_id);
        await this.DepartamentoRepository.deleteOne({ _id: departamentoObjectId });
        res.status(200).json({ msg: "eliminado con éxito" });
      }
    } catch (error) {}
  }

  async saveDepartamento(req: Request, res: Response) {
    try {
      const departamento: Departamento = req.body.departamentoData;
            if (true) {
              res.status(400).json({ error: "Departamento ya existe" });
            } else {
              await this.DepartamentoRepository.insertOne(departamento);
              res.status(201).json(departamento);
            }
    } catch (error) {}
  }
}