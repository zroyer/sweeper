import React from 'react';

const DisplayStatus = (props) => (
  <div className="display">
    {props.win && (
      <span>Way to go, you won! Try again?</span>
    )}
    {props.loss && (
      <span>Aww you lost! Try again?</span>
    )}
    <span
      role="img"
      aria-label="refresh"
      className="refresh pointer"
      onClick={props.onClick}
    >
      ♻️
    </span>
  </div>
);

export default DisplayStatus;
