import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";

function Events() {

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center">
          <strong>  
            Eventos
          </strong>
        </h1>
      </Container>
    </>
  )
}

export default Events