import React, { Component } from 'react';
import Square from './Square'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mines: this.props.mines,
      table: this.initializeNewTable(this.props.mines, this.props.columns, this.props.rows)
    };
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
          isClicked: false,
          squareScore: 0
        }
      }
    }

    newTable = this.layMines(newTable, mines)
    newTable = this.getTableScore(newTable)
    console.log(newTable)
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
  getTableScore(table) {
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
      if (table[row - 1][column].isMine) {
        score++
      }
    }

    // look up & to the right
    if (row > 0 && column < table.length - 1) {
      if (table[row - 1][column + 1].isMine) {
        score++
      }
    }

    // look to the right
    if (column < table.length - 1) {
      if (table[row][column + 1].isMine) {
        score++
      }
    }

    // look down & to the right
    if (row < table[0].length - 1 && column < table.length - 1) {
      if (table[row + 1][column + 1].isMine) {
        score++
      }
    }

    // look down
    if (row < table[0].length - 1) {
      if (table[row + 1][column].isMine) {
        score++
      }
    }

    // look down & to the left
    if (row < table[0].length - 1 && column > 0) {
      if (table[row + 1][column - 1].isMine) {
        score++
      }
    }

    // look to the left
    if (column > 0) {
      if (table[row][column - 1].isMine) {
        score++
      }
    }

    // look up & to the left
    if (row > 0 && column > 0) {
      if (table[row - 1][column - 1].isMine) {
        score++
      }
    }

    return score
  }

  renderTable(table) {
    return table.map((tableRow, index) => {
      return (
        <div className="table-row" key={`row-${index}`}>
          {tableRow.map((tableSquare) => {
            return (
              <Square
                key={`column-${tableSquare.column}`}
                isMine={tableSquare.isMine}
                squareScore={tableSquare.squareScore}
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
        <div>
          Mines remaining: {this.state.mines}
        </div>
        {this.renderTable(this.state.table)}
      </React.Fragment>
    );
  }
}

export default Table;
