import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFormComponent } from './tax-form.component';
import { TaxFormFacade } from '../../facades/tax-form.facade';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { countriesMock } from '../../services/country/country.service.mock';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';


describe('TaxFormComponent', () => {
  let component: TaxFormComponent;
  let fixture: ComponentFixture<TaxFormComponent>;
  let taxFormFacade: TaxFormFacade;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxFormComponent],
      imports: [ReactiveFormsModule, FormsModule, MatSnackBarModule, MatAutocompleteModule, NgxMaskModule.forRoot()],
      providers: [
        {
          provide: TaxFormFacade,
          useValue: {
            countries: countriesMock.map(item => item.name),
            submit: {}
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jasmine.createSpy('dispatchTakingAssessment').and.callFake(type => type)
          },
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxFormComponent);
    component = fixture.componentInstance;
    taxFormFacade = TestBed.inject(TaxFormFacade);
    snackBar = TestBed.inject(MatSnackBar)
    fixture.detectChanges();
  });

  it('should create form', () => {
    expect(component.taxForm).toBeTruthy();
  });

  it('should show validation error for username when not lenght < 3', () => {
    component.taxForm.patchValue({
      username: 'on',
      country: 'Greece',
      taxId: '1111111111'
    });
    expect(component.taxForm.invalid).toBeTruthy();
    expect(component.usernameErrorMessage).toEqual('Minimum 3 characters required')
  });

  it('should show validation error for username when empty', () => {
    component.taxForm.patchValue({
      username: '',
      country: 'Greece',
      taxId: '1111111111'
    });
    expect(component.usernameErrorMessage).toEqual('Username is required')
    expect(component.taxForm.invalid).toBeTruthy();
  });

  it('should show validation error for country when not exists', () => {
    component.taxForm.patchValue({
      username: 'one',
      country: 'some',
      taxId: '1111111111'
    });
    expect(component.countryErrorMessage).toEqual('Country does not exist')
    expect(component.taxForm.invalid).toBeTruthy();
  });

  it('should show validation error for country when tax id is empty', () => {
    component.taxForm.patchValue({
      username: 'one',
      country: 'Greece',
      taxId: ''
    });
    expect(component.taxIdErrorMessage).toEqual('Tax id must be [10 symbols digits]')
    expect(component.taxForm.invalid).toBeTruthy();
  });

  it('should change validation when country is US', () => {
    component.taxForm.controls['country'].patchValue('United States');
    expect(component.mask).toEqual('0000-SSS-0000099');
  });

  it('should change validation when country is Canada', () => {
    component.taxForm.controls['country'].patchValue('Canada');
    expect(component.mask).toEqual('AAAAAAAAAA-SS');
  });

  it('should show no errors when all fields pass validation', () => {
    component.taxForm.patchValue({
      username: 'one',
      country: 'Greece',
      taxId: '1111111111'
    });
    expect(component.taxForm.invalid).toBeFalsy();
  });

  it('should submit with success response when no backend error', () => {
    component.taxForm.patchValue({
      username: 'one',
      country: 'Greece',
      taxId: '1111111111'
    });
    spyOn(taxFormFacade, 'submit').and.returnValue(of({
      status: 200,
      statusText: 'success'
    }))
    component.onSubmit();
    const params = {
      duration: 3000,
      panelClass: 'green'
    }
    expect(snackBar.open).toHaveBeenCalledWith('success', '', params);
  });

  it('should submit with error response when backend error', () => {
    component.taxForm.patchValue({
      username: 'test',
      country: 'Greece',
      taxId: '1111111111'
    });
    spyOn(taxFormFacade, 'submit').and.returnValue(of({
      status: 409,
      statusText: 'error'
    }))
    component.onSubmit();
    const params = {
      duration: 3000,
      panelClass: 'red'
    }
    expect(snackBar.open).toHaveBeenCalledWith('error', '', params);
  });
});
