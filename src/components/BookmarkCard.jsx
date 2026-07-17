import { Card, Image } from 'react-bootstrap';
import useGithubUser from '../hooks/useGithubUser';
import LoadingSpinner from './LoadingSpinner';
import BookmarkButton from './BookmarkButton';

/**
 * BookmarkCard Component
 * 
 * Purpose: A "smart" component that fetches and displays a single bookmarked user.
 * Solves the N+1 problem by isolating the fetch and loading state for each individual card.
 */
function BookmarkCard({ username, onToggleBookmark }) {
  const { data: user, isLoading, isError } = useGithubUser(username);

  if (isLoading) {
    return (
      <Card className="mb-3 p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '120px' }}>
        <div style={{ transform: 'scale(0.5)' }}>
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (isError || !user) {
    return null; // Silently hide if user no longer exists or fetch fails
  }

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex align-items-center">
        <Image 
          src={user.avatar_url} 
          roundedCircle 
          width={60} 
          height={60} 
          alt={`${user.login}'s avatar`} 
          className="me-3"
        />
        <div className="flex-grow-1">
          <Card.Title className="mb-0 fs-6">{user.login}</Card.Title>
          <small className="text-muted">{user.name || 'No name'}</small>
        </div>
        <BookmarkButton 
          isBookmarked={true} 
          onToggle={() => onToggleBookmark(username)} 
        />
      </Card.Body>
    </Card>
  );
}

export default BookmarkCard;