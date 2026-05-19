import api from "../axios";
import * as DTO from "../../types/requests.ts"

// Criar os tipos familia, conte a orçamento 
// equivalente às entidades do banco de dados para facilitar as coisas

export async function createAccount(name: string, email: string, password: string, family: string) {
    const request: DTO.addAccount = {
        username: name,
        email: email,
        password: password,
        family: family
    };

    try {

        const response= await api.post("/v1/account", request);
        return response.data;
    } catch {
        console.log("Erro ao criar conta");
        return -1
    }
}

export async function login(email:string, password:string) {
    const request: DTO.Login = {
        email: email,
        password: password
    }

    try {

        const response = await api.post("/v1/login", request);
        return response.data;

    } catch {
        console.log("Erro ao logar");
        return -1;
    }
}

export async function getAccount(id: string) {
    try {
        const response = await api.get(`/v1/account/${id}`);
        return response.data;
    } catch {
        console.log(`Erro ao encontrar conta de id -> ${id}`);
        return -1
    }
}

export async function getSpents(id:string) {
    try {
        const response = await api.get(`/v1/account/spents/${id}`);
        return response.data;
    } catch {
        console.log(`Erro ao encontrar conta de id -> ${id}`);
        return -1
    }
}

export async function getGains(id:string) {
    try {
        const response = await api.get(`/v1/account/gains/${id}`);
        return response.data;
    } catch {
        console.log(`Erro ao encontrar conta de id -> ${id}`);
        return -1
    }
}

export async function getMonthlySpents(id: string) {
    try {
        const response = await api.get(`/v1/account/month-spents/${id}`);
        return response.data;
    } catch {
        console.log(`Erro ao encontrar conta de id -> ${id}`);
        return -1
    }
}

export async function deleteAccount(id: string) {
    try {
        const response = await api.delete(`/v1/account/${id}`);
        return response.status;
    } catch {
        console.log(`Erro ao encontrar conta de id -> ${id}`);
        return -1
    }
}