export interface CurrentUser{
displayName:string,
email:string,
photoURL:string,
uid:string
}
interface FriendsI{
    uid:string,
    displayName:string,
    photoURL:string
}

export interface dataI{
displayName:string,
email:string,
friends:[],
photoURL:string,
uid?:string
}

export interface UserI{
    data:dataI,
    id:string
}



export interface AuthContextI{
    currentUser?:CurrentUser,
    userAccount?:dataI,
    setUserAccount:(userAccount:dataI)=>void
    users:UserI[]
}