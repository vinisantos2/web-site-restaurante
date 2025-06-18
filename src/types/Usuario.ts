// types/usuario.ts

import { Endereco } from "./Endereco"

export type TipoUsuario = 'cliente' | 'admin'

export type Usuario = {
    uid: string
    nome: string
    email: string
    telefone: string
    tipo?: TipoUsuario
    criadoEm?: Date
    endereco?: Array<Endereco>
}