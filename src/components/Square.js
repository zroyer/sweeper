import React, { Component } from 'react';

class Square extends Component {
  renderSquareContent(isFlag, isMine, squareScore) {
    if (isFlag) {
      return '🚩'
    }
    if (isMine) {
      return '💣'
    }
    if (squareScore === 0) {
      return null
    }
    return squareScore
  }

  render() {
    const {
      isFlag,
      isMine,
      squareScore,
      isFlipped,
      onClick
    } = this.props

    return (
      <React.Fragment>
        {isFlipped ? (
          <div className="square">
            {this.renderSquareContent(isFlag, isMine, squareScore)}
          </div>
        ) : (
          <div
            className="square unclicked"
            onClick={onClick}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Square;
