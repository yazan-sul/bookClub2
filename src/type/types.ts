
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