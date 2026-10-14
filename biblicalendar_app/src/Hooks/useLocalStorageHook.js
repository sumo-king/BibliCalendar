import { useState, useEffect, useCallback, useRef } from 'react';

const readValue = (key, initialValue) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : initialValue;
  }
  catch (error) {
    console.log(error);
    return initialValue;
  }
};

/**
 * useState that persists to localStorage under `key`.
 * Returns [value, setValue, removeValue]. setValue accepts a value or an
 * updater function, like useState. Changes made in other tabs are picked up.
 */
export const useLocalStorage = (key, initialValue) => {
  // Keep the initial value in a ref so callers can pass inline literals ([] / {})
  // without retriggering effects on every render.
  const initialRef = useRef(initialValue);

  const [storedValue, setStoredValue] = useState(() => readValue(key, initialRef.current));

  // Re-read if the key changes
  useEffect(() => {
    setStoredValue(readValue(key, initialRef.current));
  }, [key]);

  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      }
      catch (error) {
        console.log(error);
        // Storage full or blocked; keep the in-memory value anyway
      }
      return next;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    }
    catch (error) {
      console.log(error);
    }
    setStoredValue(initialRef.current);
  }, [key]);

  // Sync with changes made in other tabs/windows
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.storageArea !== localStorage || e.key !== key) return;
      setStoredValue(e.newValue !== null ? safeParse(e.newValue, initialRef.current) : initialRef.current);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

const safeParse = (raw, fallback) => {
  try {
    return JSON.parse(raw);
  }
  catch {
    return fallback;
  }
};
