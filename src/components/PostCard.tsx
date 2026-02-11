import type {WPPost} from "../types";
import {Link} from "react-router-dom";

interface PostCardProps {
    post: WPPost;
}

export default function PostCard({post}: PostCardProps){
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return(
        <div className="card border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all 
                        flex flex-col h-full"
            >
            {image && <img src={image} alt="post.title.rendered" className="w-full h-48 object-cover"/>}
            <div className="p-5 h-full flex flex-col justify-between">
                <h2 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                <p className="flex-1 mb-4" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                <Link to={`/post/${post.slug}`} className="text-blue-500">
                        Read More
                </Link>
            </div>
            
        </div>
    );
}