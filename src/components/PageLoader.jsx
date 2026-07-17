import { Container } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

/**
 * PageLoader Component
 * 
 * Purpose: A full-page loading fallback used by React.lazy and Suspense.
 * Unlike the inline LoadingSpinner, this centers the spinner in the viewport
 * to prevent layout shift while a route chunk is downloading.
 */
function PageLoader() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <LoadingSpinner />
    </Container>
  );
}

export default PageLoader;