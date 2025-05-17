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
  idPersona_FK: ObjectId | null;
}

export interface Escolaridad {
  nombre: string;
}

export interface Paciente extends Persona {
  idRepresentante_FK: ObjectId;
  discapacidad: string;
  idFonoaudiologo_FK: ObjectId | undefined;
  escolaridad_FK: ObjectId;
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

export interface Representante extends Persona {
  parentesco: string;
  ocupacion: string;
  estadoCivil: string;
}

export interface AgendarCita {
  idPaciente_FK: ObjectId;
  idRepresentante_FK: ObjectId;
  idFonoaudiologo_FK: ObjectId;
  fechaCita: Date;
}

export interface Fonoaudiologo extends Persona {
  perfil: string;
  idExpLaboral_FK: ObjectId; //llave FK
  idFormacion_FK: ObjectId; //llave FK
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
