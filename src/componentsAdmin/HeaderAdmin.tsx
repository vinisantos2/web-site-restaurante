// components/HeaderAdmin.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface HeaderAdminProps {
  userName: string;
  onLogout: () => void;
}

export default function HeaderAdmin({ userName, onLogout }: HeaderAdminProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-xl font-bold">Painel Administrativo</div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {userName}
          <svg
            className={`w-4 h-4 transform ${menuOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
            <button
              onClick={() => {
                router.push("/admin/novoCardapio");
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Novo Cardápio
            </button>
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
