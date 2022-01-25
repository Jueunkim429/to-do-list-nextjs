import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import AppRouter from '../../lib/Router';
import { authService } from '../../src/fbase';

function App() {
  const [init, setInit]=useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          });
      }else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  


  return (
  <>
    {init ? (
        <AppRouter
        refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <LoadingOutlined />
      )}
    <footer>&copy; {new Date().getFullYear()} to-do-list</footer>
  </>
  )
};

export default App;