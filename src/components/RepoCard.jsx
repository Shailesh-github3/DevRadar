import { Card } from 'react-bootstrap';

function RepoCard({ repo }) {
  if (!repo) return null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {repo.language || 'Unknown language'}
        </Card.Subtitle>
        <Card.Text>
          {repo.description || 'No description provided.'}
        </Card.Text>
        <div className="d-flex gap-3 text-muted small">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
          <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;