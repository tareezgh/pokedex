import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../pokedex-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const filters = ["Home", "Favorites"];
  const [myFilter, setMyFilter] = useState<string>("Home");

  const handleFilter = (Filter: string) => {
    switch (Filter) {
      case "Home":
        navigate("/");
        break;

      case "Favorites":
        break;
    }
  };

  return (
    <nav className="navbar">
      <img
        src={logo}
        className="logo"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="items">
        {filters.map((filter: string, key: number) => (
          <div
            key={key}
            className="navItem"
            onClick={() => {
              setMyFilter(filter);
              handleFilter(filter);
            }}
            style={{
              color: myFilter === filter ? "#000000" : "#f7f7f9",
              background: myFilter === filter ? "#94d97e" : "",
            }}
          >
            {filter}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
