/**
 * Picks a random element from an array using crypto.getRandomValues for better randomness
 * Falls back to Math.random if crypto is not available
 */
export function pickRandom<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Cannot pick from empty array');
  }
  
  if (window.crypto && 'getRandomValues' in window.crypto) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return arr[buf[0] % arr.length];
  }
  
  return arr[Math.floor(Math.random() * arr.length)];
}

