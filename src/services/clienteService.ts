// services/clienteService.ts
import { db } from '@/src/firebase/firebaseConfig'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { Cliente } from '../types/Cliente'

const collectionRef = collection(db, 'clientes')

export const salvarCliente = async (cliente: Cliente) => {
  const novoCliente = {
    ...cliente,
    createdAt: Timestamp.now(),
  }
  const docRef = await addDoc(collectionRef, novoCliente)
  return docRef.id
}

export const listarClientes = async (): Promise<Cliente[]> => {
  const snapshot = await getDocs(collectionRef)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Cliente[]
}

export const atualizarCliente = async (id: string, cliente: Cliente) => {
  const docRef = doc(db, 'clientes', id)
  await updateDoc(docRef, cliente as any)
}

export const deletarCliente = async (id: string) => {
  const docRef = doc(db, 'clientes', id)
  await deleteDoc(docRef)
}
