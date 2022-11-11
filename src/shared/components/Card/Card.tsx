import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, formatPokemonId } from "../../../helpers/help";
import { IPokemonInfo } from "../../../helpers/interface";
import Info from "../../../pages/infoPage/info";
import "./Card.css";

const Card = (param: { pokemon: IPokemonInfo; description: string }) => {
  const item = param.pokemon;
  const pokeDescription = param.description;
  const navigate = useNavigate();
  let isPokemonClicked: boolean = false;

  const pokemonClicked = () => {
    isPokemonClicked = true;
    navigate(`/info${item.id}`, {
      state: { pokemon: item, pokeDescription: pokeDescription },
    });
  };

  return (
    <>
      <div className="column">
        <div className="card" key={item.id} onClick={pokemonClicked}>
          <h2 className="cardId">{formatPokemonId(item.id)}</h2>
          <img className="cardImg" src={item.sprites.front_default} alt="" />
          <h2 className="cardName">{capitalizeFirstLetter(item.name)}</h2>
        </div>
      </div>

      {/* {isPokemonClicked && <Info />} */}
    </>
  );
};

export default Card;
