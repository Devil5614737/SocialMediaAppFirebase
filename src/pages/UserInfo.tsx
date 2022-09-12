import { Box, Image, Text } from '@chakra-ui/react'


interface UserInfoI{
    username?:string,
    pic?:string,
    posts:number,
    friends:number
}


export const UserInfo = ({username,pic,posts,friends}:UserInfoI) => {
  return (
<Box display='grid' placeItems='center' marginTop={4}>
<Image src={pic} objectFit='cover' alt='profile' width={150} height={150} borderRadius={75}/>
<Text fontSize={22} fontWeight='500'>{username}</Text>
<Text fontSize={20}>Posts {posts}</Text>
<Text fontSize={20}>Friends {friends}</Text>
</Box>
  )
}
