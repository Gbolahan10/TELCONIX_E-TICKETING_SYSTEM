"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseService {
    constructor(Model) {
        this.Model = Model;
    }
    async create(payload) {
        try {
            const result = await this.Model.create(payload);
            return { status: true, result };
        }
        catch (error) {
            return { status: false, error };
        }
    }
    async find(query, selectFields = '') {
        try {
            let queryBuilder = this.Model.findOne(query);
            if (selectFields) {
                queryBuilder = queryBuilder.select(selectFields);
            }
            const result = await queryBuilder.exec();
            if (result) {
                return { status: true, result };
            }
            else if (!result) {
                return { status: false, result };
            }
        }
        catch (error) {
            return { status: false, error };
        }
    }
    async findAll(query = null, page = null, limit = null, selectFields = '') {
        try {
            let queryBuilder = this.Model.find(query);
            console.log(queryBuilder);
            if (limit && page !== null) {
                queryBuilder = queryBuilder.limit(limit).skip(limit * page);
            }
            if (selectFields) {
                queryBuilder = queryBuilder.select(selectFields);
            }
            const result = await queryBuilder.exec();
            if (result) {
                return { status: true, result };
            }
            else if (!result) {
                return { status: false, result };
            }
        }
        catch (error) {
            return { status: false, error };
        }
    }
    async update(query, payload, option = null) {
        try {
            await this.Model.findOneAndUpdate(query, payload, option);
            return { status: true };
        }
        catch (error) {
            return { status: false, error };
        }
    }
    async delete(query) {
        try {
            const result = await this.Model.deleteOne(query);
            if (result.deletedCount === 1) {
                return { status: true };
            }
            else {
                return { status: false, error: 'Document not found' };
            }
        }
        catch (error) {
            return { status: false, error };
        }
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map