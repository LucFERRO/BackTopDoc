export interface IRepository<T> {

    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(t: T): Promise<T>;
    delete(id: number): Promise<boolean>;

}