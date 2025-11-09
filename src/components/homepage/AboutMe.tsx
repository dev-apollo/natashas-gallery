import noImage from "/src/assets/noImage.png"
import { Row, Col, Image } from "react-bootstrap"

function AboutMe() {

  return (
    <div className="my-3">
        <h2>Sobre mim</h2>
        <Row>
            <Col>
                <Image src={noImage} fluid></Image>
            </Col>
            <Col>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nemo nesciunt aperiam earum magni ducimus quos dicta. Doloribus, vero vel. Dolorum excepturi qui quia magnam ab necessitatibus deserunt nihil delectus.
            </Col>
        </Row>
    </div>
  )
}

export default AboutMe