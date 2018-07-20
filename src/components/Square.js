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
      <div>
        {this.renderSquare()}
      </div>
    );
  }
}

export default Square;
