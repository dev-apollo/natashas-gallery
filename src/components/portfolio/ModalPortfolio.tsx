import { useState } from "react"
import { Modal, Image, Form } from "react-bootstrap"
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
            keyboard={false}
            centered
            dialogClassName="modal-art"
        >
            <Modal.Header closeButton className="modal-art-header"/>
            
            <Modal.Body className="modal-art-body">

                <div className="modal-art-img-wrapper">
                    <Image src={mainImgUrl} className="modal-art-img" fluid />
                </div>

                <div className="modal-art-title-wrapper">
                    {isLogged ? (
                        <>
                            <Form.Group className="my-3">
                                <Form.Label><strong>Título</strong></Form.Label>
                                <Form.Control
                                    className="inputs modal-input"
                                    type="text"
                                    value={infos.title}
                                    onChange={(e) => setInfos({ ...infos, title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Label><strong>Ano</strong></Form.Label>
                                <Form.Control
                                    className="inputs modal-input"
                                    type="number"
                                    value={infos.artYear}
                                    onChange={(e) => setInfos({ ...infos, artYear: e.target.value })}
                                />
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            <h2 className="modal-art-title">{infos.title}</h2>
                            <div className="modal-art-divider"></div>
                            <h4 className="modal-art-year">{infos.artYear}</h4>
                        </>
                    )}
                </div>

                {isLogged ? (
                    <>
                        <Form.Group className="my-3">
                            <Form.Label><strong>Descrição</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                className="inputs modal-input"
                                value={infos.description}
                                onChange={(e) => setInfos({ ...infos, description: e.target.value })}
                            />
                        </Form.Group>

                        <div className="my-3 d-flex gap-2 justify-content-end">
                            <motion.button 
                                className="button-ok btn modal-btn-save"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleUpdate}
                            >
                                Salvar alterações
                            </motion.button>

                            <motion.button 
                                className="button-cancel btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDelete}
                            >
                                Excluir arte
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <p className="modal-art-description">{infos.description}</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ModalPortfolio