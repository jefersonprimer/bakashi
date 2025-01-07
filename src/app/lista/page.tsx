'use client';

import React, { useState, useEffect } from 'react';

const ListaLocal = () => {
  const [lista, setLista] = useState<string[]>([]);
  const [novoItem, setNovoItem] = useState('');

  // Carrega a lista do Local Storage ao carregar o componente
  useEffect(() => {
    const listaSalva = localStorage.getItem('minhaLista');
    if (listaSalva) {
      setLista(JSON.parse(listaSalva));
    }
  }, []);

  // Atualiza o Local Storage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('minhaLista', JSON.stringify(lista));
  }, [lista]);

  // Adiciona um item à lista
  const adicionarItem = () => {
    if (novoItem.trim() !== '') {
      setLista([...lista, novoItem]);
      setNovoItem('');
    }
  };

  // Remove um item da lista
  const removerItem = (index: number) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Minha Lista Local</h2>

      {/* Campo para adicionar itens */}
      <div>
        <input
          type="text"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Adicionar item"
          style={{
            width: 'calc(100% - 60px)',
            padding: '8px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={adicionarItem}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Adicionar
        </button>
      </div>

      {/* Lista de itens */}
      <ul style={{ marginTop: '20px', padding: '0', listStyleType: 'none' }}>
        {lista.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              background: '#f8f8f8',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => removerItem(index)}
              style={{
                padding: '5px 10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaLocal;
