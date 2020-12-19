import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post.js';
import {db} from './firebase';


function App() {

  const [posts,setPosts] = useState([]);


  useEffect(() => {
 
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })

  },[]);

  return (
    <div className="App">

    <div className="app__header">

      <img className="app__headerImage" src="soapbox.svg" alt="soapboxlogo" />



    </div>

    {

    posts.map(post => (

      <Post username= {post.username} caption = {post.caption} imageUrl = {post.imageUrl} />

    ))

}



     
    
    </div>
  );
}

export default App;
