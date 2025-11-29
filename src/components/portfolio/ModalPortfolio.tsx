import { useState } from "react"
import { Modal, Image, Row, Col, Form } from "react-bootstrap"
import { deleteArt, updateArt } from "../../services/api"
import "../../styles/modalportfolio.css"
import "../../styles/contacts.css"
import { motion } from "motion/react"

interface ModalPortfolioProps {
    arteId: string
    show: boolean
    onHide: () => void
    mainImgUrl: string
    title: string
    description: string
    artYear: string
}

function ModalPortfolio({ arteId, show, onHide, mainImgUrl, title, description, artYear }: ModalPortfolioProps) {

    const isLogged = sessionStorage.getItem("authorization");
    const [infos, setInfos] = useState({
        title: title,
        description: description,
        artYear: artYear
    })

    const handleDelete = () => {
        try {
            deleteArt(arteId);
            alert("Arte excluída.");
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    const handleUpdate = () => {
        try {
            const formData = new FormData();
            formData.append("title", infos.title);
            formData.append("description", infos.description);
            formData.append("artYear", infos.artYear);
            updateArt(arteId, formData);
            alert("Arte atualizada");
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton className="cabecalho"></Modal.Header>
            <Modal.Body className="corpomodal">
                <Image src={mainImgUrl} className="my-2" fluid></Image>
                <Row>
                    <Col md="auto">
                        {isLogged ? (
                            <>
                                <Form.Group className="my-3">
                                    <Form.Label><strong>Alterar título</strong></Form.Label>
                                    <Form.Control
                                        className="inputs"
                                        type="text"
                                        value={infos.title}
                                        onChange={(e) => setInfos({ ...infos, title: e.target.value })}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Label><strong>Alterar ano</strong></Form.Label>
                                    <Form.Control
                                        className="inputs"
                                        type="number"
                                        value={infos.artYear}
                                        onChange={(e) => setInfos({ ...infos, artYear: e.target.value })}
                                    ></Form.Control>
                                </Form.Group>
                            </>
                        ) : (
                            <h2>
                                <strong>{infos.title} - {infos.artYear}</strong>
                            </h2>
                        )}
                    </Col>
                </Row>
                {isLogged ? (
                    <>
                        <Form.Group>
                            <Form.Label><strong>Alterar descrição</strong></Form.Label>
                            <Form.Control
                                className="inputs"
                                type="text"
                                as="textarea"
                                value={infos.description}
                                onChange={(e) => setInfos({ ...infos, description: e.target.value })}
                            ></Form.Control>
                        </Form.Group>
                        <div className="my-2 d-flex gap-2">
                            <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleUpdate}>Salvar alterações</motion.button>
                            <motion.button className="button-cancel btn" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={handleDelete}>Excluir arte</motion.button>
                        </div>
                    </>
                ) : (
                    <div className="texto">{infos.description}</div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalPortfolio