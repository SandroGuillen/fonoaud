import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Paciente } from "../types";

export class PacienteRepository {
  private collection: Collection<Paciente>;
  constructor(db: Db) {
    this.collection = db.collection("pacientes");
  }

  async getAll(filter: Filter<Paciente> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(filter: Filter<Paciente> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<Paciente>,
    updateFilter: UpdateFilter<Paciente>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<Paciente>,
    updateFilter: UpdateFilter<Paciente>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<Paciente>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<Paciente>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: Paciente[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: Paciente) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }
}
