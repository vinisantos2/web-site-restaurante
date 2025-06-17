import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/src/firebase/firebaseConfig"
import { Pedido } from "@/src/types/Pedido"

const pedidosCollection = collection(db, "pedidos")

// Criar novo pedido
export async function criarPedido(pedido: Omit<Pedido, "id">) {
  const pedidoParaSalvar = {
    ...pedido,
    criadoEm: Timestamp.fromDate(new Date(pedido.criadoEm)),
  }

  const docRef = await addDoc(pedidosCollection, pedidoParaSalvar)
  return docRef.id
}

// Listar todos os pedidos
export async function listarPedidos(): Promise<Pedido[]> {
  const snapshot = await getDocs(pedidosCollection)
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data()

    return {
      id: docSnap.id,
      clienteId: data.clienteId,
      status: data.status,
      itens: data.itens,
      criadoEm: data.criadoEm.toDate().toISOString(), // ou .toDate() se quiser tipo Date
    }
  })
}

// Editar pedido
export async function editarPedido(id: string, pedido: Omit<Pedido, "id">) {
  const docRef = doc(db, "pedidos", id)
  const pedidoAtualizado = {
    ...pedido,
    criadoEm: Timestamp.fromDate(new Date(pedido.criadoEm)),
  }
  await updateDoc(docRef, pedidoAtualizado)
}

// Excluir pedido
export async function excluirPedido(id: string) {
  const docRef = doc(db, "pedidos", id)
  await deleteDoc(docRef)
}
