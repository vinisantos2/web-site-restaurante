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
import { Usuario } from '../types/Usuario'

const collectionRef = collection(db, 'clientes')

export const salvarCliente = async (cliente: Usuario) => {
  const novoCliente = {
    ...cliente,
    createdAt: Timestamp.now(),
  }
  const docRef = await addDoc(collectionRef, novoCliente)
  return docRef.id
}

export const atualizarCliente = async (id: string, cliente: Usuario) => {
  const docRef = doc(db, 'clientes', id)
  await updateDoc(docRef, cliente as any)
}

export const deletarCliente = async (id: string) => {
  const docRef = doc(db, 'clientes', id)
  await deleteDoc(docRef)
}
