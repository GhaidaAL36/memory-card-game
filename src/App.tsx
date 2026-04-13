import GameHeader from "./components/GameHeader";
import Card from "./components/Card";
import "./index.css";
import pirate from "./pirate-icons/pirate.png";
import pirate1 from "./pirate-icons/pirate-1.png";
import pirate2 from "./pirate-icons/pirate-2.png";
import pirate3 from "./pirate-icons/pirate-3.png";
import pirate4 from "./pirate-icons/pirate-4.png";
import pirate5 from "./pirate-icons/pirate-5.png";
import pirate6 from "./pirate-icons/pirate-6.png";
import pirate7 from "./pirate-icons/pirate-7.png";
import { useEffect, useState } from "react";

const cardValues = [
  pirate,
  pirate1,
  pirate2,
  pirate3,
  pirate4,
  pirate5,
  pirate6,
  pirate7,
  pirate,
  pirate1,
  pirate2,
  pirate3,
  pirate4,
  pirate5,
  pirate6,
  pirate7,
];

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCard, setFlippedCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  let [scores, setScores] = useState(0);
  let [moves, setMoves] = useState(0);
  const [showWin, setShowWin] = useState(false);

  type CardType = {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  };

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);

    setCards(
      shuffled.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      })),
    );
  };

  useEffect(() => {
    const win = cards.length > 0 && cards.every((c) => c.isMatched);

    if (!win || showWin) return;

    setShowWin(true);

    const timer = setTimeout(() => {
      handleRest(); //
    }, 4000);

    return () => clearTimeout(timer);
  }, [cards]);

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const handleRest = () => {
    setMoves(0);
    setScores(0);
    setDisabled(false);
    setFlippedCard(null);
    setShowWin(false);

    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleClick = (card: CardType) => {
    if (card.isFlipped) return;
    if (disabled) return;

    setDisabled(true);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );

    setFlippedCard((prevFlipped) => {
      if (!prevFlipped) {
        setDisabled(false);
        return card;
      }

      setMoves((prev) => prev + 1);

      if (prevFlipped.value === card.value) {
        setScores((prev) => prev + 1);

        setCards((prev) =>
          prev.map((c) =>
            c.id === prevFlipped.id || c.id === card.id
              ? { ...c, isMatched: true }
              : c,
          ),
        );

        setDisabled(false);
        return null;
      }

      const firstCard = prevFlipped;
      const secondCard = card;

      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c,
          ),
        );

        setDisabled(false);
      }, 800);

      return null;
    });
  };

  return (
    <div className="app">
      {showWin && (
        <div className="win-overlay">
          <div className="win-message">
            <h2>You Win!</h2>
            <p>Great job</p>
          </div>
        </div>
      )}
      <GameHeader score={scores} moves={moves} handleReset={handleRest} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
