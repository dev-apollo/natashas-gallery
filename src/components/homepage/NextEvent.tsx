import { Container, Image } from "react-bootstrap"
import { getInfosNextEvent } from "../../services/api";
import { useEffect, useState } from "react"
import { Link } from "react-router"
import Skeleton from "react-loading-skeleton";
import { motion } from "motion/react"

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
    }
    load();
  }, []);

  return (
    <Container className="text-center my-3">
      <h2>
        <strong>Próximo evento</strong>
      </h2>
      {loading ? (
        <Skeleton baseColor="#837e61" width="200px" height="200px"></Skeleton>
      ) : (
        <Image rounded src={infos.coverImgUrl} className="foto" fluid></Image>
      )}
      <h3 className="my-2">
        {loading ? (
          <Skeleton baseColor="#837e61" count={1} width="300px"></Skeleton>
        ) : (
          <strong>{infos.title}</strong>
        )}
      </h3>
      <p className="texto">
        {loading ? (
          <Skeleton baseColor="#837e61" count={1} width="300px" />
        ) : (infos.title != "" ? (
          <em>
            {infos.location.city}/{infos.location.state} -{" "}
            {infos.startDate.toLocaleDateString("pt-BR")}
            {infos.startDate.getTime() !== infos.endDate.getTime() &&
              ` à ${infos.endDate.toLocaleDateString("pt-BR")}`}
          </em>
        ) : (
          <h3>Não há eventos futuros.</h3>
        ))}
      </p>
      <Link to={"/events"}>
        <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Visualizar eventos</motion.button>
      </Link>
    </Container >
  )
}

export default NextEvent