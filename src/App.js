import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post.js';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';



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




function App() {


  const classes = useStyles();
  const [posts,setPosts] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);


  useEffect(() => {

    const unsubscribe =auth.onAuthStateChanged((authUser)=> {
      if (authUser){
        console.log(authUser);
        setUser(authUser);
      }
     else{
        setUser(null);

      }
    })

    return () => {
      unsubscribe();
    }; 

  }, [username, user]);



  useEffect(() => {
 
    db.collection('posts').orderBy('timestamp','desc' ).onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
         post: doc.data()
         
        }
        
        )));
    })

  },[]);


  const signUp = (e) => {

    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => {alert(error.message)});

    setOpen(false);

    
  
  }

  const signIn = (e) =>{
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

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

      <Button type="submit" onClick={signUp}>Sign Up</Button>


        </form>

        </div>

</Modal>

<Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>


      <div style={modalStyle} className={classes.paper}>

        <form className="app__signUp">

        <center>
        <img alt="modalogo" src="soapboxlogo.jpg" />

        </center>

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

      <Button type="submit" onClick={signIn}>Sign In</Button>


        </form>

        </div>

</Modal>

    <div className="app__header">

      <img className="app__headerImage" src="soapboxlogo.svg" alt="soapboxlogo" />

      {user ? (
    <Button onClick={() => auth.signOut()}>Logout</Button>
    ): (
      <div className="app__loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Login</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
    </div>

    )}


</div>


 <div className="app__posts">

 {

posts.map(({id, post}) => (

  <Post key={id} username= {post.username} caption = {post.caption} imageUrl = {post.imageUrl} />

))

}


 </div>


{user?.displayName ? (
        <div className="app__upload">
          <ImageUpload username={user.displayName} />
        </div>
      ) : (
        <center>
          <h3>Login to upload</h3>
        </center>
      )}

     
    
    </div>
  );
}

export default App;
