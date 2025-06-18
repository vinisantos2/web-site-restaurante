// services/usuarioService.ts
import { db } from "@/src/firebase/firebaseConfig"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { Usuario } from "../types/Usuario"

// Coleção de usuários
const usuariosCollection = collection(db, "usuarios")

// Salvar (ou atualizar) usuário no Firestore
export async function salvarUsuario(usuario: Usuario) {
  try {
    await setDoc(doc(usuariosCollection, usuario.uid), {
      ...usuario,
      criadoEm: usuario.criadoEm, 
    })
  } catch (error) {
    console.error("Erro ao salvar usuário:", error)
    throw error
  }
}

// Buscar usuário por UID
export async function buscarUsuario(uid: string): Promise<Usuario | null> {
  try {
    const docSnap = await getDoc(doc(usuariosCollection, uid))
    if (!docSnap.exists()) return null

    const data = docSnap.data()
    return {
      uid: data.uid,
      nome: data.nome,
      email: data.email,
      tipo: data.tipo,
      telefone: data.telefone,
      criadoEm: new Date(data.criadoEm),
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    throw error
  }
}
