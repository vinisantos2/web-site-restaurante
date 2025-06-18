"use client"

import { Pedido, StatusPedido } from "../types/Pedido"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

type Props = {
  pedido: Pedido
  handleAtualizarStatus: (pedido: Pedido) => void
  handleExcluir: (id: string) => void
}

export default function CardViewPedidoAdm({
  pedido,
  handleExcluir,
  handleAtualizarStatus,
}: Props) {
  const [statusEdicao, setStatusEdicao] = useState<Record<string, StatusPedido>>({})

  console.log(pedido)

  const total = pedido.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  return (
    <li
      key={pedido.id}
      className="bg-white shadow rounded p-4 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-gray-600">
            <strong>Data:</strong>{" "}
            {format(new Date(pedido.criadoEm), "dd 'de' MMMM 'às' HH:mm", {
              locale: ptBR,
            })}
          </p>

          <p className="text-sm text-gray-600">
            <strong>Status atual:</strong> {pedido.status}
          </p>

          <p className="text-sm text-gray-600">
            <strong>Endereço:</strong>{" "}
            {pedido.endereco
              ? `${pedido.endereco.rua}, ${pedido.endereco.numero} - ${pedido.endereco.bairro}, ${pedido.endereco.cidade}`
              : "Não informado"}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            <strong>Cliente:</strong> {pedido.cliente?.nome ?? "Nome não informado"}
          </p>

          {pedido.cliente?.email && (
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {pedido.cliente.email}
            </p>
          )}

          {pedido.cliente?.telefone && (
            <p className="text-sm text-gray-600">
              <strong>Telefone:</strong> {pedido.cliente.telefone}
            </p>
          )}

          <div className="flex items-center mt-3 gap-2">
            <select
              value={statusEdicao[pedido.id] || pedido.status}
              onChange={(e) =>
                setStatusEdicao((prev) => ({
                  ...prev,
                  [pedido.id]: e.target.value as StatusPedido,
                }))
              }
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="pendente">Pendente</option>
              <option value="recebido">Recebido</option>
              <option value="aceito">Aceito</option>
              <option value="em preparo">Em preparo</option>
              <option value="em rota">Em rota</option>
              <option value="finalizado">Finalizado</option>
            </select>

            <button
              onClick={() => {
                const novoStatus = statusEdicao[pedido.id]
                if (novoStatus && novoStatus !== pedido.status) {
                  handleAtualizarStatus({ ...pedido, status: novoStatus })
                }
              }}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Atualizar
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExcluir(pedido.id)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      </div>

      <ul className="text-sm text-gray-700 mb-2">
        {pedido.itens.map((item, idx) => (
          <li key={idx}>
            {item.nome} - {item.quantidade}x R${item.preco.toFixed(2)}
          </li>
        ))}
      </ul>

      <p className="text-sm font-semibold">
        Total: <span className="text-green-600">R${total.toFixed(2)}</span>
      </p>
    </li>
  )
}
