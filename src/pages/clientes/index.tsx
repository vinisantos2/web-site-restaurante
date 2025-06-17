'use client'

import { useRouter } from 'next/navigation'
import { auth } from '@/src/firebase/firebaseConfig'
import HeaderCliente from '@/src/componentsCliente/HeaderCliente'
import { useAuthRedirectCliente } from '@/src/hooksCliente/useAuthRedirectCliente'
import Loading from '@/src/componentsAdmin/Loading'
import { useEffect, useState } from 'react'
import { Pedido } from '@/src/types/Pedido'
import { getPedidosByCliente } from '@/src/services/pedidos/getPedidosByCliente'
import PerfilCliente from '@/src/componentsCliente/PerfilCliente'
import EnderecosCliente from '@/src/componentsCliente/EnderecosCliente'
import PedidosCliente from '@/src/componentsCliente/PedidosCliente'

type Aba = "perfil" | "enderecos" | "pedidos";

export default function ClienteDashboard() {
  const router = useRouter()
  const { usuario, loading } = useAuthRedirectCliente()
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [carregandoPedidos, setCarregandoPedidos] = useState(true)
  const [abaAtiva, setAbaAtiva] = useState<Aba>("perfil")

  useEffect(() => {
    if (usuario) {
      getPedidosByCliente(usuario.uid).then((res) => {
        setPedidos(res)
        setCarregandoPedidos(false)
      })
    }
  }, [usuario])

  if (loading || carregandoPedidos) return <Loading />
  if (!usuario) return null

  const renderConteudo = () => {
    switch (abaAtiva) {
      case "perfil":
        return <PerfilCliente usuario={usuario} />
      case "enderecos":
        return <EnderecosCliente />
      case "pedidos":
        return <PedidosCliente pedidos={pedidos} />
    }
  }

  return (
    <>
      <HeaderCliente
        userName={usuario.nome}
        onLogout={() => {
          auth.signOut()
          router.push("/clientes/login")
        }}
      />

      <div className="flex max-w-5xl mx-auto mt-8">
        {/* Menu lateral */}
        <aside className="w-48 bg-gray-100 rounded p-4 space-y-2">
          <button
            onClick={() => setAbaAtiva("perfil")}
            className={`block w-full text-left p-2 rounded ${abaAtiva === "perfil" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          >
            Perfil
          </button>
          <button
            onClick={() => setAbaAtiva("enderecos")}
            className={`block w-full text-left p-2 rounded ${abaAtiva === "enderecos" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          >
            Endereços
          </button>
          <button
            onClick={() => setAbaAtiva("pedidos")}
            className={`block w-full text-left p-2 rounded ${abaAtiva === "pedidos" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          >
            Pedidos
          </button>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 bg-white p-6 ml-6 rounded shadow">
          {renderConteudo()}
        </main>
      </div>
    </>
  )
}
