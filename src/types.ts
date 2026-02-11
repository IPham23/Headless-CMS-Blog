export interface FeaturedMedia {
    source_url: string;
}

export interface Embedded {
    'wp:featuredmedia'?: FeaturedMedia[];

}

export interface WPPost{
    ID: number;
    title: {rendered: string};
    excerpt: {rendered: string};
    content: {rendered: string};
    _embedded?: Embedded;
}