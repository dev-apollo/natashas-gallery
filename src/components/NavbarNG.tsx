import { Navbar, Nav } from "react-bootstrap"
import "../styles/navbar.css"
import { Link } from "react-router"

function NavbarNG() {

  return (
    <Navbar expand="lg" className="px-3 navbarng">
      <Navbar.Brand as={Link} to="/" className="brand-ng">
        Natasha's Gallery
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarng-collapse" className="toggle-ng" />

      <Navbar.Collapse id="navbarng-collapse" className="justify-content-end">
        <Nav className="links-ng">
          <Nav.Link as={Link} to="/portfolio" className="link-ng">Portfólio</Nav.Link>
          <Nav.Link as={Link} to="/events" className="link-ng">Eventos</Nav.Link>
          <Nav.Link as={Link} to="/contacts" className="link-ng">Contatos</Nav.Link>
          <Nav.Link as={Link} to="/login" className="link-ng">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarNG
