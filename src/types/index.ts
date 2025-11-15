export type Gender = "male" | "female" | "unknown" | "n/a";

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export interface Species {
  name: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;

  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  homeworld: string;

  created: string;
  edited: string;
  url: string;
}

export interface CharacterWithDetails extends Character {
  homeworldDetails?: Homeworld;
  speciesDetails?: Species[];
}

export interface CharacterGetResponse {
  count: number;
  results: Character[];
  next: string | null;
  previous: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  favorites: Character[];
}
