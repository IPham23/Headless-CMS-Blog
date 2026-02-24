import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import type {WPPost} from "../types";
import {Link} from "react-router-dom";


export default function PostPage(){
    const {slug} = useParams();
    const [post, setPost] = useState<WPPost | null>(null);


    useEffect(() => {
        fetch(
            `https://public-api.wordpress.com/wp/v2/sites/coladillaheadlessdemo.wordpress.com/posts?slug=${slug}&_embed`
        )
        .then(res => res.json())
        .then(data => setPost(data[0]))
    }, [slug]);

    /**
     * Mimic page post while loading
     */
    if (!post) return (
        <div className="max-w-5xl mx-auto p-8 animate-pulse">
            {/* title */}
            <div className="h-8 bg-(--accent)/20 rounded w-3/4 mb-4"/>
            {/* meta */}
            <div className="h-4 bg-(--accent)/20 rounded w-1/4 mb-8"/>
            {/* content lines */}
            <div className="space-y-3">
                <div className="h-3 bg-(--accent)/20 rounded w-full"/>
                <div className="h-3 bg-(--accent)/20 rounded w-full"/>
                <div className="h-3 bg-(--accent)/20 rounded w-5/6"/>
                <div className="h-3 bg-(--accent)/20 rounded w-full"/>
                <div className="h-3 bg-(--accent)/20 rounded w-4/6"/>
            </div>
        </div>
    );


    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return(
        <>
            <div className="flex flex-col flex-1 items-center justify-center p-5 lg:px-20 xl:py-20
                            text-(--text) gap-5">
                <div className="xl:px-30 flex self-start">
                    <Link to={`/`}>
                        <button className="text-(--text) border-(--accent)! border-2!
                                           hover:bg-(--accent) hover:text-(--bg) hover:border-(--card-title)!">
                            BACK
                        </button>
                    </Link>
                    
                </div>
                <div className="max-w-5xl h-full flex flex-col justify-center">
                    {imageUrl && <img src={imageUrl} alt={post.title.rendered} 
                                      className="w-full sm:h-80 lg:h-100 2xl:h-130 object-cover mb-6 lg:mb-10"/>}
                    <h1 
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-10 tracking-loose"
                        dangerouslySetInnerHTML={{__html: post.title.rendered}}></h1>
                    <div className="text-base xl:text-lg        
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2
                    [&_li]:mb-1
                    [&_p]:mb-5
                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2
                    [&_strong]:font-bold [&_strong]:text-(--accent) 
                    [&_em]:text-(--accent)
                    [&_em]:italic
                    [&_a]:text-blue-500 [&_a]:underline
                    "
                    dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                </div>       
            </div>
        </>
    )
}