import { PatientDTO } from "../dto/patient.dto"
import { patientTypes } from "../type/patient"

export class PatientMapper {
    static mapToDto(patient: patientTypes | null): PatientDTO | null {
        if (patient === null) return null;
        const dto: PatientDTO = {
            person_id: patient.person_id,
        }
        return dto;
    }

    static mapToModel() {

    }

}