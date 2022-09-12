import { Box, Button, Image, Text } from '@chakra-ui/react'
import { CommentsI, LikesI } from '../interfaces/PostContextI'


interface PostI{
  id?:string,
  image:string,
  comments:CommentsI[],
  handleDelete:(id:string)=>void,
  likes:LikesI[]
}

export const Post = ({image,comments,handleDelete,id,likes}:PostI) => {
  return (
    <Box marginBottom={2}  height='fit-content' borderWidth="1px" borderRadius="lg"
    padding={5}
    >
      <Button onClick={()=>handleDelete(id as string)} marginBottom={2} float='right'>Delete</Button>
      <Image height={300} borderRadius={'xl'} objectFit={'cover'} width={"100%"} src={image}/>
      <Box display={'flex'} alignItems='center' gap={4} marginTop={3}>
          <Text  fontSize={16}>{likes?.length} Likes</Text>
          <Text fontSize={16}>{comments?.length} Comments</Text>
      </Box>
    </Box>
  )
}
