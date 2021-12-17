import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonFacade {
  private readonly _pokemons = new BehaviorSubject<Pokemon[]>([]);
  public pokemons$ = this._pokemons.asObservable()

  constructor(private _service: PokemonService) {
    this._service.getPokemons().subscribe(data => {
      this._pokemons.next(data.results)
    })
  }
}
