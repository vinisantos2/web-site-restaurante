import { Title } from '../components/Title'

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="py-20 px-4 
        bg-gradient-to-r from-white to-yellow-100 
        dark:from-gray-900 dark:to-gray-800 
        transition-opacity duration-1000"
    >
      <div className="max-w-5xl mx-auto">
        <Title
          title="Sobre Nós"
          subtitle="Conheça nossa história e paixão pela gastronomia"
          center
          
        />
        <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mt-6 text-justify">
          Nossa lanchonete nasceu do amor pela boa comida e pela vontade de criar um ambiente acolhedor para todos.
          Com ingredientes frescos e um cardápio variado, servimos lanches preparados com carinho e sabor autêntico.
          Estamos há anos oferecendo experiências deliciosas para nossos clientes, sempre com atendimento atencioso e um sorriso no rosto.
        </p>
      </div>
    </section>
  )
}
