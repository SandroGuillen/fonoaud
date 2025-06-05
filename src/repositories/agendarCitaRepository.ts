import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { AgendarCita, Persona } from "../types";

export interface CitaConPaciente extends AgendarCita {
  paciente?: {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: number;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class AgendarCitaRepository {
  private collection: Collection<AgendarCita>;
  private personasCollection: Collection<Persona>;

  constructor(db: Db) {
    this.collection = db.collection("AgendarCitas");
    this.personasCollection = db.collection("Personas");
  }

  async getAll(
    filter: Filter<AgendarCita> = {},
    findOptions: FindOptions = {}
  ) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(
    filter: Filter<AgendarCita> = {},
    findOptions: FindOptions = {}
  ) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<AgendarCita>,
    updateFilter: UpdateFilter<AgendarCita>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<AgendarCita>,
    updateFilter: UpdateFilter<AgendarCita>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<AgendarCita>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<AgendarCita>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: AgendarCita[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: AgendarCita) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }

  async getAllPaginated(
    filter: Filter<AgendarCita> = {},
    page: number = 1,
    limit: number = 10,
    findOptions: FindOptions = {}
  ): Promise<PaginatedResult<AgendarCita>> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.collection.find(filter, { ...findOptions, skip, limit }).toArray(),
      this.collection.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAllPaginatedWithPaciente(
    filter: Filter<AgendarCita> = {},
    page: number = 1,
    limit: number = 10,
    findOptions: FindOptions = {}
  ): Promise<PaginatedResult<CitaConPaciente>> {
    const skip = (page - 1) * limit;

    const [citas, total] = await Promise.all([
      this.collection.find(filter, { ...findOptions, skip, limit }).toArray(),
      this.collection.countDocuments(filter),
    ]);

    // Obtener la información de los pacientes
    const citasConPaciente = await Promise.all(
      citas.map(async (cita) => {
        const paciente = await this.personasCollection.findOne({
          identificacion: cita.idPaciente_FK,
        });

        return {
          ...cita,
          paciente: paciente
            ? {
                nombre: paciente.nombre,
                apellido: paciente.apellido,
                fechaNacimiento: paciente.fechaNacimiento,
                telefono: paciente.telefono,
              }
            : undefined,
        };
      })
    );

    return {
      data: citasConPaciente,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
