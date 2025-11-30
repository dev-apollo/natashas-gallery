import { Container, Form } from "react-bootstrap";
import NavbarNG from "../components/NavbarNG";
import FormContacts from "../components/contacts/FormContacts";
import { useEffect, useState } from "react";
import { getAllSocials, getEmail, sendEmail, updateAllSocials, updateEmailDestino } from "../services/api";
import Skeleton from "react-loading-skeleton";
import "../styles/contacts.css"
import { motion } from "motion/react"

function Contacts() {

  const [infosSocials, setInfosSocials] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [infosEmail, setInfosEmail] = useState({
    nome: "",
    email: "",
    assunto: "",
    corpo: ""
  });
  const [emailDestino, setEmailDestino] = useState("");
  const [loading, setLoading] = useState(true);
  const isLogged = sessionStorage.getItem("authorization");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllSocials();
        setInfosSocials(response.data.socials);
        const response2 = await getEmail();
        setEmailDestino(response2.data.email);
      } catch (e: any) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdate = (social: any) => {
    const load = async () => {
      const novoLink = prompt("Digite o novo link da rede social:", social.link);
      if (novoLink === null || novoLink.trim() === "") return;
      const atualizados = infosSocials.map(s => s.type === social.type ? { ...s, link: novoLink } : s);
      try {
        await updateAllSocials(atualizados);
        setInfosSocials(atualizados);
        alert("Rede social atualizada!");
      } catch (e) {
        console.error(e);
        alert("Erro ao atualizar!");
      }
    };
    load();
  };


  const handleUpdateDestino = async (e: any) => {
    e.preventDefault()
    if (!emailDestino.trim()) {
      alert("Digite um email válido!");
      return;
    }
    try {
      await updateEmailDestino(emailDestino);
      alert("Email de destino atualizado!");
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar email de destino!");
    }
  };

  const handleSendEmail = async (e: any) => {
    e.preventDefault()
    setIsDisabled(true);
    if (!infosEmail.nome || !infosEmail.email || !infosEmail.assunto || !infosEmail.corpo) {
      alert("Preencha todos os campos antes de enviar!");
      return;
    }

    const formData = new FormData();
    formData.append("name", infosEmail.nome);
    formData.append("email", infosEmail.email);
    formData.append("subject", infosEmail.assunto);
    formData.append("body", infosEmail.corpo);

    try {
      await sendEmail(formData);
      alert("Email enviado com sucesso!");
      setInfosEmail({
        nome: "",
        email: "",
        assunto: "",
        corpo: ""
      })
    } catch (e) {
      console.error(e);
      alert("Erro ao enviar email!");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <NavbarNG />

      <Container className="contacts-page">

        <motion.div 
          className="contacts-title-wrapper"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="contacts-title">Contatos</h1>
          <div className="contacts-divider"></div>
        </motion.div>

        <motion.div 
          className="contacts-card glass-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="contacts-subtitle">Redes sociais</h3>

          <div className="contacts-socials">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} circle width={50} height={50} baseColor="#837e61" />
              ))
            ) : (
              infosSocials.map((social) =>
                isLogged ? (
                  <i
                    key={social.type}
                    onClick={() => handleUpdate(social)}
                    className={`bi bi-${social.type} social-icon editable`}
                  ></i>
                ) : (
                  <a
                    key={social.type}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={`bi bi-${social.type} social-icon`}></i>
                  </a>
                )
              )
            )}
          </div>
        </motion.div>

        <motion.div 
          className="contacts-card glass-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="contacts-subtitle">Envie uma mensagem</h3>

          <FormContacts 
            infosEmail={infosEmail}
            setInfosEmail={setInfosEmail}
            handleSendEmail={handleSendEmail}
            isDisabled={isDisabled}
          />
        </motion.div>

        {isLogged && (
          <motion.div 
            className="contacts-card glass-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="contacts-subtitle">Configurações do email</h3>

            <Form onSubmit={handleUpdateDestino}>
              <Form.Group className="my-3">
                <Form.Label><strong>Email de destino:</strong></Form.Label>
                <Form.Control
                  className="inputs login-input"
                  value={emailDestino}
                  onChange={(e) => setEmailDestino(e.target.value)}
                  type="email"
                />
              </Form.Group>
              <motion.button 
                type="submit"
                className="button-save"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                Alterar destino
              </motion.button>
            </Form>
          </motion.div>
        )}

      </Container>
    </>
  );
}

export default Contacts