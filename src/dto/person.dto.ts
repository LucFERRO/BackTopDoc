export interface PersonDTO {
    lastname: string,
    firstname: string,
}

export interface PersonDTOFull extends PersonDTO {
    password: string
}