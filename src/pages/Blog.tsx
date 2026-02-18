import {useEffect, useState} from "react";
import type {WPPost, WPCategories} from "../types";
import {getPosts, getCategories} from "../api/wordpress";
import PostGrid from "../components/PostGrid";


export default function Blog(){
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [categories, setCategories] = useState<WPCategories[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        async function fetchData() {
            try{
                const [postsData, categoriesData] = await Promise.all([
                    getPosts(),
                    getCategories()
                ]);

                console.log("Fetched posts: ", postsData);
                console.log("Fetched categories: ", categoriesData);

                setPosts(postsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    
    if (loading) 
            return <p className="text-center mt-10">Loading posts...</p>
        return <PostGrid posts={posts} categories={categories} />
}