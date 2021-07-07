import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from './img/ITM_Word_Logo.png';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { Button } from '@material-ui/core';


function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user is logged out
        setUser(null);
      }
    })

    return () => {
      // perform clean up actions
      unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    //this is where the code runs
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //everytime a new post is added, this code fires.
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__logo">
        <img
          className="home_headerLogo"
          src={logo}
          alt="Logo"
        />
        <h6>by Karl Christopher Samelo</h6>
        </div>

        {user ? (
            <Button onClick={() => auth.signOut()}>
              Logout
            </Button>
        ) : (
          <div className="home__loginContainer">
            <Link to="/register"><Button>
              Sign Up
            </Button></Link>

            <Link to="/login"><Button>
              Log In
            </Button></Link>
          </div>
        )}
      </div>

      <div className="home__secondHeader">
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h3>Login to Post to IT Media!</h3>
        )}
      </div>

      <div className="home__posts">
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
    </div>
  );
}

export default Home;
