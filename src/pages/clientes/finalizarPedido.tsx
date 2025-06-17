'use client'

import { useCart } from '@/src/contexts/CartContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HeaderBack from '../../components/HeaderBack'
import { criarPedido } from '../../services/pedidosService'
import { Pedido } from '../../types/Pedido'
import { useAuthRedirectCliente } from '@/src/hooksCliente/useAuthRedirectCliente'
import { getEnderecosByCliente } from '@/src/services/enderecosService'
import { Endereco } from '@/src/types/Endereco'

export default function FinalizarPedidoPedidoPage() {
  const { itens, limparCarrinho } = useCart()
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enderecos, setEnderecos] = useState<Endereco[]>([])

  const router = useRouter()
  const { usuario, loading } = useAuthRedirectCliente()

  useEffect(() => {
    if (usuario) {
      getEnderecosByCliente(usuario.uid).then(setEnderecos)
    }
  }, [usuario])

  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  const handleEnviar = async () => {
    if (!enderecoSelecionado.trim()) {
      alert('Por favor, selecione um endereço de entrega.')
      return
    }

    setEnviando(true)

    try {
      const pedido: Omit<Pedido, 'id'> = {
        clienteId: usuario!.uid,
        itens,
        status: 'pendente',
        criadoEm: new Date().toISOString(),
      }

      await criarPedido(pedido)
      limparCarrinho()
      alert('Pedido enviado com sucesso!')
      router.push('/')
    } catch (error) {
      console.error("Erro ao enviar pedido:", error)
      alert('Erro ao enviar pedido. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        Carregando...
      </div>
    )
  }

  if (itens.length === 0) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl mb-4">Pedido</h1>
        <p>Seu carrinho está vazio.</p>
      </div>
    )
  }

  return (
    <>
      <HeaderBack />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl mb-4">Finalizar Pedido</h1>

        <ul className="mb-4">
          {itens.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.nome} x {item.quantidade}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p className="font-bold mb-4">Total: R$ {total.toFixed(2)}</p>

        <div className="space-y-3">
          <select
            value={enderecoSelecionado}
            onChange={(e) => setEnderecoSelecionado(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={enviando}
          >
            <option value="">Selecione um endereço de entrega *</option>
            {enderecos.map((endereco) => (
              <option
                key={endereco.id}
                value={`${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`}
              >
                {endereco.rua}, {endereco.numero} - {endereco.bairro}, {endereco.cidade}
              </option>
            ))}
          </select>

          <button
            onClick={handleEnviar}
            disabled={enviando}
            className={`w-full p-3 rounded text-white ${enviando ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {enviando ? 'Enviando...' : 'Enviar Pedido'}
          </button>
        </div>
      </div>
    </>
  )
}
