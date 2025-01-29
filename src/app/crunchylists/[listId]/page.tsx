'use client';

import { useParams } from 'next/navigation';
import { useLists } from '../../contexts/ListsContext';
import ListDetails from "./ListDetails";
import { useState, useEffect } from 'react';

const ListDetailsHome = () => {
  const { listId } = useParams();
  const { lists } = useLists();
  const [currentList, setCurrentList] = useState(() =>
    lists.find((list) => list.id === listId)
  );

  useEffect(() => {
    setCurrentList(lists.find((list) => list.id === listId));
  }, [lists, listId]);

  if (!currentList) {
    return <p>Lista não encontrada.</p>;
  }

  return (
    <div>
      <ListDetails key={currentList.id} list={currentList} />
    </div>
  );
};

export default ListDetailsHome;
