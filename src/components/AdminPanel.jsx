import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [token, setToken] = useState('');
  const [importFeedback, setImportFeedback] = useState('');
  const [editData, setEditData] = useState({ game_id: '', price: '', stock: '' });
  const [editFeedback, setEditFeedback] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [deleteFeedback, setDeleteFeedback] = useState('');
  const [games, setGames] = useState([]);
  const [addGameData, setAddGameData] = useState({ name: '', platform: '', release: '', price: '', stock: '' });
  const [addFeedback, setAddFeedback] = useState('');

  const fetchGames = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/games');
      const data = await res.json();
      if (res.ok) setGames(data.games);
    } catch {
      console.error('Failed to fetch games');
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleImport = async () => {
    if (!token) return alert("Token is required for import.");
    try {
      const formData = new URLSearchParams();
      formData.append('token', token);
      const response = await fetch('http://127.0.0.1:5000/admin/import-games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      const data = await response.json();
      setImportFeedback(response.ok ? `${data.games.length} games imported.` : `Error: ${data.error}`);
      fetchGames();
    } catch {
      setImportFeedback('Error connecting to server.');
    }
  };

  const handleEdit = async () => {
    const { game_id, price, stock } = editData;
    if (!token || !game_id || !price || !stock) return alert("All fields are required for editing.");
    try {
      const formData = new URLSearchParams();
      formData.append('game_id', game_id);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('token', token);
      const response = await fetch('http://127.0.0.1:5000/game', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      const data = await response.json();
      setEditFeedback(response.ok ? `Game updated: ${data.name}` : `Error: ${data.error}`);
      fetchGames();
    } catch {
      setEditFeedback('Error connecting to server.');
    }
  };

  const handleDelete = async () => {
    if (!token || !deleteId) return alert("Game ID and token are required for delete.");
    try {
      const formData = new URLSearchParams();
      formData.append('game_id', deleteId);
      formData.append('token', token);
      const response = await fetch('http://127.0.0.1:5000/game', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      const data = await response.json();
      setDeleteFeedback(response.ok ? `Game deleted: ID ${data.game_id}` : `Error: ${data.error}`);
      fetchGames();
    } catch {
      setDeleteFeedback('Error connecting to server.');
    }
  };

  const handleAddGame = async () => {
    const { name, platform, release, price, stock } = addGameData;
    if (!name || !platform || !release || !price || !stock) return alert("All fields are required to add a game.");
    try {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("platform", platform);
      const formattedDate = new Date(release).toISOString().split("T")[0];
      formData.append("release", formattedDate);
      formData.append("price", parseFloat(price));
      formData.append("stock", parseInt(stock));

      const response = await fetch('http://127.0.0.1:5000/game', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });
      const data = await response.json();
      setAddFeedback(response.ok ? `Game added: ${data.name}` : `Error: ${data.error}`);
      fetchGames();
    } catch {
      setAddFeedback('Error connecting to server.');
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      <div className="admin-section">
        <label><strong>Admin token:</strong></label><br />
        <input type="text" className="admin-input" placeholder="Enter admin token" value={token} onChange={(e) => setToken(e.target.value)} />
      </div>

      <div className="admin-section">
        <h3>Import Games</h3>
        <button className="admin-button" onClick={handleImport}>Import</button>
        {importFeedback && <p className={importFeedback.startsWith("Error") ? "error-message" : "success-message"}>{importFeedback}</p>}
      </div>

      <div className="admin-section">
        <h3>Add Game Manually</h3>
        <input type="text" placeholder="Name" value={addGameData.name} onChange={(e) => setAddGameData({ ...addGameData, name: e.target.value })} />
        <input type="text" placeholder="Platform" value={addGameData.platform} onChange={(e) => setAddGameData({ ...addGameData, platform: e.target.value })} />
        <input type="date" placeholder="Release Date" value={addGameData.release} onChange={(e) => setAddGameData({ ...addGameData, release: e.target.value })} />
        <input type="text" placeholder="Price" value={addGameData.price} onChange={(e) => setAddGameData({ ...addGameData, price: e.target.value })} />
        <input type="text" placeholder="Stock" value={addGameData.stock} onChange={(e) => setAddGameData({ ...addGameData, stock: e.target.value })} />
        <button className="admin-button" onClick={handleAddGame}>Add Game</button>
        {addFeedback && <p className={addFeedback.startsWith("Error") ? "error-message" : "success-message"}>{addFeedback}</p>}
      </div>

      <div className="admin-section">
        <h3>Game List</h3>
        <ul>
          {games.map(game => (
            <li key={game.game_id}>{game.game_id} - {game.name} (${game.price}) - Stock: {game.stock}</li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h3>Edit Game</h3>
        <input type="text" placeholder="Game ID" value={editData.game_id} onChange={(e) => setEditData({ ...editData, game_id: e.target.value })} />
        <input type="text" placeholder="New Price" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
        <input type="text" placeholder="New Stock" value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: e.target.value })} />
        <button className="admin-button" onClick={handleEdit}>Edit</button>
        {editFeedback && <p className={editFeedback.startsWith("Error") ? "error-message" : "success-message"}>{editFeedback}</p>}
      </div>

      <div className="admin-section">
        <h3>Delete Game</h3>
        <input type="text" placeholder="Game ID" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button className="admin-button delete" onClick={handleDelete}>Delete</button>
        {deleteFeedback && <p className={deleteFeedback.startsWith("Error") ? "error-message" : "success-message"}>{deleteFeedback}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;