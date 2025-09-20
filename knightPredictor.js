export default class KnightPredictor {
  #boardMin;
  #boardMax;
  #knightMoves;

  constructor(boardMax = 7) {
    this.#boardMin = 0;
    this.#boardMax = boardMax;

    this.#knightMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
  }

  knightMoves(startCords, goalCords) {
    if (!this.#validCords(startCords) || !this.#validCords(goalCords)) {
      console.log("Invalid cords");
      return;
    }

    const visited = new Set([startCords.toString()]);
    const q = [{ cords: startCords, parent: null }];
    let qIndex = 0;

    while (qIndex < q.length) {
      const node = q[qIndex];
      const [x, y] = node.cords;

      if (x === goalCords[0] && y === goalCords[1]) {
        const path = [];
        let curr = node;
        while (curr) {
          path.push(curr.cords);
          curr = curr.parent;
        }
        path.reverse();
        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`
        );
        console.log(path.map(([a, b]) => `[${a},${b}]`).join(" => "));
        return path;
      }

      for (const [kx, ky] of this.#knightMoves) {
        const newCords = [x + kx, y + ky];
        const newCordsStr = newCords.toString();
        if (!this.#validCords(newCords) || visited.has(newCordsStr)) continue;
        visited.add(newCordsStr);
        q.push({ cords: newCords, parent: node });
      }
      qIndex++;
    }
  }

  #validCords(cords) {
    return (
      cords[0] >= this.#boardMin &&
      cords[0] <= this.#boardMax &&
      cords[1] >= this.#boardMin &&
      cords[1] <= this.#boardMax
    );
  }

  getRowSize = () => this.#boardMax + 1;
  getBoardSize = () => (this.#boardMax + 1) * (this.#boardMax + 1);
}
