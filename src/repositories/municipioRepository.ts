import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Municipio } from "../types";

export class MunicipioRepository {
    private collection: Collection<Municipio>
    constructor(db: Db){
        this.collection = db.collection("Municipios")
    }

    async getAll(filter: Filter<Municipio> = {}, findOptions: FindOptions ={}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Municipio> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Municipio>, updateFilter: UpdateFilter<Municipio>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Municipio>, updateFilter: UpdateFilter<Municipio>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Municipio>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Municipio>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Municipio[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Municipio){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}