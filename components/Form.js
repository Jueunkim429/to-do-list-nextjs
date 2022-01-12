import { useEffect, useState } from "react";
import formlist from '../styles/form.module.css'
import { Box, useToast } from "@chakra-ui/react";
import { authService, dbService } from "../pages/_app";
import Item from "./Item";

export default function Form({userObj}) {
  const [nweet, setNweet] = useState("");
  const addToast = useToast();
  const [nweets, setNweets] = useState([]);
  
  /*useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
    },[]);*/

  const submitItem = async (event) => {
    event.preventDefault();
    /*pushTodo(newTodo);
    setNewTodo("");
    addToast({
      duration: 2500,
      isClosable: true,
      fontSize: 50,
      render: () => (
        <Box color="rgb(11, 11, 104)" p={7} bg="teal.300">
          Add Complete!!
        </Box>
      ),*/
      await dbService.collection("nweets").add({
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet("");
    };
    /*const changeInputText = (e) => {
      setNewTodo(e.target.value);
    }; //handleChange*/
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNweet(value);
    };
    

  return (
    <div>
    <form onSubmit={submitItem} className={formlist.listbox}>
      <input 
        type="text"
        placeholder="Upload your list !!"
        value={nweet}
        onChange={onChange}
        className={formlist.listinput}
        />

      <button 
        type="submit"
        className={formlist.listbut}>
        Upload
      </button>
    </form>
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