import { Container, Row, Col, Alert } from 'react-bootstrap';
import useBookmarks from '../hooks/useBookmarks';
import BookmarkCard from '../components/BookmarkCard';

function Bookmarks() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <Container className="my-5">
      <h2 className="mb-4">Bookmarked Developers</h2>

      {bookmarks.length === 0 ? (
        <Alert variant="info">
          You haven't bookmarked any developers yet. Search for a user and click the bookmark button to save them here.
        </Alert>
      ) : (
        <Row>
          {bookmarks.map((username) => (
            <Col key={username} md={6} lg={4}>
              <BookmarkCard 
                username={username} 
                onToggleBookmark={toggleBookmark} 
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Bookmarks;