import { Container } from "react-bootstrap";
import "../styles/homepage.css"
import AboutMe from "../components/homepage/AboutMe";
import NavbarNG from "../components/NavbarNG";
import AboutArt from "../components/homepage/AboutArt";
import NextEvent from "../components/homepage/NextEvent";
import Doubts from "../components/homepage/Doubts";

function App() {

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center">
          <strong>Natasha's Gallery</strong>
        </h1>
        <AboutMe></AboutMe>
        <AboutArt></AboutArt>
        <NextEvent></NextEvent>
        <Doubts></Doubts>
      </Container>
    </>
  )
}

export default App