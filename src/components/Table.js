import React, { Component } from 'react';
import Square from './Square'
import DisplayStatus from './DisplayStatus'
import RefreshCat from './RefreshCat'
import Confetti from 'react-dom-confetti';
import { isEqual } from 'lodash'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mines: this.props.mines,
      table: this.initializeRandomTable(this.props.mines, this.props.rows, this.props.columns),
      displayLoss: false,
      displayWin: false,
    }
  }

  initializeRandomTable(mines, rows, columns) {
    let newTable = []
    for (let row = 0; row < rows; row++) {
      newTable.push([])
      for (let column = 0; column < columns; column++) {
        newTable[row][column] = {
          row: row,
          column: column,
          isMine: false,
          isFlag: false,
          isFlipped: false,
          squareScore: 0,
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
      let possibleRow = Math.floor(Math.random() * Math.floor(table.length));
      let possibleColumn = Math.floor(Math.random() * Math.floor(table[0].length));
      if (!table[possibleRow][possibleColumn].isMine) {
        table[possibleRow][possibleColumn].isMine = true
        mines--
      }
    }
    return table
  }

  // lay the score for all the squares on the table
  layTableScore(table) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[0].length; j++) {
        if (!table[i][j].isMine) {
          table[i][j].squareScore = this.getSquareScore(table, i, j)
        }
      }
    }
    return table
  }

  // returns the score for an individual square
  getSquareScore(table, row, column) {
    let surroundingSquares = this.lookAround(table, row, column)
    let score = 0
    surroundingSquares.forEach(square => {
      square.isMine && score++
    })
    return score
  }

  // grabs the surrounding squares (up to 8) for comparison
  lookAround(table, row, column) {
    let res = []
    // look up
    row > 0 && res.push(table[row - 1][column])
    // look up & to the right
    row > 0 && column < table[0].length - 1 && res.push(table[row - 1][column + 1])
    // look to the right
    column < table[0].length - 1 && res.push(table[row][column + 1])
    // look down & to the right
    row < table.length - 1 && column < table[0].length - 1 && res.push(table[row + 1][column + 1] )
    // look down
    row < table.length - 1 && res.push(table[row + 1][column])
    // look down & to the left
    row < table.length - 1 && column > 0 && res.push(table[row + 1][column - 1])
    // look to the left
    column > 0 && res.push(table[row][column - 1])
    // look up & to the left
    row > 0 && column > 0 && res.push(table[row - 1][column - 1])
    return res
  }

  handleSquareClick(row, column) {
    let clickedTable = this.state.table
    if (!clickedTable[row][column].isFlipped && !clickedTable[row][column].isFlag) {
      clickedTable[row][column].isFlipped = true
      clickedTable[row][column].isMine && this.serveLoss()
      if (clickedTable[row][column].squareScore === 0) {
        clickedTable = this.flipZeroes(clickedTable, row, column)
      }
      this.checkForWin()
    }
    this.setState({
      table: clickedTable
    })
  }

  handleSquareRightClick(e, row, column) {
    e.preventDefault()
    let clickedTable = this.state.table
    let clickedSquare = clickedTable[row][column]
    if (!clickedSquare.isFlipped) {
      clickedSquare.isFlag = !this.state.table[row][column].isFlag
      this.checkForWin()
      this.setState({
        table: clickedTable
      })
    }
  }

  checkForWin() {
    let mineMap = this.getMineMap()
    let flagMap = this.getFlagMap()
    let unflippedMap = this.getUnflippedMap()

    if (isEqual(mineMap, unflippedMap)) {
      isEqual(mineMap, flagMap) && this.serveWin()
    }
    this.setState({
      mines: mineMap.length - flagMap.length
    })
  }

  getMineMap() {
    let mineMap = []
    this.state.table.forEach(row => {
      row.forEach(square => {
        if (square.isMine) {
          mineMap.push([square.row, square.column])
        }
      })
    })
    return mineMap
  }

  getFlagMap() {
    let flagMap = []
    this.state.table.forEach(row => {
      row.forEach(square => {
        if (square.isFlag) {
          flagMap.push([square.row, square.column])
        }
      })
    })
    return flagMap
  }

  getUnflippedMap() {
    let unflippedMap = []
    this.state.table.forEach(row => {
      row.forEach(square => {
        if (!square.isFlipped) {
          unflippedMap.push([square.row, square.column])
        }
      })
    })
    return unflippedMap
  }

  serveLoss() {
    this.setState({
      table: this.flipTable(),
      displayLoss: true
    })
  }

  serveWin() {
    this.setState({
      displayWin: true
    })
  }

  flipZeroes(table, row, column) {
    let potentialZeroes = this.lookAround(table, row, column)
    potentialZeroes.forEach(square => {
      if (!square.isFlipped && !square.isMine ) {
        table[square.row][square.column].isFlipped = true
        square.squareScore === 0 && this.flipZeroes(table, square.row, square.column)
      }
    })
    return table
  }

  flipTable() {
    let flippedTable = this.state.table
    return flippedTable.forEach(row => {
      row.forEach(square => {
        square.isFlipped = true
      })
    })
  }

  handleRefresh() {
    this.setState({
      mines: this.props.mines,
      table: this.initializeRandomTable(this.props.mines, this.props.rows, this.props.columns),
      displayLoss: false,
      displayWin: false,
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
                onContextMenu={(e) => this.handleSquareRightClick(e, tableSquare.row, tableSquare.column)}
              />
            )
          })}
        </div>
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.degree !== this.props.degree) {
      this.setState({
        mines: this.props.mines,
        table: this.initializeRandomTable(this.props.mines, this.props.rows, this.props.columns),
        displayLoss: false,
        displayWin: false,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <RefreshCat
          onClick={() => this.handleRefresh()}
          displayLoss={this.state.displayLoss}
          displayWin={this.state.displayWin}
        />
        {this.renderTable(this.state.table)}
        <DisplayStatus
          onClick={() => this.handleRefresh()}
          displayLoss={this.state.displayLoss}
          displayWin={this.state.displayWin}
          mines={this.state.mines}
        />
        <Confetti
          active={this.state.displayWin}
          config={{
            angle: 90,
            spread: 120,
            startVelocity: 70,
            elementCount: 200,
            decay: 0.9
        }}/>
      </React.Fragment>
    );
  }
}

export default Table;
