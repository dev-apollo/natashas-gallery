import axios from "axios";

axios.defaults.baseURL = "https://raspberrypi.tail68f0d8.ts.net/api/v1";

export const getInfosAboutMe = () => axios.get("/sections/about/me");
export const getInfosAboutArt = () => axios.get("/sections/about/art");
export const getInfosNextEvent = () => axios.get("/event/next");
export const getAllArts = () => axios.get("/arts");
export const getAllSocials = () => axios.get("/socials");
export const getAllEvents = () => axios.get("/events");
export const getEmail = () => axios.get("/form");
export const getAllEventsByCountry = (country: string) => axios.get(`/events/location/${encodeURIComponent(country)}`);

export const deleteArt = (id: string) => {
    const token = sessionStorage.getItem("authorization");
    axios.delete(`/art/${id}`, {
        headers: {
            "Authorization": token
        }
    });
}

export const deleteEvent = (id: string) => {
    const token = sessionStorage.getItem("authorization");
    axios.delete(`/event/${id}`, {
        headers: {
            "Authorization": token
        }
    });
}

export const updateArt = (id: string, data: FormData) => {
    const token = sessionStorage.getItem("authorization");
    return axios.put(`/art/${id}`, data, {
        headers: {
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updateEmailDestino = (novoEmail: string) => {
  const token = sessionStorage.getItem("authorization");
  return axios.put("/form", { email: novoEmail }, {
    headers: { Authorization: token }
  });
};

export const updateAbout = (id: string, data: FormData) => {
    const token = sessionStorage.getItem("authorization");
    return axios.put(`/sections/about/${id}`, data, {
        headers: {
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        }
    });
}

export const updateAllSocials = (socials: any) => {
    const token = sessionStorage.getItem("authorization")
    return axios.put("/social", { socials }, {
        headers: {
            Authorization: token
        }
    });
}

export const createArt = (data: FormData) => {
    const token = sessionStorage.getItem("authorization");
    return axios.post("/art", data, {
        headers: {
            "Authorization": token
        }
    });
}

export const createEvent = (data: FormData) => {
    const token = sessionStorage.getItem("authorization");
    return axios.post("/event", data, {
        headers: {
            "Authorization": token
        }
    });
}

export const sendEmail = (data: FormData) => {
  return axios.post("/contato", data, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "text"
  });
}