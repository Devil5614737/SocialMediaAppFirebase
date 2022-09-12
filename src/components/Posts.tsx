import { Container } from "@chakra-ui/react";
import { arrayRemove, arrayUnion, deleteField, doc, FieldValue, query, Timestamp, updateDoc, where } from "firebase/firestore";
import React, { useContext,useState } from "react";
import { PostContext } from "../context/PostContext";
import { PostContextI, PostI } from "../interfaces/PostContextI";
import { db } from "../lib/firebase";
import { Card } from "./Card";
import { v4 as uuid } from "uuid";
import { AuthContextI } from "../interfaces/AuthContextI";
import { AuthContext } from "../context/AuthContext";

export const Posts = () => {
  const { posts } = useContext<PostContextI>(PostContext);
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const [liked,setLiked]=useState<boolean>(false)

  const handlePost = async (id: any, text: string) => {
    if (!text) return;
    await updateDoc(doc(db, "posts", id), {
      comments: arrayUnion({
        id: uuid(),
        text,
        postedBy: {
          id: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
          date: Timestamp.now(),
        },
      }),
    });
  };



  
const like=async(id:any)=>{
  await updateDoc(doc(db, "posts", id), {
    likes: arrayUnion({
      uid: currentUser?.uid,
  
    
    }),
  });
}

const unLike=async(id:any)=>{
  const ref=doc(db,"posts",id);
  
await updateDoc(ref,{
  likes:arrayRemove({
    uid:currentUser?.uid
  })
})
}




  const handleLike = (id: any,post:PostI) => {
setLiked((liked)=>!liked)
let a= post.data.likes.find(item=>item.uid===currentUser?.uid)
if(typeof a==='undefined'){
  like(id)
}else{
  unLike(id)
}


  }

// console.log(liked)


  


  return (
    <Container marginTop={12}>
      {posts &&
        posts.map((post,index) => (
          <Card
            id={post.id}
            key={index}
            image={post.data.image}
            postedBy={post.data.postedBy}
            likes={post.data.likes}
            caption={post.data.caption}
            handlePost={handlePost}
            comments={post.data.comments}
            handleLike={handleLike}
            post={post}
          />
        ))}
    </Container>
  );
};
