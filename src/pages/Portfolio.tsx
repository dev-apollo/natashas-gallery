import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";

function Portfolio() {

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center">
          <strong>
            Portfólio
          </strong>
        </h1>
      </Container>
    </>
  )
}

export default Portfolio