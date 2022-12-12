const DTO_ifier = (item: any) => {
    if (!item.Person) {
        return item
    }
    let newItem = item.get({ plain: true })

    Object.assign(newItem, newItem.Person)
    delete newItem['Person']
    delete newItem['password']

    return newItem
}

const DTO = (data: any) => {

    if (!data.length) return DTO_ifier(data)

    return data.map((item: any) => {
        return DTO_ifier(item)
    })
}

const DTO_login = (data: any) => {

    const formatedData = Object.assign(data, { person_id: data.person.person_id })
    delete data['person']

    return formatedData
}

// Faire une fonction pour le all et une pour le singleton ?

module.exports = {
    DTO,
    DTO_login
}