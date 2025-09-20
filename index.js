import KnightPredictor from "./knightPredictor.js";
import BoardUI from "./boardUI.js";
import BoardUIController from "./boardUIController.js";

const board = document.querySelector("#board1");

const boardUI = new BoardUI(board);
const knightPredictor = new KnightPredictor();
const boardUIController = new BoardUIController(boardUI, knightPredictor);

boardUIController.init();
boardUIController.setKnightCell([0,2])