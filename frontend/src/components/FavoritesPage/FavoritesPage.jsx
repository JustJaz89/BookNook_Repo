import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [user, token] = useAuth();
  


  async function getAllReviews() {
    let response = await axios.get(`http://127.0.0.1:5000/api/favorite`, {headers: {Authorization: 'Bearer ' + token}});
    setFavorites(response.data);
  }

  useEffect(() => {getAllReviews()
  },[]);

  return (
    <div>
      <h1>Favorites Page</h1>
      <p>This is the favorites page!</p>
      <ul>
        {favorites.map(favorite => (
          <li key={favorite.id}>
            <h2>{favorite.title}</h2>
            <img src={favorite.thumbnail_url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
