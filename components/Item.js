import itemlist from '../styles/item.module.css'
import Image from 'next/image'

export default function Item({ todoList, deleteTodo }) {
  const checkTodo = (event) => {
    const { style } = event.target.nextSibling;
    const { checked } = event.target;
    style.textDecoration = checked ? "line-through" : null;
    style.color = checked ? "gray" : null;
    style.fontStyle = checked ? " italic" : null;
  };

  return todoList.map((todo, index) => (
    <div key={todo.id} className={itemlist.todoItemBlock}>
        <input
          type="checkbox"
          id={index}
          onClick={checkTodo}
          className={itemlist.CheckBox}
        />
        <label htmlFor={index} className={itemlist.CheckLabel}>
          {todo.value}
        </label>
        <button className={itemlist.DeleteButton} onClick={() => deleteTodo(index)}>
        <Image
          src="/images/trash.svg"
          height={50}
          width={50}
        />
        </button>
    </div>
  ));
}
