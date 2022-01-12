import itemlist from '../styles/item.module.css'
import Image from 'next/image'
import { dbService} from '../pages/fbase';
import { useState } from 'react';

export default function Item({nweetObj, isOwner  }) {
  const [checked, setChecked] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const checkTodo = async(event) => {
    setChecked(!checked);
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
      checked:(!checked)
    });
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  return (
    /*<div className={itemlist.todoItemBlock}>
      {isOwner ? (
        <>
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
        </>
      ) : (
        ''
      )
}
    </div>
    /<input
          type="checkbox"
          onClick={checkTodo}
          className={itemlist.CheckBox}
        />*/
    <div className={itemlist.todoItemBlock}>
      <>
          {checked ?(
            <>
          <Image 
            onClick={checkTodo}
            src="/images/check.svg"
            height={50}
            width={50}
            className={itemlist.CheckBox}
          /> 
          <label className={itemlist.CheckLabel}>
        {nweetObj.text}
      </label>
      </>
          
          ): (
            <>
          <Image 
          onClick={checkTodo}
          src="/images/xxx.svg"
          height={50}
          width={50}
          className={itemlist.CheckBox}
        />
        <label className={itemlist.xxLabel}>
       {nweetObj.text}
     </label> 
        </>
        )}
      </>


      

      
        
      <button className={itemlist.DeleteButton} onClick={onDeleteClick}>
        <Image
          src="/images/trash.svg"
          height={50}
          width={50}
        />
      </button>

    </div>
);
};