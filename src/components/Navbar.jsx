// Import Link from react-router-dom. We use this instead of <a> tags.
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // Standard Bootstrap navbar classes
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        
        {/* Link replaces <a>. 'to' replaces 'href' */}
        <Link className="navbar-brand" to="/">
          Dev Intelligence
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;