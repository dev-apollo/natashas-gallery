import { Row, Col, Image, Form } from "react-bootstrap"
import { getInfosAboutMe, updateAbout } from "../../services/api"
import { ChangeEvent, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import "../../styles/about.css"
import { motion } from "motion/react"

function AboutMe() {

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
        const response = await getInfosAboutMe();
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
      await updateAbout("me", form);
      alert("Alterações salvas.");
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar dados.");
    }
  }

  return (
   <div className="about-section">
    <motion.h2 
      className="art-title-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="art-title-line"></div>
      <h2 className="art-title">Sobre a artista</h2>
    </motion.h2>

    <Row className="gx-5 gy-4 align-items-center about-row">
      <Col md={4} className="d-flex justify-content-center">
        {loading ? (
          <Skeleton width="250px" height="250px" baseColor="#837e61" />
        ) : (
          <motion.div 
            className="about-img-box"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            <Image src={infos.imgUrl} fluid className="about-img" rounded />
          </motion.div>
        )}
      </Col>

      <Col md={8}>
        {loading ? (
          <Skeleton count={4} baseColor="#837e61" />
        ) : (
          <>
            {isLogged ? (
              <>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className="about-input"
                  value={infos.text}
                  onChange={(e) => setInfos({ ...infos, text: e.target.value })}
                />
                <Form.Control
                  type="file"
                  className="about-input mt-2"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewImage(e.target.files?.[0] || null)
                  }
                />
              </>
            ) : (
              <motion.div 
                className="about-text-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="about-icon">🎨</span>
                <p>{infos.text}</p>
              </motion.div>
            )}
          </>
        )}
      </Col>
    </Row>

    {isLogged && (
      <motion.button
        className="about-save-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
      >
        Salvar alterações
      </motion.button>
    )}
  </div>
  );
}

export default AboutMe