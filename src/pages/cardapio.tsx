import { useEffect, useState } from 'react'
import { Title } from '../components/Title'
import { CardView } from '../components/CardView'
import HeaderBack from '../components/HeaderBack'
import { CardViewProps } from '../types/cardapio'
import { getCardapioOnce } from '../services/cardapioService'

export default function Cardapio() {
  const [cardapio, setCardapio] = useState<CardViewProps[]>([])
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

  return (
    <>
      <HeaderBack />

      <main className="py-20 px-4 bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Title title="Cardápio" subtitle="Confira nossas deliciosas opções" center />

          {loading ? (
            <p className="text-center mt-12">Carregando...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {cardapio.length > 0 ? (
                cardapio.map((item, idx) => (
                  <CardView
                    key={item.id ?? idx}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    valor={item.valor}
                  />
                ))
              ) : (
                <p className="text-center col-span-full">Nenhum item encontrado.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
