export type StatusPedido = "pendente" | "recebido" | "aceito" | "em preparo" | "em rota" | "finalizado"

export type ItemPedido = {
    nome: string
    preco: number
}

export type Pedido = {
    id: string
    clienteId: string
    itens: { nome: string; quantidade: number; preco: number }[]
    status: StatusPedido
    criadoEm: string // ou Date
}
