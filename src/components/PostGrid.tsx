import PostCard from "./PostCard";
import type {WPPost} from "../types";

interface PostGridProps {
    posts: WPPost[];
}

export default function PostGrid({posts}: PostGridProps){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 auto-rows-fr">
            {posts.map(post => <PostCard key={post.ID} post={post}/>)}
        </div>
    )
}