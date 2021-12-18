import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { TaxFormFacade } from 'src/app/modules/home/facades/tax-form.facade';
import { TaxFormField } from 'src/app/modules/home/models/tax-form-field.enum';
import { taxFormConstant } from 'src/app/modules/home/utils/constants/tax-form.constant';
import { itemNotFoundValidator } from 'src/app/modules/home/utils/validators/item-not-found.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit, OnDestroy {
  public taxForm = new FormGroup({});
  public filteredCountries!: Observable<string[]>;
  public mask: string = taxFormConstant.countriesConfig.default.taxIdMask;
  public taxIdPlaceholder = taxFormConstant.countriesConfig.default.placeholder;
  public taxFormField = TaxFormField;
  @ViewChild('formDirective') private _formDirective!: NgForm;
  private readonly destroy$ = new Subject();

  constructor(private readonly _formBuilder: FormBuilder, public taxFormFacade: TaxFormFacade, private _snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public get usernameErrorMessage(): string {
    if (this.taxForm.controls[TaxFormField.USERNAME].hasError('required')) {
      return taxFormConstant.userNameMessages.requiredMsg;
    }

    if (this.taxForm.controls[TaxFormField.USERNAME].hasError('minlength')) {
      return taxFormConstant.userNameMessages.minlengthMsg;
    }

    return '';
  }

  public get countryErrorMessage(): string {
    if (this.taxForm.controls[TaxFormField.COUNTRY].hasError('itemNotFound')) {
      return taxFormConstant.countryMessages.invalidCountry;
    }

    return '';
  }

  public get taxIdErrorMessage(): string {
    if (this.taxForm.controls[TaxFormField.TAX_ID].errors) {
      const country = this.taxForm.controls[TaxFormField.COUNTRY].value;
      return taxFormConstant.countriesConfig[country]?.message || taxFormConstant.countriesConfig.default.message;
    }

    return '';
  }

  public onSubmit(): void {
    if (this.taxForm.valid) {
      this.taxFormFacade.submit(this.taxForm.value).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this._snackBar.open(response.statusText, '', {
          duration: 3000,
          panelClass: response.status === HttpStatusCode.Ok ? 'green' : 'red'
        });

        if (response.status === HttpStatusCode.Ok) {
          this._formDirective.resetForm();
          this.taxForm.reset();
        }
      })
    }
  }

  private createForm(): void {
    this.taxForm = this._formBuilder.group({
      [TaxFormField.USERNAME]: ['', [Validators.required, Validators.minLength(3)]],
      [TaxFormField.COUNTRY]: [null, itemNotFoundValidator(this.taxFormFacade.countries)],
      [TaxFormField.TAX_ID]: ['', [Validators.required, Validators.pattern(taxFormConstant.countriesConfig.default.regexp)]],
    });
    this.setCountryAutocompleteListener();
    this.setCountryTaxIdListener();
  }

  private setCountryAutocompleteListener(): void {
    this.filteredCountries = this.taxForm.controls[TaxFormField.COUNTRY].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private setCountryTaxIdListener(): void {
    this.taxForm.controls[TaxFormField.COUNTRY].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.mask = taxFormConstant.countriesConfig[value]?.taxIdMask || taxFormConstant.countriesConfig.default.taxIdMask;
      this.taxIdPlaceholder = taxFormConstant.countriesConfig[value]?.taxIdPlaceholder || taxFormConstant.countriesConfig.default.taxIdPlaceholder;
      const pattern = taxFormConstant.countriesConfig[value]?.regexp || taxFormConstant.countriesConfig.default.regexp
      this.taxForm.controls[TaxFormField.TAX_ID].setValidators([Validators.required, Validators.pattern(pattern)])
      this.taxForm.controls[TaxFormField.TAX_ID].updateValueAndValidity();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.taxFormFacade.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
}
