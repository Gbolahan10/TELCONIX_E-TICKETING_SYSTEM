declare class DatabaseService {
    private readonly Model;
    constructor(Model: any);
    create(payload: any): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    find(query: any, selectFields?: string): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    findAll(query?: any, page?: any, limit?: any, selectFields?: string): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    update(query: any, payload: any, option?: any): Promise<{
        status: boolean;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
    }>;
    delete(query: any): Promise<{
        status: boolean;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
    }>;
}
export default DatabaseService;
