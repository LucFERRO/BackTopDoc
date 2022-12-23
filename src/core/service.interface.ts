export interface IService<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T | undefined>;
    update(t: T, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface AuthIService<D,T> {
    login(t:D): Promise<D>;
    refreshToken(t:T): Promise<T>
}
