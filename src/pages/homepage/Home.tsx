import { useState, useEffect } from "react";
import Card from "../../shared/components/Card/Card";

import { IPokemon, IPokemonInfo } from "../../helpers/interface";

import "./Home.css";
import Navbar from "../../shared/components/Navbar";

const Home = () => {
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
  const [searchInput, setSearchInput] = useState<string>("");

  const [nextUrl, setNextUrl] = useState<string>("");
  const [pokeData, setPokeData] = useState<IPokemonInfo[]>([]);
  const [pokeDescription, setPokeDescription] = useState<string>("");
  let allPokemon: IPokemon[] = [];

  useEffect(() => {
    fetchData(url);
  }, []);

  const fetchData = async (ourUrl: string) => {
    try {
      const apiData = await (await fetch(ourUrl)).json();
      allPokemon = [...pokeData, ...apiData.results];
      if (apiData.next != "") setNextUrl(apiData.next);
      else setNextUrl(" ");

      await fetchPerPoke();
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPerPoke = async () => {
    allPokemon.map(async (poke) => {
      const perPokeData = await (await fetch(poke.url)).json();
      setPokeData((data) => [...data, { ...perPokeData }]);
      await getDescription(poke.name);
    });
  };

  const getDescription = async (name: string) => {
    const pokeDescriptionData = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    ).json();
    const item = pokeDescriptionData.flavor_text_entries[0].flavor_text;
    setPokeDescription(item);
  };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue.toLowerCase());
  };

  const loadMore = async () => {
    await fetchData(nextUrl);
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="header">
          <div className={"search"}>
            <input
              className="searchInput"
              placeholder="Enter Pokemon Name"
              onChange={(e) => searchItems(e.target.value)}
            />
            <button className="searchBtn">Search</button>
          </div>
        </div>
        <div className="row">
          {searchInput === ""
            ? pokeData &&
              pokeData
                .sort((first, second) => {
                  return first.id - second.id;
                })
                .map((pokemon, index) => (
                  <Card
                    key={index}
                    pokemon={pokemon}
                    description={pokeDescription}
                  />
                ))
            : pokeData &&
              pokeData
                .filter((pokemon) => {
                  return pokemon.name.includes(searchInput);
                })
                .map((pokemon, index) => (
                  <Card
                    key={index}
                    pokemon={pokemon}
                    description={pokeDescription}
                  />
                ))}
        </div>

        <div className={"load-btn-container"}>
          {nextUrl && (
            <button className="loadBtn" onClick={loadMore}>
              Load more...
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
