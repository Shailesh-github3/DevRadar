// Import Bootstrap layout components
import { Navbar, Container, Nav } from 'react-bootstrap';
// Import NavLink for smart routing
import { NavLink } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        {/* The Brand also uses NavLink to navigate home */}
        <Navbar.Brand as={NavLink} to="/">
          Dev Intelligence
        </Navbar.Brand>
        
        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {/* We use NavLink directly to avoid react-bootstrap className conflicts */}
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/search"
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Search
            </NavLink>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;