import fs from 'fs/promises';
import path from 'path';
import Glossary from './components/Glossary';
import Lancamentos from './components/Lancamentos';
import TodosAnimes from './components/TodosAnimes';
// import Episodios from './components/Episodios';

import './globals.css';

const HomePage = async () => {
  // Caminho do arquivo JSON
  const filePath = path.join(process.cwd(), 'src/data/animes.json');
  
  // Lendo o conteúdo do arquivo JSON
  const data = await fs.readFile(filePath, 'utf-8');
  
  // Desestruturando as seções do JSON
  const { Animes } = JSON.parse(data);

  // Verifique se os dados realmente existem
  if (!Animes) {
    return <div>Erro ao carregar os dados.</div>;
  }

  // Filtrando os lançamentos para o componente Lancamentos
  const lancamentos = Animes.filter((anime: any) => anime.isLancamento);

  // Passando os dados para os componentes
  return (
    <div className='home-container'>
      <Glossary animes={Animes} /> {/* Passando todos os animes para o Glossary */}
      <Lancamentos lancamentos={lancamentos} /> {/* Passando dados para o componente de Lançamentos */}
      <TodosAnimes todosAnimes={Animes} /> {/* Passando dados para o componente TodosAnimes */}
      {/* <Episodios episodios={episodios} /> */}
    </div>
  );
};

export default HomePage;
