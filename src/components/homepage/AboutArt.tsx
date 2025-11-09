import noImage from "/src/assets/noImage.png"
import { Row, Col, Image } from "react-bootstrap"

function AboutArt() {

  return (
    <div className="my-3">
        <h2>Sobre arte</h2>
        <Row>
            <Col>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nemo nesciunt aperiam earum magni ducimus quos dicta. Doloribus, vero vel. Dolorum excepturi qui quia magnam ab necessitatibus deserunt nihil delectus.
            </Col>
            <Col className="text-center" md="auto">
                <Image src={noImage} className="foto" fluid></Image>
                <p>
                  <em>Nome da obra - ano</em>
                </p>
            </Col>
        </Row>
    </div>
  )
}

export default AboutArt