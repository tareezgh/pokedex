export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonInfo {
  id: number;
  sprites: { front_default: string };
  name: string;
  abilities: [{ ability: { name: string } }];
  types: [{ type: { name: string } }];
  stats: [{ stat: { name: string }; base_stat: string }];
}
