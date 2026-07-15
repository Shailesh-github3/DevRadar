import { Card, Badge, Row, Col } from 'react-bootstrap';

function RepoMetadata({ repo }) {
  if (!repo) return null;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Repository Details</Card.Title>
        
        {/* Description */}
        <Card.Text className="text-muted mb-3">
          {repo.description || 'No description provided.'}
        </Card.Text>

        {/* Key Metrics */}
        <Row className="mb-3 g-2">
          <Col xs={6} md={3}>
            <div className="text-center">
              <div className="fs-4 fw-bold">{repo.stargazers_count}</div>
              <small className="text-muted">Stars</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="text-center">
              <div className="fs-4 fw-bold">{repo.forks_count}</div>
              <small className="text-muted">Forks</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="text-center">
              <div className="fs-4 fw-bold">{repo.watchers_count}</div>
              <small className="text-muted">Watchers</small>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <div className="text-center">
              <div className="fs-4 fw-bold">{repo.open_issues_count}</div>
              <small className="text-muted">Open Issues</small>
            </div>
          </Col>
        </Row>

        {/* License */}
        {repo.license && (
          <div className="mb-3">
            <strong>License: </strong>
            <a href={repo.license.url} target="_blank" rel="noopener noreferrer">
              {repo.license.name}
            </a>
          </div>
        )}

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-3">
            <strong>Topics: </strong>
            {repo.topics.map((topic) => (
              <Badge key={topic} bg="info" className="me-1">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <Row className="g-2">
          <Col md={6}>
            <div><strong>Language:</strong> {repo.language || 'Unknown'}</div>
            <div><strong>Size:</strong> {repo.size} KB</div>
            <div><strong>Default Branch:</strong> {repo.default_branch}</div>
          </Col>
          <Col md={6}>
            <div><strong>Created:</strong> {new Date(repo.created_at).toLocaleDateString()}</div>
            <div><strong>Last Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}</div>
            <div><strong>Last Pushed:</strong> {new Date(repo.pushed_at).toLocaleDateString()}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RepoMetadata;