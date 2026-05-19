export type addBudgetResponse = {
    budgetId: string
}

export type addBudget = {
    authorId: string
    description: string,
    type: string,
    frequency: string,
    value: number
}

export type addAccount = {
    username: string,
    email: string,
    password: string,
    family: string
}

export type addAccountResponse = {
    account_id: string
}

export type addFamily = {
    name: string
}

export type addFamilyResponse = {
    id: string
}

export type editAccount = {
    name: string,
    password: string
}

export type editFamily = {
    name: string
}

export type Budget = {
    budget_id: string,
    description: string,
    type: string,
    frequency: string,
    date: string,
    value: number,
    authorId: string
}

export type Account = {
    id: string,
    username: string,
    email: string,
    balance: number,
    family_name: string,
    familyId: string,
    budgets: Budget[]
}

export type Family = {
    id: string,
    name: string,
    family_balance: number,
    relatives: Account[]
}

export type Login = {
    email: string,
    password: string
}

export type CategoricBalance = {
    hobby: number,
    occasional: number,
    essential: number,
    delivery: number,
    streaming: number
}
