import {createContext} from 'react'
import type { Account, addBudget } from './types/requests';
import type { despesa } from './types/types';

export interface NavBarContext {
    setPage: (page:number) => void;
    logout: () => void;
    deleteAccount: () => void;
}

export const navBarContext = createContext<NavBarContext>({
    setPage: () => {},
    logout: () => {},
    deleteAccount: () => {}
});

export interface LoginContext {
    login: (email:string, password:string) => void;
    register: (value:boolean) => void;
}

export const loginContext = createContext<LoginContext>({
    login: () => {},
    register: () => {}
});

export interface RegisterContext {
    checkFamily: (familyName:string) => void;
    register: (name:string, email:string, password:string, familyName:string) => void;
    familyAvaiability: boolean;
}

export const registerContext = createContext<RegisterContext>({
    checkFamily: () => {},
    register: () => {},
    familyAvaiability: false
})

export interface InsertionTableContext {
    openForm: (value: boolean, isGasto: boolean) => void;
    viewExpense: (expense: despesa) => void;
}

export const insertionTableContext = createContext<InsertionTableContext>({
    openForm: () => {},
    viewExpense: () => {}
})

export interface FormContext {
    closeForm: (value: boolean) => void;
    sendInfo: (info: addBudget) => void;
}

export const formContext = createContext<FormContext>({
    closeForm: () => {},
    sendInfo: () => {},
})

export interface DropContext {
    sendFreq: (data: string) => void;
    sendType: (data: string) => void;
}

export const dropContext = createContext<DropContext>({
    sendFreq: () => {},
    sendType: () => {}
})

export interface BodyContext {
    updateAccount: (acc: Account) => void;
}

export const bodyContext = createContext<BodyContext>({
    updateAccount: () => {}
})

export interface ExpenseContext {
    close: () => void;
    expire: (id: string) => void;
    deleteBudget: (id: string) => void;
}

export const expenseContext = createContext<ExpenseContext>({
    close: () => {},
    expire: () => {},
    deleteBudget: () => {}
})

export interface TableContext {
    viewExpense: (expense: despesa) => void;
}

export const tableContext = createContext<TableContext>({
    viewExpense: () => {}
})