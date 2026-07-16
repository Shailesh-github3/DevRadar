import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex align-items-start">
          <Image
            src={user.avatar_url}
            roundedCircle
            width={100}
            height={100}
            alt={`${user.login}'s avatar`}
            className="me-4"
          />

          <div>
            <Card.Title>{user.name || user.login}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              @{user.login}
            </Card.Subtitle>

            <Card.Text>
              {user.bio || "No bio available."}
            </Card.Text>

            <div className="d-flex gap-3 mt-3">
              <span>
                <strong>{user.public_repos}</strong> Repos
              </span>

              <span>
                <strong>{user.followers}</strong> Followers
              </span>

              <span>
                <strong>{user.following}</strong> Following
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3 border-top pt-3">
          <Link
            to={`/analytics/${user.login}`}
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <BarChart3 size={18} />
            View Analytics
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;