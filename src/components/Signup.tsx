import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement  } from '@chakra-ui/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, useState } from 'react'
import { auth, db, storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Spinner } from './Spinner';
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
  const navigate=useNavigate();
  const[loading,setLoading]=useState<boolean>(false);
     const [show, setShow] = useState<boolean>(false);
     const[username,setUsername]=useState<string>("");
     const[email,setEmail]=useState<string>("");
     const[password,setPassword]=useState<string>("");
     const [file,setFile]=useState<File>()



     const handleChange=(event:ChangeEvent)=>{
      const target=event.target as HTMLInputElement;
      const file:File=(target.files as FileList)[0];
      setFile(file)
  }

  const handleClick = () => setShow(!show)

const handleSignup=async()=>{
  setLoading(true)
  if(!file) return ;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // creating image name
    const date=new Date().getTime();
    const storageRef = ref(storage, `${username + date}`);

    await uploadBytesResumable(storageRef,file).then(()=>{
      getDownloadURL(storageRef).then(async (downloadURL)=>{
        try{
          await updateProfile(res.user,{
            displayName:username,
            photoURL:downloadURL
          });
          await setDoc(doc(db,"users",res.user.uid),{
            uid:res.user.uid,
            displayName:username,
            email,
            photoURL:downloadURL,
            friends:[]
          }).then(()=>setLoading(false))
        }catch(e){
          setLoading(false)
          alert(e)
        }
      })
    })




    setUsername("")
    setEmail("")
    setPassword("")
  } catch(e){
    setLoading(false)
    alert(e)
  }

}


  return (
    <FormControl>
    <FormLabel fontSize={14}>Username</FormLabel>
    <Input value={username}  onChange={(e:React.FormEvent<HTMLInputElement>)=>setUsername(e.currentTarget.value)} type='text'  marginBottom={5}/>
    <FormLabel fontSize={14}>Email </FormLabel>
    <Input value={email}  onChange={(e:React.FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} type='email'  marginBottom={5}/>
    <FormLabel fontSize={14}>Password </FormLabel>
    <InputGroup size='md' marginBottom={5}>
      <Input
      value={password}  onChange={(e:React.FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    <FormLabel fontSize={14}>Select Profile Pic</FormLabel>
    <Input  type='file' onChange={handleChange}  marginBottom={5}/>
    <Button disabled={!email||!username||!password||!file} onClick={handleSignup} colorScheme='blue' width='100%'>{loading?<Spinner color="white" size="sm" />:'Signup'}</Button>
  </FormControl>
  )
}
