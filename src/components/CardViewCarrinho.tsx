import { useCart } from "../contexts/CartContext"
import { ItemCarrinho } from "../types/itemCarrinho"

export default function CardViewCarrinho({ itemCarrinho }: { itemCarrinho: ItemCarrinho }) {
  const { alterarQuantidade, remover } = useCart()

  return (
    <li key={itemCarrinho.id} className="mb-4 border-b pb-4">
      <div className="flex items-center justify-between">
        {/* Imagem e informações do item */}
        <div className="flex items-center gap-4">
          {itemCarrinho.imagem && (
            <img
              src={itemCarrinho.imagem}
              alt={itemCarrinho.nome}
              className="w-12 h-12 rounded-full object-cover border"
            />
          )}
          <div>
            <h2 className="font-medium text-gray-800">{itemCarrinho.nome}</h2>
            <p className="text-sm text-gray-600">
              R$ {itemCarrinho.preco.toFixed(2)} x {itemCarrinho.quantidade}
            </p>
          </div>
        </div>

        {/* Controles de quantidade */}
    
        <div className="flex gap-2 items-center">
          <button
            onClick={() => alterarQuantidade(itemCarrinho.id, itemCarrinho.quantidade - 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{itemCarrinho.quantidade}</span>
          <button
            onClick={() => alterarQuantidade(itemCarrinho.id, itemCarrinho.quantidade + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
          <button
            onClick={() => remover(itemCarrinho.id)}
            className="text-red-500 text-sm"
          >
            Remover
          </button>
        </div>
      </div>
    </li>
  )
}
