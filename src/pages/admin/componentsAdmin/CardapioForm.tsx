import React from "react"
import { CardViewProps } from "@/src/types/cardapio"

type Props = {
  card: CardViewProps
  onChange: (card: CardViewProps) => void
  onSubmit: (card: CardViewProps) => void
  buttonLabel: string
}

export default function CardapioForm({ card, onChange, onSubmit, buttonLabel }: Props) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Topico"
        className="border px-3 py-2 rounded w-full"
        value={card.topico}
        onChange={(e) => onChange({ ...card, topico: e.target.value })}
      />
      <input
        type="text"
        placeholder="Título"
        className="border px-3 py-2 rounded w-full"
        value={card.title}
        onChange={(e) => onChange({ ...card, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        className="border px-3 py-2 rounded w-full"
        value={card.description}
        onChange={(e) => onChange({ ...card, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL da imagem"
        className="border px-3 py-2 rounded w-full"
        value={card.imageUrl}
        onChange={(e) => onChange({ ...card, imageUrl: e.target.value })}
      />
      <input
        type="number"
        placeholder="Valor"
        className="border px-3 py-2 rounded w-full"
        value={card.valor}
        onChange={(e) => onChange({ ...card, valor: parseFloat(e.target.value) })}
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={card.disponivel}
          onChange={(e) => onChange({ ...card, disponivel: e.target.checked })}
          className="accent-blue-600 w-5 h-5"
        />
        <span>{card.disponivel ? "Disponível" : "Indisponível"}</span>
      </label>

      <button
        onClick={() => onSubmit(card)}
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
