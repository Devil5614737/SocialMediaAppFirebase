import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { PostContextI, PostI } from "../interfaces/PostContextI";
import { db } from "../lib/firebase";

export const PostContext = createContext({} as PostContextI);

interface PostContextProviderI {
  children: ReactNode;
}

export const PostContextProvider = ({ children }: PostContextProviderI) => {
  const [posts, setPosts] = useState<PostI[]>([]);

  const postsCollection = collection(db, "posts");

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
       setPosts(snapshot.docs.map((doc:any) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  );
};
