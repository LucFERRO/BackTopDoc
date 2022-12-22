import { PatientDTO, PatientDTOFull } from "../dto/patient.dto";
import { IRepository, IRepositoryInheritance } from "../core/respository.interface";
import { IService } from "../core/service.interface";
import { Person } from "../model/person.model";
const bcrypt = require("bcrypt");

export class PatientService implements IService<PatientDTO> {

    private patientRepository: IRepositoryInheritance<PatientDTO, PatientDTOFull>;

    constructor(_patientRepository: IRepositoryInheritance<PatientDTO, PatientDTOFull>) {
        this.patientRepository = _patientRepository;
    }

    async findAll(): Promise<PatientDTO[]> {
        return this.patientRepository.findAll()
    }

    async findById(id: number): Promise<PatientDTO | null> {
        return this.patientRepository.findById(id).then(patientDto => {
            if (patientDto === null) return null;
            // patientDto.lastname = "M. " + patientDto.lastname;
            return patientDto;
        });
    }

    async create(patientRawInfo: PatientDTO & Person): Promise<PatientDTO | undefined> {
        //bcrypt + bordel

        let hashedPassword = await bcrypt.hash(patientRawInfo.password, 10);

        let patientInfo : PatientDTOFull = {
            secu_number: patientRawInfo.secu_number,
            lastname: patientRawInfo.lastname,
            firstname: patientRawInfo.firstname,
            mail: patientRawInfo.mail,
            password: hashedPassword,
            birthdate: patientRawInfo.birthdate,
            phone_number: patientRawInfo.phone_number
        }

        if (patientRawInfo.description) Object.assign(patientInfo, { description: patientRawInfo.description })
        if (patientRawInfo.avatar) Object.assign(patientInfo, { avatar: patientRawInfo.avatar })

        return this.patientRepository.create(patientInfo)
    }

    async update(t: PatientDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<boolean | number> {
        return this.patientRepository.delete(id)
    }

}