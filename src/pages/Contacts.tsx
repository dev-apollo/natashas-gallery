import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import FormContacts from "../components/contacts/FormContacts";

function Contacts() {

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center">Contatos</h1>
        <FormContacts></FormContacts>
      </Container>
    </>
  )
}

export default Contacts