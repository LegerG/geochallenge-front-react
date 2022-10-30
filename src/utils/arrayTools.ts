export const getRandomElement = <T extends unknown>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array in place with the Fisher-Yates algorithm
 * @param array The array to shuffle
 */
export const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
