import axios from "axios"

const api = axios.create({
    baseURL: "https://catfact.ninja"
})

export async function getFact(){
    try{
        const response = await api.get("/fact")
        return response.data
    }catch(err: any){
        console.error("Erro ao buscar um fato: ", err.message)
        throw err
    }
}