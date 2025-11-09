import { Button, Form } from "react-bootstrap";

function FormContacts(){
    return (
        <Form>
            <Form.Group className="my-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome completo"></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="exemplo@email.com"></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label>Assunto</Form.Label>
                <Form.Control type="text" placeholder="Comissão"></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label>Corpo</Form.Label>
                <Form.Control as="textarea" placeholder="Detalhes da comissão..."></Form.Control>
            </Form.Group>
            <Button>Enviar</Button>
        </Form>
    )
}

export default FormContacts