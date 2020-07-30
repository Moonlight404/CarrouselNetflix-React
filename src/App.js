import React from 'react';
import './style.css';
import Carrousel from './Components/Carrousel';
import Animes from './animes.json';
import Movies from './movies.json';

function App() {
  return (
    <div className="App">
      <Carrousel 
      title="Animes"
      data={Animes}></Carrousel>
      <Carrousel 
      title="Filmes"
      data={Movies}></Carrousel>
    </div>
  );
}

export default App;
