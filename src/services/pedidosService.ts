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

// 🔵 Criar novo pedido
export async function criarPedido(pedido: Omit<Pedido, "id" | "cliente">) {
  const pedidoParaSalvar = {
    ...pedido,
    criadoEm: Timestamp.fromDate(new Date(pedido.criadoEm)),
  }

  const docRef = await addDoc(pedidosCollection, pedidoParaSalvar)
  return docRef.id
}

// 🟢 Listar todos os pedidos
export async function listarPedidos(): Promise<Pedido[]> {
  const snapshot = await getDocs(pedidosCollection)

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Pedido, "id">

    return {
      id: docSnap.id,
      clienteId: data.clienteId,
      endereco: data.endereco,
      itens: data.itens,
      status: data.status,
      // AQUI ESTÁ A MUDANÇA:
      criadoEm: data.criadoEm instanceof Timestamp
        ? data.criadoEm.toDate() // Apenas converta para Date, não para string
        : (data.criadoEm instanceof Date // Se já for Date, use-o
          ? data.criadoEm
          : new Date(data.criadoEm) // Se for string (improvável vindo do Firestore), converta para Date
        ),
      cliente: data.cliente, // 🔸 Placeholder, caso você busque os dados do cliente depois
    }
  })
}

// 🟠 Editar pedido
export async function editarPedido(id: string, pedido: Omit<Pedido, "id" | "cliente">) {
  const docRef = doc(db, "pedidos", id)
  const pedidoAtualizado = {
    ...pedido,
    criadoEm: Timestamp.fromDate(new Date(pedido.criadoEm)),
  }
  await updateDoc(docRef, pedidoAtualizado)
}

// 🔴 Excluir pedido
export async function excluirPedido(id: string) {
  const docRef = doc(db, "pedidos", id)
  await deleteDoc(docRef)
}
