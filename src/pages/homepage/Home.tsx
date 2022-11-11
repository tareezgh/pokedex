import React, { useState, useEffect } from "react";
import Card from "../../shared/components/Card/Card";
import logo from "../../shared/logo.png";

import { fetchDataFunc } from "../../services/Fetch";
import { IPokemon, IPokemonInfo } from "../../helpers/interface";

import "./Home.css";

const Home = () => {
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [pokeData, setPokeData] = useState<IPokemonInfo[]>([]);
  const [pokeDescription, setPokeDescription] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
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

  const loadMore = async () => {
    await fetchData(nextUrl);
  };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue.toLowerCase());
  };

  return (
    <>
      <div className="container">
        <img src={logo} className="logo" alt="logo" />
        <input
          className="searchInput"
          placeholder="Enter Pokemon name"
          onChange={(e) => searchItems(e.target.value)}
        />

        <button className="searchBtn">Search</button>

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

        {nextUrl && (
          <button className="loadBtn" onClick={loadMore}>
            Load more...
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
