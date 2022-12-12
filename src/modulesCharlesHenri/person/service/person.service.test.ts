import { IRepository } from "~/modules/core/respository.interface";
import { PersonDTO } from "../models/person.dto";
import { PersonService } from "./person.service";

describe('PersonService', () => {

    describe('PersonService.__findById_null', () => {
        it('should return null', async () => {
            const id = 1;

            const expected =  null;

            const repo = new TestRepositoryNullData();
            const service = new PersonService(repo);

            //act
            const result = await service.findById(id);

            //assert
            expect(result).toEqual(expected);
        });
    });

    describe('PersonService.__findById_Data', () => {
        it('should return null', async () => {
            const id = 1;

            const expected = {
                nom: "M. Doe",
                prenom: "John"
            }

            const repo = new TestRepositoryWithValue();
            const service = new PersonService(repo);

            //act
            const result = await service.findById(id);

            //assert
            expect(result).toEqual(expected);
        });
    });


});

/**
 * Mock with null data
 */
class TestRepositoryNullData implements IRepository<PersonDTO> {

    findById(id: number): Promise<PersonDTO | null> {
        return new Promise((resolve, reject): void => { 
          resolve(null);

    });}


    findAll(): Promise<PersonDTO[]> {
        throw new Error("Method not implemented.");
    }
    create(t: PersonDTO): Promise<PersonDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

/**
 * Mock with person
 */
class TestRepositoryWithValue implements IRepository<PersonDTO> {

    findById(id: number): Promise<PersonDTO | null> {
        const expected = {
            nom: "Doe",
            prenom: "John"
        }
        return new Promise((resolve, reject): void => { 
          resolve(expected)

    });}


    findAll(): Promise<PersonDTO[]> {
        throw new Error("Method not implemented.");
    }
    create(t: PersonDTO): Promise<PersonDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}