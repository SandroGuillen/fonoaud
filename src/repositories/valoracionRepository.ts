import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Valoracion } from "../types/valoracion";

export class ValoracionRepository {
    private collection: Collection<Valoracion>
    constructor(db: Db){
        this.collection = db.collection("Valoracions")
    }

    async getAll(filter: Filter<Valoracion> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Valoracion> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Valoracion>, updateFilter: UpdateFilter<Valoracion>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Valoracion>, updateFilter: UpdateFilter<Valoracion>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Valoracion>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Valoracion>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Valoracion[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Valoracion){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}