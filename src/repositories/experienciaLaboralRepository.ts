import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { ExperienciaLaboral } from "../types";

export class ExperienciaLaboralRepository {
  private collection: Collection<ExperienciaLaboral>;
  constructor(db: Db) {
    this.collection = db.collection("ExperienciaLaborals");
  }

  async getAll(filter: Filter<ExperienciaLaboral> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(filter: Filter<ExperienciaLaboral> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<ExperienciaLaboral>,
    updateFilter: UpdateFilter<ExperienciaLaboral>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<ExperienciaLaboral>,
    updateFilter: UpdateFilter<ExperienciaLaboral>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<ExperienciaLaboral>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<ExperienciaLaboral>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: ExperienciaLaboral[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: ExperienciaLaboral) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }
}
