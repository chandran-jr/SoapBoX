import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

      <div className="app__header">

        <img src="soapboxlogo.jpg" className="app__headerImage" alt="soapboxlogo"></img>

        
      </div>

    <Post/>

    </div>
  );
}

export default App;
