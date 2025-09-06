interface Antecedentes {
  prenatales: string;
  perinatales: string;
  posnatales: string;
}

interface DesarrolloMotor {
  sostenCefalico: string;
  posicionSedente: string;
  gateo: string;
  marcha: string;
}

interface DesarrolloComunicativo {
  gorjeo: string;
  balbuceo: string;
  silabas: string;
  palabras: string;
}

interface DesarrolloAlimentacion {
  lactancia: string;
  alimentacionComplementaria: string;
}

interface Audicion {
  respuestaEstimulacion: string;
  identificacionSonidos: string;
  respuestaVoz: string;
}

interface Lenguaje {
  fonologico: string;
  semantico: string;
  pragmatico: string;
}

interface Habla {
  respiracion: string;
  produccionesOrales: string;
}

interface AreaMiofuncional {
  estructurasEstomatognaticas: string;
  deglucion: string;
}

interface ConclusionDiagnostica {
  diagnostico: string;
}

interface PlanIntervencion {
  objetivosGenerales: string;
  objetivosEspecificos: string[];
}

interface Recomendaciones {
  terapiaFonoaudiologica: string;
}

export interface Valoracion {
  idFono_FK: string;
  idPaciente_FK: ObjectId;
  fecha: Date;
  motivoConsulta: string;
  observacionGeneral: string;
  antecedentes: Antecedentes;
  desarrolloMotor: DesarrolloMotor;
  desarrolloComunicativo: DesarrolloComunicativo;
  desarrolloAlimentacion: DesarrolloAlimentacion;
  audicion: Audicion;
  lenguaje: Lenguaje;
  habla: Habla;
  areaMiofuncional: AreaMiofuncional;
  conclusionDiagnostica: ConclusionDiagnostica;
  planIntervencion: PlanIntervencion;
  recomendaciones: Recomendaciones;
  estructuraEstomatognaticas: string;
  comunicacionLenguaje: string;
  precesoAlimentacionDeglucion: string;
  conclusionDiagnostica: string;
}
