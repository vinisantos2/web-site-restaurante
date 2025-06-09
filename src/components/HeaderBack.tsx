'use client'

import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'

type HeaderBackProps = {
  topicos?: string[]
}

export default function HeaderBack({ topicos = [] }: HeaderBackProps) {
  const router = useRouter()

  const scrollToTopico = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="text-blue-900 cursor-pointer hover:text-blue-500 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={24} />
          <span className="text-2xl font-bold tracking-wide">Lanchonete XYZ</span>
        </button>

        {topicos.length > 0 && (
          <nav className="hidden md:flex gap-4 text-sm font-semibold text-blue-900">
            {topicos.map((topico) => (
              <button
                key={topico}
                onClick={() => scrollToTopico(topico)}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                {topico}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
