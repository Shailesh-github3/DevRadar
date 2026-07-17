import { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Badge, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import ProfileCard from '../components/ProfileCard';
import RepoCard from '../components/RepoCard';
import RepoFilters from '../components/RepoFilters';
import Pagination from '../components/Pagination';
import useGithubUser from '../hooks/useGithubUser';
import useRepositories from '../hooks/useRepositories';
import useBookmarks from '../hooks/useBookmarks';
import useSearchHistory from '../hooks/useSearchHistory';

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

  // Persistence hooks
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { addToHistory , history, clearHistory } = useSearchHistory();

  // Data fetching
  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useGithubUser(searchTerm);
  const { data: repos, isLoading: isReposLoading, isError: isReposError, error: reposError } = useRepositories(searchTerm);

  const handleUserSubmit = () => {
    if (query.trim()) {
      const cleanQuery = query.trim();
      
      // Save to search history (Service handles deduplication)
      addToHistory(cleanQuery);
      
      setSearchTerm(cleanQuery);
      setSearchText('');
      setSortBy('updated');
      setSelectedLanguage('');
      setCurrentPage(1);
    }
  };

  // ... [Keep existing filter handlers and useMemo logic exactly as they were] ...
  const handleSearchChange = (e) => { setSearchText(e.target.value); setCurrentPage(1); };
  const handleSortChange = (e) => { setSortBy(e.target.value); setCurrentPage(1); };
  const handleLanguageChange = (e) => { setSelectedLanguage(e.target.value); setCurrentPage(1); };
    
  const handleHistoryClick = (username) => {
    setQuery(username);
    setSearchTerm(username); 
  };

  const availableLanguages = useMemo(() => {
    if (!repos) return [];
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repos]);

  const processedRepos = useMemo(() => {
    if (!repos) return [];
    let result = [...repos];
    if (searchText) result = result.filter(r => r.name.toLowerCase().includes(searchText.toLowerCase()));
    if (selectedLanguage) result = result.filter(r => r.language === selectedLanguage);
    result.sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count;
      if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [repos, searchText, selectedLanguage, sortBy]);

  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedRepos.slice(start, start + ITEMS_PER_PAGE);
  }, [processedRepos, currentPage]);

  const getUserErrorMessage = () => {
    if (userError?.response?.status === 404) return 'User not found.';
    if (userError?.response?.status === 403) return 'API rate limit exceeded.';
    return 'An unexpected error occurred.';
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Developer Search</h2>
      
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={handleUserSubmit} />

      {history.length > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">Recent Searches:</small>
            <Button variant="link" size="sm" onClick={clearHistory} className="p-0 text-muted text-decoration-none">
              Clear
            </Button>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {history.map((item) => (
              <Badge 
                key={item} 
                bg="light" 
                text="dark" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleHistoryClick(item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {isUserLoading && <LoadingSpinner />}
      {isUserError && <ErrorAlert message={getUserErrorMessage()} />}
      
      {/* Pass bookmark state and handler to the dumb ProfileCard */}
      {user && (
        <ProfileCard 
          user={user} 
          isBookmarked={isBookmarked(user.login)} 
          onToggleBookmark={toggleBookmark} 
        />
      )}

      {user && (
        <>
          <h3 className="mt-4 mb-3">Repositories</h3>
          {isReposLoading && <LoadingSpinner />}
          {isReposError && <ErrorAlert message="Failed to load repositories." />}
          
          {repos && (
            <>
              <RepoFilters
                searchText={searchText} onSearchChange={handleSearchChange}
                sortBy={sortBy} onSortChange={handleSortChange}
                selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange}
                availableLanguages={availableLanguages}
              />

              {paginatedRepos.length > 0 ? (
                paginatedRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)
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