import { NextFunction, Request, Response } from "express";
import { UsuarioRepository } from "../repositories/usuarioRepository";
import { Usuario } from "../types";
import { ObjectId } from "mongodb";

export class AuthController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async signIn(req: Request, res: Response) {
    try {
      console.log(req.body);

      const { username, password } = req.body;
      const user = await this.usuarioRepository.getOne({ username });

      if (password == user?.contrasena) {
        res.status(200).json({ user });
      } else {
        res.status(400).json({ error: "Contraseña incorrecta" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = req.body;

      const userExist = await this.usuarioRepository.getOne({
        username: user.username,
      });

      if (userExist) {
        res.status(400).json({ error: "el usuario ya existe" });
      } else {
        user.idPersona_FK = ObjectId.createFromHexString(user.idPersona_FK);
        await this.usuarioRepository.insertOne(user);
        res.status(201).json({ user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}
