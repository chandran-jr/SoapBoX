import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post.js';
import {db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


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
      
      <h2>Modal</h2>

    </div>

      </Modal>

    <div className="app__header">

      <img className="app__headerImage" src="soapbox.svg" alt="soapboxlogo" />



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
