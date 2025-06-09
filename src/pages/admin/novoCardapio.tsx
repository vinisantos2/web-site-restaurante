import CardapioForm from "./componentsAdmin/CardapioForm";
import { CardViewProps } from "@/src/types/cardapio";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthRedirect } from "./hoohsAdmin/useAuthRedirect";
import { addCardapio } from "@/src/services/cardapioService";

export default function NovoCardapio() {
    const router = useRouter();
    const { user, loading } = useAuthRedirect();

    const [newCard, setNewCard] = useState<CardViewProps>({
        topico: "",
        title: "",
        description: "",
        imageUrl: "",
        valor: 0,
        disponivel: true,
    });

    if (loading) return <p>Carregando...</p>;

    async function handleAddCard() {
        if (!newCard.title || !newCard.valor) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        try {
            await addCardapio(newCard);
            alert("Cardápio adicionado com sucesso!");
            router.push("/admin");
        } catch (error) {
            console.error("Erro ao adicionar cardápio:", error);
            alert("Erro ao adicionar cardápio.");
        }
    }

    return (
        <section className="max-w-xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6">Novo cardápio</h2>
            <CardapioForm
                card={newCard}
                onChange={setNewCard}
                onSubmit={handleAddCard}
                buttonLabel="Adicionar cardápio"
            />
        </section>
    );
}
