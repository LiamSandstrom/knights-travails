export default class BoardUI {
  #board;
  #knightElement;
  #copyKnight;
  #cellUnderKnight;
  constructor(boardRef, knightElement) {
    this.#board = boardRef;
    this.#knightElement = knightElement;
    this.#copyKnight = null;
    this.#cellUnderKnight = null;
  }

  createBoard(rowSize, cellClickedCb) {
    const boardSize = rowSize * rowSize;
    this.#board.style.gridTemplateColumns = `repeat(${rowSize}, 1fr)`;
    this.#board.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;

    for (let i = 0; i < boardSize; i++) {
      const row = Math.floor(i / rowSize);
      const column = Math.floor(i % rowSize);
      const cell = this.#createCell(
        this.#isWhiteCell(row, column),
        [row, column],
        cellClickedCb
      );
      this.#board.appendChild(cell);
    }
  }

  #createCell(isWhite, cords, cellClickedCb) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    isWhite ? this.#setCellWhite(cell) : this.#setCellBlack(cell);
    if (cellClickedCb)
      cell.addEventListener("click", () => cellClickedCb(cords, cell));
    return cell;
  }

  #isWhiteCell(row, column) {
    if ((row + column) % 2 === 0) return true;
    return false;
  }

  #setCellWhite(cell) {
    cell.classList.add("white");
  }

  #setCellBlack(cell) {
    cell.classList.add("black");
  }

  setCellGoal(cell) {
    cell.classList.add("goal");
  }

  setKnightCell(index) {
    const targetCell = this.getCell(index);
    targetCell.appendChild(this.#knightElement);
  }

  getCell(index) {
    return this.#board.children[index];
  }

  getIndexOfCell(element) {
    return Array.from(this.#board.children).indexOf(element);
  }

  removeKnight(cords) {
    this.#isWhiteCell(cords)
      ? this.#setCellWhite(cords)
      : this.#setCellBlack(cords);
  }

  initializeKnightCopy() {
    this.#copyKnight = this.#knightElement.cloneNode(true);
    this.#copyKnight.classList.add("knight-copy");
  }

  onKnightMouseDown(cb) {
    this.#knightElement.addEventListener("mousedown", cb);
    this.#knightElement.addEventListener("touchstart", cb);
  }

  moveKnightDrag(e) {
    let x;
    let y;
    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.pageX;
      y = e.pageY;
    }
    this.#copyKnight.style.left = `${x - this.#copyKnight.offsetWidth / 2}px`;
    this.#copyKnight.style.top = `${y - this.#copyKnight.offsetHeight / 2}px`;
  }

  startKnightDrag() {
    this.#knightElement.style.opacity = "0";
    this.#copyKnight.style.width =
      this.#knightElement.getBoundingClientRect().width + "px";
    document.body.appendChild(this.#copyKnight);
  }

  stopKnightDrag() {
    this.removeCellUnderKnight();
    this.#knightElement.style.opacity = "100%";
    document.body.removeChild(this.#copyKnight);
  }

  setCellUnderKnight(cell) {
    this.removeCellUnderKnight();
    this.#cellUnderKnight = cell;
    cell.classList.add("cell-under-knight");
  }
  removeCellUnderKnight() {
    if (this.#cellUnderKnight) {
      this.#cellUnderKnight.classList.remove("cell-under-knight");
    }
  }
}
