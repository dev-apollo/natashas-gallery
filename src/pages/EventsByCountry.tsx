import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { deleteEvent, getAllEventsByCountry } from "../services/api";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import NavbarNG from "../components/NavbarNG";
import "../styles/eventsByCountry.css";
import { motion } from "motion/react"
import FooterNG from "../components/FooterNG";

function EventsByCountry() {

    const { country } = useParams();
    const [proxEventos, setProxEventos] = useState<any>([]);
    const [passEventos, setPassEventos] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const isLogged = sessionStorage.getItem("authorization");
    const navigate = useNavigate();
    const handleDelete = (eventoId: string) => {
        try {
            deleteEvent(eventoId);
            alert("Evento excluído.");
            navigate("/events")
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                if (!country) return;
                const response = await getAllEventsByCountry(country);
                const data: any[] = response.data;
                const parsed = data.map((ev: any) => ({
                    ...ev,
                    startDate: new Date(ev.startDate),
                    endDate: new Date(ev.endDate)
                }));

                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);

                const futuros = parsed.filter(
                    ev => ev.endDate >= hoje
                );
                const passados = parsed.filter(
                    ev => ev.endDate < hoje
                );

                setProxEventos(futuros);
                setPassEventos(passados);

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [country]);

    return (
        <>
            <NavbarNG />

            <Container className="events-country-container">

                <h1 className="events-title">Eventos em {country}</h1>
                <div className="events-divider"></div>

                <section className="events-section">
                    <h2 className="events-subtitle">Próximos eventos</h2>

                    {loading ? (
                        <Container className="events-grid">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} baseColor="#837e61" width={250} height={250} />
                            ))}
                        </Container>
                    ) : proxEventos.length === 0 ? (
                        <p className="events-empty">Nenhum próximo evento disponível.</p>
                    ) : (
                        <Container className="events-grid">
                            {proxEventos.map((evento: any) => (
                                <motion.div
                                    key={evento.id}
                                    className="event-card"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="event-img-wrapper">
                                        <img src={evento.coverImgUrl} className="event-img" alt="" />
                                    </div>

                                    <div className="event-info">
                                        <h3 className="event-title">{evento.title}</h3>
                                        <p className="event-desc">{evento.description}</p>

                                        <p className="event-date">
                                            <em>
                                                {evento.location.city}/{evento.location.state} • {evento.startDate.toLocaleDateString("pt-BR")}
                                                {evento.startDate.getTime() !== evento.endDate.getTime() &&
                                                    ` à ${evento.endDate.toLocaleDateString("pt-BR")}`}
                                            </em>
                                        </p>

                                        {isLogged && (
                                            <motion.button
                                                className="button-cancel btn event-delete"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(evento.id)}
                                            >
                                                Excluir
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Container>
                    )}
                </section>


                <section className="events-section">
                    <h2 className="events-subtitle">Eventos passados</h2>

                    {loading ? (
                        <Container className="events-grid">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} baseColor="#837e61" width={250} height={250} />
                            ))}
                        </Container>
                    ) : passEventos.length === 0 ? (
                        <p className="events-empty">Nenhum evento passado encontrado.</p>
                    ) : (
                        <Container className="events-grid">
                            {passEventos.map((evento: any) => (
                                <motion.div
                                    key={evento.id}
                                    className="event-card"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="event-img-wrapper">
                                        <img src={evento.coverImgUrl} className="event-img" alt="" />
                                    </div>

                                    <div className="event-info">
                                        <h3 className="event-title">{evento.title}</h3>
                                        <p className="event-desc">{evento.description}</p>

                                        <p className="event-date">
                                            <em>
                                                {evento.location.city}/{evento.location.state} • {evento.startDate.toLocaleDateString("pt-BR")}
                                                {evento.startDate.getTime() !== evento.endDate.getTime() &&
                                                    ` à ${evento.endDate.toLocaleDateString("pt-BR")}`}
                                            </em>
                                        </p>

                                        {isLogged && (
                                            <motion.button
                                                className="button-cancel btn event-delete"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(evento.id)}
                                            >
                                                Excluir
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Container>
                    )}
                </section>
            </Container>

            <FooterNG></FooterNG>
        </>
    );
}

export default EventsByCountry