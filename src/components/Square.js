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
    }

    if (isMine) {
      return '💣'
    }
    if (squareScore === 0) {
      return null
    }
    return scoreDict[squareScore]
  }

  renderFlagContent(isFlag) {
    return isFlag && '🚩'
  }

  render() {
    const {
      isFlag,
      isMine,
      squareScore,
      isFlipped,
      onClick,
      onContextMenu,
    } = this.props

    return (
      <React.Fragment>
        {isFlipped ? (
          <div
            className="square"
            onContextMenu={onContextMenu}
          >
            {this.renderSquareContent(isFlag, isMine, squareScore)}
          </div>
        ) : (
          <div
            className="square unclicked"
            onClick={onClick}
            onContextMenu={onContextMenu}
          >
            {this.renderFlagContent(isFlag)}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default Square;
