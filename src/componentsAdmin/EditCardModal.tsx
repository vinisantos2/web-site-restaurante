// components/EditCardModal.tsx
import React from "react"
import { CardapioProduto } from "@/src/types/cardapio"
import CardapioForm from "./CardapioForm"

type Props = {
  isOpen: boolean
  onClose: () => void
  card: CardapioProduto
  onChange: (card: CardapioProduto) => void
  onSave: () => void
}

export default function EditCardModal({ isOpen, onClose, card, onChange, onSave }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Cardápio</h2>
        <CardapioForm
          card={card}
          onChange={onChange}
          onSubmit={() => {
            onSave()
            onClose()
          }}
          buttonLabel="Salvar alterações"
        />
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
