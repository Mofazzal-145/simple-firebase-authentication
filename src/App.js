
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googlProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googlProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({});
    })
    .catch(error =>{
      setUser({});
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <div className="App">
      {/* {condition ? true : false} */}
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>:
        <div className="">
           <button onClick={handleGoogleSignIn}>Google Sign In</button>
           <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>
      }
      
      <h2>Name:{user.displayName}</h2>
      <p>I know your email address: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
