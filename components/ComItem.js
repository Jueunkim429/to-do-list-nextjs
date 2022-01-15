import itemlist from '../styles/item.module.css'
import Image from 'next/image'
import { authService, dbService} from '../pages/fbase';
import { useReducer, useState } from 'react';

export default function ComItem({commentObj, isOwner,userObj}) {
  const [newComment, setNewComment] = useState(commentObj.text);
  
  const onDeleteClick = async () => {
    if(isOwner){
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await dbService.doc(`comments/${commentObj.id}`).delete();
      }
    }
    else{
      window.confirm("You don't have permission.");
    }
    
  };

  return (
    <div >
     {commentObj.text} 
      <div>
        <h10>by {commentObj.userName}</h10>
      </div>
      
       
      <button className={itemlist.DeleteButton} onClick={onDeleteClick}>
        <Image
          src="/images/trash.svg"
          height={50}
          width={50}
          alt='trash'
        />
      </button>


    </div>
);
};