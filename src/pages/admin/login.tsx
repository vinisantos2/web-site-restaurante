"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/src/firebase/firebaseConfig"
import Loading from "@/src/componentsAdmin/Loading"
import { buscarUsuario } from "@/src/services/usuarioService"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(true)

  // Verifica se já está logado e se é admin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const usuario = await buscarUsuario(firebaseUser.uid)
          if (usuario?.tipo === "admin") {
            router.replace("/admin")
          } else {
            toast.error("Acesso negado. Apenas administradores podem entrar.")
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

  const camposValidos = () => {
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Digite um e-mail válido.")
      return false
    }
    if (senha.length < 5) {
      toast.error("Senha deve ter pelo menos 5 caracteres.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!camposValidos()) return
    setLoading(true)

    try {
      const result = await signInWithEmailAndPassword(auth, email, senha)
      const usuario = await buscarUsuario(result.user.uid)

      if (usuario?.tipo === "admin") {
        router.push("/admin")
      } else {
        toast.error("Você não tem permissão para acessar esta área.")
        auth.signOut()
      }
    } catch (e) {
      console.error(e)
      toast.error("Erro ao fazer login. Verifique os dados.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-300 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-yellow-200">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-2">Lanchonete XYZ</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">Acesso exclusivo para administradores</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="senha"
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition shadow-sm"
          >
            Entrar
          </button>
        </form>

        {loading && <Loading />}
      </div>
    </div>
  )
}
