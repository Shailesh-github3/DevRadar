import { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import ProfileCard from '../components/ProfileCard';
import RepoCard from '../components/RepoCard';
import RepoFilters from '../components/RepoFilters';
import Pagination from '../components/Pagination';
import useGithubUser from '../hooks/useGithubUser';
import useRepositories from '../hooks/useRepositories';

const ITEMS_PER_PAGE = 10;

function Search() {
  // User search state
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Repository filter/sort/pagination state
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Data fetching - two independent queries
  const { 
    data: user, 
    isLoading: isUserLoading, 
    isError: isUserError, 
    error: userError 
  } = useGithubUser(searchTerm);

  const { 
    data: repos, 
    isLoading: isReposLoading, 
    isError: isReposError, 
    error: reposError 
  } = useRepositories(searchTerm);

  // When user submits a new search, reset all repo filters and pagination
  const handleUserSubmit = () => {
    if (query.trim()) {
      setSearchTerm(query.trim());
      setSearchText('');
      setSortBy('updated');
      setSelectedLanguage('');
      setCurrentPage(1);
    }
  };

  // Filter change handlers - each resets pagination to page 1
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCurrentPage(1);
  };

  // Compute unique languages from raw repo data (memoized for performance)
  const availableLanguages = useMemo(() => {
    if (!repos) return [];
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repos]);

  // Apply filters, sort, and store result (memoized)
  const processedRepos = useMemo(() => {
    if (!repos) return [];

    let result = [...repos];

    // Filter by name (case-insensitive)
    if (searchText) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by language
    if (selectedLanguage) {
      result = result.filter(r => r.language === selectedLanguage);
    }

    // Sort based on selected criteria
    result.sort((a, b) => {
      switch (sortBy) {
        case 'stars': 
          return b.stargazers_count - a.stargazers_count;
        case 'forks': 
          return b.forks_count - a.forks_count;
        case 'updated': 
          return new Date(b.updated_at) - new Date(a.updated_at);
        case 'name': 
          return a.name.localeCompare(b.name);
        default: 
          return 0;
      }
    });

    return result;
  }, [repos, searchText, selectedLanguage, sortBy]);

  // Paginate the processed results
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedRepos.slice(start, start + ITEMS_PER_PAGE);
  }, [processedRepos, currentPage]);

  // Error message translators
  const getUserErrorMessage = () => {
    if (userError?.response?.status === 404) return 'User not found. Please check the username.';
    if (userError?.response?.status === 403) return 'API rate limit exceeded. Please try again later.';
    return userError?.response?.data?.message || 'An unexpected error occurred.';
  };

  const getReposErrorMessage = () => {
    if (reposError?.response?.status === 404) return 'Repositories not found.';
    if (reposError?.response?.status === 403) return 'API rate limit exceeded.';
    return reposError?.response?.data?.message || 'Failed to load repositories.';
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Developer Search</h2>
      
      <SearchBar 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onSubmit={handleUserSubmit} 
      />

      {/* User Profile Section */}
      {isUserLoading && <LoadingSpinner />}
      {isUserError && <ErrorAlert message={getUserErrorMessage()} />}
      {user && <ProfileCard user={user} />}

      {/* Repository Section - only shown after user is found */}
      {user && (
        <>
          <h3 className="mt-4 mb-3">Repositories</h3>
          
          {isReposLoading && <LoadingSpinner />}
          {isReposError && <ErrorAlert message={getReposErrorMessage()} />}
          
          {repos && (
            <>
              <RepoFilters
                searchText={searchText}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                availableLanguages={availableLanguages}
              />

              {paginatedRepos.length > 0 ? (
                paginatedRepos.map(repo => (
                  <RepoCard key={repo.id} repo={repo} />
                ))
              ) : (
                <p className="text-muted">No repositories match your filters.</p>
              )}

              <Pagination
                currentPage={currentPage}
                totalItems={processedRepos.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Search;