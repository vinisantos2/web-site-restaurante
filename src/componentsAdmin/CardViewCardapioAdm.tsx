import { CardapioProduto } from "../types/cardapio"

export default function CardViewCardapioAdm({ card, edit, deleted }: {
    card: CardapioProduto,
    edit: () => void,
    deleted: () => void
}
) {
    return(
        <li
            className="border rounded p-4 mb-4 flex flex-col md:flex-row items-center"
        >
            <img
                src={card.imageUrl}
                alt={card.title}
                className="w-32 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
                <h3 className="font-bold">{card.title}</h3>
                <p>{card.description}</p>
                <p className="text-sm text-gray-600">Valor: R$ {card.valor.toFixed(2)}</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                    onClick={edit}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition"
                >
                    Editar
                </button>
                <button
                    onClick={deleted}
                    className="bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700 transition"
                >
                    Excluir
                </button>
            </div>
        </li>
    )

}