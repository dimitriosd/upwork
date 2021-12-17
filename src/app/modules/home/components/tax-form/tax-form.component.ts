import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { CountryFacade } from 'src/app/modules/home/facades/country.facade';
import { itemNotFoundValidator } from 'src/app/shared/utils/item-not-found.validator';
import { regexpPatterns } from "../../../../shared/utils/regexp-patterns.util";

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit, OnDestroy {
  public taxForm = new FormGroup({});
  public filteredCountries!: Observable<string[]>;
  public mask: string = ''
  @ViewChild('formDirective') private _formDirective!: NgForm;
  private readonly destroy$ = new Subject();

  constructor(private readonly _formBuilder: FormBuilder, public countryFacade: CountryFacade) {
  }

  public ngOnInit(): void {
    this.taxForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      country: [null, itemNotFoundValidator(this.countryFacade.countries)],
      taxCode: [''],
    });

    this.filteredCountries = this.taxForm.controls['country'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.taxForm.controls['country'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (value === 'United States') {
        this.mask = '0000-SSS-0000099';
        this.taxForm.controls['taxCode'].setValidators([Validators.required, Validators.pattern(regexpPatterns.usTaxCode)])
        this.taxForm.controls['taxCode'].updateValueAndValidity();
      } else if (value === 'Canada') {
        this.mask = 'AAAAAAAAAA-SS';
        this.taxForm.controls['taxCode'].setValidators([Validators.required, Validators.pattern(regexpPatterns.canadaTaxCode)])
        this.taxForm.controls['taxCode'].updateValueAndValidity();
      } else {
        this.mask = 'AAAAAAAAAA';
        this.taxForm.controls['taxCode'].setValidators([Validators.required, Validators.pattern(regexpPatterns.usTaxCode)])
        this.taxForm.controls['taxCode'].updateValueAndValidity();
      }
    });
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

    if (this.taxForm.controls[field].hasError('pattern')) {
      return `Invalid code`;
    }

    return ''
  }

  public onSubmit() {
    if (this.taxForm.valid) {
      this._formDirective.resetForm()
      this.taxForm.reset()
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.countryFacade.countries.filter(option => option.toLowerCase().includes(filterValue));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
