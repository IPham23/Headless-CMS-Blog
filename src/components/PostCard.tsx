import type {WPPost, WPTags} from "../types";
import {Link} from "react-router-dom";


interface PostCardProps {
    post: WPPost;
    tags: WPTags[];
    onTagClick: (tagId: number) => void;
}

export default function PostCard({post, tags, onTagClick}: PostCardProps){
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
                        bg-(--card-bg) flex flex-col h-full"
            >
            {/* IMAGE */}
            <div className="h-60 w-full overflow-hidden shrink-0">
                {image && <img src={image} alt="post.title.rendered" className="w-full h-full object-cover"/>}
            </div>
            {/* CONTENT */}
            <div className="px-5 py-5 flex-1">
                <div className="flex flex-col">
                <h2 
                    className="text-xl lg:text-3xl leading-normal font-extrabold mb-5 text-(--card-title) line-clamp-2" 
                    dangerouslySetInnerHTML={{__html: post.title.rendered}}
                />
                <p 
                    className=" mb-5 text-md lg:text-lg text-(--card-text) leading-normal" 
                    dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}
                />
                </div>

                {/* READ MORE */}
                <div className="pb-5">
                    <Link 
                        to={`/post/${post.slug}`} 
                        className="text-blue-500"
                    >
                        Read More
                    </Link>
                </div>
            </div>
            {/* TAGS */}
            <div className="">
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
                            onClick={() => onTagClick(tag.id)}
                            className="px-3 py-1 rounded-full text-sm! font-medium hover:brightness-95 hover:scale-105"
                            >
                            {tag.name}
                            </button>
                        );
                    })}
                </div>   
            </div>
        </div>
    );
}