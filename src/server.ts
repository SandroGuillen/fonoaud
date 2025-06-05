import { connectToDatabase } from "./config/connectToDatabase";
import { PacienteRepository } from "./repositories/pacienteRepository";
import { UsuarioRepository } from "./repositories/usuarioRepository";
import { ValoracionRepository } from "./repositories/valoracionRepository";

import authRoutes from "./routes/auth.routes";
import pacienteRoutes from "./routes/paciente.routes";
import agendarCitaRoutes from "./routes/agendarCita.routes";
import fonoaudiologoRoutes from "./routes/fonoaudiologo.routes";
import personasRoutes from "./routes/persona.routes";
import valoracionRoutes from "./routes/valoracion.routes";

import express from "express";
import { AgendarCitaRepository } from "./repositories/agendarCitaRepository";
import { FonoaudiologoRepository } from "./repositories/fonoaudiologoRepository";

import cors from "cors";
import { PersonaRepository } from "./repositories/personaRepository";

const app = express();

(async () => {
  const { db } = await connectToDatabase();

  const userRepostory = new UsuarioRepository(db);
  const pacienteRepository = new PacienteRepository(db);
  const agendarCitaRepository = new AgendarCitaRepository(db);
  const fonoaudiologoRepository = new FonoaudiologoRepository(db);
  const personaRepository = new PersonaRepository(db);
  const valoracionRepository = new ValoracionRepository(db);

  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.use("/auth", authRoutes(userRepostory, personaRepository));
  app.use("/pacientes", pacienteRoutes(pacienteRepository, personaRepository));
  app.use("/citas", agendarCitaRoutes(agendarCitaRepository));
  app.use("/fonoaudiologo", fonoaudiologoRoutes(fonoaudiologoRepository));
  app.use("/personas", personasRoutes(personaRepository));
  app.use("/valoracion", valoracionRoutes(valoracionRepository));

  app.listen(3000, () => {
    console.log("Corriendo en el puerto 3000");
  });
})();
