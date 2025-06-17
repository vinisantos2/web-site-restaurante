"use client"

import { onAuthStateChanged, User } from "firebase/auth"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import Loading from "../componentsAdmin/Loading"

export default function LoginButtonHeader() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span className="text-sm text-gray-700">
            Bem-vindo, {user.displayName || user.email?.split('@')[0]}
          </span>
          <Link
            href="/clientes"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Painel
          </Link>
        </>
      ) : (
        <Link
          href="/clientes/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Entrar
        </Link>
      )}
    </div>
  )
}
