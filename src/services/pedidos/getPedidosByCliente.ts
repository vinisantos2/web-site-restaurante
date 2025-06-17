import { db } from "@/src/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Pedido } from "@/src/types/Pedido";

export async function getPedidosByCliente(clienteId: string): Promise<Pedido[]> {
  const pedidosRef = collection(db, "pedidos");
  const q = query(pedidosRef, where("clienteId", "==", clienteId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Pedido));
}
