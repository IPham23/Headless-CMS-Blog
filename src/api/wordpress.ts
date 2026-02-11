import type {WPPost} from "../types.ts"

const SITE = "coladillaheadlessdemo.wordpress.com"

export async function getPosts(): Promise<WPPost[]> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts?_embed`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

export async function getPost(id: number): Promise<WPPost> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts/${id}?_embed`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
} 