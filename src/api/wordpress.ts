import type {WPCategories, WPPost} from "../types.ts"

const SITE = "coladillaheadlessdemo.wordpress.com"


/**
 * Fetch all posts with embedded featured media
 */
export async function getPosts(): Promise<WPPost[]> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts?_embed`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

/**
 * Fetch a single post by ID with embedded featured media
 */
export async function getPost(id: number): Promise<WPPost> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts/${id}?_embed`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
} 


/**
 * Fetch all categories from the site
 */
export async function getCategories(): Promise<WPCategories[]> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

/**
 * Helper: Get full category objects for a post
 */
export async function getPostCategories(post: WPPost): Promise<WPCategories[]>{
    const allCategories = await getCategories();
    return post.categories
        .map(catID => allCategories.find(c => c.id === catID))
        .filter(Boolean) as WPCategories[];
}

/**
 * Helper: Get category names for a post
 */
export async function getPostCategoryNames(post: WPPost): Promise<string[]>{
    const categories = await getPostCategories(post);
    return categories.map(c => c.name);

}