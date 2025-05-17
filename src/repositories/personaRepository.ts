import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Persona } from "../types";

export class PersonaRepository {
  private collection: Collection<Persona>;
  constructor(db: Db) {
    this.collection = db.collection("Personas");
  }

  async getAll(filter: Filter<Persona> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(filter: Filter<Persona> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<Persona>,
    updateFilter: UpdateFilter<Persona>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<Persona>,
    updateFilter: UpdateFilter<Persona>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<Persona>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<Persona>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: Persona[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: Persona) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }
}
