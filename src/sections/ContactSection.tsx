import { Title } from "../components/Title";

export function ContactSection() {
  return (
    <section id='contato' className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Title title="Fale Conosco" subtitle="Entre em contato com nosso time" center />

        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-4">
            <input type="text" placeholder="Seu nome" className="w-full p-3 rounded-xl border border-gray-300" />
            <input type="email" placeholder="Seu e-mail" className="w-full p-3 rounded-xl border border-gray-300" />
            <textarea placeholder="Sua mensagem" className="w-full p-3 rounded-xl border border-gray-300 h-32" />
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition"
            >
              Enviar
            </button>
          </form>

          <div className="text-gray-700 space-y-4">
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
            <p><strong>Email:</strong> contato@advocaciaexemplo.com</p>
            <p><strong>Endereço:</strong> Av. Central, 123 - Centro, São Paulo - SP</p>
            <p>Atendimento de segunda a sexta, das 9h às 18h.</p>
          </div>
        </div>
      </div>
    </section>
  )
}