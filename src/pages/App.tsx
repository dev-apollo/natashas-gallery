import { useEffect, useState } from "react"
import { Card, CardBody, CardFooter, Container } from "react-bootstrap"
import { getFact } from "../services/catfacts"
import { motion } from "motion/react"
import cat from "../assets/cat.png"

function App() {
  const [fact, setFact] = useState("")

  const fetchData = async () => {
    setFact("")
    try {
      const response = await getFact()
      setFact(response.fact)
    } catch (err: any) {
      console.log("Erro ao buscar um fato: ", err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className="my-3">
      <div className="d-flex">
        <img className="img-fluid cat-img" src={cat}></img>
        <h1 className="mx-1">Hello cat!</h1>
      </div>
      <hr />
      <p>
        This is a template from <a target="_blank"href="https://vite.dev/">Vite</a>, using <a target="_blank"href="https://react.dev/">React</a>, <a target="_blank"href="https://www.typescriptlang.org/">TypeScript</a> and <a target="_blank"href="https://swc.rs/">SWC</a>, but...<br/>
        I added somethings I like and normally use, like <a target="_blank"href="https://reactrouter.com/">React-Router</a>, <a target="_blank"href="https://react-bootstrap.netlify.app/">React-Bootstrap</a>, <a target="_blank"href="https://getbootstrap.com/">Bootstrap</a> (with <a target="_blank"href="https://icons.getbootstrap.com/">icons</a>), <a target="_blank"href="https://motion.dev/">Motion</a>, <a target="_blank"href="https://axios-http.com/ptbr/">Axios</a> and <a target="_blank"href="https://en.wikipedia.org/wiki/Cat">CATS</a>!
      </p>
      <Card>
        <CardBody>
          <h5>Here's a random fact about cats:</h5>
          {fact != "" ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{fact}</motion.p>
          ) : (
            <motion.p initial={{ opacity: 1 }} animate={{ opacity: 0 }}>Loading...</motion.p>
          )
          }
        </CardBody>
        <CardFooter>
          <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.1}} className="btn btn-sm btn-primary" onClick={fetchData}>
            Generate another <i className="bi bi-arrow-counterclockwise"></i>
          </motion.button>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default App