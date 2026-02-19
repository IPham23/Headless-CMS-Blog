import {useEffect, useState} from "react";
import type {WPPost, WPCategories, WPTags} from "../types";
import {getPosts, getCategories, getTags} from "../api/wordpress";
import PostGrid from "../components/PostGrid";


export default function Blog(){
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [categories, setCategories] = useState<WPCategories[]>([]);
    const [tags, setTags] = useState<WPTags[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        async function fetchData() {
            try{
                const [postsData, categoriesData, tagsData] = await Promise.all([
                    getPosts(),
                    getCategories(),
                    getTags(),
                ]);

                console.log("Fetched posts: ", postsData);
                console.log("Fetched categories: ", categoriesData);
                console.log("Fetched tags: ", tagsData);

                setPosts(postsData);
                setCategories(categoriesData);
                setTags(tagsData);
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
        return <PostGrid posts={posts} categories={categories} tags={tags} />
}