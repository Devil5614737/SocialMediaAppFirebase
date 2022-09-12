// caption
// "fdsfdasfd"
// comments
// createdAt
// September 10, 2022 at 4:08:12 PM UTC+5:30
// image
// "https://firebasestorage.googleapis.com/v0/b/social-media-788f1.appspot.com/o/shopping%20cart.PNG1662806286951?alt=media&token=1e600ad4-591c-4ca3-b761-f8b5fe6db538"
// likes
// postedBy
// displayName
// "Blackstrom"
// photoURL
// "https://firebasestorage.googleapis.com/v0/b/social-media-788f1.appspot.com/o/Blackstrom1662788505074?alt=media&token=45398c35-eaa0-4ef8-a76e-bfb46c7b752c"
// uid
// "YyJTBhEBP7hO1M7sQ6yPouyY6V83"


interface postedByI{
    displayName:string,
    photoURL:string,
    uid:string
}

interface CommentsPostedby{
    date:any,
    displayName:string,
    id:string,
    photoURL:string
}

export interface CommentsI{
id:string,
text:string,
postedBy:CommentsPostedby
}

export interface LikesI{
    uid:any
}

interface dataI{
    id:string,
    caption:string,
    comments:CommentsI[],
    createdAt:any,
    image:string,
    likes:LikesI[],
    postedBy:postedByI,
}

export interface PostI{
    id?:string,
data:dataI
}

export interface PostContextI{
posts:PostI[],
}