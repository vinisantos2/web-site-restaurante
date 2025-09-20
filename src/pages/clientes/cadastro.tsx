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
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleCadastro}
        className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl space-y-5 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Cadastro de Cliente
        </h2>

        {erro && (
          <p className="text-red-600 dark:text-red-400 text-center">{erro}</p>
        )}

        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Cadastrar
        </button>

        <button
          onClick={() => router.push("/clientes/login")}
          type="button"
          className="w-full bg-gray-900 dark:bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          Já tenho conta
        </button>
      </form>
    </div>
  )
}
