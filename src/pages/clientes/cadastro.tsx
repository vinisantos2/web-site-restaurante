"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/src/firebase/firebaseConfig"
import { useRouter } from "next/navigation"
import { Usuario } from "@/src/types/Usuario"
import { salvarUsuario } from "@/src/services/usuarioService"


export default function CadastroClientePage() {
  const router = useRouter()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
      const user = userCredential.user

      const novoUsuario: Usuario = {
        uid: user.uid,
        nome,
        email,
        tipo: "cliente",
        criadoEm: new Date(),
        telefone,
      }

      await salvarUsuario(novoUsuario)

      router.push("/clientes/login")
    } catch (error: any) {
      console.error(error)
      setErro(error.message)
    }
  }

  return (
    <form onSubmit={handleCadastro} className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Cliente</h2>

      {erro && <p className="text-red-600">{erro}</p>}

      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="tel"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Cadastrar
      </button>
    </form>
  )
}
