'use client'

import { useState } from 'react'
import { Cliente } from '../types/Cliente'

type Props = {
  initialData?: Cliente
  onSubmit: (cliente: Cliente) => void
}

export default function FormCliente({ initialData, onSubmit }: Props) {
  const [cliente, setCliente] = useState<Cliente>(
    initialData ?? {
      nome: '',
      telefone: '',
      obs: '',
      endereco: {
        cep: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        referencia: '',
      },
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith('endereco.')) {
      const key = name.split('.')[1]
      setCliente((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [key]: value,
        },
      }))
    } else {
      setCliente((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(cliente)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Cadastro de Cliente</h2>

      <div>
        <label className="block font-medium">Nome</label>
        <input name="nome" value={cliente.nome} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label className="block font-medium">Telefone</label>
        <input name="telefone" value={cliente.telefone} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label className="block font-medium">Observações</label>
        <textarea name="obs" value={cliente.obs} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      <h3 className="text-lg font-semibold mt-4">Endereço</h3>

      {['cep', 'cidade', 'bairro', 'rua', 'numero', 'referencia'].map((field) => (
        <div key={field}>
          <label className="block font-medium capitalize">{field}</label>
          <input
            name={`endereco.${field}`}
            value={(cliente.endereco as any)[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Salvar Cliente
      </button>
    </form>
  )
}
