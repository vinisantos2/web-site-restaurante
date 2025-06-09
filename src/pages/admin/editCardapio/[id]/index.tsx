import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardapioForm from "../../componentsAdmin/CardapioForm";
import { getCardapioById, updateCardapio } from "@/src/services/cardapioService";
import { CardViewProps } from "@/src/types/cardapio";
import Loading from "../../componentsAdmin/Loading";

export default function EditCardapio() {
  const router = useRouter();
  const { id } = router.query;

  const [card, setCard] = useState<CardViewProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const cardId = id;

    async function fetchCard() {
      const data = await getCardapioById(cardId);
      if (data) {
        setCard({ ...data, id: cardId });
      } else {
        alert("Cardápio não encontrado");
        router.push("/admin");
      }
      setLoading(false);
    }

    fetchCard();
  }, [id, router]);

  async function handleUpdate(updatedCard: CardViewProps) {
    if (!id || typeof id !== "string") return;

    await updateCardapio(id, updatedCard);
    alert("Cardápio atualizado com sucesso!");
    router.push("/admin");
  }

  if (loading || !card) return <Loading />;

  return (
    <section className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Editar Cardápio</h2>
      <CardapioForm
        card={card}
        onChange={setCard}
        onSubmit={handleUpdate}
        buttonLabel="Salvar Alterações"
      />
    </section>
  );
}
