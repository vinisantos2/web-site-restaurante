import { ItemCarrinho } from "../types/itemCarrinho"

const STORAGE_KEY = "carrinho"

export const cartService = {
  getCarrinho(): ItemCarrinho[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  salvarCarrinho(itens: ItemCarrinho[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens))
  },

  adicionarItem(itens: ItemCarrinho[], novo: ItemCarrinho): ItemCarrinho[] {
    const existente = itens.find((item) => item.id === novo.id)
    if (existente) {
      return itens.map((item) =>
        item.id === novo.id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    } else {
      return [...itens, { ...novo, quantidade: 1 }]
    }
  },

  alterarQuantidade(itens: ItemCarrinho[], id: string, quantidade: number): ItemCarrinho[] {
    if (quantidade <= 0) {
      return itens.filter((item) => item.id !== id)
    }
    return itens.map((item) =>
      item.id === id ? { ...item, quantidade } : item
    )
  },

  removerItem(itens: ItemCarrinho[], id: string): ItemCarrinho[] {
    return itens.filter((item) => item.id !== id)
  },

  limparCarrinho(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  }
}
