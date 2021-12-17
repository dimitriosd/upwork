import {Pokemon} from "./pokemon.model";

export class PaginatedResponse {
  count: number = 0;
  next: string | null = null;
  previous: string | null = null;
  results: Pokemon[] = [];
}
