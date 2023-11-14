import {Medic, User} from "./user.model";

export interface Reservation {
  bookingId: number;
  userId: number;
  medicId: number;
  visitStart: string;
  visitEnd: string;
  creationDate: string;
  locationId: number;
  visitType: string;
  visitTitle: string;
  category: string;
  status: RES_STATUS;
  paymentStatus: string;
  cancellable: boolean;
  notificationMsg: string;
  canStartVisit: boolean;
  medicalBranch: string;
  paymentRequired: boolean;
}

export interface ReservationDetail extends Reservation {
  user: User;
  medic: Medic;
  visitReason: string | null;
  extDocumentId: string | null;
  documents: Document[];
}

export interface Document {
  id: string;
  fileName: string;
  category: {
    id: string;
    name: string;
    icon: string | null;
  };
  uploadedByMe: boolean;
  eventDate: string;
  uploadDate: string;
  documentType: string;
}

export enum RES_STATUS {
  Prenotate = 'PRENOTATO',
  Avviate = 'IN_CORSO',
  Terminate = 'TERMINATO',
  Scadute = 'SCADUTO'
}

export enum ReservationType {
  PHONECALL = 'CONSULTO_TELEFONICO',
  PLACE = 'LOCO',
  VIDEOCALL = 'TELEVISITA'
}
