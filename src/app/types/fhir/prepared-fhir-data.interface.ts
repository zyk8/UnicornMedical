import { IFhirPatient } from './patient.interface';
import { IFhirPractitioner } from './practitioner.interface';

export interface PreparedFhirData {
  address: string[];
  name: string[];
  telecom: string[];
}

export type IPreparedIFhirPatient = Omit<IFhirPatient, 'address' | 'name' | 'telecom'> & PreparedFhirData;
export type IPreparedIFhirPractitioner = Omit<IFhirPractitioner, 'address' | 'name' | 'telecom'> & PreparedFhirData;
