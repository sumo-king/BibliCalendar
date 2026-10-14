import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorageHook';

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear());

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    expect(result.current[0]).toEqual([]);
  });

  it('reads an existing stored value', () => {
    localStorage.setItem('k', JSON.stringify([{ book: 'John' }]));
    const { result } = renderHook(() => useLocalStorage('k', []));
    expect(result.current[0]).toEqual([{ book: 'John' }]);
  });

  it('persists updates, including updater functions', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    act(() => result.current[1](prev => [...prev, 'a']));
    act(() => result.current[1](prev => [...prev, 'b']));
    expect(result.current[0]).toEqual(['a', 'b']);
    expect(JSON.parse(localStorage.getItem('k'))).toEqual(['a', 'b']);
  });

  it('removes the value and resets to the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    act(() => result.current[1](['a']));
    act(() => result.current[2]());
    expect(result.current[0]).toEqual([]);
    expect(localStorage.getItem('k')).toBeNull();
  });

  it('falls back to the initial value on malformed JSON', () => {
    localStorage.setItem('k', '{not json');
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage('k', 'fallback'));
    expect(result.current[0]).toBe('fallback');
    console.log.mockRestore();
  });
});
