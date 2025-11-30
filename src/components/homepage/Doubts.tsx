import { Link } from "react-router"
import { motion } from "motion/react"
import "../../styles/doubts.css";

function Doubts() {
  return (
    <motion.div 
      className="doubts-section"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="doubts-title">
        Dúvidas e comissões
      </h2>

      <motion.div 
        className="doubts-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="doubts-icon">💌</div>

        <p className="doubts-text">
          Caso tenha dúvidas ou deseje solicitar uma comissão, clique no botão abaixo e preencha o formulário!
        </p>

        <Link to="/contacts">
          <motion.button 
            className="doubts-button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            Contatar
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Doubts