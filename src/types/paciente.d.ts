export interface Persona{
  identificacion: Int16Array;
  tipoDocumento_FK: Int16Array;
  nombre: string;
  apellido: string;
  sexoBiologico_FK: string;
  fechaNacimiento: Date;
  munOrigen_FK: Int16Array;
  telefono: number;
  correo: string;
  veredaBarrio: string;
  direccion: string;

}

export interface Rol{
  idRol: Int16Array;
  nombre: string;
}

export interface Usuario{
  idUsuario: Int16Array;
  contrasena: string;
  idRol_FK: Int16Array;
  idPersona_FK: Int16Array;
}

export interface TipoDocumento {
  idDocumento: Int16Array;
  abreviatura: string;
  nombre: string;
}

export interface SexoBiologico{
  idSexo: Int16Array;
  nombre: string;
}

export interface Discapacidad{
  idDiscapacidad: Int16Array;
  nombre: string;
}

export interface Escolaridad{
  idEscolaridad: Int16Array;
  nombre: string;
}

export interface Paciente{
  idPaciente: Int16Array;
  idRepresentante_FK: Int16Array;
  discapacidad: string;
  escolaridad_FK: Int16Array;
}

export interface Municipio{
  idMunicipio: Int16Array
  nombre: string;
  idDepartamento_FK: Int16Array;
}

export interface Departamento{
  idDepartamento: Int16Array;
  nombre: string;
  idPais_FK: Int16Array;
}

export interface Pais{
  idPais: Int16Array;
  nombre: string;
}

export interface Respresentante{
  idRepresentante: Int16Array;
  parentesco: string;
  ocupacion: string;
  estadoCivil: Int16Array;
}

export interface EstadoCivil{
  idEstado: Int16Array;
  nombre: string;
}

export interface AgendarCita{
  idCita: Int16Array;
  idPaciente_FK: Int16Array;
  idRepresentante_FK: Int16Array;
  fechaCita: Date;
}

export interface Fonoaudiologo{
  idFono: Int16Array;
  perfil: string;
  idExpLaboral_FK: Int16Array; //llave FK
  idFormacion_FK: Int16Array; //llave FK
}

export interface ExperienciaLaboral{
  idExpLaboral: Int16Array;
  lugar: string;
  cargo: string;
  fechaFin: Date;
  fonoAudio_FK: Int16Array 
}

export interface FormacionAcademica{
  idFormacion: Int16Array;
  nombreEntidad: string;
  titulo: string;
  finFormacion: Date;
  fonoAudio_FK: Int16Array
}

export interface Valoracion{
  idValoracion: Int16Array;
  idFono_FK: Int16Array;
  idPaciente_FK: Int16Array;
  idHistoria_FK: Int16Array;
  fecha: Date;
  motivoConsulta: string;
  estructuraEstomatognaticas: string;
  comunicacionLenguaje: string;
  precesoAlimentacionDeglucion: string;
  conclusionDiagnostica: string;
  planIntervencion: string;
  recomendaciones: string;

}

export interface HistoriaClinica{
  idHistoria: Int16Array;
  idPaciente_FK: Int16Array;
}