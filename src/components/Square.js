import React, { Component } from 'react';

class Square extends Component {
  renderSquare() {
    const {
      isMine,
      isFlag,
      isClicked,
      squareScore
    } = this.props

    if (isFlag) {
      return '🚩'
    }
    if (isMine) {
      return '💣'
    }

    return squareScore
  }

  render() {
    return (
      <div className="square">
        {this.renderSquare()}
      </div>
    );
  }
}

export default Square;
