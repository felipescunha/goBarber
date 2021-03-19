import Appoitment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';

import { startOfHour } from 'date-fns'

interface RequestDTO {
  provider: string;
   date: Date;
}


class CreateAppointService {
  private appointmentsRepository: AppointmentsRepository;
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;

  }

  public execute({ date, provider}: RequestDTO): Appoitment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSemaDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSemaDate) {
      throw Error('This appoitment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

  return appointment;
  }
}

export default CreateAppointService;
