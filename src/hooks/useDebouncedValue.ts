import { useState, useEffect } from 'react';

/**
 * Debounces a value change by a specified delay
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 200)
 */
export function useDebouncedValue<T>(value: T, delay: number = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

