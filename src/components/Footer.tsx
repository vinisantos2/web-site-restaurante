const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:divide-x divide-gray-400 dark:divide-gray-600 gap-8">
        {/* Área do Restaurante */}
        <div className="md:w-1/2 pr-0 md:pr-8">
          <h4 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-300">Lanchonete XYZ</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Telefone:</strong>{' '}
              <a href="tel:+5575999999999" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                (75) 99999-9999
              </a>
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:contato@lanchonete.com" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                contato@lanchonete.com
              </a>
            </li>
            <li>
              <strong>Endereço:</strong> Rua Exemplo, 123 - Centro, Feira de Santana - BA
            </li>
            <li>Atendimento de segunda a sábado, das 10h às 22h.</li>
          </ul>
        </div>

        {/* Área do Desenvolvedor */}
        <div className="md:w-1/2 pl-0 md:pl-8 text-sm text-center md:text-right">
          <p className="mb-2">&copy; 2025 Vinícius Santos. Todos os direitos reservados.</p>
          <ul className="flex md:justify-end justify-center flex-wrap gap-4">
            <li>
              <a
                href="https://www.linkedin.com/in/marcus-santos-2a5717143/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/vinisantos2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://vs-webeapps.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                Portfólio
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5575999913645?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-600 dark:hover:text-green-400"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="tel:+557599991365"
                className="hover:underline hover:text-red-600 dark:hover:text-red-400"
              >
                Ligue agora
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
