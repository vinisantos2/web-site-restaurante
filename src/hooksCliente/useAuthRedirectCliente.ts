// src/hooks/useAuthRedirectCliente.ts
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/src/firebase/firebaseConfig"
import { Usuario } from "../types/Usuario"
import { buscarUsuario } from "../services/usuarioService"

export function useAuthRedirectCliente() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/clientes/login")
        setUsuario(null)
        setLoading(false)
        return
      }

      try {
        const dadosUsuario = await buscarUsuario(firebaseUser.uid)
        if (!dadosUsuario || dadosUsuario.tipo !== "cliente") {
          router.replace("/clientes/login")
        } else {
          setUsuario(dadosUsuario)
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error)
        router.replace("/clientes/login")
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  return { usuario, loading }
}
