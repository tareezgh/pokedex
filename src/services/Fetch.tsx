import { IPokemon, IPokemonInfo } from "../helpers/interface";

let pokeData: IPokemonInfo[] = [];
let allPokemon: IPokemon[] = [];

export const fetchDataFunc = async (ourUrl: string) => {
  try {
    const apiData = await (await fetch(ourUrl)).json();
    allPokemon = [...pokeData, ...apiData.results];
    console.log(apiData);

    await fetchPerPoke();

    return pokeData;
  } catch (error) {
    console.log("error", error);
  }
};

const fetchPerPoke = async () => {
  allPokemon.map(async (poke) => {
    const perPokeData = await (await fetch(poke.url)).json();
    console.log(perPokeData);
    pokeData = [...pokeData, { ...perPokeData }];
    // setPokeData((data) => [...data, { ...perPokeData }]);
  });
};
