import { Box, Button, Container, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Post } from '../components/Post'
import { AuthContext } from '../context/AuthContext'
import { AuthContextI, UserI } from '../interfaces/AuthContextI'
import { PostI } from '../interfaces/PostContextI'
import { db } from '../lib/firebase'
import { UserInfo } from './UserInfo'

export default function Profile() {
const {currentUser}=useContext<AuthContextI>(AuthContext);
const[posts,setPosts]=useState<PostI[]>([])
const[user,setUser]=useState<UserI>()




useEffect(()=>{
  if(!currentUser) return ;
  const q=query(collection(db,"posts"),where("postedBy.uid","==",currentUser?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc:any) => ({ id: doc.id, data: doc.data() })));
     });
     return () => {
        unsubscribe();
      };
},[]);




useEffect(() => {
  if(!currentUser) return 
  const userD=query(collection(db,"users"),where("uid","==",currentUser?.uid));
  const unsubscribe = onSnapshot(userD, (snapshot) => {
     setUser(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
  });

  return () => {
    unsubscribe();
  };
}, []);



const handleDelete=async(id:string)=>{
  await deleteDoc(doc(db, "posts", id));
}


  return (
    <>
    <Navbar/>
    <Container maxWidth='container.xl' marginTop={12}>
<UserInfo posts={posts?.length} pic={currentUser?.photoURL} username={currentUser?.displayName}
friends={user&&user[0].data.friends.length}
/>


    <SimpleGrid columns={[1, null, 3]} spacing='10px' marginTop={12}>
        {posts.map(post=>
  <Post key={post.id} id={post.id} image={post.data.image} comments={post.data.comments} handleDelete={handleDelete} likes={post.data.likes}/>
             )}


</SimpleGrid>
    </Container>
    </>
  )
}
