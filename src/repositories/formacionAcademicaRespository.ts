import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { FormacionAcademica } from "../types";

export class FormacionAcademicaRepository {
  private collection: Collection<FormacionAcademica>;
  constructor(db: Db) {
    this.collection = db.collection("FormacionAcademicas");
  }

  async getAll(
    filter: Filter<FormacionAcademica> = {},
    findOptions: FindOptions = {}
  ) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(
    filter: Filter<FormacionAcademica> = {},
    findOptions: FindOptions = {}
  ) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<FormacionAcademica>,
    updateFilter: UpdateFilter<FormacionAcademica>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<FormacionAcademica>,
    updateFilter: UpdateFilter<FormacionAcademica>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<FormacionAcademica>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<FormacionAcademica>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: FormacionAcademica[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: FormacionAcademica) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }
}
