"use client"

import { useEffect, useState } from "react"
import { Pedido, StatusPedido } from "@/src/types/Pedido"
import { listarPedidos, excluirPedido, editarPedido } from "@/src/services/pedidosService"
import Loading from "../Loading"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [statusEdicao, setStatusEdicao] = useState<Record<string, StatusPedido>>({})

  useEffect(() => {
    fetchPedidos()
  }, [])

  async function fetchPedidos() {
    setLoading(true)
    const lista = await listarPedidos()
    setPedidos(lista)
    const estadosIniciais: Record<string, StatusPedido> = {}
    lista.forEach(p => estadosIniciais[p.id] = p.status)
    setStatusEdicao(estadosIniciais)
    setLoading(false)
  }

  async function handleExcluir(id: string) {
    const confirmar = confirm("Tem certeza que deseja excluir este pedido?")
    if (!confirmar) return

    await excluirPedido(id)
    await fetchPedidos()
  }

  async function handleAtualizarStatus(pedido: Pedido) {
    const novoStatus = statusEdicao[pedido.id]
    if (novoStatus === pedido.status) return // evita atualização desnecessária

    await editarPedido(pedido.id, {
      ...pedido,
      status: novoStatus,
    })

    await fetchPedidos()
  }

  if (loading) return <Loading />

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => {
            const total = pedido.itens.reduce(
              (soma, item) => soma + item.preco * item.quantidade,
              0
            )

            return (
              <li
                key={pedido.id}
                className="bg-white shadow rounded p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
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
                    <div className="flex items-center mt-1 gap-2">
                      <select
                        value={statusEdicao[pedido.id]}
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
                        onClick={() => handleAtualizarStatus(pedido)}
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
          })}
        </ul>
      )}
    </section>
  )
}
