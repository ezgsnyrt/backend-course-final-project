export interface Appointment {
    _id?: string;
    doctorId: string,
    patientId: string,
    patientName: string,
    timeSlot?: string,
    day?: string,
}