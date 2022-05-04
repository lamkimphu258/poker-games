import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

interface Props {
  games: string[];
}

const Navbar: React.FC<Props> = ({ games }) => {
  return (
    <>
      <header>
        <div className="navbar__top"></div>
        <div className="navbar">
          {games.map((game) => (
            <Link key={game} to={game.toLowerCase().replaceAll(" ", "")} className="navbar__link">
              <p className="navbar__link__item">
                {game}
              </p>
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;
