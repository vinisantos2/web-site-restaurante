import { useCart } from "../contexts/CartContext"
import { CardapioProduto } from "../types/cardapio"

type Props = {
  produto: CardapioProduto
}

export function CardViewCardapio({ produto }: Props) {
  const { adicionar } = useCart()

  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.valor)

  const handleAdicionar = () => {
    if (produto.disponivel) {
      adicionar({
        id: produto.id ? produto.id : "",
        nome: produto.title,
        preco: produto.valor,
        imagem: produto.imageUrl,
      })
    }
  }

  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-transform duration-200
      ${produto.disponivel ? "hover:scale-105 hover:shadow-xl" : "opacity-60 cursor-not-allowed"}
    `}
    >
      <img
        src={produto.imageUrl}
        alt={produto.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {!produto.disponivel && (
        <div className="absolute top-0 left-0 w-full h-48 bg-black opacity-60 flex items-center justify-center">
          <span className="bg-white text-black text-sm font-semibold px-4 py-1 rounded shadow-lg">
            Indisponível
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{produto.title}</h3>
        <p className="text-sm text-gray-600">{produto.description}</p>
        <span className="text-lg font-bold text-amber-500">{valorFormatado}</span>

        <button
          onClick={handleAdicionar}
          disabled={!produto.disponivel}
          className={`mt-2 px-4 py-2 rounded-lg font-semibold text-white transition  cursor-pointer
            ${produto.disponivel ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
