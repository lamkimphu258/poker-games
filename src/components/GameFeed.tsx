import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/GameFeed.css";
import { SpinnerCircular } from "spinners-react";
import { useLocation } from "react-router-dom";

type Game = {
  categories: string[];
  name: string;
  image: string;
  id: string;
};

type Jackpot = {
  game: string;
  amount: number;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

const TEN_SECONDS = 10000;

type CategoryMap = {
  [key: string]: string;
};

const categoriesMap: CategoryMap = {
  topgames: "top",
  newgames: "new",
  slots: "slots",
  jackpots: "jackpots",
  live: "live",
  blackjack: "blackjack",
  roulette: "roulette",
  table: "table",
  poker: "poker",
  ball: "other",
  virtual: "other",
  fun: "other",
};

const GameFeed = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jackpots, setJackpots] = useState<Jackpot[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    setGames([]);
    axios
      .get<Game[]>("http://stage.whgstage.com/front-end-test/games.php")
      .then((response) => {
        const filteredData = response.data
          .filter((data) =>
            data.categories.includes(
              categoriesMap[pathname.replaceAll("/", "")]
            )
          )
          .map((data) => data);
        setGames(filteredData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [window.location.pathname, setGames]);

  useEffect(() => {
    axios
      .get<Jackpot[]>("http://stage.whgstage.com/front-end-test/jackpots.php")
      .then((response) => setJackpots(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setInterval(() => {
      axios
        .get<Jackpot[]>("http://stage.whgstage.com/front-end-test/jackpots.php")
        .then((response) => setJackpots(response.data))
        .catch((err) => console.error(err));
    }, TEN_SECONDS);
  }, []);

  return isLoading ? (
    <SpinnerCircular
      size={100}
      style={{ margin: "auto", width: "100vw", height: "300px" }}
    />
  ) : games.length === 0 ? (
    <h1 className="no__data__message">No games for this category</h1>
  ) : (
    <div className="container">
      <div></div>
      <div className="gamefeed">
        {games.map((game: Game, index: number) => {
          return (
            <div className="gamefeed__item" key={game.id}>
              {game.categories.includes("new") ? (
                <div className="gamefeed__item__ribbon">
                  <span>NEW</span>
                </div>
              ) : (
                <></>
              )}

              <div className="gamefeed__item__image__container">
                {jackpots
                  .filter((jackpot) => jackpot.game === game.id)
                  .map((jackpot) => (
                    <div className="gamefeed__item__overlay">
                      <span className="gamefeed__item__jackpot">
                        {formatter.format(jackpot.amount)}
                      </span>
                    </div>
                  ))}
                <img
                  key={game.id}
                  src={game.image}
                  alt={game.name}
                  className="gamefeed__item__image"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default GameFeed;
