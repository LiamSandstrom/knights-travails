# Knight Shortest Path (BFS) Implementation

## Overview

This project finds the shortest path a knight can take on a chessboard (or any rectangular board) from a start position to a goal position using Breadth-First Search (BFS).

## Implementation Details

* **Initial Approach:**

  * Stored the entire path in each queue element.
  * Easy to reconstruct the path but memory-intensive.

* **Optimized Approach:**

  * Store **only a reference to the parent node** for each move (similar to a linked list).
  * Start node's parent is `null`.
  * When the goal is reached, traverse the parent references backward to reconstruct the full path.
  * This approach reduces memory usage while still allowing complete path reconstruction.
