import { DoctorDTO, DoctorDTOFull } from "../dto/doctor.dto";
import { IRepository, IRepositoryInheritance } from "../core/respository.interface";
import { IService } from "../core/service.interface";
import { PersonDTO } from "../dto/person.dto";
import { Person } from "../model/person.model";
const bcrypt = require("bcrypt");

export class DoctorService implements IService<DoctorDTO> {

    private doctorRepository: IRepositoryInheritance<DoctorDTO, DoctorDTOFull>;

    constructor(_doctorRepository: IRepositoryInheritance<DoctorDTO, DoctorDTOFull>) {
        this.doctorRepository = _doctorRepository;
    }

    async findAll(): Promise<DoctorDTO[]> {
        return this.doctorRepository.findAll()
    }

    async findById(id: number): Promise<DoctorDTO | null> {
        return this.doctorRepository.findById(id).then(doctorDto => {
            if (doctorDto === null) return null;
            // doctorDto.lastname = "M. " + doctorDto.lastname;
            return doctorDto;
        });
    }

    async create(doctorRawInfo: DoctorDTO & Person): Promise<DoctorDTO | null | undefined> {
        //bcrypt + bordel

        let hashedPassword = await bcrypt.hash(doctorRawInfo.password, 10);

        let doctorInfo : DoctorDTOFull = {
            activity: doctorRawInfo.activity,
            lastname: doctorRawInfo.lastname,
            firstname: doctorRawInfo.firstname,
            mail: doctorRawInfo.mail,
            password: hashedPassword,
            birthdate: doctorRawInfo.birthdate,
            phone_number: doctorRawInfo.phone_number
        }

        if (doctorRawInfo.description) Object.assign(doctorInfo, { description: doctorRawInfo.description })
        if (doctorRawInfo.avatar) Object.assign(doctorInfo, { avatar: doctorRawInfo.avatar })

        return this.doctorRepository.create(doctorInfo)
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}