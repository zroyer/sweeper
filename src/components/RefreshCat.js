import React from 'react';

const RefreshCat = (props) => (
  <div className="game-reset-wrapper">
    <span onClick={props.onClick} className="pointer">
      {props.displayWin ? (
        <span role="img" aria-label="cat-win">😻</span>
      ) : props.displayLoss ? (
        <span role="img" aria-label="cat-loss">😿</span>
      ) : (
        <span role="img" aria-label="cat-ok">😺</span>
      )}
    </span>
  </div>
);

export default RefreshCat;
