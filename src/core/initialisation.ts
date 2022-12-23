import { DoctorHandler } from "../handler/doctor.handler";
import { DoctorRepository } from "../repository/doctor.repository";
import { DoctorService } from "../service/doctor.service";

import { PatientHandler } from "../handler/patient.handler";
import { PatientRepository } from "../repository/patient.repository";
import { PatientService } from "../service/patient.service";

import { AuthentificationHandler } from "../handler/authentification.handler";
import { AuthentificationRepository } from "../repository/authentification.repository";
import { AuthentificationService } from "../service/authentification.service";
import { TokenRepository } from "../repository/token.repository";

export const doctorHandler = new DoctorHandler(new DoctorService(new DoctorRepository));
export const patientHandler = new PatientHandler(new PatientService(new PatientRepository));
export const authentificationHandler = new AuthentificationHandler(new AuthentificationService(new AuthentificationRepository, new TokenRepository));