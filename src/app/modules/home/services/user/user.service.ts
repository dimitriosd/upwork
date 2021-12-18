import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { TaxForm } from '../../models/tax-form.model';
import { of, switchMap } from 'rxjs';
import { ServerResponse } from '../../models/server-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public constructor(private http: HttpClient) {
  }


  public submit(taxForm: TaxForm): Observable<ServerResponse> {
    return this.http.get<TaxForm>('./assets/server.json').pipe(switchMap(item => {
      if (taxForm.username === item.username) {
        return of({
          status: 409,
          statusText: 'Username already exists!'
        });
      }
      return of({
        status: 200,
        statusText: 'Form submitted successfully!'
      });
    }));
  }
}
