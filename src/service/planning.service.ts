import { IRepositoryVacation, IRepositoryAppointement, IRepositoryPlanning } from "../core/respository.interface";
import { PlanningIService } from "../core/service.interface";
import { PlanningDTO } from "../dto/planning.dto";
import { WorkdayDTO } from "../dto/workday.dto";
import { Person } from "../model/person.model";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";
import { VacationDTO } from "../dto/vacation.dto";
import dayjs from "dayjs";
import toObject from 'dayjs/plugin/toObject'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(toObject)
dayjs.extend(relativeTime)
dayjs.extend(isBetween)

const dayIdToName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export class PlanningService implements PlanningIService {

    private planningRepository: IRepositoryPlanning;
    private vacationRepository: IRepositoryVacation;
    private appointementRepository: IRepositoryAppointement;

    private timeToNumber = (data: string): number => {
        const hours = parseInt(data[0] + data[1])
        const minutes = parseInt(data[3] + data[4])
        return hours * 60 + minutes
    }

    private numberToTime = (data: number): string => {
        const hours = Math.floor(data / 60)
        const minutes = data % 60

        const formatedHours = hours < 10 ? `0${hours}` : hours
        const formatedminutes = minutes < 10 ? `0${minutes}` : minutes

        return `${formatedHours}:${formatedminutes}`
    }

    private createSlotsFromPlanning = (planning: any) => {
        let slot_template: any = []
        for (let i = 0; i < planning.workdays.length; i++) {
            const slot_duration: number = planning.workdays[i].slot_duration_minutes
            const day_detail = [
                planning.workdays[i].workday_start
            ]
            let current = this.timeToNumber(planning.workdays[i].workday_start)

            while (current + 2 * slot_duration <= this.timeToNumber(planning.workdays[i].workday_end)) {
                if (current > this.timeToNumber(planning.workdays[i].lunch_break_end) || current + slot_duration < this.timeToNumber(planning.workdays[i].lunch_break_start)) {
                    day_detail.push(this.numberToTime(current + slot_duration))
                }
                current = current + slot_duration
            }
            slot_template.push({ day_number: planning.workdays[i].workday_number, slot_duration, day_detail })
        }
        return slot_template
    }

    private createSlotsFromPlanningTest = (planning: any) => {
        let slot_template: any = []
        for (let i = 0; i < planning.workdays.length; i++) {
            const slot_duration: number = planning.workdays[i].slot_duration_minutes
            const day_start: string = planning.workdays[i].workday_start
            const day_end: any = dayjs().hour(parseInt(planning.workdays[i].workday_end.split(':')[0])).minute(parseInt(planning.workdays[i].workday_end.split(':')[1]))
            const lunch_start: any = dayjs().hour(parseInt(planning.workdays[i].lunch_break_start.split(':')[0])).minute(parseInt(planning.workdays[i].lunch_break_start.split(':')[1]))
            const lunch_end: any = dayjs().hour(parseInt(planning.workdays[i].lunch_break_end.split(':')[0])).minute(parseInt(planning.workdays[i].lunch_break_end.split(':')[1]))

            const day_detail = [
                day_start
            ]
            let current = dayjs().hour(parseInt(day_start.split(':')[0])).minute(parseInt(day_start.split(':')[1])).second(0)

            while (current.add(2 * slot_duration, 'minute').isBefore(day_end)) {
                if (current.isAfter(lunch_end) || current.add(slot_duration, 'minute').isBefore(lunch_start)) {
                    day_detail.push(current.add(slot_duration, 'minute').format('HH:MM'))
                }
                current = current.add(slot_duration, 'minute')
            }
            slot_template.push({ day_number: planning.workdays[i].workday_number, slot_duration, day_detail })
        }
        return slot_template
    }

    constructor(_planningRepository: IRepositoryPlanning, _vacationRepository: IRepositoryVacation, _appointementRepository: IRepositoryAppointement) {
        this.planningRepository = _planningRepository;
        this.vacationRepository = _vacationRepository;
        this.appointementRepository = _appointementRepository;
    }

    async findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]> {
        return this.planningRepository.findAllOfGivenDoctor(doctor_id)
    }

    async create(planningData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO> {
        return this.planningRepository.create(planningData, workdaysData)
    }
    async availableSlots(doctor_id: number): Promise<any> {
        try {
            const planningRawData = await this.planningRepository.availableSlots(doctor_id)

            let planningData: any = {
                planning_name: planningRawData.planning_name,
            }
            let slot_durations = []


            for (let i = 0; i < planningRawData.workdays.length; i++) {
                let slot_duration: number = planningRawData.workdays[i].slot_duration_minutes
                const day_detail = [
                    planningRawData.workdays[i].workday_start
                ]
                let current = this.timeToNumber(planningRawData.workdays[i].workday_start)


                while (current + 2 * slot_duration <= this.timeToNumber(planningRawData.workdays[i].workday_end)) {
                    if (current > this.timeToNumber(planningRawData.workdays[i].lunch_break_end) || current + slot_duration < this.timeToNumber(planningRawData.workdays[i].lunch_break_start)) {
                        day_detail.push(this.numberToTime(current + slot_duration))
                    }
                    current = current + slot_duration

                }

                slot_durations.push(slot_duration)
                planningData = { ...planningData, [dayIdToName[planningRawData.workdays[i].workday_number]]: day_detail }
            }
            planningData = { ...planningData, slot_durations }
            return planningData
        } catch (error) {
            throw error
        }
    }
    async availabilities(doctor_id: number, today: Date): Promise<any> {
        try {
            const numberOfDays = 60
            const todayDate = dayjs(today).startOf('date')

            let planningRawData, vacationRawData, appointementRawData

            return Promise.all([
                this.planningRepository.availableSlots(doctor_id),
                this.vacationRepository.findVacations(doctor_id),
                this.appointementRepository.findByDoctorId(doctor_id)
            ]).then((values) => {
                planningRawData = values[0]
                vacationRawData = values[1]
                appointementRawData = values[2]

                const slot_template = this.createSlotsFromPlanning(planningRawData)

                // Filters the vacations that will impact the upcoming %numberOfDays%
                let usefulVacationData: any = []
                vacationRawData.forEach(vacation => {
                    if (dayjs(vacation.vacation_start).isBetween(todayDate, todayDate.add(numberOfDays, 'day'), 'day') || dayjs(vacation.vacation_end).isBetween(todayDate, todayDate.add(numberOfDays, 'day'), 'day')) {
                        usefulVacationData.push(vacation)
                    }
                })

                // Filters the appointements that will impact the upcoming %numberOfDays%
                let usefulAppointementData: any = []
                appointementRawData.forEach(appointement => {
                    if (dayjs(appointement.appointement_date).isBetween(todayDate, todayDate.add(numberOfDays, 'day'), 'day', '[]')) {
                        usefulAppointementData.push(appointement)
                    }
                })

                let array: any[][] = [[]]
                let y = 0
                let vacation_state = false;
                for (let i = 0; i < numberOfDays; i++) {

                    vacation_state = false

                    usefulVacationData.forEach((vacation: any) => {
                        if (todayDate.add(i, 'day').isBetween(vacation.vacation_start, vacation.vacation_end, 'day', '(]')) vacation_state = true
                    })

                    if (todayDate.add(y, 'month').month() != todayDate.add(i, 'day').month()) {
                        y++
                    }
                    if (array.length <= y) {
                        array.push([])
                    }

                    let fitting_template = slot_template.find((template: any) => template.day_number == parseInt(todayDate.add(i, 'day').format('d')))

                    let slots: any = []
                    if (fitting_template != undefined) {
                        fitting_template.day_detail.forEach((slot: any) => {

                            const slot_availability = usefulAppointementData.find((appointement: any) => todayDate.add(i, 'day').hour(slot.split(':')[0]).minute(slot.split(':')[1]).isBetween(dayjs(appointement.appointement_date), dayjs(appointement.appointement_date).add(appointement.appointement_duration_minutes, 'minute'), 'minute', '[)')
                            )

                            slots.push({ time: slot, available: !slot_availability ? true : false })

                        })
                    }

                    array[y].push({
                        date: todayDate.add(i, 'day').format('YYYY-MM-DD'),
                        vacation: vacation_state,
                        slot_duration: fitting_template && fitting_template.slot_duration,
                        slots: !vacation_state && slots,
                    })

                }

                return array

            }) // Peut etre a remonter ??


        } catch (error) {
            throw error
        }
    }


    async update(data: PlanningDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}