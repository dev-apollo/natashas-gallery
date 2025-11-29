import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/api";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "../styles/events.css"
import { motion } from "motion/react"

function Events() {

  const [paises, setPaises] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const isLogged = sessionStorage.getItem("authorization");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllEvents();
        const paisesFiltrados = Array.from(
          new Set(
            response.data.map((e: any) => e.location?.country).filter(Boolean)
          )
        );
        setPaises(paisesFiltrados as string[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center my-3">
          <strong>
            Eventos
          </strong>
        </h1>
        {isLogged && (
          <div className="text-center">
            <Link to="/createEvent">
              <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Adicionar evento</motion.button>
            </Link>
          </div>
        )}
        <div>
          <h2>Selecione um país:</h2>
          <ul>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <Skeleton baseColor="#837e61" count={1} width="200px" />
                </li>
              ))
            ) : paises.length > 0 ? (
              paises.map((pais) => (
                <li key={pais}>
                  <Link className="link" to={`/events/${encodeURIComponent(pais)}`}>
                    {pais}
                  </Link>
                </li>
              ))
            ) : (
              <li>Nenhum país encontrado.</li>
            )}
          </ul>
        </div>
      </Container>
    </>
  )
}

export default Events