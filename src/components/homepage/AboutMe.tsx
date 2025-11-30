import { Row, Col, Image, Form } from "react-bootstrap"
import { getInfosAboutMe, updateAbout } from "../../services/api"
import { ChangeEvent, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import "../../styles/contacts.css"
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
    <div className="my-3">
      <h2>
        <strong>Sobre mim</strong>
      </h2>
      <Row>
        <Col md="auto">
          {loading ? (
            <Skeleton baseColor="#837e61" width="200px" height="200px"></Skeleton>
          ) : (
            <>
              <Image rounded src={infos.imgUrl} className="foto my-3" fluid></Image>
            </>
          )}
        </Col>
        <Col>
          {loading ? (
            <Skeleton baseColor="#837e61" count={4}></Skeleton>
          ) : (
            <>
              {isLogged ? (
                <div className="my-3">
                  <Form.Control
                    as="textarea"
                    className="my-3 inputs"
                    rows={4}
                    value={infos.text}
                    onChange={(e) => setInfos({ ...infos, text: e.target.value })}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="inputs"
                    size="sm"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewImage(e.target.files?.[0] || null)}
                  ></Form.Control>
                </div>
              ) : (
                <div className="texto my-3">{infos.text}</div>
              )}
            </>
          )}
        </Col>
      </Row>
      {isLogged && (
        <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSave}>
          Salvar alterações sobre mim
        </motion.button>
      )}
    </div>
  )
}

export default AboutMe