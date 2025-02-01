// Coloque a importação logo no topo do arquivo
'use client';

import { useFavorites } from "../../contexts/FavoritesContext";  // Importando o hook

import FavoritesCarousel from "./FavoritesCarousel";

const FavoritesSection = () => {
  const { favorites } = useFavorites(); // Usando o hook aqui

  return (
    <>
      {/* Só exibe o componente se houver pelo menos 1 item na lista */}
      {favorites.length > 0 && <FavoritesCarousel />}
    </>
  );
};

export default FavoritesSection;
