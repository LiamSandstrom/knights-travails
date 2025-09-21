import KnightPredictor from "./knightPredictor.js";
import BoardUI from "./boardUI.js";
import BoardUIController from "./boardUIController.js";

const board = document.querySelector("#board1");
const knight = document.querySelector("#knight1")

const boardUI = new BoardUI(board, knight);
const knightPredictor = new KnightPredictor();
const boardUIController = new BoardUIController(boardUI, knightPredictor);

boardUIController.init();