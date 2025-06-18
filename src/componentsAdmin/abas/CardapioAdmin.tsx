import { CardapioProduto } from "@/src/types/cardapio";
import { useEffect, useState } from "react";
import CardViewCardapioAdm from "../CardViewCardapioAdm";
import { useRouter } from "next/navigation";
import { deleteCardapio, getCardapioOnce } from "@/src/services/cardapioService";
import Loading from "../Loading";

// src/componentsAdmin/Abas/CardapioAdmin.tsx
export default function CardapioAdmin() {
    const [cards, setCards] = useState<CardapioProduto[]>([]);
    const [filteredCards, setFilteredCards] = useState<CardapioProduto[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    function handleSearch(term: string) {
        setSearch(term);
        const lower = term.toLowerCase();
        const filtered = cards.filter(
            (card) =>
                card.title.toLowerCase().includes(lower) ||
                card.topico.toLowerCase().includes(lower)
        );
        setFilteredCards(filtered);
    }

    function edit(id: string) {
        router.push(`/admin/editCardapio/${id}`);
    }





    async function fetchData() {
        const data = await getCardapioOnce();
        setCards(data);
        setFilteredCards(data);
        setLoading(false)
    }


    async function deleted(id: string) {
        const confirmar = confirm("Tem certeza que deseja excluir este cardápio?");
        if (!confirmar) return;

        await deleteCardapio(id);
        await fetchData(); // Atualiza lista após exclusão
    }

    if (loading) return <Loading />;

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">Cardápio</h1>

            <main className="max-w-2xl mx-auto px-4 py-8 mt-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar por título ou tópico..."
                        className="flex-grow border border-gray-300 rounded px-4 py-2 shadow-sm mr-4"
                    />
                    <button
                        onClick={() => router.push("/admin/novoCardapio")}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                        aria-label="Adicionar novo cardápio"
                    >
                        + Novo Cardápio
                    </button>
                </div>

                {filteredCards.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum cardápio encontrado.</p>
                ) : (
                    filteredCards.map((card) => (
                        <CardViewCardapioAdm
                            key={card.id}
                            card={card}
                            edit={() => edit(card.id!)}
                            deleted={() => deleted(card.id!)}
                        />
                    ))
                )}
            </main>
        </section>
    );
}