import { useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import RepoMetadata from '../components/RepoMetadata';
import ReadmeViewer from '../components/ReadmeViewer';
import useRepositoryDetails from '../hooks/useRepositoryDetails';
import useReadme from '../hooks/useReadme';

function RepoDetails() {
  // Extract URL parameters
  const { owner, repoName } = useParams();

  // Fetch both data sources independently
  const { 
    data: repo, 
    isLoading: isRepoLoading, 
    isError: isRepoError, 
    error: repoError 
  } = useRepositoryDetails(owner, repoName);

  const { 
    data: readme, 
    isLoading: isReadmeLoading, 
    isError: isReadmeError, 
    error: readmeError 
  } = useReadme(owner, repoName);

  // Error message translators
  const getRepoErrorMessage = () => {
    if (repoError?.response?.status === 404) return 'Repository not found.';
    if (repoError?.response?.status === 403) return 'API rate limit exceeded.';
    return repoError?.response?.data?.message || 'Failed to load repository details.';
  };

  const getReadmeErrorMessage = () => {
    if (readmeError?.response?.status === 404) return 'README not found.';
    if (readmeError?.response?.status === 403) return 'API rate limit exceeded.';
    return readmeError?.response?.data?.message || 'Failed to load README.';
  };

  return (
    <Container className="my-5">
      {/* Navigation */}
      <Link to="/search">
        <Button variant="outline-secondary" className="mb-4">
          ← Back to Search
        </Button>
      </Link>

      <h2 className="mb-4">{owner}/{repoName}</h2>

      {/* Repository Metadata Section */}
      {isRepoLoading && <LoadingSpinner />}
      {isRepoError && <ErrorAlert message={getRepoErrorMessage()} />}
      {repo && <RepoMetadata repo={repo} />}

      {/* README Section */}
      <h3 className="mt-4 mb-3">README</h3>
      {isReadmeLoading && <LoadingSpinner />}
      {isReadmeError && <ErrorAlert message={getReadmeErrorMessage()} />}
      {readme && <ReadmeViewer content={readme} />}
    </Container>
  );
}

export default RepoDetails;