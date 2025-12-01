import { Container, Form } from "react-bootstrap"
import NavbarNG from "../components/NavbarNG"
import { ChangeEvent, useState } from "react"
import { createArt } from "../services/api";
import "../styles/contacts.css"
import { motion } from "motion/react"
import FooterNG from "../components/FooterNG";
import { useNavigate } from "react-router";

function CreateArt() {

    const [infos, setInfos] = useState({
        title: "",
        description: "",
        artYear: 2000
    });
    const [newImage, setNewImage] = useState<File | null>(null);

    const navigate = useNavigate();
        
    const goBack = () : void => {
        navigate("/events");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage) {
            alert("Envie a imagem principal da obra.");
            return;
        }
        try {
            const data = new FormData();
            data.append("title", infos.title);
            data.append("description", infos.description);
            data.append("artYear", String(infos.artYear));
            data.append("mainImgUrl", newImage);
            await createArt(data);
            alert("Arte foi criada com sucesso!");
            window.location.reload();  
        } catch (e) {
            console.error(e);
            alert("Erro ao criar arte!");
        }
    }

    return (
        <>
            <NavbarNG></NavbarNG>
            <Container>
                <h1 className="text-center my-3"><strong>Adicionar arte</strong></h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Título:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            value={infos.title}
                            onChange={(e) => setInfos({ ...infos, title: e.target.value })}
                            placeholder="Monalisa"
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Descrição:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            as="textarea"
                            value={infos.description}
                            onChange={(e) => setInfos({ ...infos, description: e.target.value })}
                            placeholder="Uma bela obra..."
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Ano:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="number"
                            value={infos.artYear}
                            onChange={(e) => setInfos({ ...infos, artYear: Number(e.target.value) })}
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Arte:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="file"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewImage(e.target.files?.[0] || null)}
                        ></Form.Control>
                    </Form.Group>
                    <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit">Adicionar arte</motion.button>
                    <motion.button
                        className="button-cancel btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={goBack}
                        >
                        Cancelar
                    </motion.button>
                </Form>
            </Container>

            <FooterNG></FooterNG>
        </>
    )
}

export default CreateArt