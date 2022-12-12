import { AddressDTO } from "../dto/address.dto"
import { addressTypes } from "../type/address"
import { AddressModel } from "../model/address";
import { Address } from "../database/connect"

export class AddressMapper {
    // TODO
    static mapToDto(address: Address | null): AddressDTO | null {
        if (address === null) return null;
        const dto: AddressDTO = {
            address_number: address.address_number,
            street_name: address.street_name,
            zip_code: address.zip_code,
        }
        return dto;
    }

    static mapToModel() {

    }

}