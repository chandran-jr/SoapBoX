import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post.js';
import {db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
 const left = 50;

 return {
   top: `${top}%`,
   left: `${left}%`,
   transform: `translate(-${top}%, -${left}%)`,

 };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: 'theme.shadows[5]',
    padding: theme.spacing(2,4,3),

  },
}));


const signUp = (event) => {

  

}


function App() {


  const classes = useStyles();
  const [posts,setPosts] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');



  useEffect(() => {
 
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
         post: doc.data()
         
        }
        
        )));
    })

  },[]);

  return (
    <div className="App">

<Modal
        open={open}
        onClose={() => setOpen(false)}>


      <div style={modalStyle} className={classes.paper}>

        <form className="app__signUp">

        <center>
        <img alt="modalogo" src="soapboxlogo.jpg" />

        </center>

      <Input
      placeholder="Username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <Input
      placeholder="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" onClick={signUp()}>Login</Button>


        </form>

        </div>

      </Modal>

    <div className="app__header">

      <img className="app__headerImage" src="soapboxlogo.svg" alt="soapboxlogo" />



    </div>

    <Button onClick={() => setOpen(true)}>Sign Up</Button>

    {

    posts.map(({id, post}) => (

      <Post key={id} username= {post.username} caption = {post.caption} imageUrl = {post.imageUrl} />

    ))

}



     
    
    </div>
  );
}

export default App;
