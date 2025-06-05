import { Router } from "express";
import { UsuarioRepository } from "../repositories/usuarioRepository";
import { AuthController } from "../controllers/AuthController";
import { PersonaRepository } from "../repositories/personaRepository";

const router = Router();

export default (
  userRepostory: UsuarioRepository,
  personaRepository: PersonaRepository
) => {
  const authController = new AuthController(userRepostory, personaRepository);
  router.post("/sign-in", authController.signIn.bind(authController));
  router.post("/register", authController.register.bind(authController));

  router.post("", (req, res) => {});

  return router;
};
