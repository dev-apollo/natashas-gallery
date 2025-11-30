import { Image } from "react-bootstrap"
import { getInfosNextEvent } from "../../services/api";
import { useEffect, useState } from "react"
import { Link } from "react-router"
import Skeleton from "react-loading-skeleton";
import { motion } from "motion/react"
import "../../styles/nextEvent.css";

function NextEvent() {

  const [infos, setInfos] = useState({
    title: "",
    coverImgUrl: "",
    startDate: new Date(),
    endDate: new Date(),
    location: {
      city: "",
      state: "",
      country: ""
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getInfosNextEvent();
        setInfos({
          title: response.data.title,
          coverImgUrl: response.data.coverImgUrl,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
          location: {
            city: response.data.location?.city,
            state: response.data.location?.state,
            country: response.data.location?.country
          }
        });
      } catch (e: any) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const hasEvent = infos.title !== "" && !loading;

  return (
    <motion.div 
      className="next-event-section"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="event-header">
        <h2 className="event-title">Próximo evento</h2>
        <div className="event-divider"></div>
      </div>

      {hasEvent && (
        <motion.div 
          className="event-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="event-img-wrapper">
            {loading ? (
              <Skeleton width="260px" height="160px" baseColor="#837e61" />
            ) : (
              <Image
                src={infos.coverImgUrl}
                fluid
                rounded
                className="event-img"
              />
            )}
          </div>

          <div className="event-info">
            <h3 className="event-name">
              {loading ? (
                <Skeleton width="280px" baseColor="#837e61" />
              ) : (
                infos.title
              )}
            </h3>

            <p className="event-sub">
              {infos.location.city}/{infos.location.state} —{" "}
              {infos.startDate.toLocaleDateString("pt-BR")}
              {infos.startDate.getTime() !== infos.endDate.getTime() &&
                ` à ${infos.endDate.toLocaleDateString("pt-BR")}`}
            </p>
          </div>
        </motion.div>
      )}

      {!loading && !hasEvent && (
        <p className="event-sub" style={{ textAlign: "center", marginTop: "20px" }}>
          <em>Não há eventos futuros.</em>
        </p>
      )}

      <Link to={"/events"}>
        <motion.button 
          className="event-button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
        >
          Visualizar eventos
        </motion.button>
      </Link>

    </motion.div>
  );
}

export default NextEvent