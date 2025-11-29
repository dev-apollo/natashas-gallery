import { Navbar, Nav } from "react-bootstrap"
import "../styles/navbar.css"

function NavbarNG() {

  return (
    <Navbar expand="lg" className="px-3 navbarng">
      <Navbar.Brand href="/">Natasha's Gallery</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarng-collapse" />
      <Navbar.Collapse id="navbarng-collapse">
        <Nav>
          <Nav.Link href="/portfolio">Portfólio</Nav.Link>
          <Nav.Link href="/events">Eventos</Nav.Link>
          <Nav.Link href="/contacts">Contatos</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarNG