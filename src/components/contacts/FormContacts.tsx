import { Form } from "react-bootstrap";
import { motion } from "motion/react"

interface FormContactsProps {
    infosEmail: {
        nome: string;
        email: string;
        assunto: string;
        corpo: string;
    };
    setInfosEmail: React.Dispatch<React.SetStateAction<{
        nome: string;
        email: string;
        assunto: string;
        corpo: string;
    }>>;
    handleSendEmail: (e: any) => void;
}

function FormContacts({ infosEmail, setInfosEmail, handleSendEmail }: FormContactsProps) {
    return (
        <Form onSubmit={handleSendEmail}>
            <Form.Group className="my-3">
                <Form.Label><strong>Nome:</strong></Form.Label>
                <Form.Control type="text" placeholder="Nome completo"
                    className="inputs"
                    value={infosEmail.nome}
                    onChange={(e) => setInfosEmail(prev => ({ ...prev, nome: e.target.value }))}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label><strong>Email:</strong></Form.Label>
                <Form.Control type="email" placeholder="exemplo@email.com"
                    className="inputs"
                    value={infosEmail.email}
                    onChange={(e) => setInfosEmail(prev => ({ ...prev, email: e.target.value }))}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label><strong>Assunto:</strong></Form.Label>
                <Form.Control type="text" placeholder="Comissão"
                    className="inputs"
                    value={infosEmail.assunto}
                    onChange={(e) => setInfosEmail(prev => ({ ...prev, assunto: e.target.value }))}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label><strong>Corpo:</strong></Form.Label>
                <Form.Control as="textarea" placeholder="Detalhes da comissão..."
                    className="inputs"
                    value={infosEmail.corpo}
                    onChange={(e) => setInfosEmail(prev => ({ ...prev, corpo: e.target.value }))}
                ></Form.Control>
            </Form.Group>
            <motion.button type="submit" className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Enviar</motion.button>
        </Form>
    )
}

export default FormContacts