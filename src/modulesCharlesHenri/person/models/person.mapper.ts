import { PersonDTO } from "./person.dto";
import { Person } from "./person.model";

export class PersonMapper {

    static mapToDto(person: Person | null): PersonDTO | null {
        if (person === null) return null;
        const dto : PersonDTO = {
            nom: person.personne_nom,
            prenom: person.personne_prenom
        }
        return dto;
    }

    static mapToModel() {

    }

}