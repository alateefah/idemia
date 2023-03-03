export interface IStay {
    arrivalDate: string;
    departureDate: string;
}

export interface IRoom {
    roomSize: string,
    roomQuantity: number
}

export interface IAddressStreet {
    streetName: string,
    streetNumber: string
}

export interface IAddressLocation {
    zipCode: string,
    state: string,
    city: string
}

export default interface IReservation {
    stay: IStay,
    room: IRoom,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    addressStreet: IAddressStreet,
    addressLocation: IAddressLocation,
    extras: string[],
    payment: 'cc'|'cash'|'paypal'|'bitcoin',
    note: string,
    tags: string [],
    reminder: boolean,
    newsletter: boolean,
    confirm: boolean
} 