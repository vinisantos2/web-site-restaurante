// src/types/cardapio.ts
export type CardapioProduto = {
    id?: string
    title: string
    topico: string
    description: string
    imageUrl: string
    valor: number
    disponivel: boolean
}