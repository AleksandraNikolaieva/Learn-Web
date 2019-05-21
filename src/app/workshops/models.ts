import { User } from '../core/models';

export interface Article {
    id: number;
    title: string;
    author: string;
    date: Date;
    description: string;
    img: string;
    tags: Array<string>;
    likes: number;
    comments?: Array<Comment>;
}

export interface Tag {
    title: string;
    isActive: boolean;
}

export interface Comment {
    author: User;
    text: string;
    date: Date;
}
