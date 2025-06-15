import React, { useState } from "react"
import { CardViewProps } from "@/src/types/cardapio"
import ImageUploader from "./ImageUploader"
import { deleteImageFromFirebase, uploadFileToFirebase } from "../firebase/uploadImage"

type Props = {
  card: CardViewProps
  onChange: (card: CardViewProps) => void
  onSubmit: (card: CardViewProps) => void
  buttonLabel: string
}

export default function CardapioForm({ card, onChange, onSubmit, buttonLabel }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = async () => {
    let imageUrl = card.imageUrl

    if (selectedFile) {
      if (card.imageUrl) {
        await deleteImageFromFirebase(card.imageUrl)
      }
      imageUrl = await uploadFileToFirebase(selectedFile)
    }
    onSubmit({ ...card, imageUrl })
  }


  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md border max-w-md mx-auto">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Tópico</label>
        <input
          type="text"
          placeholder="Ex: Bebidas"
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={card.topico}
          onChange={(e) => onChange({ ...card, topico: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          placeholder="Ex: Suco Natural"
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={card.title}
          onChange={(e) => onChange({ ...card, title: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <input
          type="text"
          placeholder="Ex: Feito na hora, com frutas naturais"
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={card.description}
          onChange={(e) => onChange({ ...card, description: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Valor (R$)</label>
        <input
          type="number"
          placeholder="Ex: 9.90"
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={card.valor}
          onChange={(e) => onChange({ ...card, valor: parseFloat(e.target.value) })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={card.disponivel}
          onChange={(e) => onChange({ ...card, disponivel: e.target.checked })}
          className="accent-blue-600 w-5 h-5"
        />
        <span className="text-sm text-gray-700">
          {card.disponivel ? "Disponível" : "Indisponível"}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Imagem do prato</label>

        <ImageUploader onSelect={(file) => setSelectedFile(file)} />

        {card.imageUrl && (
          <img
            src={card.imageUrl}
            alt="Imagem existente"
            className="w-32 h-32 object-cover rounded border"
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-200"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
