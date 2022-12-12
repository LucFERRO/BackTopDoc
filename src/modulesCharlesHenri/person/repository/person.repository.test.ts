import { Person } from "../models/person.model";
import { PersonRepository } from "./person.repository";

describe('PersonRepository', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('PersonRepository.__findById', () => {
        it('should return person detail', async () => {
            const id = 1;
            
            const mockResponse = {
                personnne_id: 1,
                personne_nom: 'Doe',
                personne_prenom: 'John',
            }

            const expected = {
                nom: "Doe",
                prenom: "John"
            }

            const repo = new PersonRepository()
            Person.findOne = jest.fn().mockResolvedValue(mockResponse);

            //act
            const result = await repo.findById(id);

            //assert
            expect(result).toEqual(expected);
            expect(Person.findOne).toHaveBeenCalledTimes(1);
            expect(Person.findOne).toBeCalledWith({
                where: {
                    personnne_id: id
                }
            });
        });
    });
});