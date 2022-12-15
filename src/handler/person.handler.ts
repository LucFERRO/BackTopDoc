import { Request, Response } from "express";
import { PersonRepository } from "../repository/person.repository";
import { PersonService } from "../service/person.service";

const personService = new PersonService(new PersonRepository);

const getPersons = async (req: Request, res: Response) => {
    try {
        const result = await personService.findAll();
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json(err)
    }

}

const getPersonById = async (req: Request, res: Response) => {
    let requestedId: number = parseInt(req.params.id)
    try {
        const result = await personService.findById(requestedId);
        if (result === null) return res.status(404).send("Requested user_id does not exist.")
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'ERROR 500', err });
    }
};

function test(req: Request, res: Response) {
    res.status(200).json('TEST')
}

// const getAllCompanies = (req: Request, res: Response) => {
//     Person.findAll({ include: [Person] })
//         .then((companies: personTypes) => {
//             res.status(200).json((DTO(companies)));
//         })
//         .catch((error: ApiException) => {
//             res.status(500).json(error);
//         });
// }


// const createPerson = async (req: Request, res: Response) => {

//     if (!req.body.password)
//         return res.status(400).json({
//             passwordRequired: true,
//             message: "Veuillez renseigner un mot de passe.",
//         });


//     const { name, siret, password, mail, city, zip_code, address, avatar, description, availabilities, degrees, phone_number, is_active, is_pending } = req.body;

//     if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

//     let role = 'entreprise'

//     let personInfo = { name, siret, availabilities, degrees }
//     let personInfo = { mail, password, city, zip_code, address, avatar, phone_number, is_active, is_pending, role }
//     if (description) Object.assign(personInfo, { description: description })

//     let hashedPassword = await bcrypt.hash(personInfo.password, 10);
//     try {
//         await sequelize.transaction(async (t: any) => {
//             const newPerson = await Person.create(
//                 { ...personInfo, password: hashedPassword },
//                 { transaction: t }
//             )

//             personInfo = Object.assign(personInfo, { person_id: newPerson.person_id });

//             const newPerson = await Person.create(personInfo, { transaction: t })
//             return res.status(200).json(newPerson)
//         })
//     } catch (error: any) {
//         let message = 'ERROR 500'
//         if (error.errors[0].path == 'mail') message = 'Email invalide'
//         if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
//         if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
//         return res.status(500).json({ message, error });
//     }
// }

// const updatePerson = async (req: Request, res: Response) => {
//     const id = req.params.id;

//     const { name, siret, mail, city, zip_code, address, avatar, description, availabilities, phone_number, is_active, is_pending, role } = req.body;

//     if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

//     let personInfo = { name, siret, availabilities };
//     let personInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

//     if (description) Object.assign(personInfo, { description: description })
//     if (availabilities) Object.assign(personInfo, { availabilities: availabilities })

//     if (req.body.password) {
//         let hashedPassword = await bcrypt.hash(req.body.password, 10);
//         personInfo = Object.assign(personInfo, { password: hashedPassword });
//     }

//     try {
//         await sequelize.transaction(async (t: any) => {
//             const updatedPerson: any = await Person.update(
//                 personInfo,
//                 {
//                     where: { person_id: id },
//                     returning: true,
//                     plain: true,
//                     transaction: t,
//                 }
//             );

//             await Person.update(personInfo, {
//                 where: { person_id: updatedPerson[1].person_id },
//                 returning: true,
//                 plain: true,
//                 transaction: t,
//             });
//             return res.status(200).json(updatedPerson[1]);
//         });
//     } catch (error: any) {
//         let message = 'ERROR 500'
//         if (error.errors[0].path == 'mail') message = 'Email invalide'
//         if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
//         if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
//         return res.status(500).json({ message, error });
//     }
// }

// const deletePerson = (req: Request, res: Response) => {
//     Person.findByPk(req.params.id)
//         .then((person: personTypes) => {
//             if (person === null) {
//                 const message = "Aucun recruteur trouvé.";
//                 return res.status(404).json({ message: message });
//             }

//             const deletedPerson = person;
//             return Person.destroy({
//                 where: { person_id: person.person_id },
//             }).then(() => {
//                 const message = `Le recruteur ${deletedPerson.person_id} a bien été supprimé.`;
//                 res.json({ message, data: deletedPerson });
//             });
//         })
//         .catch((error: ApiException) => {
//             res.status(500).json({ message: 'ERROR 500', error });
//         });
// }

export const personHandler = { getPersons, getPersonById, test }
