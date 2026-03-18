import type {WPCategories, WPPost, WPTags} from "../types.ts"

const SITE = "coladillaheadlessdemo.wordpress.com"
const BASE = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`

// ─── Cache ────────────────────────────────────────────────────────────────────

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

function getCache<T>(key: string): T | null {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const entry: CacheEntry<T> = JSON.parse(raw);
        if (Date.now() - entry.timestamp > CACHE_TTL) {
            sessionStorage.removeItem(key);
            return null;
        }
        return entry.data;
    } catch {
        return null;
    }
}

function setCache<T>(key: string, data: T): void {
    try {
        const entry: CacheEntry<T> = { data, timestamp: Date.now() };
        sessionStorage.setItem(key, JSON.stringify(entry));
    } catch {
        // sessionStorage full or unavailable — fail silently
    }
}

// ─── Fields ───────────────────────────────────────────────────────────────────

// Only request the fields your components actually use
const POST_FIELDS = [
    'id', 'slug', 'title', 'excerpt', 'content',
    'tags', 'categories', 'class_list',
    '_links', '_embedded',
].join(',');

const CATEGORY_FIELDS = ['id', 'name', 'slug', 'count'].join(',');
const TAG_FIELDS      = ['id', 'name', 'slug'].join(',');

// ─── Posts ────────────────────────────────────────────────────────────────────

/**
 * Fetch all posts with embedded featured media
 */
export async function getPosts(): Promise<WPPost[]> {
    const cached = getCache<WPPost[]>('wp_posts_v1');
    if (cached) return cached;

    const res = await fetch(
        `${BASE}/posts?per_page=100&_embed&orderby=date&order=asc&_fields=${POST_FIELDS}`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    setCache('wp_posts_v1', data);
    return data;
}

/**
 * Fetch a single post by slug with embedded featured media
 */
export async function getPost(slug: string): Promise<WPPost> {
    const cacheKey = `wp_post_${slug}`;
    const cached = getCache<WPPost>(cacheKey);
    if (cached) return cached;

    const res = await fetch(`${BASE}/posts?slug=${slug}&_embed&_fields=${POST_FIELDS}`);
    if (!res.ok) throw new Error("Failed to fetch post");

    const data = await res.json();
    const post = data[0];
    setCache(cacheKey, post);
    return post;
}

// ─── Categories ───────────────────────────────────────────────────────────────

/**
 * Fetch all categories from the site
 */
export async function getCategories(): Promise<WPCategories[]> {
    const cached = getCache<WPCategories[]>('wp_categories_v1');
    if (cached) return cached;

    const res = await fetch(`${BASE}/categories?_fields=${CATEGORY_FIELDS}`);
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    setCache('wp_categories_v1', data);
    return data;
}

/**
 * Helper: Get full category objects for a post
 */
export async function getPostCategories(post: WPPost): Promise<WPCategories[]> {
    const allCategories = await getCategories();
    return post.categories
        .map(catID => allCategories.find(c => c.id === catID))
        .filter(Boolean) as WPCategories[];
}

/**
 * Helper: Get category names for a post
 */
export async function getPostCategoryNames(post: WPPost): Promise<string[]> {
    const categories = await getPostCategories(post);
    return categories.map(c => c.name);
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

/**
 * Fetch all tags from the site
 */
export async function getTags(): Promise<WPTags[]> {
    const cached = getCache<WPTags[]>('wp_tags_v1');
    if (cached) return cached;

    const res = await fetch(`${BASE}/tags?per_page=100&_fields=${TAG_FIELDS}`);
    if (!res.ok) throw new Error("Failed to fetch tags");

    const data = await res.json();
    setCache('wp_tags_v1', data);
    return data;
}

/**
 * Helper: Get full tag objects for a post
 */
export async function getPostTags(post: WPPost): Promise<WPTags[]> {
    const allTags = await getTags();
    return post.tags
        .map(tagID => allTags.find(t => t.id === tagID))
        .filter(Boolean) as WPTags[];
}

/**
 * Helper: Get tag names for a post
 */
export async function getPostTagNames(post: WPPost): Promise<string[]> {
    const tags = await getPostTags(post);
    return tags.map(t => t.name);
}