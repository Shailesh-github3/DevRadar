import { useState, useCallback } from 'react';
import { 
  getSearchHistory, 
  addSearchHistory, 
  clearSearchHistory 
} from '../services/storageService';

/**
 * useSearchHistory Hook
 * 
 * Purpose: Manages React state for recent searches and syncs with LocalStorage.
 */
function useSearchHistory() {
  // Lazy initialization: reads LocalStorage only on the first render.
  const [history, setHistory] = useState(() => getSearchHistory());

  const addToHistory = useCallback((username) => {
    // Update LocalStorage first (service handles deduplication and limits)
    addSearchHistory(username);
    
    // Update React state to trigger UI re-render
    setHistory((prev) => {
      const cleanUsername = username.trim();
      const filtered = prev.filter((u) => u !== cleanUsername);
      return [cleanUsername, ...filtered].slice(0, 10);
    });
  }, []);

  const clearHistory = useCallback(() => {
    clearSearchHistory();
    setHistory([]);
  }, []);

  return { history, addToHistory, clearHistory };
}

export default useSearchHistory;