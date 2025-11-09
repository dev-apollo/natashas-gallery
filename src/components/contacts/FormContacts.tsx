import { Button, Form } from "react-bootstrap";

function FormContacts(){
    return (
        <Form>
            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Assunto</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Corpo</Form.Label>
                <Form.Control as="textarea"></Form.Control>
            </Form.Group>
            <Button>Enviar</Button>
        </Form>
    )
}

export default FormContacts