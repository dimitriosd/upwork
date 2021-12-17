import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonFacade } from "../../facades/pokemon.facade";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(public facade: PokemonFacade) { }
}
