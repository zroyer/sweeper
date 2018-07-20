import React, { Component } from 'react';
import Square from './Square'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mines: this.props.mines,
      table: this.initializeTable(this.props.mines, this.props.columns, this.props.rows)
    };
  }

  initializeTable(mines, columns, rows) {
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
    console.log(newTable)
    return newTable;
  }

  // randomly lay the specified amount of mines
  layMines(table, mines) {
    while(mines > 0) {
      let columnToLay = Math.floor(Math.random() * Math.floor(table.length));
      let rowToLay = Math.floor(Math.random() * Math.floor(table[0].length));

      if (!table[columnToLay][rowToLay].isMine) {
        table[columnToLay][rowToLay].isMine = true
        mines--
      }
    }
    return table
  }

  // get the score for all the squares on the table
  getTableScore(table, column, row) {
    return table
  }

  // get the score for an individual square
  getSquareScore(table, column, row) {
    let score = 0
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
      <div>
        <div>
          Mines remaining: {this.state.mines}
        </div>
        {this.renderTable(this.state.table)}
      </div>
    );
  }
}

export default Table;
