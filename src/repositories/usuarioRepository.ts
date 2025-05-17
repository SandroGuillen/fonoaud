import { Collection, Db, Filter, FindOptions, UpdateFilter } from "mongodb";
import { Usuario } from "../types";

export class UsuarioRepository {
    private collection: Collection<Usuario>
    constructor(db: Db){
        this.collection = db.collection("Usuarios")
    }

    async getAll(filter: Filter<Usuario> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.find(filter, findOptions).toArray()
        return result
    }

    async getOne(filter: Filter<Usuario> = {}, findOptions: FindOptions = {}){
        const result = await this.collection.findOne(filter, findOptions)
        return result
    }

    async updateAll(filter:Filter<Usuario> = {}, updateFilter: UpdateFilter<Usuario>){
        const result = await this.collection.updateMany(filter, updateFilter)
        return result.modifiedCount
    }

    async updateOne(filter:Filter<Usuario>, updateFilter: UpdateFilter<Usuario>){
        const result = await this.collection.updateOne(filter, updateFilter)
        return result.modifiedCount
    }

    async deleteAll(filter: Filter<Usuario>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async deleteOne(filter: Filter<Usuario>){
        const result = await this.collection.deleteMany(filter)
        return result.deletedCount
    }

    async insertMany(documents: Usuario[]){
        const result = await this.collection.insertMany(documents)
        return result.insertedCount
    }

    async insertOne(document: Usuario){
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }
}