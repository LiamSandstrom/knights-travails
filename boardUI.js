export default class BoardUI {
  #board;
  constructor(boardRef) {
    this.#board = boardRef;
  }

  createBoard(rowSize, cellClickedCb) {
    const boardSize = rowSize * rowSize;
    this.#board.style.gridTemplateColumns = `repeat(${rowSize}, 1fr)`;

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
      cell.addEventListener("click", () => cellClickedCb(cords));
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

  setKnightCell(index) {
    this.#board.children[index].classList.add("knight");
  }

  removeKnight(cords) {
    this.#isWhiteCell(cords) ? this.#setCellWhite(cords) : this.#setCellBlack(cords)
  }
}
