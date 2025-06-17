"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { ItemCarrinho } from "../types/itemCarrinho"
import { cartService } from "../services/cartService"

type CartContextType = {
  itens: ItemCarrinho[]
  adicionar: (item: Omit<ItemCarrinho, "quantidade">) => void
  remover: (id: string) => void
  alterarQuantidade: (id: string, quantidade: number) => void
  limparCarrinho: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  useEffect(() => {
    setItens(cartService.getCarrinho())
  }, [])

  useEffect(() => {
    cartService.salvarCarrinho(itens)
  }, [itens])

  const adicionar = (item: Omit<ItemCarrinho, "quantidade">) => {
    const novosItens = cartService.adicionarItem(itens, { ...item, quantidade: 1 })
    setItens(novosItens)
  }

  const remover = (id: string) => {
    const atualizados = cartService.removerItem(itens, id)
    setItens(atualizados)
  }

  const alterarQuantidade = (id: string, quantidade: number) => {
    const atualizados = cartService.alterarQuantidade(itens, id, quantidade)
    setItens(atualizados)
  }

  const limparCarrinho = () => {
    cartService.limparCarrinho()
    setItens([])
  }

  return (
    <CartContext.Provider value={{ itens, adicionar, remover, alterarQuantidade, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider")
  return context
}
