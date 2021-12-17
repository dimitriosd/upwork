import { Injectable } from '@angular/core';
import { Country } from 'src/app/modules/home/models/country.model';
import { CountryService } from 'src/app/modules/home/services/country/country.service';


@Injectable({
	providedIn: 'root'
})
export class CountryFacade {
	constructor(private _service: CountryService) { }

	public get countries(): string[] {
		return this._service.getCountries().map(country => country.name);
	}

}
