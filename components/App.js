import React, { useEffect, useState } from 'react';
import { authService } from '../pages/_app';
import AppRouter from './Router';
import Todo from './Todo';

function App() {
  const [init, setInit]=useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj(user);
      }
      setInit(true);
    });
  }, [])

  return (
  <>
    {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    <footer>&copy; {new Date().getFullYear()} to-do-list</footer>
  </>
  )
};

export default App;