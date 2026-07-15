import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useGithubUser } from '../hooks/useGithubUser';
import { Alert, Spinner } from 'react-bootstrap';

function Search() {
  // 1. Input state (updates on every keystroke)
  const [query, setQuery] = useState('');
  // 2. Trigger state (updates only on form submit)
  const [searchTerm, setSearchTerm] = useState('');

  // React Query hook. It watches 'searchTerm'.
  const { data: user, isLoading, isError, error } = useGithubUser(searchTerm);

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setSearchTerm(query); // This triggers the API call
  };

  return (
    <div>
      <h2>Developer Search</h2>
      <SearchBar value={query} onChange={handleChange} onSubmit={handleSubmit} />

      {/* Loading State */}
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Alert variant="danger">
          Error: {error.response?.data?.message || 'Failed to fetch user'}
        </Alert>
      )}

      {/* Success State */}
      {user && (
        <Alert variant="success">
          Found user: <strong>{user.login}</strong> (ID: {user.id})
        </Alert>
      )}

    </div>
  );
}

export default Search;