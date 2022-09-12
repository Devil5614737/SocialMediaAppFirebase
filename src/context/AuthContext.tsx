import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextI, CurrentUser, dataI, UserI } from "../interfaces/AuthContextI";
import { auth, db } from "../lib/firebase";

export const AuthContext = createContext({} as AuthContextI);

interface AuthContextProviderI {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [userAccount, setUserAccount] = useState<dataI>();
  const[users,setUsers]=useState<UserI[]>([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user:any) => {
      if(user){

        setCurrentUser(user);
      }
    });

    return () => {
      unsub();
    };
  }, []);
  





  useEffect(() => {
    if(!currentUser) return ;
    const user=query(collection(db,"users"),where('uid',"!=",currentUser?.uid))
    const unsubscribe = onSnapshot(user, (snapshot) => {
       setUsers(snapshot.docs.map((doc:any) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);




  return (
    <AuthContext.Provider value={{ currentUser, userAccount, setUserAccount,users }}>
      {children}
    </AuthContext.Provider>
  );
};
