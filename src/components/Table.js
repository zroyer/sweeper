import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mines: this.props.mines,
      table: this.initializeTable(this.props.mines, this.props.columns, this.props.rows)
    };
  }

  initializeTable(mines, columns, rows) {
    const defaultSquare = {
      isMine: false,
      isFlag: false,
      isSearched: false,
      squareScore: 0
    }

    let newTable = []
    for (let i = 0; i < columns; i++) {
      newTable.push([])
      for (let j = 0; j < rows; j++) {
        newTable[i][j] = defaultSquare
      }
    }

    console.log(defaultSquare)
    console.log(newTable)

    return newTable
  }

  layMines(table) {
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

  renderTable() {
    return (
      <div>

      </div>
    )
  }

  render() {
    console.log(this.state.table)
    return (
      <div>
        <div>
          Mines remaining: {this.state.mines}
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default Table;
