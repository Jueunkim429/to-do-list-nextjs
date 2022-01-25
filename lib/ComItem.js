import comitemlist from '../styles/comitem.module.css'
import Image from 'next/image'
import { dbService } from '../src/fbase';
import { DeleteOutlined } from '@ant-design/icons';

export default function ComItem({commentObj, isOwner,nweetObj}) {
  const onCommentDeleteClick = async (event) => {
    if(isOwner){
      event.preventDefault();
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await dbService.doc(`nweets/${nweetObj.id}`).collection("comments").doc(`${commentObj.id}`).delete();
      }
    }
    else{
      window.confirm("You don't have permission.");
    }
  };

  /*const CommentDelete = async (event) => {
    await dbService.doc(`nweets/${nweetObj.id}`).collection("comments").doc(`${commentObj.id}`).delete();
  };
*/
const CommentDelete =() => {
  dbService.doc(`nweets/${nweetObj.id}`).collection("comments").doc(`${commentObj.id}`).delete();
};

  return (
    <div className={comitemlist.comment}>
      <div className={comitemlist.commentItemBlock}>
        <label className={comitemlist.CommentLabel}>
          {commentObj.text} 
        </label>

        <div className={comitemlist.by}>
          <p>by {commentObj.userName}</p>
        </div>

        <button className={comitemlist.DeleteButton} onClick={onCommentDeleteClick}>

          <DeleteOutlined />
        </button>
      </div>


      <div>
        
      </div>
    </div>
);
};