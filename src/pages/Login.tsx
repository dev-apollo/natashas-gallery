import { Form, Container } from "react-bootstrap"
import NavbarNG from "../components/NavbarNG"
import { useState } from "react"
import { getAdminToken } from "../services/firebase";
import { useNavigate } from "react-router";
import "../styles/contacts.css"
import { motion } from "motion/react"

function Login() {

    const [infos, setInfos] = useState({
        email: "",
        senha: ""
    });

    const navigate = useNavigate();

    const isLogged = sessionStorage.getItem("authorization");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await getAdminToken(infos.email, infos.senha);
            sessionStorage.setItem("authorization", `Bearer ${response.data.idToken}`);
            navigate("/");
        } catch (e) {
            console.error(e);
            alert("Email ou senha incorretos.");
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("authorization");
        navigate("/");
    }

    return (
        <>
            <NavbarNG></NavbarNG>
            <Container>
                {isLogged ? (
                    <>
                        <h1 className="text-center my-3"><strong>Logout</strong></h1>
                        <div className="text-center">
                            <motion.button className="button-ok btn btn-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleLogout}>Sair</motion.button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-center my-3"><strong>Login</strong></h1>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="my-3">
                                <Form.Label><strong>Email</strong></Form.Label>
                                <Form.Control
                                    type="email"
                                    value={infos.email}
                                    className="inputs"
                                    onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                                    placeholder="exemplo@email.com"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label><strong>Senha</strong></Form.Label>
                                <Form.Control
                                    type="password"
                                    value={infos.senha}
                                    className="inputs"
                                    onChange={(e) => setInfos({ ...infos, senha: e.target.value })}
                                    placeholder="•••••••"
                                    required
                                />
                            </Form.Group>
                            <motion.button className="button-ok btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit">Entrar</motion.button>
                        </Form>
                    </>
                )}
            </Container>
        </>
    )
}

export default Login