import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc
} from "firebase/firestore"
import { db } from "@/src/firebase/firebaseConfig"
import { Endereco } from "@/src/types/Endereco"
import { updateDoc } from "firebase/firestore"

const enderecosCollection = collection(db, "enderecos")

export async function salvarEndereco(endereco: Endereco) {
  await addDoc(enderecosCollection, endereco)
}

export async function getEnderecosByCliente(clienteId: string): Promise<Endereco[]> {
  const q = query(enderecosCollection, where("clienteId", "==", clienteId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Endereco[]
}

export async function excluirEndereco(id: string) {
  const docRef = doc(db, "enderecos", id)
  await deleteDoc(docRef)
}



export async function atualizarEndereco(id: string, endereco: Partial<Endereco>) {
  const ref = doc(db, "enderecos", id)
  await updateDoc(ref, endereco)
}
