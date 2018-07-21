import React, { Component } from 'react';

class Square extends Component {
  renderSquareContent(isFlag, isMine, squareScore) {
    const scoreDict = {
      1: '1️⃣',
      2: '2️⃣',
      3: '3️⃣',
      4: '4️⃣',
      5: '5️⃣',
      6: '6️⃣',
      7: '7️⃣',
      8: '8️⃣',
      9: '9️⃣'
    }

    if (isFlag) {
      return '🚩'
    }
    if (isMine) {
      return '💣'
    }
    if (squareScore === 0) {
      return null
    }
    return scoreDict[squareScore]
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
