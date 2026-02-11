import {useEffect, useState} from "react";
import type {WPPost} from "../types";
import {getPosts} from "../api/wordpress";
import PostGrid from "../components/PostGrid";

export default function Blog(){
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(data => setPosts(data))
            .finally(() => setLoading(false));
    }, []);
    
    if (loading) 
            return <p className="text-center mt-10">Loading posts...</p>
        return <PostGrid posts={posts} />
}