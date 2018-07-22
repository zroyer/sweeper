import React from 'react';

const Refresh = (props) => (
  <span
    role="img"
    aria-label="refresh"
    className="refresh pointer"
    onClick={props.onClick}
  >
    ♻️
  </span>
)

const DisplayStatus = (props) => (
  <div className="game-info">
    {props.displayWin ? (
      <React.Fragment>
        <span>Way to go, you won! Try again?</span>
        <Refresh onClick={props.onClick}/>
      </React.Fragment>
    ) : props.displayLoss ? (
      <React.Fragment>
        <span>Aww you lost! Try again?</span>
        <Refresh onClick={props.onClick}/>
      </React.Fragment>
    ) : (
      <span>
        <span role="img" aria-label="mine-count">💣</span>: {props.mines}
      </span>
    )}

  </div>
);

export default DisplayStatus;
