import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './StoreCatalog.css';

const StoreCatalog = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/games');
        const data = await response.json();
        if (response.ok) {
          setGames(data.games);
        } else {
          setError(data.error || 'Failed to load games.');
        }
      } catch (err) {
        setError('Error connecting to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleAddToCart = (game) => {
    addToCart(game);
    alert(`"${game.name}" added to cart!`);
  };

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="catalog-container">
      <h2>Store Catalog</h2>
      <div className="game-grid">
      {games.map((game) => (
        <div key={game.game_id} className="game-card">
          <h3>{game.name}</h3>
          <p><strong>Platform:</strong> {game.platform}</p>
          <p><strong>Release:</strong> {game.release}</p>
          <p><strong>Price:</strong> ${game.price}</p>
          <p><strong>Stock:</strong> {game.stock}</p>
          <button className="add-cart" onClick={() => handleAddToCart(game)}>Add to Cart</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default StoreCatalog;