import { IRepositoryPlanning } from "../core/respository.interface";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";
import { sequelize } from "../database/sequelize";
import { Transaction } from "sequelize";
import { PlanningDTO } from "../dto/planning.dto";
import { WorkdayDTO } from "../dto/workday.dto";
import { PlanningMapper } from "../mapper/planning.mapper";
import { WorkdayMapper } from "../mapper/workday.mapper";

export class PlanningRepository implements IRepositoryPlanning {

    async findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]> {
        return Planning.findAll({ where: { doctor_id: doctor_id }, include: 'workdays' }).then((plannings: Planning[]) => {
            // return plannings
            return PlanningMapper.mapAllToDto(plannings)
        })
    }

    async create(workdayData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO> {

        const planningInfo = {
            planning_name: workdayData.planning_name,
            planning_start: workdayData.planning_start,
            planning_end: workdayData.planning_end,
            doctor_id: workdayData.doctor_id
        }

        const numbersOfDays = workdaysData.length

        try {
            // Transaction inutile? Garde au cas où
            // return await sequelize.transaction(async (t: Transaction) => {

            //     const newPlanning = await Planning.create(
            //         planningInfo,
            //         { 
            //             transaction: t
            //          }
            //     )

            //     for (let i = 0; i < numbersOfDays; i++) {
            //         await Workday.create(
            //             { ...workdaysData[i], planning_id: newPlanning.planning_id },
            //             { transaction: t }
            //         )
            //     }

            //     return PlanningMapper.mapToDto(newPlanning, workdaysData)
            // })

            const newPlanning = await Planning.create({
                ...planningInfo,
                workdays: workdaysData
            }, {
                include: 'workdays'
            })
            return PlanningMapper.mapToDto(newPlanning)

        } catch (error: any) {
            console.log('Error in repository', error)
            return null as any
        }

    }

    async planningDetail(planning_id: number): Promise<PlanningDTO> {
        return Planning.findByPk(planning_id, {include: 'workdays' })
        .then((planning: any) => {
            return PlanningMapper.mapToDto(planning)
        })
    }

    async update(data: any, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}