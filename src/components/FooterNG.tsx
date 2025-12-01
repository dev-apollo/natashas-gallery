import "../styles/footer.css";
import { Link } from "react-router";

function FooterNG() {
  return (
    <footer className="footer-ng">
      <div className="footer-content">

        <div className="footer-brand">
          <h3>Natasha's Gallery</h3>
          <p>Arte, expressão e histórias através do olhar de Natália.</p>
        </div>

        <div className="footer-links">
          <Link to="/portfolio">Portfólio</Link>
          <Link to="/events">Eventos</Link>
          <Link to="/contacts">Contatos</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} Natasha's Gallery — Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}

export default FooterNG;
