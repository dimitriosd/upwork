import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TouchedErrorStateMatcher } from 'src/app/shared/utils/touched-error-state.matcher';
import { TaxFormComponent } from './components/tax-form/tax-form.component';
import { HomeComponent } from './containers/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    TaxFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }
  ]
})
export class HomeModule {
}
