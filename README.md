<h1>Bakashi</h1>

<p>Bem-vindo ao <strong>Bakashi</strong>, um site de streaming de animes inspirado na Crunchyroll. Este projeto visa fornecer uma plataforma para assistir animes online, com uma API desenvolvida em Node.js e hospedada na Vercel.</p>

<h2>Funcionalidades</h2>

<ul>
  <li><strong>Catálogo de Animes</strong>: Explore uma ampla coleção de animes disponíveis.</li>
  <li><strong>Episódios</strong>: Acesse a lista de episódios de cada anime.</li>
  <li><strong>Streaming</strong>: Assista aos episódios diretamente no navegador.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>

<ul>
  <li><strong>Frontend</strong>: Desenvolvido com <a href="https://nextjs.org/">Next.js</a>, um framework React para produção.</li>
  <li><strong>Estilização</strong>: Utiliza <a href="https://tailwindcss.com/">Tailwind CSS</a> para estilos utilitários.</li>
  <li><strong>Backend</strong>: API construída com Node.js, hospedada na Vercel.</li>
  <li><strong>Armazenamento de Mídia</strong>: Todas as mídias, como imagens e vídeos, estão armazenadas no <a href="https://cloudinary.com/">Cloudinary</a>.</li>
</ul>

<h2>Estrutura do Projeto</h2>

<pre>
/
├── public/                 # Arquivos públicos (imagens, ícones, etc.)
├── src/
│   ├── app/               # Páginas do Next.js
│   │   ├── components/    # Componentes React reutilizáveis
│   │   │   ├── cards      # Cards para animes
│   │   │   └── layout     # Header, Footer
│   │   ├── global.css     # Estilos Globais
|   |   ├── page.tsx       # Página inicial
|   |   └── layout.tsx
│   ├── constants
│   │   └── FontAwesome     # Confiigurações do FontAwesome
|   ├── Types               # Typagem dos Animes e Episodios
|   |   ├── Anime.ts        # Typagem dos animes
|   |   └── Episode.ts      # Typagem dos episodios
|   ├── data                # Dados Locais para Teste
|   |   ├── Animes.json     # Dados dos animes
|   |   └── Episodes.json   # Dados dos episodios
│   └── utils/              # Funções utilitárias
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── next.config.ts          # Configurações do Next.js
├── package.json            # Dependências e scripts do projeto
├── postcss.config.mjs      # Configurações do PostCSS
├── tailwind.config.ts      # Configurações do Tailwind CSS
└── tsconfig.json           # Configurações do TypeScript
</pre>

<h2>Endpoints da API</h2>

<ul>
    <blockquote>
  ⚠️ <strong>Aviso</strong>: Por motivos óbvios, não colocarei os links reais dos endpoints da API.
  </blockquote>
  <li><strong>Animes</strong>: <code>/api/animes</code> - Retorna a lista de animes disponíveis.</li>
  <li><strong>Episódios</strong>: <code>/api/episodes</code> - Retorna a lista de episódios para um determinado anime.</li>
</ul>

<h2>Configuração e Execução</h2>

<p>Para configurar e executar o projeto localmente:</p>

<h3>1. Clone o repositório:</h3>

<pre>
git clone https://github.com/jefersonprimer/bakashi.git
cd bakashi
</pre>

<h3>2. Instale as dependências:</h3>

<pre>
npm install
</pre>

<h3>3. Configure as variáveis de ambiente:</h3>

<p>Crie um arquivo <code>.env.local</code> na raiz do projeto e adicione as seguintes variáveis:</p>

<pre>
CLOUDINARY_URL=your_cloudinary_url
</pre>

<p>Substitua <code>your_cloudinary_url</code> pela URL da sua conta no Cloudinary.</p>

<h3>4. Execute o projeto:</h3>

<pre>
npm run dev
</pre>

<p>O aplicativo estará disponível em <code>http://localhost:3000</code>.</p>

<h2>Contribuição</h2>

<p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para adicionar novas funcionalidades ou corrigir bugs.</p>
