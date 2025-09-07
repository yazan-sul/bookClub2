
export type VolumeData = {
    id: string;
    title: string;
    subtitle?: string;
    authors: string[];
    desc?: string;
    detail?: {
        pubDate?: string;
        pages?: number;
        lang?: string;
    };
    img?: string;
    ratings?: {
        count?: number;
        avg?: number;
    };
};
export interface Book {
    volume_id: string;
    title: string;
    subtitle?: string;
    authors: string[];
    desc: string;
    ratings: Record<string, unknown>;
    img: string;
    detail: {
        pubDate: string;
        pages: number;
        lang: string;
    };
    shelf: string;
    start_time: string;
    end_time: string;
}

export interface User {
    user_id: string;
    first_name?: string;
    last_name?: string;
    location?: string;
    birthday?: string | null;
    bio?: string;
    profile_picture?: string | null;
    favourite_book?: string | null;
}

export interface GoogleBook {
    id: string;
    volumeInfo?: {
        title?: string;
        subtitle?: string;
        authors?: string[];
        description?: string;
        averageRating?: number;
        imageLinks?: { thumbnail?: string };
        publishedDate?: string;
        pageCount?: number;
        ratingsCount?: number;
        language?: string;
    };
}
