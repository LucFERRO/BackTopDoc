export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T>;
    update(data : T,id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean >;

}

export interface IRepositoryInheritance<T, D> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: D): Promise<T | undefined>;
    update(t: Partial<D>, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}