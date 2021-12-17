/** A hero's name can't match the given regular expression */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { countriesMock } from 'src/app/modules/home/services/country/country.service.mock';

export function itemNotFoundValidator(items: string[]): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const itemNotFound = !items.some(item => item === control.value);
		return itemNotFound ? {itemNotFound: {value: control.value}} : null;
	};
}
