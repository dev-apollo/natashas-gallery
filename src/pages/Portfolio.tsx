import { Container } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import ModalPortfolio from "../components/portfolio/ModalPortfolio";
import { getAllArts } from "../services/api";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";

function Portfolio() {

  const [artes, setArtes] = useState([]);
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
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center my-3">
          <strong>
            Portfólio
          </strong>
        </h1>
        {isLogged && (
          <div className="text-center my-3">
            <Link to="/createArt">
              <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Adicionar uma arte</motion.button>
            </Link>
          </div>
        )}
        <Container className="d-flex flex-wrap">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton className="mx-1" baseColor="#837e61" key={i} width={300} height={300} />
            ))
          ) : (
            artes.map((arte: any) => (
              <div key={arte.id}>
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1 }}
                  style={{ width: "315px" }}
                  src={arte.mainImgUrl}
                  className="fluid"
                  onClick={() => setSelectedArt(arte)}
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
  )
}
export default Portfolio