"use client"

import { useState, useEffect } from "react"
import { Endereco } from "@/src/types/Endereco"
import { useAuthRedirectCliente } from "@/src/hooksCliente/useAuthRedirectCliente"
import {
  salvarEndereco,
  getEnderecosByCliente,
  excluirEndereco,
  atualizarEndereco,
} from "@/src/services/enderecosService"

export default function EnderecosCliente() {
  const { usuario } = useAuthRedirectCliente()
  const [enderecos, setEnderecos] = useState<Endereco[]>([])
  const [form, setForm] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
  })
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Endereco>>({})

  const carregarEnderecos = async () => {
    if (usuario?.uid) {
      const lista = await getEnderecosByCliente(usuario.uid)
      setEnderecos(lista)
    }
  }

  useEffect(() => {
    carregarEnderecos()
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!usuario?.uid) return

    const novoEndereco: Endereco = {
      clienteId: usuario.uid,
      ...form,
    }

    await salvarEndereco(novoEndereco)
    setForm({
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
    })
    carregarEnderecos()
  }

  const handleExcluir = async (id: string) => {
    await excluirEndereco(id)
    carregarEnderecos()
  }

  const startEditar = (endereco: Endereco) => {
    setEditandoId(endereco.id!)
    setEditForm(endereco)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const salvarEdicao = async () => {
    if (editandoId) {
      await atualizarEndereco(editandoId, editForm)
      setEditandoId(null)
      setEditForm({})
      carregarEnderecos()
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Seus Endereços</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" className="border p-2 rounded" />
        <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" className="border p-2 rounded" />
        <input name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" className="border p-2 rounded" />
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border p-2 rounded" />
        <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" className="border p-2 rounded" />
        <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento (opcional)" className="border p-2 rounded" />
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Cadastrar Endereço
      </button>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Endereços cadastrados:</h3>
      {enderecos.length === 0 ? (
        <p>Nenhum endereço cadastrado ainda.</p>
      ) : (
        <ul className="space-y-2">
          {enderecos.map((endereco) => (
            <li key={endereco.id} className="border p-3 rounded">
              {editandoId === endereco.id ? (
                <div className="grid grid-cols-2 gap-2">
                  <input name="rua" value={editForm.rua || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <input name="numero" value={editForm.numero || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <input name="bairro" value={editForm.bairro || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <input name="cidade" value={editForm.cidade || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <input name="estado" value={editForm.estado || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <input name="complemento" value={editForm.complemento || ""} onChange={handleEditChange} className="border p-1 rounded" />
                  <button onClick={salvarEdicao} className="bg-green-600 text-white px-2 py-1 rounded">Salvar</button>
                  <button onClick={() => setEditandoId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    {endereco.rua}, {endereco.numero} - {endereco.bairro}, {endereco.cidade} - {endereco.estado}
                    {endereco.complemento && ` (${endereco.complemento})`}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditar(endereco)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleExcluir(endereco.id!)} className="text-red-600 hover:underline">Excluir</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
