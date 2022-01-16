import { useEffect, useState } from "react";
import commentlist from '../styles/comment.module.css'
import Image from 'next/image'
import ComItem from './ComItem';
import { dbService } from "../src/fbase";

const Comment= ({ userObj,nweetObj }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
      dbService.doc(`nweets/${nweetObj.id}`).collection("comments").onSnapshot((snapshot) => {
          const commentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentArray);
        });
    }, []);
  
      const onSubmitComment = async (event) => {
          event.preventDefault();
          await dbService.doc(`nweets/${nweetObj.id}`).collection("comments").add({
            text: comment,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName:userObj.displayName,
          });
          setComment("");
      }

    const onChangeComment = (event) => {
        const {
          target: { value },
        } = event;
        setComment(value);
    };
      
    return (
          <div className={commentlist.comment}>
            <div >
              <form onSubmit={onSubmitComment} className={commentlist.commentBox}>
                  <Image
                      src="/images/comment.svg"
                      height={30}
                      width={30}
                      alt='comment'
                  />
                  <input 
                    type="text"
                    placeholder="Comments !!"
                    value={comment}
                    onChange={onChangeComment}
                    className={commentlist.commenttext}
                  />
        
                  <button type="submit" className={commentlist.commentbut}>
                  Upload
                  </button>
              </form>

              <>
                {comments.map((comment) => (
                  <ComItem
                    key={comment.id}
                    commentObj={comment}
                    isOwner={comment.creatorId === userObj.uid}
                    nweetObj={nweetObj}
                  />
                ))}
              </>
              
            </div>

            <div>
            
          
            </div>
          </div>
  );
};
export default Comment;

