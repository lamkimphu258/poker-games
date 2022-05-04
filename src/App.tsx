import Navbar from "./components/Navbar";
import GameFeed from "./components/GameFeed";
import { BrowserRouter } from "react-router-dom";

function App() {
  const games = [
    "Top Games",
    "New Games",
    "Slots",
    "Jackpots",
    "Live",
    "BlackJack",
    "Roulette",
    "Table",
    "Poker",
    "Other",
  ];

  return (
    <BrowserRouter>
      <Navbar games={games} />
      <GameFeed />
    </BrowserRouter>
  );
}

export default App;
