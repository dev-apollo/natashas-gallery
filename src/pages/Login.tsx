import { Form, Container } from "react-bootstrap"
import NavbarNG from "../components/NavbarNG"
import { useState } from "react"
import { getAdminToken } from "../services/firebase";
import { useNavigate } from "react-router";
import "../styles/login.css"
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
            <NavbarNG />

            <Container className="login-container">
                {isLogged ? (
                    <motion.div 
                        className="login-card glass-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="login-title">Logout</h1>

                        <motion.button 
                            className="login-button logout-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleLogout}
                        >
                            Sair
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="login-card glass-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="login-title">Login</h1>

                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-4">
                                <Form.Label className="login-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={infos.email}
                                    className="login-input"
                                    onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                                    placeholder="exemplo@email.com"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="login-label">Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={infos.senha}
                                    className="login-input"
                                    onChange={(e) => setInfos({ ...infos, senha: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                />
                            </Form.Group>

                            <motion.button 
                                className="login-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                            >
                                Entrar
                            </motion.button>
                        </Form>
                    </motion.div>
                )}
            </Container>
        </>
    )
}

export default Login