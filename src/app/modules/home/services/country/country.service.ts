import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Country } from 'src/app/modules/home/models/country.model';
import { countriesMock } from 'src/app/modules/home/services/country/country.service.mock';


@Injectable({providedIn: 'root'})
export class CountryService {
	private countries: BehaviorSubject<Country[]> = new BehaviorSubject(countriesMock);

	public getCountries(): Country[] {
		return this.countries.getValue();
	}
}
