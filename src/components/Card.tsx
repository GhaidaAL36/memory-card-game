function Card({ card, onClick }) {
  return (
    <div>
      <div className={`card ${card.isFlipped ? "flipped": ""} ${card.isMatched ? "matched": ""}`} onClick={() => onClick(card)}>
        <div className="card-front">?</div>
        <div className="card-back">
          <img src={card.value} alt="card" className="card-image" />
        </div>
      </div>
    </div>
  );
}

export default Card;
