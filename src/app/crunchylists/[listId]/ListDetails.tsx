'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLists } from '../../contexts/ListsContext';

const ListDetails = () => {
  const { listId } = useParams(); // Obtém o ID da URL
  const { lists } = useLists();

  const list = lists.find((list) => list.id === listId);

  if (!list) {
    return <p>Lista não encontrada.</p>;
  }

  return (
    <div>
      <h1>{list.name}</h1>
      <p>Última atualização: {new Date(list.updatedAt).toLocaleString()}</p>
      {list.items.length === 0 ? (
        <p>Nenhum anime nesta lista.</p>
      ) : (
        <ul>
          {list.items.map((anime) => (
            <li key={anime.id}>
              <span>{anime.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListDetails;
