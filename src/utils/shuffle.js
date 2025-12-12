/**
 * Utility functions cho shuffling cards
 */

/**
 * Thuật toán xào bài Fisher-Yates
 * @param {Array} array - Mảng cần xáo trộn
 * @returns {Array} - Mảng đã xáo trộn (không mutate array gốc)
 */
export const fisherYatesShuffle = (array) => {
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

