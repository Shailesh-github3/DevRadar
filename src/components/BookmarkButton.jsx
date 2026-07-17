import { Button } from 'react-bootstrap';
import { Heart } from 'lucide-react';

/**
 * BookmarkButton Component
 * 
 * Purpose: A presentational toggle button for bookmarking.
 * Dumb component: receives state and handlers via props.
 */
function BookmarkButton({ isBookmarked, onToggle }) {
  return (
    <Button 
      variant={isBookmarked ? "primary" : "outline-primary"} 
      onClick={onToggle}
      className="d-flex align-items-center gap-2"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Heart 
        size={18} 
        fill={isBookmarked ? "currentColor" : "none"} 
      />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}

export default BookmarkButton;