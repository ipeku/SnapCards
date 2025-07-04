import React, { useEffect, useMemo, useState } from 'react';

export default function App() {
  const [cards, setCards] = useState([]);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [search, setSearch] = useState('');
  const [flippedId, setFlippedId] = useState(null);
  const [shuffled, setShuffled] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchCards() {
    setLoading(true);
    const res = await fetch('/api/cards');
    const data = await res.json();
    setCards(data);
    setLoading(false);
  }

  async function addCard(e) {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) return;
    await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term, definition })
    });
    setTerm(''); setDefinition('');
    fetchCards();
  }

  async function removeCard(id) {
    await fetch(`/api/cards/${id}`, { method: 'DELETE' });
    if (flippedId === id) setFlippedId(null);
    fetchCards();
  }

  function toggleFlip(id) {
    setFlippedId(prev => (prev === id ? null : id));
  }

  useEffect(() => { fetchCards(); }, []);

  const filtered = useMemo(() => {
    let list = [...cards];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c =>
        c.term.toLowerCase().includes(q) || c.definition.toLowerCase().includes(q)
      );
    }
    if (shuffled) list = list.slice().sort(() => Math.random() - 0.5);
    return list;
  }, [cards, search, shuffled]);

  return (
    <div className="container">
      <div className="app-header">
        <h1 className="title">Flashcards</h1>

        <form onSubmit={addCard} className="controls">
          <input
            className="input"
            placeholder="Term"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <input
            className="input"
            placeholder="Definition"
            value={definition}
            onChange={e => setDefinition(e.target.value)}
          />
          <button className="button" title="Add">Add</button>
        </form>

        <div className="toolbar">
          <input
            className="input search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="button"
            onClick={() => setShuffled(s => !s)}
            aria-pressed={shuffled}
            title="Shuffle"
          >
            {shuffled ? 'Ordered' : 'Shuffle'}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="hint">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="hint">No cards found.</p>
      ) : (
        <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filtered.map(card => {
            const flipped = flippedId === card.id;
            return (
              <li key={card.id}>
                <div
                  className={`card ${flipped ? 'is-flipped' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleFlip(card.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(card.id)}
                >
                  <div className="card-text">
                    {flipped ? card.definition : card.term}
                  </div>
                  <div className="card-footer">
                    <small className="muted">
                      {new Date(card.created_at).toLocaleString()}
                    </small>
                    <button
                      className="icon-button"
                      onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                      title="Delete"
                      aria-label="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="hint">Tip: click a card to flip (<strong>term ⇄ definition</strong>).</p>
    </div>
  );
}
