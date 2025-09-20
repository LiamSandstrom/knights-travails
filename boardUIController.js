export default class BoardUIController {
  #boardUI;
  #knightPredictor;
  #knightCell;
  constructor(boardUI, knightPredictor) {
    this.#boardUI = boardUI;
    this.#knightPredictor = knightPredictor;
    this.#knightCell = [4, 4];
  }

  init() {
    const rowSize = this.#knightPredictor.getRowSize();
    this.#boardUI.createBoard(rowSize, this.cellClicked);
  }

  setKnightCell(cords) {
    this.#knightCell = cords;
    const index = this.cordsToIndex(this.#knightCell);
    this.#boardUI.setKnightCell(index);
  }

  cordsToIndex(cords) {
    const rowMax = this.#knightPredictor.getRowSize();
    const row = cords[0];
    const column = cords[1];
    return row * rowMax + column;
  }

  cellClicked = (cords) => {
    console.log(cords);
    console.log(this.cordsToIndex(cords));
  };
}

//create board
//every other color
