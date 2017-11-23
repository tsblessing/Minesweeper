class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
  };
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex)
    if (this._board.flipTile(rowIndex, columnIndex) === 'B') {
      console.log('Game over, you hit a mine')
      this._board.print()
    } else if (this._board.hasSafeTiles()) {
      console.log('You have won')
    } else {
      console.log('Current Board:')
      this._board.print()
    }
  }
}






class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs
    this._numberOfTiles = numberOfRows * numberOfColumns
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns)
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  };
  get playerBoard() {
    return this._playerBoard
  };
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      return 'This tile has already been flipped';
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] =
      this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    };
    this._numberOfTiles--;
  };
  //method to flip tiles//
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [0, -1], [1, 1],
    [1, 0], [0, 1], [1, -1], [-1, 1]]
    const numberOfRows = this._bombBoard.length
    const numberOfColumns = this._bombBoard[0].length
    this._numberOfBombs = 0
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
      neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          this._numberOfBombs++
        };
      };
    });
    return this._numberOfBombs;
  };
  //method to get number of neighbor bombs//
  hasSafeTiles() {
    return (this._numberOfBombs === this._numberOfTiles)

    //this could be a problem, deleted if but ot brackets//
  }
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'))
  //also a little iffy right here//
  }
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    var board = [];
    for (let rowTotal = 0; rowTotal < numberOfRows; rowTotal++) {
      var row = [];
      for (let columnTotal = 0; columnTotal < numberOfColumns; columnTotal++) {
        var column = [];
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  };
  //code to generate a blank board//
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {

    var board = []
    for (let rowTotal = 0; rowTotal < numberOfRows; rowTotal++) {

      var row = []
      for (let columnTotal = 0; columnTotal < numberOfColumns; columnTotal++) {

        var column = [];
        row.push(null);

      }
      board.push(row);
    }
    var numberOfBombsPlaced = 0
    while (numberOfBombsPlaced < numberOfBombs) {
      var randomRowIndex = Math.floor(Math.random() * numberOfRows);
      var randomColumnIndex = Math.floor(Math.random() * numberOfRows);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B'
        numberOfBombsPlaced++;
      }
      //bombs can be placed on top of bombs //
    }
    return board;
  }
  //code to generate a board with bombs//
};





const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1], [-1, 0], [0, -1], [1, 1],
  [1, 0], [0, 1], [1, -1], [-1, 1]]
  const numberOfRows = bombBoard.length
  const numberOfColumns = bombBoard[0].length
  var numberOfBombs = 0
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
    neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++
      }
    }
  });
  return numberOfBombs;
};




const g = new Game(10, 10, 10)
g.playMove(0, 0)
