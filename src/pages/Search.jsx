import { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import ProfileCard from '../components/ProfileCard';
import useGithubUser from '../hooks/useGithubUser';

function Search() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: user, isLoading, isError, error } = useGithubUser(searchTerm);

  const handleSubmit = (e) => {
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  };

  // Controller logic: Translates raw HTTP codes to user-friendly messages
  const getErrorMessage = () => {
    if (error?.response?.status === 404) return 'User not found. Please check the username.';
    if (error?.response?.status === 403) return 'API rate limit exceeded. Please try again later.';
    return error?.response?.data?.message || 'An unexpected error occurred.';
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Developer Search</h2>
      
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={handleSubmit} />

      {isLoading && <LoadingSpinner />}
      {isError && <ErrorAlert message={getErrorMessage()} />}
      {user && <ProfileCard user={user} />}
    </Container>
  );
}

export default Search;