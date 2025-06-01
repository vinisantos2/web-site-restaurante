import { CardViewProps } from "../types/cardapio";

export function CardView({ title, description, imageUrl, valor }: CardViewProps) {
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl duration-200">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-lg font-bold text-amber-500">{valorFormatado}</span>
      </div>
    </div>
  );
}
