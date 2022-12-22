export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T>;
    update(t: T): Promise<T>;
    delete(id: number): Promise<boolean>;

}

export interface IRepositoryInheritance<T, D> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: D): Promise<T | undefined>;
    update(t: D): Promise<T>;
    delete(id: number): Promise<boolean | number>;

}