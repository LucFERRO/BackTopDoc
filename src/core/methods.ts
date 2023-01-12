export const concatRequiredMessage = (data: string) : string => {
    return `${data} is required.`
}

export const timeToNumber = (data: string) : number => {
    const hours = parseInt(data[0] + data[1])
    const minutes = parseInt(data[3] + data[4])
    return hours * 60 + minutes
}

export const numberToTime = (data: number) : string => {
    const hours = Math.floor(data / 60)
    const minutes = data % 60

    const formatedHours = hours < 10 ? `0${hours}` : hours
    const formatedminutes = hours < 10 ? `0${minutes}` : minutes

    return `${formatedHours}:${formatedminutes}`
}
