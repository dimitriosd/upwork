import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {apisConfig} from "../config/apis.config";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../models/paginated-response.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  public getPokemons(): Observable<PaginatedResponse> {
    return this._http.get<PaginatedResponse>(apisConfig.pokemon);
  }
}
