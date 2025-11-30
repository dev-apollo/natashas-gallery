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
      <NavbarNG />

      <Container className="events-container">


        <h1 className="events-titles">Eventos</h1>
        <div className="events-divider"></div>

        {isLogged && (
          <div className="text-center my-3">
            <Link to="/createEvent">
              <motion.button 
                className="button-ok btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Adicionar evento
              </motion.button>
            </Link>
          </div>
        )}

        <div className="events-section">
          <h2 className="events-subtitle">Selecione um país</h2>

          <div className="countries-grid">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton 
                  key={i}
                  baseColor="#837e61" 
                  height={80} 
                  width={220}
                  className="country-skeleton"
                />
              ))
            ) : paises.length > 0 ? (
              paises.map((pais) => (
                <motion.div
                  key={pais}
                  className="country-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link className="country-link" to={`/events/${encodeURIComponent(pais)}`}>
                    {pais}
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="no-result">Nenhum país encontrado.</p>
            )}
          </div>
        </div>

      </Container>
    </>
  );
}

export default Events