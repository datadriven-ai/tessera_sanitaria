export interface SlotAvailability {
  day: string;
  availableSlot: Slot[];
}

export interface Slot {
  id: string;
  medicId: string;
  name: string;
  surname: string;
  start: string;
  end: string;
  pauseDuration: string;
  visitType: BookingType[];
}

export interface ConferenceForm {
  id: number;
  description: string;
  public_description: string;
  label_description: BookingType;
}

export enum BookingType {
  LOCAL = 'LOCO',
  VISIT = 'TELEVISITA',
  PHONE = 'CONSULTO TELEFONICO'
}

export interface NewAvailabilityDTO {
  dateFrom: string;
  dateTo: string;
  doctorId: number;
  visitType: string[];
  days: Day[];
}

export interface Day {
  dayWeek: number;
  timeFrom: string;
  timeTo: string;
  pauseMinutes: number;
  slotDuration: string;
}
