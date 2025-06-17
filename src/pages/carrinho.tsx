"use client"
import Link from "next/link"
import { useCart } from "../contexts/CartContext"
import CardViewCarrinho from "../components/CardViewCarrinho"
import HeaderBack from "../components/HeaderBack"

export default function CarrinhoPage() {
  const { itens } = useCart()

  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  return (
    <>
      <HeaderBack />

      <div className="p-4 max-w-xl mx-auto">

        <h1 className="text-2xl mb-4">Seu Carrinho</h1>

        {itens.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <>
            <ul>
              {itens.map((item) => <CardViewCarrinho key={item.id} itemCarrinho={item} />)}
            </ul>

            <div className="mt-4">
              <p className="text-lg font-bold">Total: R$ {total.toFixed(2)}</p>
              <Link href="/clientes/finalizarPedido">
                <button className="bg-green-600 text-white p-2 mt-2 rounded">Finalizar Pedido</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
