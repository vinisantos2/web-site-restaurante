import { loginWithEmail } from '@/src/firebase/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    // Verifica se já está logado
    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace('/admin/homeAdmin')
            }
        })

        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!camposValidos()) return
        try {
            await loginWithEmail(email, senha)
            router.push("/admin/homeAdmin")
        } catch (e) {
            toast.error("Erro ao fazer login. Verifique os dados.")
            console.log(e)
        }
    }

    const camposValidos = () => {
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Digite um e-mail válido.')
            return false
        }

        if (senha.length < 5) {
            toast.error('Senha deve ter pelo menos 5 caracteres.')
            return false
        }

        return true
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Área Administrativa</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
