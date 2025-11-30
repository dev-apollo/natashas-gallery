import { Navbar, Nav } from "react-bootstrap"
import "../styles/navbar.css"
import { Link } from "react-router"

function NavbarNG() {

  return (
    <Navbar expand="lg" className="px-3 navbarng">
      <Navbar.Brand as={Link} to="/portfolio">
        Natasha's Gallery
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarng-collapse" />
      <Navbar.Collapse id="navbarng-collapse">
        <Nav>
          <Nav.Link as={Link} to="/portfolio">Portfólio</Nav.Link>
          <Nav.Link as={Link} to="/events">Eventos</Nav.Link>
          <Nav.Link as={Link} to="/contacts">Contatos</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarNG
