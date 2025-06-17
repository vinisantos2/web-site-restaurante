import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCardapioById, updateCardapio } from "@/src/services/cardapioService";
import { CardapioProduto } from "@/src/types/cardapio";
import Loading from "@/src/componentsAdmin/Loading";
import CardapioForm from "@/src/componentsAdmin/CardapioForm";
import HeaderAdminBack from "@/src/componentsAdmin/HeaderBackAdmin";

export default function EditCardapio() {
  const router = useRouter();
  const { id } = router.query;

  const [card, setCard] = useState<CardapioProduto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchCard() {
      if (!id || typeof id !== "string") return;
      const data = await getCardapioById(id);
      if (data) {
        setCard({ ...data, id });
      } else {
        alert("Cardápio não encontrado");
        router.push("/admin");
      }
      setLoading(false);
    }

    fetchCard();
  }, [id, router]);

  async function handleUpdate(updatedCard: CardapioProduto) {
    if (!id || typeof id !== "string") return;

    await updateCardapio(id, updatedCard);
    alert("Cardápio atualizado com sucesso!");
    router.push("/admin");
  }

  if (loading || !card) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAdminBack />

      <main className="max-w-xl mx-auto px-4 py-8 mt-6">
        <h2 className="text-2xl font-bold mb-4">Editar Cardápio</h2>
        <CardapioForm
          card={card}
          onChange={setCard}
          onSubmit={handleUpdate}
          buttonLabel="Salvar Alterações"
        />
      </main>
    </div>
  );
}
