'use client'

import { useEffect, useState } from 'react'
import { Title } from '../components/Title'
import { CardViewCardapio } from '../components/CardView'
import HeaderBack from '../components/HeaderBack'
import { CardapioProduto } from '../types/cardapio'
import { getCardapioOnce } from '../services/cardapioService'

export default function Cardapio() {
  const [cardapio, setCardapio] = useState<CardapioProduto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCardapio() {
      try {
        const data = await getCardapioOnce()
        setCardapio(data)
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCardapio()
  }, [])

  const cardapioPorTopico = cardapio.reduce((acc, item) => {
    const topico = item.topico || 'Outros'
    if (!acc[topico]) acc[topico] = []
    acc[topico].push(item)
    return acc
  }, {} as Record<string, CardapioProduto[]>)

  const topicosUnicos = Object.keys(cardapioPorTopico)

  return (
    <>
      <HeaderBack topicos={topicosUnicos} />

      <main className="py-20 px-4 min-h-screen
        bg-gradient-to-r from-yellow-50 to-yellow-100
        dark:from-gray-900 dark:to-gray-800
        transition-colors duration-500
      ">
        <div className="max-w-6xl mx-auto">
          <Title
            title="Cardápio"
            subtitle="Confira nossas deliciosas opções"
            center
          />

          {loading ? (
            <p className="text-center mt-12 text-gray-700 dark:text-gray-300">
              Carregando...
            </p>
          ) : (
            <>
              {topicosUnicos.map((topico) => (
                <section
                  key={topico}
                  id={topico}
                  className="mt-16 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold
                    mb-6 border-b pb-2
                    text-gray-800 dark:text-gray-100
                    border-yellow-400 dark:border-yellow-600
                  ">
                    {topico}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cardapioPorTopico[topico].map((item) => (
                      <CardViewCardapio
                        key={item.id}
                        produto={item}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  )
}
