// src/hooks/useAuthRedirectAdmin.ts
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/src/firebase/firebaseConfig"
import { Usuario } from "../types/Usuario"
import { buscarUsuario } from "../services/usuarioService"


export function useAuthRedirectAdmin() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/admin/login")
        setUsuario(null)
        setLoading(false)
        return
      }

      try {
        const dadosUsuario = await buscarUsuario(firebaseUser.uid)

        if (!dadosUsuario || dadosUsuario.tipo !== "admin") {
          router.replace("/admin/login")
        } else {
          setUsuario(dadosUsuario)
          router.replace("/admin/")
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        router.replace("/admin/login")
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  return { usuario, loading }
}
