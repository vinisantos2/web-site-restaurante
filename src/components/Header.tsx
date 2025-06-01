import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menu = [
  { nome: "Início", url: "/" },
  
  { nome: "Sobre", url: "#sobre" },
  { nome: "Contato", url: "#contato" },
  { nome: "Cardapio", url: "cardapio" },
  { nome: "Depoimentos", url: "#depoimentos" },

]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-900 tracking-wide cursor-pointer">
            Lanchonet XYZ
          </span>
        </Link>

        {/* Botão Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-900 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <nav
          className={`${menuOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent left-0 top-full w-full md:w-auto px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none`}
        >
          {menu.map((item) => (
            <Link key={item.nome} href={`${item.url}`}>
              <span className="text-gray-700 hover:text-blue-700 transition cursor-pointer border-b-2 border-transparent hover:border-blue-700 pb-1 block text-lg md:text-base">
                {item.nome}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}