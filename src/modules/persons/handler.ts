import { Request, Response } from "express";
import { ApiException } from "../../type/exception";
import { personTypes } from "../../type/person";
import { ValidationError } from "sequelize";
const bcrypt = require("bcrypt");

const { Person } = require("../../database/connect");

const { DTO } = require("../../dto/DTO")

const getAllPersons = (req: Request, res: Response) => {
    Person.findAll({
        order: ['person_id'],
        attributes: ['person_id', 'mail', 'city', 'zip_code', 'address', 'phone_number', 'is_active', 'is_pending', 'is_to_be_completed', 'role', 'createdAt', 'updatedAt']
    })
        .then((persons: personTypes) => {
            res.status(200).json((persons));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
}

const getPersonById = (req: Request, res: Response) => {
    Person.findOne({
        where: { person_id: req.params.id },
        attributes: ['person_id', 'mail', 'city', 'zip_code', 'address', 'phone_number', 'is_active', 'is_pending', 'is_to_be_completed', 'role', 'createdAt', 'updatedAt']
    })
        .then((person: personTypes) => {
            if (person === null) {
                const message = "Requested person does not exist.";
                return res.status(404).json({ message });
            }

            res.json(person);
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
};

const createPerson = async (req: Request, res: Response) => {
    if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Password is required.",
        });

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    Person.create({ ...req.body, password: hashedPassword })
        .then((person: personTypes) => {
            res.json(person);
        })
        .catch((error: ApiException) => {
            if (error instanceof ValidationError) {
                return res
                    .status(400)
                    .json({ message: error.message, data: error });
            }
            res.status(500).json(error);
        });
};
const updatePerson = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body = { ...req.body, password: hashedPassword }
    }

    Person.update(req.body, { where: { person_id: id } }
    )
        .then(() => {
            return Person.findByPk(id).then((person: personTypes) => {
                if (person === null) {
                    const message = "Requested person does not exist.";
                    return res.status(404).json({ message });
                }
                const message = `Person ${person.person_id} successfully updated`;
                res.json({ message, data: person });
            });
        })
        .catch((error: ApiException) => {
            if (error instanceof ValidationError) {
                return res
                    .status(400)
                    .json({ message: error.message, data: error });
            }
            const message = `Could not update the person.`;
            res.status(500).json({ message, data: error });
        });
};

const deletePerson = (req: Request, res: Response) => {
    Person.findByPk(req.params.id)
        .then((person: personTypes) => {
            if (person === null) {
                const message = "Requested person does not exist.";
                return res.status(404).json({ message: message });
            }

            const deletedPerson = person;
            return Person.destroy({
                where: { person_id: person.person_id },
            }).then(() => {
                const message = `Person ${deletedPerson.person_id} successfully deleted.`;
                res.json({ message, data: deletedPerson });
            });
        })
        .catch((error: ApiException) => {
            const message = `Could not delete person.`;
            res.status(500).json({ message, data: error });
        });
};

export const handlerPerson = {
    getAllPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
}