import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { deleteEvent, getAllEventsByCountry } from "../services/api";
import { Card, CardImg, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import NavbarNG from "../components/NavbarNG";
import "../styles/events.css"
import { motion } from "motion/react"
import { useNavigate } from "react-router";

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
            alert("Evento excluída.");
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
            <NavbarNG></NavbarNG>
            <Container>
                <h1 className="text-center my-3">
                    <strong>Eventos</strong>
                </h1>
                <div>
                    <h2 className="text-center"><strong>Próximos eventos</strong></h2>
                    <Container className="d-flex flex-wrap my-3">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton className="mx-1" baseColor="#837e61" key={i} width={200} height={200} />
                            ))
                        ) : (
                            proxEventos.map((evento: any) => (
                                <Card key={evento.id} className="corpo  mx-3">
                                    <CardImg src={evento.coverImgUrl} className="foto" />
                                    <Card.Body>
                                        <Card.Title><strong>{evento.title}</strong></Card.Title>
                                        <div>{evento.description}</div>
                                        <div className="my-2">
                                            <em>
                                                {evento.location.city}/{evento.location.state} - {evento.startDate.toLocaleDateString("pt-BR")}
                                                {evento.startDate.getTime() !== evento.endDate.getTime() &&
                                                    ` à ${evento.endDate.toLocaleDateString("pt-BR")}`}
                                            </em>
                                        </div>
                                        {isLogged && (
                                            <div>
                                                <motion.button className="button-cancel btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { handleDelete(evento.id) }}>Excluir evento</motion.button>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Container>
                    <h2 className="text-center"><strong>Eventos passados</strong></h2>
                    <Container className="d-flex flex-wrap my-3">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton className="mx-1" baseColor="#837e61" key={i} width={200} height={200} />
                            ))
                        ) : (
                            passEventos.map((evento: any) => (
                                <Card key={evento.id} className="corpo mx-3">
                                    <CardImg src={evento.coverImgUrl} className="foto" />
                                    <Card.Body>
                                        <Card.Title><strong>{evento.title}</strong></Card.Title>
                                        <div>{evento.description}</div>
                                        <div className="my-2">
                                            <em>
                                                {evento.location.city}/{evento.location.state} - {evento.startDate.toLocaleDateString("pt-BR")}
                                                {evento.startDate.getTime() !== evento.endDate.getTime() &&
                                                    ` à ${evento.endDate.toLocaleDateString("pt-BR")}`}
                                            </em>
                                        </div>
                                        {isLogged && (
                                            <div>
                                                <motion.button className="button-cancel btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { handleDelete(evento.id) }}>Excluir evento</motion.button>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Container>
                </div>
            </Container>
        </>
    )
}

export default EventsByCountry