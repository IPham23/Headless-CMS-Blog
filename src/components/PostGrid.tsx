import PostCard from "./PostCard";
import type {WPPost, WPCategories} from "../types";
import {useState} from "react";

interface PostGridProps {
    posts: WPPost[];
    categories: WPCategories[];
}


export default function PostGrid({posts, categories}: PostGridProps){

    const [filter, setFilter] = useState<number | string>("All");

    const filteredPosts = filter === "All"
        ? posts
        : posts.filter(post => post.categories.includes(filter as number));

    return(
        <>
        <div className=" xl:px-30 py-10 gap-4">
            <div className="grid grid-cols-2 justify-center pb-5 gap-5
                            md:flex">
                <button onClick={() => setFilter("All")}>
                    All
                </button>

                {categories
                .filter(cat => cat.name.toLowerCase() !== "uncategorized")
                .map((c, index, array) => (
                    <button className={index === array.length - 1 ? "col-span-2" : ""}
                        key={c.id} onClick={() => setFilter(c.id)}>
                        {c.name}
                    </button>
                ))}
            </div>
            <div className="flex justify-center">
                <p className="text-3xl">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                </p>
            </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 auto-rows-fr">
                {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
        </>
    );
}