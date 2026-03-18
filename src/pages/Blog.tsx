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
        /**
         * Wait finish fetching
         */
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="bg-(--bg) border border-(--accent) rounded-xl p-5 animate-pulse">
                        <div className="h-4 bg-(--accent)/20 rounded w-3/4 mb-4"/>
                        <div className="h-3 bg-(--accent)/20 rounded w-full mb-2"/>
                        <div className="h-3 bg-(--accent)/20 rounded w-5/6 mb-4"/>
                        <div className="flex gap-2">
                            <div className="h-5 bg-(--accent)/20 rounded-full w-16"/>
                            <div className="h-5 bg-(--accent)/20 rounded-full w-16"/>
                        </div>
                    </div>
                ))}
            </div>
        );
        return <PostGrid posts={posts} categories={categories} tags={tags} />
}