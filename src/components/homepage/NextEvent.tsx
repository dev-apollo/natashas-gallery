import noImage from "/src/assets/noImage.png"
import { Button, Container, Image } from "react-bootstrap"

function NextEvent() {

  return (
    <Container className="text-center my-3">
        <h2>
          <strong>Próximo evento</strong>
        </h2>
        <Image src={noImage} className="foto" fluid></Image>
        <h3>
          <strong>Nome do evento</strong>
        </h3>
        <p>
          <em>Local - data</em>
        </p>
        <Button>Visualizar eventos</Button>
    </Container>
  )
}

export default NextEvent