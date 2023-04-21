import React, { useState, useEffect} from 'react';
import axios from 'axios';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(``, {
    })
  })
  .then(response => {
    setFavorites(response.data.favorites);
  })
  .catch(error => {
    console.error(error);
  });

  return (
    <div>
      <h1>Favorites Page</h1>
      <p>This is the favorites page!</p>
      <ul>
        {favorites.map(favorite => {
          <li key={favorite.id}>
            <h2>{favorite.title}</h2>
            <img src={favorite.thumbnail} />
          </li>
        })}
      </ul>
    </div>
  );
};

export default FavoritesPage;
