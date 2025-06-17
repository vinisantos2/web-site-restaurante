'use client'

import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CarrinhoHeaderButton from './CarrinhoHeaderButton'
import LoginButtonHeader from './LoginHeaderButton'

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
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft
            size={24}
            className="text-blue-900 dark:text-white transition-colors duration-300"
          />
          <span className="text-2xl font-bold text-blue-900 dark:text-white tracking-wide cursor-pointer select-none">
            Lanchonet XYZ
          </span>
        </Link>

        {topicos.length > 0 && (
          <nav className="hidden md:flex gap-6 text-sm font-semibold
            text-blue-900 dark:text-blue-400
            "
          >
            {topicos.map((topico) => (
              <button
                key={topico}
                onClick={() => scrollToTopico(topico)}
                className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors cursor-pointer select-none"
                type="button"
              >
                {topico}
              </button>
            ))}
            <LoginButtonHeader />
            <CarrinhoHeaderButton />

          </nav>
        )}
      </div>
    </header>
  )
}
