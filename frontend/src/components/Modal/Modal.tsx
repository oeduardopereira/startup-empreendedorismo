import React from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
    const [category, setCategory] = React.useState("");
    const [merchant, setMerchant] = React.useState("");
    const [date, setDate] = React.useState("");
    const [status, setStatus] = React.useState<"VERIFICADO" | "PENDENTE">("PENDENTE");
    const [amount, setAmount] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!category || !merchant || !date || !amount) {
            alert("Preencha todos os campos!");
            return;
        }
        onSubmit({
            category,
            merchant,
            date,
            status,
            amount: parseFloat(amount),
        });
        // Limpa o formulário
        setCategory("");
        setMerchant("");
        setDate("");
        setStatus("PENDENTE");
        setAmount("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[16px] shadow-2xl w-[500px] p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-dark-green font-bold text-[24px]">Adicionar Despesa</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-dark-green transition-all duration-100"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Categoria */}
                    <div>
                        <label className="block text-dark-green font-semibold mb-2">
                            Categoria
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Ex: Alimentação, Transporte..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:border-dark-green transition-all duration-100"
                        />
                    </div>

                    {/* Estabelecimento */}
                    <div>
                        <label className="block text-dark-green font-semibold mb-2">
                            Estabelecimento / Fonte
                        </label>
                        <input
                            type="text"
                            value={merchant}
                            onChange={(e) => setMerchant(e.target.value)}
                            placeholder="Ex: Mercado Extra, Enel..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:border-dark-green transition-all duration-100"
                        />
                    </div>

                    {/* Data */}
                    <div>
                        <label className="block text-dark-green font-semibold mb-2">
                            Data
                        </label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Ex: 24 Out, 2024"
                            className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:border-dark-green transition-all duration-100"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-dark-green font-semibold mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "VERIFICADO" | "PENDENTE")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:border-dark-green transition-all duration-100"
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="VERIFICADO">Verificado</option>
                        </select>
                    </div>

                    {/* Valor */}
                    <div>
                        <label className="block text-dark-green font-semibold mb-2">
                            Valor
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex: 150.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:border-dark-green transition-all duration-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-dark-green font-medium rounded-[12px] hover:bg-gray-100 transition-all duration-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-dark-green text-white font-medium rounded-[12px] hover:bg-main-green transition-all duration-100"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
