import React, { Component } from 'react';

class Square extends Component {
  renderSquare() {
    const {
      isMine,
      isFlag,
      squareScore
    } = this.props

    if (isFlag) {
      return '🚩'
    }
    if (isMine) {
      return '💣'
    }
    // if (squareScore === 0) {
    //   return null
    // }
    return squareScore
  }

  render() {
    const { isClicked } = this.props
    return (
      <React.Fragment>
        {isClicked ? (
          <div className="square">
            {this.renderSquare()}
          </div>
        ) : (
          <div
            className="square unclicked"
            onClick={this.props.onClick}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Square;
