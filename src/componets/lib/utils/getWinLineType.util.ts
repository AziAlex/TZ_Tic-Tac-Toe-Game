export const getWinLineType = (winConditions: number[]): string => {
  const conditions = {
    'winLineTop': [0, 1, 2],
    'winLineCenterHorizontal': [3, 4, 5],
    'winLineBottom': [6, 7, 8],
    'winLineLeft': [0, 3, 6],
    'winLineCenterVertical': [1, 4, 7],
    'winLineRight': [2, 5, 8],
    'winLineDiagonalLeft': [0, 4, 8],
    'winLineDiagonalRight': [2, 4, 6]
  }

  for (const [lineType, lineCoords] of Object.entries(conditions)) {
    if (JSON.stringify(lineCoords) === JSON.stringify(winConditions)) {
      return lineType;
    }
  }
  return 'Unknown';
}