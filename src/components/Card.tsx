import { useContext, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { CommentsI, LikesI, PostI } from "../interfaces/PostContextI";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import {AiTwotoneLike} from 'react-icons/ai';
import {VscComment} from 'react-icons/vsc';

interface postedByI{
  displayName:string,
  photoURL:string,
  uid:string
}

interface CardI{
  image:string,
  likes:LikesI[],
  postedBy:postedByI,
  caption:string,
  id:any,
  handlePost:(id:any,text:string)=>void,
  handleLike:(id:any,post:PostI)=>void,
  comments:CommentsI[],
  post:PostI,
  createdAt?:any
}


export const Card = ({image,likes,postedBy,caption,id,handlePost,comments,handleLike,post,createdAt}:CardI) => {
  const ref = useRef<any>(null);
  const[text,setText]=useState<string>("")
  const{currentUser}=useContext<AuthContextI>(AuthContext)



  let a= post.data.likes.find(item=>item.uid===currentUser?.uid)

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" marginBottom={5}>
      <Box padding={4} display="flex" alignItems="center" gap={2}>
        <Avatar
          size="sm"
          name="Dan Abrahmov"
          src={postedBy.photoURL}
        />
        <Text fontSize={17} fontWeight={500}>
          {postedBy.displayName}
        </Text>
     
      </Box>
      <Divider/>
      <Image
        objectFit="cover"
        height={400}
        width="100%"
        src={image}
        alt="post"
      />
      <Box padding={4}>
        <Box marginBottom={2} display="flex" gap={2}>
          <Text 
          color={typeof a==='undefined'?'black':"blue"}
display='flex' alignItems={'center'}
           onClick={()=>handleLike(id,post)} cursor="pointer">
            <AiTwotoneLike/>
            {typeof a==='undefined'?'Like':"Liked"}
            </Text>
          <Text gap={1} display='flex' alignItems={'center'} cursor="pointer" 

          onClick={() => ref.current.focus()}>
<VscComment/>
            Comment
          </Text>
        </Box>
        <Text marginBottom={2}>{likes&&likes.length} Likes</Text>
        <Text fontWeight={500} fontSize={17}>
         {postedBy.displayName} <span style={{ fontWeight: 400 }}>{caption}</span>
        </Text>
        <Link marginBottom={2} marginTop={1}>
          comments 🔥🔥
        </Link>
        {comments.map(comment=>
        
        <Text fontWeight={500} fontSize={17}>
          {comment.postedBy.displayName} <span style={{ fontWeight: 400 }}>{comment.text}</span>
        </Text>
          )}
        {/* <Text fontSize={14} color='grey'>{createdAt}</Text> */}
        <Box display={"flex"} marginTop={2}>
          <Input
          value={text}
          onChange={(e:React.FormEvent<HTMLInputElement>)=>setText(e.currentTarget.value)}
            ref={ref}
            id="message"
            name="message"
            marginRight={4}
            placeholder="write a comment"
          />
          <Button onClick={()=>{handlePost(id,text)
          setText("")
          }}>Post</Button>
        </Box>
      </Box>
    </Box>
  );
};
