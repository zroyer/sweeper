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

  // creates a new random table based on the game state for mines, rows, and columns
  initializeRandomTable(mines, rows, columns) {
    let newTable = []
    for (let row = 0; row < rows; row++) {
      newTable[row] = []
      for (let column = 0; column < columns; column++) {
        newTable[row][column] = {
          row: row,
          column: column,
          isMine: false,
          isDetonated: false,
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
    for (let row = 0; row < table.length; row++) {
      for (let column = 0; column < table[0].length; column++) {
        if (!table[row][column].isMine) {
          table[row][column].squareScore = this.getSquareScore(table, row, column)
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

  // flips a square that has been clicked
  // if the square is a mine, a loss is served
  // if the square is a zero, the surrounding zeroes are recursively flipped
  handleSquareClick(row, column) {
    let clickedTable = this.state.table
    if (!clickedTable[row][column].isFlipped && !clickedTable[row][column].isFlag) {
      clickedTable[row][column].isFlipped = true
      clickedTable[row][column].isMine && this.serveLoss(row, column)
      if (clickedTable[row][column].squareScore === 0) {
        clickedTable = this.flipZeroes(clickedTable, row, column)
      }
      this.checkForWin()
    }
    this.setState({
      table: clickedTable
    })
  }

  // plants a flag on right-click, and checks to see if the table is in a winning position
  handleSquareRightClick(e, row, column) {
    e.preventDefault()
    let numMines = this.state.mines
    let clickedTable = this.state.table
    let clickedSquare = clickedTable[row][column]
    if (!clickedSquare.isFlipped) {
      if (!clickedSquare.isFlag && numMines > 0) {
        clickedTable[row][column].isFlag = true
      } else if (clickedSquare.isFlag) {
        clickedTable[row][column].isFlag = false
      }
      this.checkForWin()
      this.setState({
        table: clickedTable
      })
    }
  }

  // compare the positions of the mines, flags, and unflipped squares
  // a winning game is one where the flags are correctly placed on the mines,
  // with no other unflipped squares
  checkForWin() {
    let gameMap = this.getGameMap()
    if (isEqual(gameMap.mines, gameMap.unflipped)) {
      isEqual(gameMap.mines, gameMap.flags) && this.serveWin()
    }
    this.setState({
      mines: gameMap.mines.length - gameMap.flags.length
    })
  }

  // returns a map of the table's mines, flags, and unflipped squares
  getGameMap() {
    let gameMap = {
      mines: [],
      flags: [],
      unflipped: [],
    }
    this.state.table.forEach(row => {
      row.forEach(square => {
        square.isMine && gameMap.mines.push([square.row, square.column])
        square.isFlag && gameMap.flags.push([square.row, square.column])
        !square.isFlipped && gameMap.unflipped.push([square.row, square.column])
      })
    })
    return gameMap
  }

  serveLoss(row, column) {
    this.setState({
      table: this.flipTable(row, column),
      displayLoss: true,
      displayWin: false,
    })
  }

  serveWin() {
    this.setState({
      displayLoss: false,
      displayWin: true,
    })
  }

  // recursively flip all zeroes surrounding the zero clicked
  flipZeroes(table, row, column) {
    let potentialZeroes = this.lookAround(table, row, column)
    potentialZeroes.forEach(square => {
      if (!square.isFlipped && !square.isMine && !square.isFlag) {
        table[square.row][square.column].isFlipped = true
        square.squareScore === 0 && this.flipZeroes(table, square.row, square.column)
      }
    })
    return table
  }

  // flip all squares and indicate which mine detonated
  flipTable(row, column) {
    let flippedTable = this.state.table
    return flippedTable.forEach(flippedTableRow => {
      flippedTableRow.forEach(square => {
        if (square.row === row && square.column === column) {
          square.isDetonated = true
        }
        square.isFlipped = true
      })
    })
  }

  // refresh the game with a new random table
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
                isDetonated={tableSquare.isDetonated}
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
