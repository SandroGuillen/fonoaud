import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Fonoaudiologo } from "../types";

export class FonoaudiologoRepository {
    private collection: Collection<Fonoaudiologo>
    constructor(db: Db){
        this.collection = db.collection("Fonoaudiologos")
    }

    async getAll(filter: Filter<Fonoaudiologo> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Fonoaudiologo> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Fonoaudiologo>, updateFilter: UpdateFilter<Fonoaudiologo>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Fonoaudiologo>, updateFilter: UpdateFilter<Fonoaudiologo>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Fonoaudiologo>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Fonoaudiologo>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Fonoaudiologo[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Fonoaudiologo){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}