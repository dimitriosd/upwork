import { Injectable } from '@angular/core';
import { CountryService } from 'src/app/modules/home/services/country/country.service';
import { UserService } from '../services/user/user.service';
import { TaxForm } from '../models/tax-form.model';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';


@Injectable({
  providedIn: 'root'
})
export class TaxFormFacade {
  constructor(private countryService: CountryService, private userService: UserService) {
  }

  public get countries(): string[] {
    return this.countryService.getCountries().map(country => country.name);
  }

  public submit(taxForm: TaxForm): Observable<ServerResponse> {
    return this.userService.submit(taxForm);
  }
}
