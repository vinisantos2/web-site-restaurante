// pages/admin/index.tsx
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirectAdmin } from "../../hoohsAdmin/useAuthRedirectAdmin";
import { auth } from "@/src/firebase/firebaseConfig";
import HeaderAdmin from "@/src/componentsAdmin/HeaderAdmin";
import Loading from "@/src/componentsAdmin/Loading";
import PedidosAdmin from "@/src/componentsAdmin/abas/PedidosAdmin";
import CardapioAdmin from "@/src/componentsAdmin/abas/CardapioAdmin";
import PerfilAdmin from "@/src/componentsAdmin/abas/PerfilAdmin";

export default function HomeAdmin() {
  const { loading } = useAuthRedirectAdmin();
  const router = useRouter();
  const [aba, setAba] = useState<"pedidos" | "cardapio" | "perfil">("pedidos");

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col py-6 px-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <button
          onClick={() => setAba("pedidos")}
          className={`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${aba === "pedidos" ? "bg-gray-700" : ""}`}
        >
          Pedidos
        </button>
        <button
          onClick={() => setAba("cardapio")}
          className={`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${aba === "cardapio" ? "bg-gray-700" : ""}`}
        >
          Cardápio
        </button>
        <button
          onClick={() => setAba("perfil")}
          className={`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${aba === "perfil" ? "bg-gray-700" : ""}`}
        >
          Perfil
        </button>
        <button
          onClick={() => {
            auth.signOut();
            router.push("/admin/login");
          }}
          className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 min-h-screen">
        <HeaderAdmin
          userName={auth.currentUser?.email || ""}
          onLogout={() => {
            auth.signOut();
            router.push("/admin/login");
          }}
        />

        <main className="p-8">
          {aba === "pedidos" && <PedidosAdmin />}
          {aba === "cardapio" && <CardapioAdmin />}
          {aba === "perfil" && <PerfilAdmin />}
        </main>
      </div>
    </div>
  );
}
