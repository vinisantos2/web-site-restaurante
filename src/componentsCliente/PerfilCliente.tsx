import { Usuario } from "../types/Usuario";

export default function PerfilCliente({ usuario }: { usuario: Usuario }) {
  return (
    <>
      <h2 className="text-2xl font-bold">Bem-vindo, {usuario.nome}</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Telefone:</strong> {usuario.telefone}</p>
    </>
  )
}