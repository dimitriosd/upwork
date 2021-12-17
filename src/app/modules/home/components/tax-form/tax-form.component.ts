import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { CountryFacade } from 'src/app/modules/home/facades/country.facade';
import { countriesMock } from 'src/app/modules/home/services/country/country.service.mock';
import { itemNotFoundValidator } from 'src/app/shared/utils/item-not-found.validator';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit {
	taxForm = new FormGroup({});
	filteredCountries!: Observable<string[]>;


	constructor(private readonly formBuilder: FormBuilder, public countryFacade: CountryFacade) { }

  ngOnInit(): void {
	  this.taxForm = this.formBuilder.group({
		  username: [ '', [Validators.required, Validators.minLength(3)]],
		  country: [null, itemNotFoundValidator(countriesMock.map(item => item.name))],
		  taxCode: [ '', [Validators.required,Validators.pattern(/\d{4}-\d{3}-(\d{3}|\d{5})$/)]],
	  });

	  this.filteredCountries = this.taxForm.controls['country'].valueChanges.pipe(
		  startWith(''),
		  map(value => this._filter(value)),
	  );
  }

	public maskFunc(userInput: string) {
		let numbers = userInput.match(/\d/g);
		let numberLength = 0;
		if (numbers) {
			numberLength = numbers.join("").length;
		}

		if (numberLength > 10) {
			return [/\d/, /\d/, /\d/, /\d/, '-', /\s/, /\s/, /\s/, /\s/, /\s/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
		} else {
			return [/\d/, /\d/, /\d/, /\d/,  '-', /\s/, /\s/, /\s/, /\s/, /\s/, '-', /\d/, /\d/, /\d/,];
		}
	}

	private _filter(value: string): string[] {
		const filterValue = value?.toLowerCase();
		return this.countryFacade.countries.filter(option => option.toLowerCase().includes(filterValue));
	}

	public getErrorMessage(field: string): string {
		if (this.taxForm.controls[field].hasError('required')) {
			return 'Field is required';
		}

		if (this.taxForm.controls[field].hasError('minlength')) {
			return `Minimum ${this.taxForm.controls[field].getError('minlength').requiredLength} characters required`;
		}

		if (this.taxForm.controls[field].hasError('itemNotFound')) {
			return `Invalid ${field}`;
		}

		return ''
	}

	public onSubmit() {
	}
}
