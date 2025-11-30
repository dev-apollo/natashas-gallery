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
      <NavbarNG></NavbarNG>
      <Container>
        <h1 className="text-center my-3">
          <strong>Contatos</strong>
        </h1>
        <div className="d-flex flex-wrap">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton circle baseColor="#837e61" className="mx-1" width={50} height={50} key={i} />
            ))
          ) : (
            infosSocials.map((social: any) =>
              isLogged ? (
                <i
                  onClick={() => handleUpdate(social)}
                  key={social.type}
                  className={`bi bi-${social.type} mx-1 icone`}
                  style={{ fontSize: "2rem" }}
                ></i>
              ) : (
                <a href={social.link} key={social.type} target="_blank" rel="noreferrer">
                  <i
                    className={`bi bi-${social.type} mx-1 icone`}
                    style={{ fontSize: "2rem" }}
                  ></i>
                </a>
              )
            )
          )}
        </div>
        <FormContacts infosEmail={infosEmail} setInfosEmail={setInfosEmail} handleSendEmail={handleSendEmail} isDisabled={isDisabled}></FormContacts>
        {isLogged && (<Form>
          <Form.Group className="my-3">
            <Form.Label><strong>Email de destino:</strong></Form.Label>
            <Form.Control className="inputs"
              value={emailDestino}
              onChange={(e) => setEmailDestino(e.target.value)}
              type="email"
            ></Form.Control>
          </Form.Group>
          <motion.button type="submit" className="button-ok btn" onClick={handleUpdateDestino} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Alterar destino</motion.button>
        </Form>
        )}
      </Container >
    </>
  )
}

export default Contacts