import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function itemNotFoundValidator(items: string[]): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const itemNotFound = !items.some(item => item === control.value);
		return itemNotFound ? {itemNotFound: {value: control.value}} : null;
	};
}
