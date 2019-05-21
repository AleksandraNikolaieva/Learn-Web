export interface Article {
    id: number;
    title: string;
    author: string;
    date: Date;
    description: string;
    img: string;
    tags: Array<string>;
    likes: number;
}

export interface Tag {
    title: string;
    isActive: boolean;
}
