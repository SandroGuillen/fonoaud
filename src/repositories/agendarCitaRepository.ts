import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { AgendarCita } from "../types";

export class AgendarCitaRepository {
  private collection: Collection<AgendarCita>;
  constructor(db: Db) {
    this.collection = db.collection("AgendarCitas");
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
}
