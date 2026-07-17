import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AppNavbar() {
  const navClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Dev Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/search" className={navClass}>
              Search
            </NavLink>

            <NavLink to="/bookmarks" className={navClass}>
              Bookmarks
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;