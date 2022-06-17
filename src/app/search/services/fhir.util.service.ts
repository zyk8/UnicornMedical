import { Injectable } from '@angular/core';
import {
  IFhirPatient,
  IFhirPractitioner,
  IFhirResourceAddress,
  IFhirResourceHumanName,
  IFhirResourceTelecom,
  IPreparedIFhirPatient,
  IPreparedIFhirPractitioner,
} from '@red-probeaufgabe/types';
import { SearchModule } from '../search.module';

@Injectable({ providedIn: SearchModule })
export class FhirUtilService {
  private static getFhirNameRepresentation(name: IFhirResourceHumanName): string {
    const family = name.family ? `${name.family},` : '';
    const prefix = name.prefix ? ` ${name.prefix.join(' ')}` : '';
    const given = name.given ? ` ${name.given.join(' ')}` : '';
    const suffix = name.suffix ? ` ${name.suffix.join(' ')}` : '';

    return `${family}${prefix}${given}${suffix}`;
  }

  private static getFhirAddressRepresentation(address: IFhirResourceAddress): string {
    const line = address.line ? `${address.line}\n` : '';
    const city = address.city ? `${address.city}\n` : '';
    const postalCode = address.postalCode ? `${address.postalCode}\n` : '';
    const state = address.state ? `${address.state}` : '';

    return `${line}${city}${postalCode}${state}`;
  }
  /**
   * Baut aus dem Telecom Objet ein String der in der View verwendet werden kann. Leider nicht sauber implementiert (Keine Zeilenumbrüche). Besser wäre wohl ein Array um diesen in der View Anzuzeigen.
   *
   * @private
   * @static
   * @param {IFhirResourceTelecom} resourceTelecom
   * @returns {string}
   * @memberof FhirUtilService
   */
  private static getFhirTelecomRepresentation(resourceTelecom: IFhirResourceTelecom): string {
    const system = resourceTelecom.system ? `${resourceTelecom.system}: ` : '';
    const value = resourceTelecom.value ? `${resourceTelecom.value}\n` : '';
    const use = resourceTelecom.use ? `${resourceTelecom.use}\n` : '';

    return `${system}${value}${use}`;
  }

  /**
   * Prepare FHIR data for detail view
   * @param data
   */
  prepareData(data: IFhirPatient | IFhirPractitioner): IPreparedIFhirPatient | IPreparedIFhirPractitioner {
    const address = data.address?.map((resourceAddress: IFhirResourceAddress) =>
      FhirUtilService.getFhirAddressRepresentation(resourceAddress),
    );
    const name = data.name?.map((humanName: IFhirResourceHumanName) =>
      FhirUtilService.getFhirNameRepresentation(humanName),
    );

    const telecom = data.telecom?.map((resourceTelecom: IFhirResourceTelecom) =>
      FhirUtilService.getFhirTelecomRepresentation(resourceTelecom),
    );

    return { ...data, address, name, telecom };
  }
}
