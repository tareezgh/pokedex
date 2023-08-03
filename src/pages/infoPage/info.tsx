import { useLocation } from "react-router";
import {
  capitalizeFirstLetter,
  formatPokemonId,
  formatStatName,
} from "../../helpers/help";
import { IPokemonInfo } from "../../helpers/interface";

import "./info.css";
import Navbar from "../../shared/components/Navbar";

const Info = () => {
  const location = useLocation();
  const pokemon: IPokemonInfo = location.state.pokemon;
  const pokeDescription: string = location.state.pokeDescription;
  let stateSum: number = 0;

  return (
    <>
      <Navbar />
      <div className="containerInfo">
        <div className="leftContent">
          <div className="cardInfo" key={pokemon.id}>
            <h2 className="cardIdInfo">{formatPokemonId(pokemon.id)}</h2>
            <img
              className="cardImgInfo"
              src={pokemon.sprites.front_default}
              alt=""
            />
            <h2 className="cardNameInfo">
              {capitalizeFirstLetter(pokemon.name)}
            </h2>

            <div className="abilities">
              {pokemon.types.map((poke) => {
                return (
                  <>
                    <div className={"abilitiesGroup " + poke.type.name}>
                      <div>{capitalizeFirstLetter(poke.type.name)}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lineDraw"></div>

        <div className="rightContent">
          <div className="description">
            <h2 className="desTitle">Description</h2>
            <p className="details">{pokeDescription}</p>
          </div>

          <h2 className="statsTitle">Stats</h2>
          <div className="base-stat">
            {pokemon.stats.map((stat, base_stat) => {
              stateSum += +pokemon.stats[base_stat].base_stat;

              return (
                <>
                  <div>
                    {formatStatName(pokemon.stats[base_stat].stat.name)}:{" "}
                    {pokemon.stats[base_stat].base_stat}
                  </div>
                </>
              );
            })}

            <div className="col3">
              <div className="total">Total: {stateSum}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
