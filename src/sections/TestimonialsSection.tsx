import { Title } from '../components/Title'

const testimonials = [
  {
    name: 'Mariana Silva',
    feedback:
      'Os lanches são maravilhosos e o atendimento é sempre rápido e simpático. Recomendo demais!',
  },
  {
    name: 'Rafael Costa',
    feedback:
      'Ambiente acolhedor e comida deliciosa. É meu lugar favorito para comer com os amigos.',
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-yellow-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Title title="Depoimentos" subtitle="O que nossos clientes dizem" center />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-200">
              <p className="text-gray-700 italic">"{item.feedback}"</p>
              <p className="text-yellow-900 font-semibold mt-4">- {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
