import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Departamento } from "../types";

export class DepartamentoRepository {
    private collection: Collection<Departamento>
    constructor(db: Db){
        this.collection = db.collection("Departamentos")
    }

    async getAll(filter: Filter<Departamento> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Departamento> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Departamento>, updateFilter: UpdateFilter<Departamento>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Departamento>, updateFilter: UpdateFilter<Departamento>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Departamento>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Departamento>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Departamento[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Departamento){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}