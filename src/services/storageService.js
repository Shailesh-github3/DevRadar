/**
 * storageService.js
 * 
 * Purpose: Pure JavaScript functions for interacting with LocalStorage.
 * Analogy: A database repository/DAO layer. It handles raw CRUD operations,
 * data serialization, and business rules (like max limits and deduplication).
 * 
 * Note: This file has ZERO React dependencies. It can be unit-tested in isolation.
 */

const STORAGE_KEYS = {
  BOOKMARKS: 'dev_dashboard_bookmarks',
  SEARCH_HISTORY: 'dev_dashboard_search_history',
};

const MAX_HISTORY_LENGTH = 10;

/**
 * Helper: Safely parse JSON from LocalStorage.
 * Returns defaultValue if parsing fails or key doesn't exist.
 */
const getStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Helper: Safely stringify and save to LocalStorage.
 */
const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
};

// ==========================================
// Bookmarks API
// ==========================================

export const getBookmarks = () => {
  return getStorageItem(STORAGE_KEYS.BOOKMARKS, []);
};

export const addBookmark = (username) => {
  const bookmarks = getBookmarks();
  // Deduplicate: only add if not already present
  if (!bookmarks.includes(username)) {
    // Add to the beginning of the array (most recent first)
    bookmarks.unshift(username);
    setStorageItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
  }
};

export const removeBookmark = (username) => {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter((u) => u !== username);
  setStorageItem(STORAGE_KEYS.BOOKMARKS, filtered);
};

export const isBookmarked = (username) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(username);
};

// ==========================================
// Search History API
// ==========================================

export const getSearchHistory = () => {
  return getStorageItem(STORAGE_KEYS.SEARCH_HISTORY, []);
};

export const addSearchHistory = (username) => {
  if (!username || !username.trim()) return;
  
  const history = getSearchHistory();
  const cleanUsername = username.trim();
  
  // Remove existing instance to avoid duplicates and push to front
  const filtered = history.filter((u) => u !== cleanUsername);
  filtered.unshift(cleanUsername);
  
  // Enforce maximum length limit
  const limited = filtered.slice(0, MAX_HISTORY_LENGTH);
  
  setStorageItem(STORAGE_KEYS.SEARCH_HISTORY, limited);
};

export const clearSearchHistory = () => {
  setStorageItem(STORAGE_KEYS.SEARCH_HISTORY, []);
};