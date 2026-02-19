export interface FeaturedMedia {
    source_url: string;
}

export interface Embedded {
    'wp:featuredmedia'?: FeaturedMedia[];

}

export interface WPPost{
    id: number;
    title: {rendered: string};
    excerpt: {rendered: string};
    content: {rendered: string};
    _embedded?: Embedded;
    slug: {rendered: string}
    categories: number[];
    class_list: string[];
    tags: number[];
}

export interface WPCategories{
    id: number;
    name: string;
    slug: string;
    count: number;
}

export interface WPTags{
    id: number;
    name: string;
    slug: string;
}