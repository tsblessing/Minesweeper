'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        return 'This tile has already been flipped';
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      };
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',

    //method to flip tiles//
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [0, -1], [1, 1], [1, 0], [0, 1], [1, -1], [-1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      this._numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
            _this._numberOfBombs++;
          };
        };
      });
      return this._numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',

    //method to get number of neighbor bombs//
    value: function hasSafeTiles() {
      return this._numberOfBombs === this._numberOfTiles;

      //this could be a problem, deleted if but ot brackets//
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
      //also a little iffy right here//
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowTotal = 0; rowTotal < numberOfRows; rowTotal++) {
        var row = [];
        for (var columnTotal = 0; columnTotal < numberOfColumns; columnTotal++) {
          var column = [];
          row.push(' ');
        };
        board.push(row);
      };
      return board;
    }
  }, {
    key: 'generateBombBoard',

    //code to generate a blank board//
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {

      var board = [];
      for (var rowTotal = 0; rowTotal < numberOfRows; rowTotal++) {

        var row = [];
        for (var columnTotal = 0; columnTotal < numberOfColumns; columnTotal++) {

          var column = [];
          row.push(null);
        };
        board.push(row);
      };
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfRows);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        };
        //bombs can be placed on top of bombs //
      };
      return board;
    }
  }]);

  return Board;
}();

;