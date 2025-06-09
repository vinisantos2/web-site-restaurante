// pages/admin/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardViewProps } from "@/src/types/cardapio";
import { getCardapioOnce, deleteCardapio } from "@/src/services/cardapioService";
import CardViewAdm from "./componentsAdmin/CardViewAdm";
import { useAuthRedirect } from "./hoohsAdmin/useAuthRedirect";
import Loading from "./componentsAdmin/Loading";

export default function HomeAdmin() {
  const [cards, setCards] = useState<CardViewProps[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardViewProps[]>([]);
  const [search, setSearch] = useState("");
  const { user, loading } = useAuthRedirect();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  async function fetchData() {
    const data = await getCardapioOnce();
    setCards(data);
    setFilteredCards(data);
  }

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

  async function deleted(id: string) {
    const confirmar = confirm("Tem certeza que deseja excluir este cardápio?");
    if (!confirmar) return;

    await deleteCardapio(id);
    await fetchData(); // Atualiza lista após exclusão
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 space-y-6">
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
          <CardViewAdm
            key={card.id}
            card={card}
            edit={() => edit(card.id!)}
            deleted={() => deleted(card.id!)}
          />
        ))
      )}
    </section>
  );
}
