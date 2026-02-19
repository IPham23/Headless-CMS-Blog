import type {WPCategories, WPPost, WPTags} from "../types.ts"

const SITE = "coladillaheadlessdemo.wordpress.com"


/**
 * Fetch all posts with embedded featured media
 */
export async function getPosts(): Promise<WPPost[]> {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts?per_page=100&_embed&orderby=date&order=asc`);
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
    const allCategories = await getCategories(); //Fetch all categories from the API
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

/**
 * Fetch all tags from the site
 */
export async function getTags(): Promise<WPTags[]>{
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${SITE}/tags?per_page=100`);
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();

}

/**
 * Helper: Get full tag objects for a post
 */
export async function getPostTags(post: WPPost): Promise<WPTags[]> {
    const allTags = await getTags(); //Fetch all tags from the API
    return post.tags
        .map(tagID => allTags.find(t => t.id === tagID))
        .filter(Boolean) as WPTags[];
}

/**
 * Get tag names
 */
export async function getPostTagNames(post: WPPost): Promise<string[]> {
    const tags = await getPostTags(post);
    return tags.map(t => t.name);
}