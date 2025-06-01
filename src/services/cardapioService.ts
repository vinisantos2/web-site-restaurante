// src/services/cardapioService.ts
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    getFirestore,
    getDocs,
} from "firebase/firestore"
import { CardViewProps } from "../types/cardapio"
import { db } from "../firebase/firebaseConfig"

const colRef = collection(db, "cardapio")

export function listenToCardapio(callback: (cards: CardViewProps[]) => void) {
    return onSnapshot(colRef, (snapshot) => {
        const cards = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as CardViewProps),
        }))
        callback(cards)
    })
}

export async function addCardapio(card: CardViewProps) {
    return await addDoc(colRef, card)
}

export async function deleteCardapio(id: string) {
    return await deleteDoc(doc(db, "cardapio", id))
}

export async function updateCardapio(id: string, updates: Partial<CardViewProps>) {
    return await updateDoc(doc(db, "cardapio", id), updates)
}

export async function getCardapioOnce(): Promise<CardViewProps[]> {
    const snapshot = await getDocs(colRef)
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CardViewProps),
    }))
}
