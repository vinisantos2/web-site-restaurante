export default function HeroSection() {
  return (
    <section
      id="início"
      className="relative flex items-center justify-center text-white h-screen px-4"
      style={{
        backgroundImage: "url('/images/site/capa.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradiente escuro no fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide text-amber-400 drop-shadow-2xl">
          Bem-vindo à Lanchonete XYZ
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md">
          Saboreie lanches irresistíveis e uma variedade incrível de drinks.
        </p>
        <a
          href="/cardapio"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
        >
          Ver Cardápio
        </a>
      </div>
    </section>
  );
}
