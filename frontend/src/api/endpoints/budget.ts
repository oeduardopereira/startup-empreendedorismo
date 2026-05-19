import type { addBudget } from "../../types/requests.ts";
import api from "../axios.ts";

export async function createBudget(info: addBudget) {
    

    try {
        const body = {
            description: info.description,
            value: info.value,
            type: info.type,
            frequency: info.frequency
        }
        const response = await api.post(`/v1/budget/${info.authorId}`, body);
        return response.data;
    } catch {
        console.log("Erro ao criar budget.")
    }


}

export async function getBudget(id: string) {
    try {
        const response = await api.get(`/v1/budget/${id}`);
        return response.data;
    } catch {
        console.log(`Erro ao achar budget de id -> ${JSON.stringify(id)}`)
    }
}

export async function expire(id: string) {
    try {
        const response = await api.delete(`/v1/budget/expire/${id}`)
        console.log(response.status);
        return response.status;
    } catch {
        console.log(`Erro ao achar budget de id -> ${JSON.stringify(id)}`)
    }
}

export async function deleteBudget(id: string) {
    try {
        const response = await api.delete(`/v1/budget/${id}`)
        console.log(response.status);
        return response.status;
    } catch {
        console.log(`Erro ao achar budget de id -> ${JSON.stringify(id)}`)
    }
}