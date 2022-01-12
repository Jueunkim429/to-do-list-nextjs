import itemlist from '../styles/item.module.css'
import Image from 'next/image'
import { dbService } from '../pages/_app';
import { useState } from 'react/cjs/react.development';

export default function Item({nweetObj, isOwner  }) {
  const [checked, setChecked] = useState(false);
  //const [newNweet, setNewNweet] = useState(nweetObj.text);
  const checkTodo = (event) => {
    const { style } = event.target.nextSibling;
    const { checked } = event.target;
    style.textDecoration = checked ? "line-through" : null;
    style.color = checked ? "gray" : null;
    style.fontStyle = checked ? " italic" : null;
    
  };
  /*const onDoneClick = async(event) => {
    setChecked(!checked);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
      checked:(!checked)
    });
    const { style } = event.target.nextSibling;
    const { checked } = event.target;
    style.textDecoration = checked ? "line-through" : null;
    style.color = checked ? "gray" : null;
    style.fontStyle = checked ? " italic" : null;
  };*/
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

 /* const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };*/

  return (
    <div className={itemlist.todoItemBlock}>
      <input
          type="checkbox"
          onClick={checkTodo}
          className={itemlist.CheckBox}
        />
        <label className={itemlist.CheckLabel}>
        {nweetObj.text}
        </label>
        <button className={itemlist.DeleteButton} onClick={onDeleteClick}>
        <Image
          src="/images/trash.svg"
          height={50}
          width={50}
        />
        </button>
    </div>
)
  };
/*
  const Item = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
  
    const onDeleteClick = async () => {
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await dbService.doc(`nweets/${nweetObj.id}`).delete();
      }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
      event.preventDefault();
      await dbService.doc(`nweets/${nweetObj.id}`).update({
        text: newNweet,
      });
      setEditing(false);
    };
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewNweet(value);
    };
    return (
      <div>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your List"
                value={newNweet}
                required
                onChange={onChange}
              />
              <input type="submit" value="Update List" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            
          </>
        ) : (
          <>
            <input id="check" type="checkbox"  />
            <span>{nweetObj.text}</span>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete list</button>
                <button onClick={toggleEditing}>Edit list</button>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default Item;*/