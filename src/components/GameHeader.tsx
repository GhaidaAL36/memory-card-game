interface Props{
    score: number,
    moves: number,
    handleReset: () => void
}


function GameHeader(props: Props) {
  return (
    <div className="game-header" >
      <h1>Memory Card Game</h1>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>{" "}
          <span className="stat-value">{props.score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>{" "}
          <span className="stat-value">{props.moves}</span>
        </div>
      </div>
      <div className="reset-btn" onClick={props.handleReset}>Reset Game</div>
    </div>
  );
}

export default GameHeader;
