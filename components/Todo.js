import { useEffect, useState } from "react";
import formlist from '../styles/todo.module.css'
import Image from 'next/image'
import Item from "./Item";
import { useHistory } from 'react-router-dom';
import { authService, dbService } from "../pages/fbase"

const Todo= ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
          text: nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          checked:false,
        });
        setNweet("");
    };

    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNweet(value);
    };
      
    const onLogOutClick = () => {
        authService.signOut()
        history.push('/');
    };
      
    const onChange2 = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit2 = async (event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
          await userObj.updateProfile({
              displayName: newDisplayName,
          });
          refreshUser();
      }
    };
      
    return (
        <div>
          <div className={formlist.flex}>
          <form onSubmit={onSubmit2}>
            <div className={formlist.namebox}>
              <input
              onChange={onChange2}
              type="text"
              autoFocus
              placeholder="Display name"
              value={newDisplayName}
              className={formlist.name}
              />
              <input
              type="submit"
              value="Change Your ID"
              className={formlist.namebut}
              />
            </div>
          </form>

          <form onSubmit={onSubmit} >
          <div className={formlist.mainbox}>
            <h1>{userObj.displayName
              ? `${userObj.displayName}'s To do list`
              : "To do list"}</h1>
            <Image
              src="/images/photo1.gif"
              height={144}
              width={144}
              alt="hi"
            />
            
          </div>  
          </form>
          </div>
          
          <>
          <span onClick={onLogOutClick} className={formlist.logoutbut}> 
            Log Out
          </span>
          </>

          <div>
          <form onSubmit={onSubmit} className={formlist.listbox}>
          <input 
            type="text"
            placeholder="Upload your list !!"
            value={nweet}
            onChange={onChange}
            className={formlist.uploadtext}
          />

          <button 
            type="submit"
            className={formlist.uploadbut}>
            Upload
          </button>
          </form>
          </div>
          <div>

          <>
            {nweets.map((nweet) => (
                 <Item
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
               />
              ))}
            </>
          </div>
        </div>

        

  );
};
export default Todo;

