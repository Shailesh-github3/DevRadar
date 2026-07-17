import { useState, useCallback } from 'react';
import { getBookmarks, addBookmark, removeBookmark } from '../services/storageService';

/**
 * useBookmarks Hook
 * 
 * Purpose: Manages React state for bookmarks and syncs with LocalStorage service.
 * Acts as the bridge between persistent storage and reactive UI.
 */
function useBookmarks() {
  // Lazy initialization: only reads from LocalStorage on the very first render.
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  const toggleBookmark = useCallback((username) => {
    // Functional update (prev) prevents stale closure bugs.
    setBookmarks((prev) => {
      const isCurrentlyBookmarked = prev.includes(username);
      
      if (isCurrentlyBookmarked) {
        removeBookmark(username); // Sync with LocalStorage
        return prev.filter((u) => u !== username); // Update React state
      } else {
        addBookmark(username); // Sync with LocalStorage
        return [username, ...prev]; // Add to front of React state
      }
    });
  }, []);

  const isBookmarked = useCallback(
    (username) => bookmarks.includes(username),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}

export default useBookmarks;