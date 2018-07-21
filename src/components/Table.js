import React, { Component } from 'react';
import Square from './Square'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mines: this.props.mines,
      table: this.initializeNewTable(this.props.mines, this.props.columns, this.props.rows),
      displayLoss: false,
    }

    console.log(this.state)
  }

  initializeNewTable(mines, columns, rows) {
    let newTable = []
    for (let i = 0; i < rows; i++) {
      newTable.push([])
      for (let j = 0; j < columns; j++) {
        newTable[i][j] = {
          row: i,
          column: j,
          isMine: false,
          isFlag: false,
          isFlipped: false,
          squareScore: 0
        }
      }
    }

    newTable = this.layMines(newTable, mines)
    newTable = this.layTableScore(newTable)
    return newTable;
  }

  // randomly lay the specified amount of mines
  layMines(table, mines) {
    while(mines > 0) {
      let rowToLay = Math.floor(Math.random() * Math.floor(table[0].length));
      let columnToLay = Math.floor(Math.random() * Math.floor(table.length));

      if (!table[rowToLay][columnToLay].isMine) {
        table[rowToLay][columnToLay].isMine = true
        mines--
      }
    }
    return table
  }

  // get the score for all the squares on the table
  layTableScore(table) {
    for (let i = 0; i < table[0].length; i++) {
      for (let j = 0; j < table.length; j++) {
        if (!table[i][j].isMine) {
          table[i][j].squareScore = this.getSquareScore(table, i, j)
        }
      }
    }
    return table
  }

  // get the score for an individual square
  getSquareScore(table, row, column) {
    let score = 0

    // look up
    if (row > 0) {
      row > 0 && table[row - 1][column].isMine && score++
    }

    // look up & to the right
    if (row > 0 && column < table.length - 1) {
      table[row - 1][column + 1].isMine && score++
    }

    // look to the right
    if (column < table.length - 1) {
      table[row][column + 1].isMine && score++
    }

    // look down & to the right
    if (row < table[0].length - 1 && column < table.length - 1) {
      table[row + 1][column + 1].isMine && score++
    }

    // look down
    if (row < table[0].length - 1) {
      table[row + 1][column].isMine && score++
    }

    // look down & to the left
    if (row < table[0].length - 1 && column > 0) {
      table[row + 1][column - 1].isMine && score++
    }

    // look to the left
    if (column > 0) {
      table[row][column - 1].isMine && score++
    }

    // look up & to the left
    if (row > 0 && column > 0) {
      table[row - 1][column - 1].isMine && score++
    }

    return score
  }

  handleRefresh() {
    this.setState({
      table: this.initializeNewTable(this.props.mines, this.props.columns, this.props.rows),
      displayLoss: false,
    })
  }

  handleSquareClick(row, column) {
    let clickedTable = this.state.table

    if (!clickedTable[row][column].isFlipped) {
      clickedTable[row][column].isFlipped = true
      clickedTable[row][column].isMine && this.serveLoss()
    }

    this.setState({
      table: clickedTable
    })
  }

  serveLoss() {
    this.setState({
      table: this.flipTable(),
      displayLoss: true
    })
  }

  flipTable() {
    let flippedTable = this.state.table
    return flippedTable.forEach(row => {
      row.forEach(square => {
        square.isFlipped = true
      })
    })
  }

  renderTable(table) {
    return table.map((tableRow, index) => {
      return (
        <div className="table-row" key={`row-${index}`}>
          {tableRow.map((tableSquare) => {
            return (
              <Square
                key={`row-${index}&column-${tableSquare.column}`}
                isMine={tableSquare.isMine}
                isFlag={tableSquare.isFlag}
                isFlipped={tableSquare.isFlipped}
                squareScore={tableSquare.squareScore}
                onClick={() => this.handleSquareClick(tableSquare.row, tableSquare.column)}
              />
            )
          })}
        </div>
      )
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="game-reset-wrapper">
          <span onClick={() => this.handleRefresh()} className="pointer">
            {this.state.displayLoss ? (
              <span role="img" aria-label="cat-loss">😿</span>
            ) : (
              <span role="img" aria-label="cat-win">😸</span>
            )}
          </span>
        </div>
        {this.renderTable(this.state.table)}
        <div className="game-info"><span role="img" aria-label="mine-count">💣</span>: {this.state.mines}</div>
        {this.state.displayLoss && (
          <div className="display-loss">
            <span>You lost! Try again?</span>
            <span
              role="img"
              aria-label="loss-refresh"
              className="loss-refresh pointer"
              onClick={() => this.handleRefresh()}
            >
              ♻️
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Table;
