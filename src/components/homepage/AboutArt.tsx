import { Row, Col, Image, Form, Button } from "react-bootstrap"
import { getInfosAboutArt, updateAbout } from "../../services/api"
import { ChangeEvent, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { motion } from "motion/react"

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
    <div className="my-3">
      <h2>
        <strong>
          Sobre arte
        </strong>
      </h2>
      <Row>
        <Col>
          {loading ? (
            <Skeleton baseColor="#837e61" count={4}></Skeleton>
          ) : (
            <>
              {isLogged ? (
                <>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="inputs my-3"
                    value={infos.text}
                    onChange={(e) => setInfos({ ...infos, text: e.target.value })}
                  ></Form.Control>
                  <Form.Control
                    type="file"
                    className="inputs"
                    accept="image/*"
                    size="sm"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewImage(e.target.files?.[0] || null)}
                  ></Form.Control>
                </>
              ) : (
                <div className="texto my-3">{infos.text}</div>
              )}
            </>
          )}
        </Col>
        <Col className="text-center" md="auto">
          {loading ? (
            <Skeleton baseColor="#837e61" width="200px" height="200px"></Skeleton>
          ) : (
            <>
              <Image rounded src={infos.imgUrl} className="foto my-3" fluid></Image>
            </>
          )}
        </Col>
      </Row>
      {isLogged && (
        <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSave}>
          Salvar alterações sobre arte
        </motion.button>
      )}
    </div >
  )
}

export default AboutArt