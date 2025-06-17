"use client"

import { useEffect, useState } from "react"
import { auth } from "@/src/firebase/firebaseConfig"
import { User } from "firebase/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PerfilAdmin() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [])

  if (!user) return <p className="text-gray-500">Carregando perfil...</p>

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Perfil do Administrador</h1>

      <div className="bg-white rounded shadow p-6 max-w-md border border-gray-200">
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-4">
          <strong>UID:</strong> {user.uid}
        </p>
        {user.metadata?.creationTime && (
          <p className="mb-4">
            <strong>Conta criada em:</strong>{" "}
            {format(new Date(user.metadata.creationTime), "dd/MM/yyyy 'às' HH:mm", {
              locale: ptBR,
            })}
          </p>
        )}
        {user.metadata?.lastSignInTime && (
          <p className="mb-4">
            <strong>Último login:</strong>{" "}
            {format(new Date(user.metadata.lastSignInTime), "dd/MM/yyyy 'às' HH:mm", {
              locale: ptBR,
            })}
          </p>
        )}
      </div>
    </section>
  )
}
