import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import ModalPortfolio from "../components/portfolio/ModalPortfolio";
import { getAllArts } from "../services/api";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";
import "../styles/portfolio.css";

function Portfolio() {

  const [artes, setArtes] = useState<any[]>([]);
  const [selectedArt, setSelectedArt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isLogged = sessionStorage.getItem("authorization");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllArts();
        setArtes(response.data);
      } catch (e: any) {
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

      <Container>
        <motion.div 
          className="portfolio-title-wrapper"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="portfolio-title">Portfólio</h1>
          <div className="portfolio-divider"></div>
        </motion.div>

        {isLogged && (
          <div className="text-center my-3">
            <Link to="/createArt">
              <motion.button
                className="add-art-button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
              >
                Adicionar uma arte
              </motion.button>
            </Link>
          </div>
        )}

        <Container className="portfolio-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} baseColor="#837e61" width={260} height={260} />
            ))
          ) : (
            artes.map((arte) => (
              <div key={arte.id} className="portfolio-item" onClick={() => setSelectedArt(arte)}>
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={arte.mainImgUrl}
                  alt={arte.title}
                />
              </div>
            ))
          )}
        </Container>

        {selectedArt && (
          <ModalPortfolio
            show={true}
            onHide={() => setSelectedArt(null)}
            arteId={selectedArt.id}
            mainImgUrl={selectedArt.mainImgUrl}
            title={selectedArt.title}
            description={selectedArt.description}
            artYear={selectedArt.artYear}
          />
        )}
      </Container>
    </>
  );
}
export default Portfolio