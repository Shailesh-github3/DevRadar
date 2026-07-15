import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Star, GitFork, ExternalLink } from "lucide-react";

function RepoCard({ repo }) {
  if (!repo) return null;

  // Internal route to the repository details page
  const internalPath = `/repo/${repo.owner.login}/${repo.name}`;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-flex align-items-center gap-2">
          {/* Internal navigation */}
          <Link to={internalPath} className="text-decoration-none">
            {repo.name}
          </Link>

          {/* External GitHub link */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open on GitHub"
            className="text-muted"
          >
            <ExternalLink size={16} />
          </a>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {repo.language || "Unknown language"}
        </Card.Subtitle>

        <Card.Text>
          {repo.description || "No description provided."}
        </Card.Text>

        <div className="d-flex gap-4 text-muted small align-items-center">
          <span className="d-flex align-items-center gap-1">
            <Star size={16} />
            {repo.stargazers_count}
          </span>

          <span className="d-flex align-items-center gap-1">
            <GitFork size={16} />
            {repo.forks_count}
          </span>

          <span>
            Updated: {new Date(repo.updated_at).toLocaleDateString()}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;