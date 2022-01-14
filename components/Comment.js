import { useEffect, useState } from "react";
import commentlist from '../styles/comment.module.css'
import Image from 'next/image'
import { authService, dbService } from "../pages/fbase"

const Comment= ({ userObj }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
    dbService.collection("comments").onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(nweetArray);
      });
  }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("comments").add({
          text: comment,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          checked:false,
          userName:userObj.displayName,
        });
        setComment("");
    };

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
            placeholder="Upload your list !!"
            value={comment}
            onChange={onChange}
            
          />
        
          <button 
            type="submit"
            >
            Upload
          </button>
          </form>
          </div>
          <div>
          </div>
        </div>

        

  );
};
export default Comment;

