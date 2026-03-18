// ─── Media ───────────────────────────────────────────────────────────────────

export interface WPMediaSize {
    source_url: string;
    width: number;
    height: number;
    mime_type: string;
    file: string;
}

export interface FeaturedMedia {
    source_url: string;
    alt_text: string;
    media_details: {
        width: number;   // original full width
        height: number;  // original full height
        sizes: {
            thumbnail?:    WPMediaSize;
            medium?:       WPMediaSize;
            medium_large?: WPMediaSize;
            large?:        WPMediaSize;
            full?:         WPMediaSize;
            [key: string]: WPMediaSize | undefined; // any custom sizes
        };
    };
}

// ─── Embedded ─────────────────────────────────────────────────────────────────

export interface Embedded {
    'wp:featuredmedia'?: FeaturedMedia[];
}

// ─── Post ─────────────────────────────────────────────────────────────────────

export interface WPPost {
    id: number;
    slug: string;               // was wrongly typed as {rendered: string}
    title:   { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    _embedded?: Embedded;
    categories: number[];
    class_list: string[];
    tags: number[];
}

// ─── Taxonomy ─────────────────────────────────────────────────────────────────

export interface WPCategories {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export interface WPTags {
    id: number;
    name: string;
    slug: string;
}