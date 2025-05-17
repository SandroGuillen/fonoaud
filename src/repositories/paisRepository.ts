import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Pais } from "../types";

export class PaisRepository {
    private collection: Collection<Pais>
    constructor(db: Db){
        this.collection = db.collection("Paiss")
    }

    async getAll(filter: Filter<Pais> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Pais> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Pais>, updateFilter: UpdateFilter<Pais>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Pais>, updateFilter: UpdateFilter<Pais>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Pais>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Pais>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Pais[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Pais){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}