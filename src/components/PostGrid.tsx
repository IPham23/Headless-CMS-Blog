import PostCard from "./PostCard";
import type {WPPost, WPCategories, WPTags} from "../types";
import {useState} from "react";
import { IoMdClose } from "react-icons/io";

interface PostGridProps {
    posts: WPPost[];
    categories: WPCategories[];
    tags: WPTags[];
}


export default function PostGrid({posts, categories, tags}: PostGridProps){

    const [filter, setFilter] = useState<number | string>("All");
    const [filterByTags, setFilterByTags] = useState<number | string >("All");
    const [search, setSearch] = useState("");



    const filteredPosts = posts
        .filter(post => filter === "All" || post.categories.includes(filter as number)) // Filter using categories
        .filter(post => filterByTags === "All" || post.tags.includes(filterByTags as number)) //Filter using tags
        .filter(post => post.title.rendered.toLowerCase().includes(search.toLowerCase()));//Search Feature

    return(
        <>
        <div className=" xl:px-30 pb-10 gap-4">
            <div className="grid grid-cols-2 justify-center pb-5 gap-5
                            md:flex">
                <button onClick={() => setFilter("All")}
                        className={filter === "All" 
                            ? "bg-(--accent) text-(--bg)" 
                            : "bg-(--bg) text-(--accent) hover:bg-(--accent) hover:text-(--bg) hover:brightness-130"}
                >
                    All
                </button>

                {categories
                .filter(cat => cat.name.toLowerCase() !== "uncategorized")
                .map((c) => (
                    <button 
                        key={c.id} onClick={() => setFilter(c.id)}
                        className={filter === c.id 
                            ? "bg-(--accent) text-(--bg)" 
                            : "bg-(--bg) text-(--accent) hover:bg-(--accent) hover:text-(--bg) hover:brightness-130"}>
                        {c.name}
                    </button>
                ))}
            </div>

            {filterByTags !== "All" && (
                <div className="flex justify-center items-center gap-5 pb-5">
                    <span>
                        Filtering by tag: 
                        <strong> {tags.find(t => t.id === filterByTags)?.name}</strong>
                    </span>
                    <button onClick={() => setFilterByTags("All")}>Clear Filter</button>
                </div>
            )}

            <div className="flex justify-center items-center gap-5 pb-5">
                <input name="search"
                       type="text" 
                       placeholder="Search posts..."
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       className="px-5 py-2 border border-gray-500 rounded-full
                                  focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
    
                <IoMdClose 
                        className="border border-solid rounded-full! border-black bg-[red] cursor-pointer"
                        onClick={() => setSearch("")}
                        size={36} 
                />
         
            </div>

            <div className="flex justify-center">
                <p className="text-3xl">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                </p>
            </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 items-stretch">
                {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} tags={tags} onTagClick={setFilterByTags}/>
            ))}
        </div>
        </>
    );
}