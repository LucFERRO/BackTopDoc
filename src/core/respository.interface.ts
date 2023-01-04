export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T>;
    update(data : T,id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean >;
}

export interface IRepositoryInheritance<T, D> {
    findAll(options?: any): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: D): Promise<T | undefined>;
    update(t: Partial<D>, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface AuthIRepository<T> {
    login(t:T): Promise<T>;
    refreshToken(t:T): Promise<T>
}



export interface IRepositoryToken<T> {
    findAll(): Promise<T[]>;
    create(t: T, person_id: number): Promise<Partial<T> | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface IRepositoryPerson<T> {
    findByMail(mail: string): Promise<T | null>;
}