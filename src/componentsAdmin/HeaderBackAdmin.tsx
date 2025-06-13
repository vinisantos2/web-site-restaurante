// componentsAdmin/HeaderAdminBack.tsx
"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function HeaderAdminBack() {
  const router = useRouter();

  return (
    <header className="w-full bg-gray-900 text-white flex items-center px-6 py-4 shadow-md">
      <button
        onClick={() => router.push("/admin")}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition"
      >
        <ArrowLeft size={20} />
        <span className="text-lg font-medium">Voltar para o Painel</span>
      </button>
    </header>
  );
}
