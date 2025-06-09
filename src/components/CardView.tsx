import { CardViewProps } from "../types/cardapio";

export function CardView({ title, description, imageUrl, valor, disponivel }: CardViewProps) {
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return (
    <div
      className={`
        relative bg-white rounded-2xl overflow-hidden border border-gray-100
        transition-transform duration-200
        ${disponivel ? "hover:scale-105 hover:shadow-xl" : "opacity-60 cursor-not-allowed"}
      `}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

    
      {!disponivel && (
        <div className="absolute top-0 left-0 w-full h-48 bg-black opacity-60 flex items-center justify-center">
          <span className="bg-white text-black text-sm font-semibold px-4 py-1 rounded shadow-lg">
            Indisponível
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-lg font-bold text-amber-500">{valorFormatado}</span>
      </div>
    </div>
  );
}
