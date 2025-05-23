import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { FormacionAcademicaRepository } from "../repositories/formacionAcademicaRespository";
import { FormacionAcademica } from "../types";

export class FormacionAcademicaController {
  constructor(
    private formacionAcademicaRepository: FormacionAcademicaRepository
  ) {}

  async getFormacionAcademica(req: Request, res: Response) {
    try {
      const { formacionAcademica_id } = req.query;

      if (formacionAcademica_id && typeof formacionAcademica_id === "string") {
        // Validar formato de ObjectId
        if (!ObjectId.isValid(formacionAcademica_id)) {
          res.status(400).json({
            error: "ID de formación académica inválido",
          });
          return;
        }

        const formacionAcademicaObjectId = ObjectId.createFromHexString(
          formacionAcademica_id
        );

        const result = await this.formacionAcademicaRepository.getOne({
          _id: formacionAcademicaObjectId,
        });

        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({
            error: "No se encontró la formación académica",
          });
        }
      } else {
        // Obtener todas las formaciones académicas
        const result = await this.formacionAcademicaRepository.getAll();
        res.status(200).json(result);
      }
    } catch (error) {
      console.error("Error al obtener formación académica:", error);
      res.status(500).json({
        error: "Error interno del servidor al obtener la formación académica",
      });
    }
  }

  async saveFormacionAcademica(req: Request, res: Response) {
    try {
      const formacionData: FormacionAcademica = req.body;

      // Validaciones básicas
      if (
        !formacionData.finFormacion ||
        !formacionData.titulo ||
        !formacionData.nombreEntidad
      ) {
        return res.status(400).json({
          error: "Los campos institución, título y nivel son obligatorios",
        });
      }

      if (!formacionData.fonoAudio_FK) {
        return res.status(400).json({
          error: "El ID de usuario es obligatorio",
        });
      }

      // Convertir IDs a ObjectId si es necesario
      const dataToSave: FormacionAcademica = {
        ...formacionData,
        fonoAudio_FK: ObjectId.createFromHexString(
          formacionData.fonoAudio_FK.toString()
        ),
      };

      const result = await this.formacionAcademicaRepository.insertOne(
        dataToSave
      );

      if (result) {
        res.status(201).json({
          message: "Formación académica creada exitosamente",
          data: result,
        });
      } else {
        res.status(500).json({
          error: "Error al crear la formación académica",
        });
      }
    } catch (error) {
      console.error("Error al guardar formación académica:", error);
      res.status(500).json({
        error: "Error interno del servidor al guardar la formación académica",
      });
    }
  }

  async updateFormacionAcademica(req: Request, res: Response) {
    try {
      const { formacionAcademica_id } = req.params;
      const updateData = req.body;

      // Validar ID
      if (!formacionAcademica_id || !ObjectId.isValid(formacionAcademica_id)) {
        res.status(400).json({
          error: "ID de formación académica inválido",
        });
        return;
      }

      // Verificar que el registro existe
      const formacionAcademicaObjectId = ObjectId.createFromHexString(
        formacionAcademica_id
      );
      const existingRecord = await this.formacionAcademicaRepository.getOne({
        _id: formacionAcademicaObjectId,
      });

      if (!existingRecord) {
        res.status(404).json({
          error: "No se encontró la formación académica a actualizar",
        });
        return;
      }

      // Agregar fecha de actualización
      const dataToUpdate = {
        ...updateData,
        fechaActualizacion: new Date(),
      };

      const result = await this.formacionAcademicaRepository.updateOne(
        { _id: formacionAcademicaObjectId },
        { $set: dataToUpdate }
      );

      if (result) {
        res.status(200).json({
          message: "Formación académica actualizada exitosamente",
          data: result,
        });
      }
    } catch (error) {
      console.error("Error al actualizar formación académica:", error);
      res.status(500).json({
        error:
          "Error interno del servidor al actualizar la formación académica",
      });
    }
  }

  async deleteFormacionAcademica(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { formacionAcademica_id } = req.params;

      // Validar ID
      if (!formacionAcademica_id || !ObjectId.isValid(formacionAcademica_id)) {
        res.status(400).json({
          error: "ID de formación académica inválido",
        });
        return;
      }

      const formacionAcademicaObjectId = ObjectId.createFromHexString(
        formacionAcademica_id
      );

      // Verificar que el registro existe antes de eliminar
      const existingRecord = await this.formacionAcademicaRepository.getOne({
        _id: formacionAcademicaObjectId,
      });

      if (!existingRecord) {
        res.status(404).json({
          error: "No se encontró la formación académica a eliminar",
        });
        return;
      }

      const result = await this.formacionAcademicaRepository.deleteOne({
        _id: formacionAcademicaObjectId,
      });

      if (result) {
        res.status(200).json({
          message: "Formación académica eliminada exitosamente",
        });
      } else {
        res.status(500).json({
          error: "Error al eliminar la formación académica",
        });
      }
    } catch (error) {
      console.error("Error al eliminar formación académica:", error);
      res.status(500).json({
        error: "Error interno del servidor al eliminar la formación académica",
      });
    }
  }

  // Método adicional: Obtener formaciones académicas por usuario
  async getFormacionAcademicaByUsuario(req: Request, res: Response) {
    try {
      const { usuario_id } = req.params;

      if (!usuario_id || !ObjectId.isValid(usuario_id)) {
        return res.status(400).json({
          error: "ID de usuario inválido",
        });
      }

      const usuarioObjectId = ObjectId.createFromHexString(usuario_id);
      const result = await this.formacionAcademicaRepository.getAll({
        usuarioId: usuarioObjectId,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(
        "Error al obtener formaciones académicas por usuario:",
        error
      );
      res.status(500).json({
        error:
          "Error interno del servidor al obtener las formaciones académicas",
      });
    }
  }
}
