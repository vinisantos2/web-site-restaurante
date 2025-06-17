import { Pedido } from "@/src/types/Pedido"

export default function PedidosCliente({ pedidos }: { pedidos: Pedido[] }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Seus Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="border p-4 rounded shadow-sm">
              <p><strong>Status:</strong> {pedido.status}</p>
              <p><strong>Data:</strong> {new Date(pedido.criadoEm).toLocaleString()}</p>
              <ul className="mt-2 pl-4 list-disc">
                {pedido.itens.map((item, index) => (
                  <li key={index}>
                    {item.nome} - {item.quantidade}x R$ {item.preco.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
