import type {WPPost, WPTags} from "../types";
import {Link} from "react-router-dom";

interface PostCardProps {
    post: WPPost;
    tags: WPTags[];
}

export default function PostCard({post, tags}: PostCardProps){
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    //TAG BUTTONS COLORS// Generate color from the tag name/id using HSL
    const getTagColor = (tagId: number) => {
        const hue = (tagId * 137.508) % 360;
        return {
            background: `hsl(${hue}, 60%, 85%)`,
            color: `hsl(${hue}, 60%, 30%)`,
        };
    };



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
            <div className="px-5 pb-5 flex flex-wrap gap-2">
                {tags
                    .filter(tag => post.tags.includes(tag.id))
                    .map((tag) => {
                    const { background, color } = getTagColor(tag.id); // use ID
                    return (
                        <button
                        key={tag.id}
                        style={{
                            background,
                            color,
                            transition: "transform 0.2s, filter 0.2s",
                        }}
                        className="px-3 py-1 rounded-full text-xs font-medium hover:brightness-95 hover:scale-105"
                        >
                        {tag.name}
                        </button>
                    );
                })}
            </div>
            
        </div>
    );
}