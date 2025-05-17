import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Representante } from "../types";

export class RepresentanteRepository {
  private collection: Collection<Representante>;
  constructor(db: Db) {
    this.collection = db.collection("Representantes");
  }

  async getAll(filter: Filter<Representante> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.find(filter, findOptions).toArray();
    return result;
  }

  async getOne(filter: Filter<Representante> = {}, findOptions: FindOptions = {}) {
    const result = await this.collection.findOne(filter, findOptions);
    return result;
  }

  async updateAll(
    filter: Filter<Representante>,
    updateFilter: UpdateFilter<Representante>
  ) {
    const result = await this.collection.updateMany(filter, updateFilter);
    return result.modifiedCount;
  }

  async updateOne(
    filter: Filter<Representante>,
    updateFilter: UpdateFilter<Representante>
  ) {
    const result = await this.collection.updateOne(filter, updateFilter);
    return result.modifiedCount;
  }

  async deleteAll(filter: Filter<Representante>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async deleteOne(filter: Filter<Representante>) {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async insertMany(documents: Representante[]) {
    const result = await this.collection.insertMany(documents);
    return result.insertedCount;
  }

  async insertOne(document: Representante) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }
}
