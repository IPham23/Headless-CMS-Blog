import type {WPPost, WPTags} from "../types";
import {Link} from "react-router-dom";

interface PostCardProps {
    post: WPPost;
    tags: WPTags[];
    onTagClick: (tagId: number) => void;
    isPriority?: boolean;
}

export default function PostCard({post, tags, onTagClick, isPriority = false}: PostCardProps){
    const media = post._embedded?.['wp:featuredmedia']?.[0];

    // Use a display-appropriate size instead of the full source_url
    const imageSrc =
        media?.media_details?.sizes?.['medium_large']?.source_url ??
        media?.media_details?.sizes?.['large']?.source_url ??
        media?.source_url;

    // Build srcset from available WordPress sizes
    const srcSet = media?.media_details?.sizes
        ? Object.values(media.media_details.sizes)
            .filter((s): s is NonNullable<typeof s> => !!s?.source_url && !!s?.width)
            .map(s => `${s.source_url} ${s.width}w`)
            .join(', ')
        : undefined;

    const getTagColor = (tagId: number) => {
        const hue = (tagId * 137.508) % 360;
        return {
            background: `hsl(${hue}, 50%, 90%)`,
            color: `hsl(${hue}, 60%, 20%)`,
        };
    };

    return(
        <div className="card border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all 
                        bg-(--card-bg) flex flex-col h-full">
            {/* IMAGE */}
            <div className="h-60 w-full overflow-hidden shrink-0">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        srcSet={srcSet}
                        sizes="(max-width: 640px) 100vw, 648px"
                        alt={media?.alt_text || post.title.rendered}
                        className="w-full h-full object-cover"
                        loading={isPriority ? "eager" : "lazy"}
                        fetchPriority={isPriority ? "high" : "low"}
                        decoding="async"
                        width={648}
                        height={432}
                    />
                )}
            </div>

            {/* CONTENT */}
            <div className="px-5 py-5 flex-1">
                <div className="flex flex-col">
                    <h2 
                        className="text-xl lg:text-3xl leading-normal font-extrabold mb-5 text-(--card-title) line-clamp-2" 
                        dangerouslySetInnerHTML={{__html: post.title.rendered}}
                    />
                    <p 
                        className="mb-5 text-md lg:text-lg text-(--card-text) leading-normal" 
                        dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}
                    />
                </div>

                {/* READ MORE */}
                <div className="pb-5">
                    <Link to={`/post/${post.slug}`} className="readmore">
                        Read More
                        <span className="sr-only"> about {post.title.rendered}</span>
                    </Link>
                </div>
            </div>

            {/* TAGS */}
            <div className="px-5 pb-5 flex flex-wrap gap-2">
                {tags
                    .filter(tag => post.tags.includes(tag.id))
                    .map((tag) => {
                        const { background, color } = getTagColor(tag.id);
                        return (
                            <button
                                key={tag.id}
                                style={{ background, color, transition: "filter 0.2s, scale 0.2s" }}
                                onClick={() => onTagClick(tag.id)}
                                className="px-3 py-1 rounded-full text-sm! font-medium hover:brightness-95 hover:scale-105"
                            >
                                {tag.name}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}