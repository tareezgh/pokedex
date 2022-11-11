export const formatPokemonId = (id: number) => {
  return `#${"000".substr(id.toString().length)}${id}`;
};

export const formatStatName = (statName: string) => {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Special Atk";
    case "special-defense":
      return "Special Def";
    case "speed":
      return "Speed";
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
