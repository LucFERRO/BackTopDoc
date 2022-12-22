export interface PatientDTO {
    secu_number: string,
    lastname: string,
    firstname: string,
    mail: string,
    birthdate: string,
    phone_number: string,
    description?: string,
    avatar?: string,
}

export interface PatientDTOFull extends PatientDTO {
    password: string
}