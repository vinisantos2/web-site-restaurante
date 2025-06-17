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
    getDoc,
} from "firebase/firestore"
import { CardapioProduto } from "../types/cardapio"
import { db } from "../firebase/firebaseConfig"

const colRef = collection(db, "cardapio")

export function listenToCardapio(callback: (cards: CardapioProduto[]) => void) {
    return onSnapshot(colRef, (snapshot) => {
        const cards = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as CardapioProduto),
        }))
        callback(cards)
    })
}

export async function addCardapio(card: CardapioProduto) {
    return await addDoc(colRef, card)
}

export async function deleteCardapio(id: string) {
    return await deleteDoc(doc(db, "cardapio", id))
}

export async function updateCardapio(id: string, updates: Partial<CardapioProduto>) {
    return await updateDoc(doc(db, "cardapio", id), updates)
}

export async function getCardapioOnce(): Promise<CardapioProduto[]> {
    const snapshot = await getDocs(colRef)
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CardapioProduto),
    }))
}

export async function getCardapioById(id: string): Promise<CardapioProduto | null> {
    try {
        const docRef = doc(db, "cardapio", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...(docSnap.data() as CardapioProduto), id };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar cardápio por ID:", error);
        return null;
    }
}
