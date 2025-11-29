import { Link } from "react-router"
import { motion } from "motion/react"

function Doubts() {

  return (
    <div className="my-3">
      <h2>
        <strong>
          Dúvidas e comissões
        </strong>
      </h2>
      <p className="texto">Caso tenha dúvidas ou decida realizar uma comissão comigo, clique no botão abaixo e preencha o formulário!</p>
      <Link to="/contacts">
        <motion.button className="button-ok btn" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>Contatar</motion.button>
      </Link>
    </div>
  )
}

export default Doubts