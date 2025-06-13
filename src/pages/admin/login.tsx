"use client";
import { loginWithEmail } from "@/src/firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!camposValidos()) return;
    try {
      await loginWithEmail(email, senha);
      router.push("/admin");
    } catch (e) {
      toast.error("Erro ao fazer login. Verifique os dados.");
      console.log(e);
    }
  };

  const camposValidos = () => {
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Digite um e-mail válido.");
      return false;
    }

    if (senha.length < 5) {
      toast.error("Senha deve ter pelo menos 5 caracteres.");
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-300 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-yellow-200">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-2">
          Lanchonete XYZ
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Acesso exclusivo para administradores
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
