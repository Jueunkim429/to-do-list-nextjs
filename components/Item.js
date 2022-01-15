import itemlist from '../styles/item.module.css'
import Image from 'next/image'
import { authService, dbService} from '../pages/fbase';
import { useReducer, useState } from 'react';
import Comment from './Comment';

export default function Item({nweetObj, isOwner,userObj}) {
  const [checked, setChecked] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const checkTodo = async(event) => {
    if (isOwner) {
    setChecked(!checked);
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
      checked:(!checked)
    });
  }
    else{
      window.confirm("You don't have permission.");
    }
  };
  
  const onDeleteClick = async () => {
    if(isOwner){
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await dbService.doc(`nweets/${nweetObj.id}`).delete();
      }
    }
    else{
      window.confirm("You don't have permission.");
    }
  };

  return (
    <>
    <div className={itemlist.todoItemBlock}>
     {nweetObj.checked ? (
        <>
          <Image 
            onClick={checkTodo}
            src="/images/check.svg"
            height={50}
            width={50}
            className={itemlist.CheckBox}
            alt='check'
          /> 
          <label className={itemlist.CheckLabel}>
            {nweetObj.text} 
          </label>
        </>
      ):(
        <>
          <Image 
          onClick={checkTodo}
          src="/images/xxx.svg"
          height={50}
          width={50}
          className={itemlist.CheckBox}
          alt='x'
          />
          <label className={itemlist.xxLabel}>
            {nweetObj.text} 
          </label> 
        </>
      )}

      <div>
        <h10>by {nweetObj.userName}</h10>
      </div>

      <div>
        <button className={itemlist.DeleteButton} onClick={onDeleteClick}>
          <Image
          src="/images/trash.svg"
          height={50}
          width={50}
          alt='trash'
          />
        </button>
      </div>
      
    </div>
    <div>
 
      <Comment
       userObj={userObj}
       nweetObj={nweetObj}
      />
 
      </div>
    
    </>
    

 
    

    
    
);
};
/*{isOwner && (
        <button className={itemlist.DeleteButton} onClick={onDeleteClick}>
          <Image
            src="/images/trash.svg"
            height={50}
            width={50}
            alt='trash'
          />
        </button>
        )}*/