import { useState } from "react";
import formlist from '../styles/form.module.css'
import { Box, useToast } from "@chakra-ui/react";

export default function Form({ pushTodo }) {
  const [newTodo, setNewTodo] = useState("");
  const addToast = useToast();

  const changeInputText = (e) => {
    setNewTodo(e.target.value);
  }; //handleChange

  const submitItem = (e) => {
    e.preventDefault();
    pushTodo(newTodo);
    setNewTodo("");
    addToast({
      duration: 2500,
      isClosable: true,
      fontSize: 50,
      render: () => (
        <Box color="rgb(11, 11, 104)" p={7} bg="teal.300">
          Add Complete!!
        </Box>
      ),
    });
  };

  return (
    <form onSubmit={submitItem} className={formlist.listbox}>
        
        <input 
        type="text"
        placeholder="Upload your list !!"
        value={newTodo}
        onChange={changeInputText}
        className={formlist.listinput}
        />

        <button 
        type="submit"
        className={formlist.listbut}>
        Upload
        </button>
    </form>
  );
}
