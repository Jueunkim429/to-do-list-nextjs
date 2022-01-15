import { useEffect, useState } from "react";
import commentlist from '../styles/comment.module.css'
import Image from 'next/image'
import { authService, dbService , doc, getDoc} from "../pages/fbase"
import ComItem from './ComItem';



const Comment= ({ userObj,nweetObj }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    
    /*useEffect(() => {
    dbService.collection("comments").onSnapshot((snapshot) => {
        const commentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentArray);
      });
  }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
          text: comment,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          userName:userObj.displayName,
        });
        setComment("");
    };*/

    useEffect(() => {
      dbService.doc(`nweets/${nweetObj.id}`).collection("comments").onSnapshot((snapshot) => {
          const commentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentArray);
        });
    }, []);
  
      const onSubmit = async (event) => {
          event.preventDefault();
          await dbService.doc(`nweets/${nweetObj.id}`).collection("comments").add({
            text: comment,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName:userObj.displayName,
          });
          setComment("");
      }

    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setComment(value);
    };
      
    return (
          <div>
            <div>
              <form onSubmit={onSubmit}>
                  <Image
                      src="/images/comment.svg"
                      height={50}
                      width={50}
                      alt='comment'
                  />
                  <input 
                    type="text"
                    placeholder="Comments !!"
                    value={comment}
                    onChange={onChange}
                  />
        
                  <button type="submit">
                  Upload
                  </button>
                  <>
            {comments.map((comment) => (
                 <ComItem
                    key={comment.id}
                    commentObj={comment}
                    isOwner={comment.creatorId === userObj.uid}
                    userObj={userObj}
               />
              ))}
            </>
              </form>
            </div>
            <div>
            
              {name}
            </div>
          </div>
  );
};
export default Comment;

