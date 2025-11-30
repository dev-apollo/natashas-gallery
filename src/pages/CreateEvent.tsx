import { ChangeEvent, useState } from "react";
import NavbarNG from "../components/NavbarNG";
import { Container, Form } from "react-bootstrap";
import { createEvent } from "../services/api";
import "../styles/contacts.css"
import { motion } from "motion/react"

function CreateEvent() {

    const [infos, setInfos] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: {
            city: "",
            state: "",
            country: ""
        }
    });
    const [newImage, setNewImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage) {
            alert("Envie a imagem principal do evento.");
            return;
        }
        try {
            const form = new FormData();
            form.append("title", infos.title);
            form.append("description", infos.description);
            form.append("startDate", infos.startDate);
            form.append("endDate", infos.endDate);
            form.append("location[city]", infos.location.city);
            form.append("location[state]", infos.location.state);
            form.append("location[country]", infos.location.country);
            form.append("status", "visible");
            form.append("coverImg", newImage);
            await createEvent(form);
            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Erro ao criar evento.")
        }

    }
    return (
        <>
            <NavbarNG></NavbarNG>
            <Container>
                <h1 className="text-center my-3"><strong>Adicionar evento</strong></h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Título:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            value={infos.title}
                            onChange={(e) => setInfos({ ...infos, title: e.target.value })}
                            placeholder="Exposição no Louvre"
                            required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Descrição:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            as="textarea"
                            value={infos.description}
                            onChange={(e) =>
                                setInfos({ ...infos, description: e.target.value })
                            }
                            placeholder="Uma bela exposição..."
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Data de Início:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="date"
                            value={infos.startDate}
                            onChange={(e) =>
                                setInfos({ ...infos, startDate: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Data de Término:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="date"
                            value={infos.endDate}
                            onChange={(e) =>
                                setInfos({ ...infos, endDate: e.target.value })
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Cidade:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            value={infos.location.city}
                            onChange={(e) =>
                                setInfos({
                                    ...infos,
                                    location: {
                                        ...infos.location,
                                        city: e.target.value
                                    }
                                })
                            }
                            placeholder="Paris"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Estado:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            value={infos.location.state}
                            onChange={(e) =>
                                setInfos({
                                    ...infos,
                                    location: {
                                        ...infos.location,
                                        state: e.target.value
                                    }
                                })
                            }
                            placeholder="Île-de-France"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>País:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="text"
                            value={infos.location.country}
                            onChange={(e) =>
                                setInfos({
                                    ...infos,
                                    location: {
                                        ...infos.location,
                                        country: e.target.value
                                    }
                                })
                            }
                            placeholder="França"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label><strong>Imagem de Capa:</strong></Form.Label>
                        <Form.Control
                            className="inputs"
                            type="file"
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewImage(e.target.files?.[0] || null)
                            }
                        />
                    </Form.Group>
                    <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit">Adicionar evento</motion.button>
                </Form>
            </Container>
        </>
    )
}

export default CreateEvent