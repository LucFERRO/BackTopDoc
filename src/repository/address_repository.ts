import { IRepository } from "../core/respository.interface";
import { AddressDTO } from "../dto/address.dto";
import { Address } from "../model/address.model";
import { AddressMapper } from "../mapper/address.mapper";

export class AddressRepository implements IRepository<AddressDTO> {
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<AddressDTO | null> {
        return Address.findByPk(id).then(address => AddressMapper.mapToDto(address))
    }

    async findAll(): Promise<AddressDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: AddressDTO): Promise<AddressDTO> {
        throw new Error("Method not implemented.");
    }

    update(data: any, id: number): Promise<boolean | number> {
        throw new Error("Method not implemented.");
    }



}