import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <AddMovie></AddMovie>
        <MovieList></MovieList>
      </header>
      
    </div>
  );
}

export default App;
