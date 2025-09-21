export default class BoardUIController {
  #boardUI;
  #knightPredictor;
  #knightCell;
  #path;
  constructor(boardUI, knightPredictor) {
    this.#boardUI = boardUI;
    this.#knightPredictor = knightPredictor;
    this.#knightCell = [4, 4];
    this.#path = [];
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  init(cords = [4, 4]) {
    const rowSize = this.#knightPredictor.getRowSize();
    this.#boardUI.createBoard(rowSize, this.cellClicked);
    this.setKnightCell(cords);
    this.#boardUI.initializeKnightCopy();
    this.#bindKnightEvents();
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

  indexToCords(index) {
    const rowMax = this.#knightPredictor.getRowSize();
    const row = Math.floor(index / rowMax);
    const column = index % rowMax;
    return [row, column];
  }

  cellClicked = (cords, cell) => {
    if (this.#path.length > 0) {
      for (const cell of this.#path) {
        cell.classList.remove("path");
        cell.classList.remove("goal");
      }
      this.#path = [];
    }
    this.#boardUI.setCellGoal(cell);
    this.#path.push(cell);
    const moves = this.#knightPredictor.knightMoves(this.#knightCell, cords);
    this.showShortestPath(moves);
  };

  async showShortestPath(moves) {
    for (const move of moves) {
      const cell = this.#boardUI.getCell(this.cordsToIndex(move));
      cell.classList.add("path");
      this.#path.push(cell);
      this.setKnightCell(move);
      await this.delay(1000);
    }
  }

  #bindKnightEvents() {
    this.#boardUI.onKnightMouseDown((e) => this.startKnightDrag(e));
  }

  handleMove = (e) => {
    this.#boardUI.moveKnightDrag(e);

    const cell = this.#getCellUnderMouse(e);
    if (cell) this.#boardUI.setCellUnderKnight(cell);
  };
  handleUp = (e) => this.stopDrag(e);

  startKnightDrag(e) {
    document.addEventListener("mousemove", this.handleMove);
    document.addEventListener("mouseup", this.handleUp);

    this.#boardUI.startKnightDrag();
    this.#boardUI.moveKnightDrag(e);
  }

  stopDrag(e) {
    document.removeEventListener("mousemove", this.handleMove);
    document.removeEventListener("mouseup", this.handleUp);

    this.#boardUI.stopKnightDrag();

    const cell = this.#getCellUnderMouse(e);
    if (cell) {
      const index = this.#boardUI.getIndexOfCell(cell);
      const cords = this.indexToCords(index);
      this.setKnightCell(cords);
    }
  }

  #getCellUnderMouse(e) {
    return document.elementFromPoint(e.pageX, e.pageY).closest(".cell");
  }
}

//create board
//every other color
