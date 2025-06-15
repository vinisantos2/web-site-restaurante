import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Faz upload de um arquivo para o Firebase Storage e retorna a URL.
 * @param file Arquivo de imagem a ser enviado.
 * @param path Caminho opcional (ex: "imagens/prato123.jpg")
 */
export async function uploadFileToFirebase(file: File, path?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = path || `imagens/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Erro no upload:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  try {
    const path = extractPathFromUrl(imageUrl)
    const imageRef = ref(storage, path)
    await deleteObject(imageRef)
    console.log("Imagem antiga removida com sucesso.")
  } catch (error) {
    console.warn("Erro ao remover imagem antiga:", error)
  }
}


function extractPathFromUrl(url: string): string {
  const match = decodeURIComponent(url).match(/\/o\/(.*?)\?alt=/)
  if (!match || !match[1]) throw new Error("Caminho inválido")
  return match[1]
}