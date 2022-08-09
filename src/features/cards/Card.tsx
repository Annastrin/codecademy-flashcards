import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCards } from "./cardsSlice";

interface CardProps {
  id: string;
}

export default function Card({ id }: CardProps) {
  const cards = useSelector(selectCards);
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
