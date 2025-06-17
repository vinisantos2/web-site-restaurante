'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export default function CarrinhoHeaderButton() {
  const router = useRouter()

  const irParaCarrinho = () => {
    router.push('/carrinho')
  }

  return (
    <button
      onClick={irParaCarrinho}
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-all cursor-pointer"
    >
      <ShoppingCart size={20} />
      Carrinho
    </button>
  )
}
