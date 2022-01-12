import { useEffect, useState } from "react";
import formlist from '../styles/form.module.css'
import Form from "./Form";
import { useToast, Box } from "@chakra-ui/react";
import list from '../styles/todo.module.css'
import Image from 'next/image'
import { authService, dbService } from "../pages/_app";
import Item from "./Item";
import { useHistory } from 'react-router-dom';
const Todo= ({ userObj }) => {
  /*const [id, setId] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const deleteToast = useToast();

  const pushTodo = (value) => {
    const todos = todoList;
    const todo = { id, value };
    setId((current) => current + 1);
    todos.push(todo);
    setTodoList(todos);
  };

  const deleteTodo = (index) => {
    const todos = todoList.filter((todo, _index) => index !== _index);
    setTodoList(todos);
    deleteToast({
      duration: 2500,
      isClosable: true,
      fontSize: 50,
      render: () => (
        <Box color="rgb(11, 11, 104)" p={7} bg="purple.300">
          Delete Complete!
        </Box>
      ),
    });
  };*/
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
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
      const history = useHistory();
      const onLogOutClick = () => {
        authService.signOut()
        history.push('/');
        };
      
      return (
    /*<Box margin="2rem 8rem" padding="2rem 0" borderRadius="md">
      <div className={list.listbox}>
        <h1>My to do list</h1>
        <Image
          src="/images/photo1.gif"
          height={144}
          width={144}
          alt="hi"
        />
      </div>
      <Form />

    </Box>*/
        <div>
          
          <form onSubmit={onSubmit}>
          <div className={list.listbox}>
            <h1>My to do list</h1>
            <Image
              src="/images/photo1.gif"
              height={144}
              width={144}
              alt="hi"
            />
          </div>  
          </form>
          <>
      <button onClick={onLogOutClick} className={formlist.listbut2}>
        Log Out
      </button>
    </>

          <div>
    <form onSubmit={onSubmit} className={formlist.listbox}>
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