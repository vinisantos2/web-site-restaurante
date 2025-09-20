"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/src/firebase/firebaseConfig"
import Loading from "@/src/componentsAdmin/Loading"
import { buscarUsuario } from "@/src/services/usuarioService"
import toast from "react-hot-toast"

export default function LoginClientePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(true)

  // Verifica se já está logado e se é cliente
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const usuario = await buscarUsuario(firebaseUser.uid)
          if (usuario?.tipo === "cliente") {
            router.replace("/clientes")
          } else {
            toast.error("Acesso negado. Logue como cliente.")
            auth.signOut()
          }
        } catch (error) {
          console.error("Erro ao buscar usuário:", error)
          toast.error("Erro ao verificar permissão.")
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")

    try {
      await signInWithEmailAndPassword(auth, email, senha)
      router.push("/clientes")
    } catch (error: any) {
      console.error(error)
      setErro("E-mail ou senha inválidos.")
    }
  }

  // Evita mostrar a tela de login enquanto está verificando
  if (loading) return <Loading />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl space-y-5 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Login do Cliente
        </h2>

        {erro && (
          <p className="text-red-600 dark:text-red-400 text-center">{erro}</p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
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
          Entrar
        </button>

        <button
          onClick={() => router.push("/clientes/cadastro")}
          type="button"
          className="w-full bg-gray-900 dark:bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          Cadastre-se
        </button>
      </form>
    </div>
  )
}
