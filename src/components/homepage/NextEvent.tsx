import noImage from "/src/assets/noImage.png"
import { Button, Container, Image } from "react-bootstrap"

function NextEvent() {

  return (
    <Container className="text-center my-3">
        <h2>Próximo evento</h2>
        <Image src={noImage} fluid></Image>
        <h3>Nome do evento</h3>
        <p>Local - data</p>
        <Button>Visualizar eventos</Button>
    </Container>
  )
}

export default NextEvent