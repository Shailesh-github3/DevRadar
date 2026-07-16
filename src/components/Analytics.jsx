import { useParams, Link } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import AnalyticsCharts from '../components/AnalyticsCharts';
import useRepositories from '../hooks/useRepositories';

/**
 * Analytics Page (Controller)
 * 
 * Purpose: Orchestrates the analytics dashboard for a specific GitHub user.
 * Uses the same useRepositories hook as the Search page — React Query's cache
 * ensures we don't make duplicate API calls if the user already searched for
 * this developer. If they navigated directly (e.g., via bookmark), it fetches fresh.
 * 
 * Analogy: An endpoint that reads from cache-first storage (Redis) with a 
 * fallback to the database.
 */
function Analytics() {
  const { username } = useParams();

  // Reuses the same hook from Phase 5. React Query's cache is automatically hit
  // if this user's repos were already fetched during search.
  const { 
    data: repos, 
    isLoading, 
    isError, 
    error 
  } = useRepositories(username);

  const getErrorMessage = () => {
    if (error?.response?.status === 404) return 'User not found.';
    if (error?.response?.status === 403) return 'API rate limit exceeded.';
    return error?.response?.data?.message || 'Failed to load analytics.';
  };

  return (
    <Container className="my-5">
      {/* Navigation */}
      <Link to="/search">
        <Button variant="outline-secondary" className="mb-4">
          ← Back to Search
        </Button>
      </Link>

      <h2 className="mb-4">Analytics for @{username}</h2>

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {isError && <ErrorAlert message={getErrorMessage()} />}

      {/* Success State */}
      {repos && (
        <>
          {repos.length === 0 ? (
            <Alert variant="info">
              This user has no public repositories to analyze.
            </Alert>
          ) : (
            <AnalyticsCharts repos={repos} />
          )}
        </>
      )}
    </Container>
  );
}

export default Analytics;