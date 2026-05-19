import api from "../axios.ts";


export async function checkFamily(familyName: string) {
    try {
        const response = await api.get(`/v1/family/check/${familyName}`);
        return response.data.id;
    } catch {
        console.log("Erro na checagem de famílias.")
    }
}

export async function getFamily(familyId: string) {
    try {
        const response = await api.get(`/v1/family/${familyId}`);
        return response.data;
    } catch {
        localStorage.clear();
    }
}

export async function getFamilyMonthlySpents(familyId: string) {
    try {
        const response = await api.get(`/v1/family/month-spents/${familyId}`);
        return response.data;
    } catch {
        console.log("Erro ao pegar dados da família.")
    }
}