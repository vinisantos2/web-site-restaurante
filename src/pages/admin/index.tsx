"use client"

import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CardViewProps } from "@/src/types/cardapio"
import { auth } from "@/src/firebase/firebaseConfig"
import { addCardapio, deleteCardapio, listenToCardapio, updateCardapio } from "@/src/services/cardapioService"
import CardapioForm from "@/src/pages/admin/componentsAdmin/CardapioForm"
import CardViewAdm from "@/src/pages/admin/componentsAdmin/CardViewAdm"
import EditCardModal from "./componentsAdmin/EditCardModal"


export default function HomeAdmin() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [cards, setCards] = useState<CardViewProps[]>([])
    const [newCard, setNewCard] = useState<CardViewProps>({
        topico: '',
        title: "",
        description: "",
        imageUrl: "",
        valor: 0,
    })
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cardToEdit, setCardToEdit] = useState<CardViewProps>({
        topico: '',
        title: "",
        description: "",
        imageUrl: "",
        valor: 0,
        id: "",
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (!u) router.replace("/admin/login")
            else setUser(u)
        })
        return () => unsubscribe()
    }, [router])

    useEffect(() => {
        if (!user) return
        const unsubscribe = listenToCardapio((cards) => {
            setCards(cards)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [user])

    async function handleAddCard() {
        const { topico, title, description, imageUrl } = newCard
        if (!title || !description) {
            toast.error("Preencha todos os campos!")
            return
        }
        try {
            await addCardapio(newCard)
            toast.success("Card criado!")
            setNewCard({ topico: '', title: "", description: "", imageUrl: "", valor: 0 })
        } catch (error) {
            toast.error("Erro ao criar card")
        }
    }

    async function handleDeleteCard(id?: string) {
        if (!id) return
        try {
            await deleteCardapio(id)
            toast.success("Card deletado!")
        } catch {
            toast.error("Erro ao deletar card")
        }
    }

    async function handleSaveEdit() {
        if (!cardToEdit.id) return
        try {
            await updateCardapio(cardToEdit.id, {
                topico: cardToEdit.topico,
                title: cardToEdit.title,
                description: cardToEdit.description,
                imageUrl: cardToEdit.imageUrl,
                valor: cardToEdit.valor,
            })
            toast.success("Card atualizado!")
        } catch {
            toast.error("Erro ao atualizar card")
        }
    }

    async function handleLogout() {
        try {
            await signOut(auth)
            toast.success("Você saiu!")
            router.replace("/admin/login")
        } catch {
            toast.error("Erro ao sair")
        }
    }

    if (loading) return <p>Carregando...</p>

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Olá, {user?.email}</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Sair
                </button>
            </div>

            {/* Novo Cardápio */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Novo cardápio</h2>
                <CardapioForm
                    card={newCard}
                    onChange={setNewCard}
                    onSubmit={handleAddCard}
                    buttonLabel="Adicionar cardápio"
                />
            </section>

            {/* Lista de Cards */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Cardápio Atual</h2>
                {cards.length === 0 && <p>Nenhum card cadastrado</p>}
                <ul>
                    {cards.map((card) => <CardViewAdm
                        card={card}
                        deleted={() => handleDeleteCard(card.id)}
                        edit={() => {
                            setCardToEdit(card)
                            setIsModalOpen(true)
                        }} key={card.id} />)}

                </ul>
            </section>

            <EditCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                card={cardToEdit}
                onChange={setCardToEdit}
                onSave={handleSaveEdit}
            />
        </div>
    )
}
