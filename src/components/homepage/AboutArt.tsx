import { Row, Col, Image, Form } from "react-bootstrap"
import { getInfosAboutArt, updateAbout } from "../../services/api"
import { ChangeEvent, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { motion } from "motion/react"
import "../../styles/aboutArt.css";

function AboutArt() {

  const [infos, setInfos] = useState({
    imgUrl: "",
    text: ""
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const isLogged = sessionStorage.getItem("authorization");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getInfosAboutArt();
        setInfos({ imgUrl: response.data.imgUrl, text: response.data.text });
      } catch (e: any) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("text", infos.text);
      if (newImage) {
        form.append("coverImg", newImage);
      }
      await updateAbout("art", form);
      alert("Alterações salvas.");
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar dados.");
    }
  }

  return (
    <div className="about-art-section">
      <motion.div
        className="art-title-wrapper"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="art-title-line"></div>
        <h2 className="art-title">Sobre arte</h2>
      </motion.div>

      <Row className="mt-4 align-items-center gx-5 gy-4">
        
        <Col md={8}>
          {loading ? (
            <Skeleton baseColor="#837e61" count={4} />
          ) : isLogged ? (
            <>
              <Form.Control
                as="textarea"
                rows={6}
                className="art-input mb-3"
                value={infos.text}
                onChange={(e) =>
                  setInfos({ ...infos, text: e.target.value })
                }
              />
              <Form.Control
                type="file"
                className="art-input"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewImage(e.target.files?.[0] || null)
                }
              />
            </>
          ) : (
            <motion.div
              className="art-text-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>{infos.text}</p>
            </motion.div>
          )}
        </Col>

        <Col md={4} className="text-center">
          {loading ? (
            <Skeleton width="220px" height="220px" baseColor="#837e61" />
          ) : (
            <motion.div
              className="art-img-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image src={infos.imgUrl} className="art-img" fluid rounded />
            </motion.div>
          )}
        </Col>
      </Row>

      {isLogged && (
        <motion.button
          className="art-save-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
        >
          Salvar alterações sobre arte
        </motion.button>
      )}
    </div>
  );
}

export default AboutArt