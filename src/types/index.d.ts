import { ObjectId } from "mongodb";

export interface Persona {
  nombre: string;
  apellido: string;
  tipoDocumento_FK: string;
  identificacion: number;
  sexoBiologico: string;
  fechaNacimiento: string;
  munOrigen: string;
  veredaBarrio: string;
  direccion: string;
  telefono: number;
  correo: string;
}

export interface Usuario {
  contrasena: string;
  username: string;
  rol: string;
  idPersona: number;
  idPersona_FK: ObjectId | null;
}

export interface Escolaridad {
  nombre: string;
}

export interface Paciente {
  identificacion: number;
  idRepresentante_FK: ObjectId;
  discapacidad?: string;
  idFonoaudiologo_FK?: ObjectId;
  escolaridad_FK?: ObjectId;
}

export interface Municipio {
  nombre: string;
  idDepartamento_FK: ObjectId;
}

export interface Departamento {
  nombre: string;
  idPais_FK: ObjectId;
}

export interface Pais {
  nombre: string;
}

export interface Representante {
  parentesco: string;
  ocupacion: string;
  estadoCivil: string;
}

export interface AgendarCita {
  idPaciente_FK: number;
  idRepresentante_FK?: ObjectId;
  idFonoaudiologo_FK: ObjectId;
  motivo: string;
  alergias: string;
  fechaCita: Date;
}

export interface Fonoaudiologo {
  perfil: string;
  idExpLaboral_FK: ObjectId; //llave FK
  idFormacion_FK: ObjectId; //llave FK
  identificacion: number;
}

export interface ExperienciaLaboral {
  lugar: string;
  cargo: string;
  fechaFin: Date;
  fonoAudio_FK: ObjectId;
}

export interface FormacionAcademica {
  nombreEntidad: string;
  titulo: string;
  finFormacion: Date;
  fonoAudio_FK: ObjectId;
}

//Este falta
export interface HistoriaClinica {
  idValoracion: ObjectId;
  idPaciente_FK: ObjectId;
}
