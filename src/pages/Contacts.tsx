import { Container, Col, Row } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import FormContacts from "../components/contacts/FormContacts";

function Contacts() {

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center">
          <strong>
            Contatos
          </strong>
        </h1>
        <Row>
          <Col md="auto">
            <a>
              <i className="bi bi-instagram"></i>
            </a>
          </Col>
          <Col md="auto">
            <a>
              <i className="bi bi-youtube"></i>
            </a>
          </Col>
        </Row>
        <FormContacts></FormContacts>
      </Container>
    </>
  )
}

export default Contacts