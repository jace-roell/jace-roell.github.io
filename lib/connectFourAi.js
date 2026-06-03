export const ROWS = 6;
export const COLS = 7;
export const SITE = "O";
export const PLAYER = "X";
const WIN_SCORE = 10_000_000;
const COL_ORDER = [3, 2, 4, 1, 5, 0, 6];

export const drop = (board, col, player) => {
  const next = board.map((row) => [...row]);
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!next[r][col]) {
      next[r][col] = player;
      return next;
    }
  }
  return null;
};

export const checkWin = (board, player) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        let count = 1;
        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
          if (board[nr][nc] === player) count++;
          else break;
        }
        if (count >= 4) return true;
      }
    }
  }
  return false;
};

const full = (board) => board[0].every((cell) => cell !== null);

const legalCols = (board) => COL_ORDER.filter((c) => !board[0][c]);

const winningCols = (board, player) => {
  const cols = [];
  for (const col of legalCols(board)) {
    const next = drop(board, col, player);
    if (next && checkWin(next, player)) cols.push(col);
  }
  return cols;
};

const getWindows = (board) => {
  const windows = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      windows.push([
        board[r][c],
        board[r][c + 1],
        board[r][c + 2],
        board[r][c + 3],
      ]);
    }
  }

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      windows.push([
        board[r][c],
        board[r + 1][c],
        board[r + 2][c],
        board[r + 3][c],
      ]);
    }
  }

  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      windows.push([
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3],
      ]);
    }
  }

  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      windows.push([
        board[r][c],
        board[r - 1][c + 1],
        board[r - 2][c + 2],
        board[r - 3][c + 3],
      ]);
    }
  }

  return windows;
};

const scoreWindow = (window, player, opponent) => {
  if (window.includes(player) && window.includes(opponent)) return 0;

  let score = 0;
  const mine = window.filter((c) => c === player).length;
  const theirs = window.filter((c) => c === opponent).length;
  const empty = window.filter((c) => c === null).length;

  if (mine === 4) score += 1000;
  else if (mine === 3 && empty === 1) score += 50;
  else if (mine === 2 && empty === 2) score += 8;

  if (theirs === 3 && empty === 1) score -= 90;
  else if (theirs === 2 && empty === 2) score -= 10;

  return score;
};

const evaluate = (board) => {
  if (checkWin(board, SITE)) return WIN_SCORE;
  if (checkWin(board, PLAYER)) return -WIN_SCORE;
  if (full(board)) return 0;

  let score = 0;
  const centerCount = board.filter((row) => row[3] === SITE).length;
  const centerOpp = board.filter((row) => row[3] === PLAYER).length;
  score += centerCount * 4 - centerOpp * 4;

  for (const window of getWindows(board)) {
    score += scoreWindow(window, SITE, PLAYER);
    score -= scoreWindow(window, PLAYER, SITE);
  }

  return score;
};

const searchDepth = (board) => {
  const pieces = board.flat().filter(Boolean).length;
  if (pieces < 8) return 9;
  if (pieces < 22) return 8;
  return 10;
};

const minimax = (board, depth, alpha, beta, maximizing) => {
  const cols = legalCols(board);
  const terminal =
    checkWin(board, SITE) ||
    checkWin(board, PLAYER) ||
    full(board) ||
    !cols.length;

  if (depth === 0 || terminal) return evaluate(board);

  if (maximizing) {
    let value = -Infinity;
    for (const col of cols) {
      const next = drop(board, col, SITE);
      if (!next) continue;
      value = Math.max(value, minimax(next, depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return value;
  }

  let value = Infinity;
  for (const col of cols) {
    const next = drop(board, col, PLAYER);
    if (!next) continue;
    value = Math.min(value, minimax(next, depth - 1, alpha, beta, true));
    beta = Math.min(beta, value);
    if (alpha >= beta) break;
  }
  return value;
};

export const siteMove = (board) => {
  const legal = legalCols(board);
  if (!legal.length) return -1;

  const wins = winningCols(board, SITE);
  if (wins.length) return wins[0];

  const blocks = winningCols(board, PLAYER);
  if (blocks.length === 1) return blocks[0];

  const depth = searchDepth(board);
  let bestCol = legal[0];
  let bestScore = -Infinity;

  for (const col of legal) {
    const next = drop(board, col, SITE);
    if (!next) continue;

    const score = minimax(next, depth - 1, -Infinity, Infinity, false);

    if (score > bestScore) {
      bestScore = score;
      bestCol = col;
    }
  }

  return bestCol;
};
