import { Endereco } from "./Endereco"
import { Usuario } from "./Usuario"

export type StatusPedido = "pendente" | "recebido" | "aceito" | "em preparo" | "em rota" | "finalizado"

export type ItemPedido = {
  nome: string
  quantidade: number
  preco: number
}

export type Pedido = {
  id: string
  clienteId: string
  cliente: Usuario
  endereco: Endereco
  itens: ItemPedido[]
  status: StatusPedido
  criadoEm: Date // Use Date aqui
}
