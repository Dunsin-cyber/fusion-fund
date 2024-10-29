export function msToDaysLeft(milliseconds) {
  const msInADay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  return Math.floor(milliseconds / msInADay); // Rounds down to the nearest whole day
}