import { IRepositoryPlanning } from "../core/respository.interface";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";

export class PlanningRepository implements IRepositoryPlanning<Planning> {

    async findAllOfGivenDoctor(doctor_id: number): Promise<Planning[]> {
        return Planning.findAll({ where: { doctor_id: doctor_id }, include: [Workday] }).then((plannings: Planning[]) => plannings)
    }

    async create(data: Planning & Workday, doctor_id: number): Promise<Planning> {
        throw new Error("Method not implemented.");
    }

    async update(data: Planning & Workday, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}