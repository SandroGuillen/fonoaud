import { NextFunction, Request, Response } from "express";
import { UsuarioRepository } from "../repositories/usuarioRepository";
import { Usuario } from "../types";
import { ObjectId } from "mongodb";
import { PersonaRepository } from "../repositories/personaRepository";

export class AuthController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private personaRepository: PersonaRepository
  ) {}

  async signIn(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this.usuarioRepository.getOne({ username });

      if (user && password == user.contrasena) {
        const persona = await this.personaRepository.getOne({
          identificacion: user.idPersona,
        });
        res.status(200).json({ ...persona, ...user });
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
