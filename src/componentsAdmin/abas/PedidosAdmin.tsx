"use client"

import { useEffect, useState } from "react"
import { Pedido, StatusPedido } from "@/src/types/Pedido"
import { listarPedidos, excluirPedido, editarPedido } from "@/src/services/pedidosService"
import Loading from "../Loading"
import CardViewPedidoAdm from "../CardViewPedidosAdm"

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

            return <CardViewPedidoAdm key={pedido.id} pedido={pedido}
              handleAtualizarStatus={handleAtualizarStatus}
              handleExcluir={handleExcluir}

            />
          })}
        </ul>
      )}
    </section>
  )
}
