import { PatientDTO } from "../dto/patient.dto"
import { patientTypes } from "../type/patient"
import { PatientModel } from "../model/patient";
import { Patient } from "../database/connect"

export class PatientMapper {
    // TODO
    static mapToDto(patient: Patient | null): PatientDTO | null {
        if (patient === null) return null;
        const dto: PatientDTO = {
            person_id: patient.person_id,
        }
        return dto;
    }

    static mapToModel() {

    }

}