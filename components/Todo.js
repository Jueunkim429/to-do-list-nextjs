import { useState } from "react";
import Item from "./Item";
import Form from "./Form";
import { useToast, Box } from "@chakra-ui/react";
import list from '../styles/todo.module.css'
import Image from 'next/image'


export default function Todo() {
  const [id, setId] = useState(0);
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
  };

  return (
    <Box margin="2rem 8rem" padding="2rem 0" borderRadius="md">
      <div className={list.listbox}>
        <h1>My to do list</h1>
        <Image
          src="/images/photo1.jpg"
          height={144}
          width={144}
          alt="hi"
        />
      </div>
      <Form pushTodo={pushTodo} />
      <Item todoList={todoList} deleteTodo={deleteTodo} />
    </Box>
  );
}