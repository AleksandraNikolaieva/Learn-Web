import { User } from '../core/models';
import { Observable } from 'rxjs';

export interface Article {
    id: string;
    _author: string;
    author$?: Observable<string>;
    tags: Array<number>;
    title: string;
    description: string;
    text: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    likes: Array<any>;
    stars: Array<any>;
    uni: Array<any>;
    comments: Array<Comment>;
}

export interface Comment {
    _id: string;
    _post: string;
    _author: string;
    author$?: Observable<User>;
    text: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: number;
    title: string;
}

export class WorkshopsParams {
    constructor(
        public page = '0',
        public tags?: string,
        public authorId?: string,
        public withComments?: string
    ) {}
}


