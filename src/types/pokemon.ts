export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonSprites {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  }
  
  export interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
  }


export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}
