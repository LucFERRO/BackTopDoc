export interface IService<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T | null | undefined>;
    delete(id: number): Promise<boolean>;
}