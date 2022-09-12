import {useEffect,useState} from 'react';
import Auth from './pages/Auth';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import Profile from './pages/Profile';
import { CurrentUser } from './interfaces/AuthContextI';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';


function App() {
const[user,setUser]=useState<CurrentUser>()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user:any) => {
      if(user){

        setUser(user);
      }
    });

    return () => {
      unsub();
    };
  }, []);


  return (
    <>
      <AuthContextProvider>
    <PostContextProvider>
    <Routes>
      <Route path='/'  element={<Auth/>}/>

      <Route path='/dashboard'  element={ user?<Dashboard/>:<Auth/>}/>
      <Route path='/profile'  element={user?<Profile/>:<Auth/>}/>
    </Routes>
    </PostContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App