import './App.css';
import React from 'react';
import Post from './Post.js';


function App() {
  return (
    <div className="App">

    <div className="app__header">

      <img className="app__headerImage" src="soapbox.svg" alt="soapboxlogo" />


    </div>



    <Post/>
    
    </div>
  );
}

export default App;
