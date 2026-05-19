export type despesa = {
    id: string
    tipo: string
    descricao: string
    valor: number
    autor: string
    freq: string
}

export type dropProperties = {
    visible: boolean,
    x: number,
    y: number
}

export type infoPanel = {
    visible: boolean,
    x: number,
    y: number
}

export const brlFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

export type GraphColor = {
    background: string,
    border: string
}

export type MonthlySpent = {
    accountId: string,
    username: string,
    monthlySpents: number[]
}